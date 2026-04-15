import { motion } from 'motion/react'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import { projects, personal } from '../../data/portfolio'

function BrowserChrome({ url }: { url?: string }) {
  const displayUrl = url ? url.replace(/^https?:\/\//, '') : 'localhost:5173'
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3 h-7 bg-surface/90 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <div className="flex-1 mx-2 px-2.5 py-0.5 rounded bg-surface2 border border-border text-[10px] font-mono text-muted truncate text-center">
        {displayUrl}
      </div>
    </div>
  )
}

export default function Projects() {
  const hasProjects = projects.length > 0

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Portfólio
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gradient">
            Projetos em Destaque
          </h2>
        </motion.div>

        {hasProjects ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              /* Wrapper CSS para o hover translate — separado do motion para
                 evitar conflito de y entre whileInView e whileHover */
              <div key={project.title} className="group hover:-translate-y-1.5 transition-transform duration-200">
                <motion.article
                  className="flex flex-col h-full rounded-2xl bg-surface border border-border overflow-hidden hover:border-brand/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                {/* Imagem do projeto */}
                {project.image && (
                  <div className="relative aspect-video overflow-hidden bg-surface2">
                    <BrowserChrome url={project.live} />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6 gap-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-brand/10 text-brand border border-brand/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand transition-colors"
                      >
                        <SiGithub size={15} /> Código
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
                      >
                        <HiArrowTopRightOnSquare size={15} /> Ver Site
                      </a>
                    )}
                  </div>
                </div>
                </motion.article>
              </div>
            ))}
          </div>
        ) : (
          /* Placeholder enquanto não há projetos */
          <motion.div
            className="flex flex-col items-center justify-center py-20 gap-4 rounded-2xl border border-dashed border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
              <SiGithub size={28} className="text-brand" />
            </div>
            <p className="text-muted text-sm text-center max-w-xs">
              Projetos chegando em breve. <br />
              Enquanto isso, confira meu{' '}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </motion.div>
        )}

        {/* CTA GitHub */}
        <motion.div
          className="text-center mt-14 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-muted text-sm">
            Conheça mais do meu trabalho
          </p>
          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-surface border border-border text-foreground font-semibold text-sm hover:border-brand/50 hover:text-brand transition-all duration-300"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SiGithub size={18} />
            Ver GitHub
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
