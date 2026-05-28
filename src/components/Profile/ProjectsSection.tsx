import type { MemberObject, MemberProject } from '@/types';
import { Github, ExternalLink } from 'lucide-react';

export const ProjectsSection = ({ member }: { member: MemberObject | undefined }) => {
    let projects: MemberProject[] = [];
    if (member) {
        projects = [...member?.projects].reverse();
    }
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
                                {project?.title || "Untitled Project"}
                            </h3>
                            <div className="flex gap-3 text-gray-400 dark:text-gray-500">
                                {
                                    project?.sourceCode &&
                                    <a href={project?.sourceCode} target="_blank">
                                        <Github size={20} className="cursor-pointer hover:text-primary transition-colors" />
                                    </a>
                                }
                                {
                                    project?.liveCode &&
                                    <a href={project?.liveCode} target="_blank">
                                        <ExternalLink size={20} className="cursor-pointer hover:text-primary transition-colors" />
                                    </a>
                                }
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                            {project?.description || "No description provided for this project."}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project?.category?.map((tag, idx) => (
                                tag ?
                                    <span key={tag} className="hover:border-primary dark:hover:border-primary transition-all px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs font-medium rounded-md border border-gray-100 dark:border-slate-700">
                                        {tag}
                                    </span>
                                    :
                                    <span key={idx} className="px-3 py-1 bg-primary/10 text-gray-400 dark:text-gray-500 text-xs font-medium rounded-md border border-gray-100 dark:border-slate-700">
                                        No categories yet
                                    </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};