import { motion } from 'motion/react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { HiEnvelope } from 'react-icons/hi2'
import { personal, socials } from '../../data/portfolio'

const ICON_MAP: Record<string, React.ReactNode> = {
  GitHub:   <SiGithub size={22} />,
  LinkedIn: <FaLinkedin size={22} />,
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">

      {/* Fundo com gradiente radial sutil */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_bottom] from-brand/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted">
            Contato
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-gradient">
            Vamos conversar?
          </h2>

          <p className="text-muted leading-relaxed max-w-md">
            Estou aberto a novas oportunidades, projetos e colaborações.
            Se você tem algo em mente, entre em contato!
          </p>

          {/* Links sociais */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {socials.map(social => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-surface border border-border text-foreground font-semibold text-sm hover:border-brand/50 hover:text-brand transition-all duration-300"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {ICON_MAP[social.label]}
                {social.label}
              </motion.a>
            ))}

            {personal.email && (
              <motion.a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm glow-brand hover:bg-brand/80 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiEnvelope size={20} />
                Enviar e-mail
              </motion.a>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
