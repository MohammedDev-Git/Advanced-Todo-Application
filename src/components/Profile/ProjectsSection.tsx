import { Github, ExternalLink } from 'lucide-react';

export const ProjectsSection = () => {
    const projects = [
        {
            title: "E-Commerce Platform",
            desc: "Built a full-stack e-commerce platform with user authentication, product management, and payment integration.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
            title: "Task Management App",
            desc: "Developed a collaborative task management application with real-time updates and team collaboration features.",
            tags: ["React", "Firebase", "Tailwind CSS"]
        },
        {
            title: "Weather Dashboard",
            desc: "Created an interactive weather dashboard using external APIs with location-based forecasts and data visualization.",
            tags: ["JavaScript", "OpenWeather", "Chart.js"]
        }
    ];

    return (
        <section className="bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Projects</h2>
            </div>

            <div className="space-y-6">
                {projects.map((project, index) => (
                    <div key={index} className="group p-4 md:p-6 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-primary/20 dark:hover:border-primary/50 transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                {project.title}
                            </h3>
                            <div className="flex gap-3 text-gray-400 dark:text-gray-500">
                                <Github size={20} className="cursor-pointer hover:text-primary transition-colors" />
                                <ExternalLink size={20} className="cursor-pointer hover:text-primary transition-colors" />
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                            {project.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="hover:border-primary dark:hover:border-primary transition-all px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs font-medium rounded-md border border-gray-100 dark:border-slate-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};