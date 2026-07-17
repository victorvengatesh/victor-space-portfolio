import { motion } from 'framer-motion'
import { experienceData } from './experienceData'

export default function ExperienceTimeline() {
  return (
    <div className="experience-deck-left">
      <motion.div
        className="timeline-signal"
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <div>
        <div className="deck-label">EXPERIENCE LOG</div>
        <div className="deck-number">03</div>
      </div>
      <div className="timeline-dates">
        {experienceData.periods.map((period, index) => (
          <motion.div
            key={period}
            className="date-node"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            {period}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
