import { useState } from 'react'
import { motion } from 'motion/react'
import { HiEnvelope, HiClipboard, HiCheck } from 'react-icons/hi2'
import { personal } from '../../data/portfolio'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

          {/* Card de email */}
          <motion.div
            className="w-full max-w-sm bg-surface border border-border rounded-2xl p-6 flex flex-col items-center gap-5 mt-2"
            whileHover={{ borderColor: 'rgba(var(--color-brand), 0.3)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Ícone */}
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
              <HiEnvelope size={22} className="text-brand" />
            </div>

            {/* Endereço */}
            <p className="font-mono text-sm md:text-base text-foreground tracking-wide select-all">
              {personal.email}
            </p>

            {/* Ações */}
            <div className="flex gap-3 w-full">
              <motion.button
                onClick={copyEmail}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface2 border border-border text-foreground font-semibold text-sm hover:border-brand/50 hover:text-brand transition-all duration-300"
                whileTap={{ scale: 0.97 }}
              >
                {copied
                  ? <><HiCheck size={16} className="text-emerald-400" /> Copiado!</>
                  : <><HiClipboard size={16} /> Copiar</>
                }
              </motion.button>

              <motion.a
                href={`mailto:${personal.email}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand text-white font-semibold text-sm glow-brand hover:bg-brand/80 transition-all duration-300"
                whileTap={{ scale: 0.97 }}
              >
                <HiEnvelope size={16} />
                Enviar
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
