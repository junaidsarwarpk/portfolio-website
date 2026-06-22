import Image from "next/image";
import { site } from "@/data/site";

type ContactLinkItem = {
  id: string;
  kind: "link";
  label: string;
  description: string;
  href: string;
  icon: string;
  external?: boolean;
};

type ContactPhonesItem = {
  id: string;
  kind: "phones";
  label: string;
  icon: string;
  phones: { number: string; tel: string }[];
};

type ContactItem = ContactLinkItem | ContactPhonesItem;

const contactItems: ContactItem[] = [
  {
    id: "whatsapp",
    kind: "link",
    label: "WhatsApp",
    description: site.phone.primary,
    href: site.phone.whatsapp,
    icon: "/static/icons/whatsapp.svg",
    external: true,
  },
  {
    id: "email",
    kind: "link",
    label: "Send Email",
    description: site.email,
    href: `mailto:${site.email}`,
    icon: "/static/icons/email.svg",
  },
  {
    id: "call",
    kind: "phones",
    label: "Call",
    icon: "/static/icons/phone.svg",
    phones: [
      { number: site.phone.primary, tel: site.phone.primaryTel },
      { number: site.phone.secondary, tel: site.phone.secondaryTel },
    ],
  },
  ...site.social.map((social) => ({
    id: social.label.toLowerCase(),
    kind: "link" as const,
    label: social.label,
    description: social.label === "LinkedIn" ? "View profile" : "Hire on Upwork",
    href: social.href,
    icon: social.icon,
    external: true,
  })),
];

function ContactIcon({ src }: { src: string }) {
  return (
    <span className="contact-icon-wrap">
      <Image src={src} alt="" width={24} height={24} className="contact-icon" />
    </span>
  );
}

export default function Contact() {
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <h2 id="contact-heading" className="section-title">
          Contact
        </h2>
        <p className="contact-intro">
          Ready to collaborate on your next project? Reach out via WhatsApp, email,
          phone, LinkedIn, or Upwork.
        </p>
        <div className="contact-grid">
          {contactItems.map((item) =>
            item.kind === "phones" ? (
              <div
                key={item.id}
                className="contact-card contact-card-static"
                aria-label={`${item.label}: ${item.phones.map((p) => p.number).join(", ")}`}
              >
                <ContactIcon src={item.icon} />
                <span className="contact-text">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-phones">
                    {item.phones.map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        className="contact-detail-link"
                      >
                        {phone.number}
                      </a>
                    ))}
                  </span>
                </span>
              </div>
            ) : (
              <a
                key={item.id}
                href={item.href}
                className="contact-card"
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={`${item.label}: ${item.description}`}
              >
                <ContactIcon src={item.icon} />
                <span className="contact-text">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-detail">{item.description}</span>
                </span>
              </a>
            ),
          )}
        </div>
        <footer className="site-footer">
          <Image
            src="/static/images/logo.svg"
            alt=""
            width={28}
            height={28}
            className="footer-logo"
          />
          <p className="footer-text">
            © {site.copyrightYear} {site.name}. {site.location}.
          </p>
          <div className="footer-links">
            {site.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <Image
                  src={link.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="footer-link-icon"
                />
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
