import { motion } from 'framer-motion'
import { experienceData } from './experienceData'

export default function ExperienceCard() {
  return (
    <div className="experience-deck-center">
      <motion.div
        className="experience-glass-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mission-status">
          <div className="status-dot" />
          MISSION STATUS: COMPLETED
        </div>
        
        <h3 className="experience-title">{experienceData.role}</h3>
        <div className="experience-company">
          {experienceData.company} • {experienceData.location}
        </div>

        <ul className="experience-bullets">
          {experienceData.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>

        <div className="tech-chips">
          {experienceData.technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className="tech-chip"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
