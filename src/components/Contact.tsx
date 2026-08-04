import { Globe, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { contact } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

const cards: { icon: ReactNode; label: string; value: string; href?: string }[] =
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
    <section id="contact" className="mt-4 lg:mt-6">
      <Reveal>
        <article className="bento-card relative overflow-hidden p-6 sm:p-10">
          <div className="glow-orb -right-10 -top-10 h-48 w-48 bg-cyan-400/20" />
          <div className="glow-orb -bottom-16 left-10 h-40 w-40 bg-violet-500/20" />
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Contact
          </p>
          <h2 className="mt-3 max-w-[18ch] text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to build something real?
          </h2>
          <p className="mt-3 max-w-[46ch] text-muted">
            Open to internships and collaborations. Prefer email or LinkedIn.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cards.map(({ icon, label, value, href }) => {
              const body = (
                <div className="flex items-start gap-3">
                  {icon}
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-zinc-200">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-white/25"
                >
                  {body}
                </a>
              ) : (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  {body}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Globe size={14} />
            Currently open to opportunities
          </div>
        </article>
      </Reveal>
    </section>
  );
}
