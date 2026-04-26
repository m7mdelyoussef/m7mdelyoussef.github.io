import SectionReveal from "./SectionReveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  tagColor: "blue" | "purple" | "green" | "orange";
  icon: string;
  skills: string[];
  link?: string;
  gradient: string;
  iconBg: string;
}

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <SectionReveal delay={index * 100}>
      <div className="project-card group h-full flex flex-col">
        <div
          className="project-img-placeholder grid-pattern relative"
          style={{ background: project.gradient }}
        >
          <div className="scan-line" />
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
            style={{ background: project.iconBg, backdropFilter: "blur(10px)" }}
          >
            {project.icon}
          </div>
          <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end">
            {project.tags.map((t) => (
              <span key={t} className={`tag tag-${project.tagColor} text-xs`}>{t}</span>
            ))}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gradient transition-all">{project.title}</h3>
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "hsl(215 20% 55%)" }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.skills.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-md font-mono" style={{ background: "rgba(255,255,255,0.06)", color: "hsl(215 20% 70%)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
