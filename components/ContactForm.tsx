"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const payload: Record<string, string | object> = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      _email: {
        from: form.name.trim(),
        subject: `New message from ${form.name.trim()}`,
      },
    };

    const phone = form.phone.trim();
    if (phone) {
      payload.phone = phone;
    }

    try {
      const response = await fetch(site.formspark, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-form-wrap">
      <h3 className="subsection-title contact-form-title">Contact Form</h3>
      <form
        className="contact-form"
        onSubmit={onSubmit}
        aria-busy={status === "submitting"}
      >
        <div className="contact-form-grid">
          <div className="form-field">
            <label className="form-label" htmlFor="contact-name">
              Name <span className="form-required">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="form-input"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              autoComplete="name"
              disabled={status === "submitting"}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-email">
              Email <span className="form-required">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
              autoComplete="email"
              disabled={status === "submitting"}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-phone">
            Contact Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="form-input"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            disabled={status === "submitting"}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-message">
            Message <span className="form-required">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            className="form-textarea"
            rows={5}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className="contact-form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="contact-form-status contact-form-status-success" role="status">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
          )}

          {status === "error" && (
            <p className="contact-form-status contact-form-status-error" role="alert">
              Something went wrong. Please try again or use one of the direct channels
              below.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
