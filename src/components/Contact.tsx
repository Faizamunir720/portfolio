import { Globe, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { contact } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { RollingTextButton } from "@/components/RollingTextButton";

const rows: { icon: ReactNode; label: string; value: string; href?: string }[] =
  [
    {
      icon: <MapPin size={16} className="text-zinc-400" />,
      label: "Location",
      value: contact.location,
    },
    {
      icon: <Mail size={16} className="text-zinc-400" />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: <GitHubIcon size={16} className="text-zinc-400" />,
      label: "GitHub",
      value: "github.com/Faizamunir720",
      href: contact.github,
    },
    {
      icon: <LinkedInIcon size={16} className="text-zinc-400" />,
      label: "LinkedIn",
      value: "linkedin.com/in/faizamunir99",
      href: contact.linkedin,
    },
  ];

export function Contact() {
  return (
    <section
      id="contact"
      className="cosmic-band border-t border-[var(--hairline)]"
    >
      <div className="cosmic-band-inner">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Contact
          </p>
          <h2 className="mt-3 max-w-[18ch] text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to build something real?
          </h2>
          <p className="mt-3 max-w-[46ch] text-muted">
            Open to internships and collaborations. Prefer email or LinkedIn.
          </p>

          <div className="mt-6">
            <RollingTextButton
              href={`mailto:${contact.email}`}
              label="Email me"
              rollLabel="Let's talk"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            />
          </div>

          <ul className="mt-10 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {rows.map(({ icon, label, value, href }) => {
              const body = (
                <div className="flex items-center gap-4 py-4">
                  {icon}
                  <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-1 truncate text-sm text-zinc-200 sm:mt-0">
                      {value}
                    </p>
                  </div>
                </div>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block transition hover:bg-white/[0.03]"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Globe size={14} />
            Currently open to opportunities
          </div>
        </Reveal>
      </div>
    </section>
  );
}
