import { motion } from 'motion/react'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import { projects } from '../../data/portfolio'

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
              <motion.article
                key={project.title}
                className="group flex flex-col rounded-2xl bg-surface border border-border overflow-hidden hover:border-brand/40 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Imagem do projeto */}
                {project.image && (
                  <div className="aspect-video overflow-hidden bg-surface2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                href="https://github.com/PedroBolson"
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

      </div>
    </section>
  )
}
