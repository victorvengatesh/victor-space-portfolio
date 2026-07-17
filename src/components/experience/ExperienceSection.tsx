import ExperienceTimeline from './ExperienceTimeline'
import ExperienceCard from './ExperienceCard'

export default function ExperienceSection() {
  return (
    <div className="experience-deck">
      <ExperienceTimeline />
      <ExperienceCard />
      <div className="experience-deck-right">
        {/* The 3D planet is rendered globally in SpaceScene and aligned via CSS/Camera */}
      </div>
    </div>
  )
}
