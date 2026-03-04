import { Github, Linkedin, Globe, Mail } from 'lucide-react';

export const InfoCard = () => {
    const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'];
    const languages = [
        { name: 'Arabic', level: 'Native' },
        { name: 'English', level: 'Professional' },
        { name: 'German', level: 'Beginner' }
    ];

    return (
        <aside className="w-full bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8 top-24">

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Rahul Sharma</h2>

            <hr className="border-gray-100" />

            <div className="py-6">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-medium rounded-full border border-indigo-100 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            <div className="py-6">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Languages</h3>
                <div className="space-y-3">
                    {languages.map((lang) => (
                        <div key={lang.name} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{lang.name}</span>
                            <span className="text-xs text-indigo-500 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900 px-2 py-0.5 rounded-md font-semibold">
                                {lang.level}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            <div className="pt-6">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Social Media</h3>
                <div className="grid grid-cols-2 gap-3">
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <Github size={18} />
                        <span className="text-xs font-medium">GitHub</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <Linkedin size={18} />
                        <span className="text-xs font-medium">LinkedIn</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <Globe size={18} />
                        <span className="text-xs font-medium">Portfolio</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <Mail size={18} />
                        <span className="text-xs font-medium">Email</span>
                    </a>
                </div>
            </div>
        </aside>
    );
};