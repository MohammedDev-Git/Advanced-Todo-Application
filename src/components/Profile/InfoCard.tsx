import type { LanguageObject, MemberObject } from '@/types';
import {
    Github,
    Linkedin,
    Globe,
    Mail,
    ChartNoAxesColumn,
    Youtube,
    Dribbble,
    Facebook,
    X,
    Send,
} from 'lucide-react';

export const InfoCard = ({ member }: { member: MemberObject | undefined }) => {

    const logos = [
        { key: "github", text: "GitHub", Icon: <Github /> },
        { key: "linkedin", text: "LinkedIn", Icon: <Linkedin /> },
        { key: "facebook", text: "Facebook", Icon: <Facebook /> },
        { key: "fb.", text: "Facebook", Icon: <Facebook /> },
        { key: "twitter", text: "Twitter", Icon: <X /> },
        { key: "x.com", text: "Twitter", Icon: <X /> },
        { key: "youtube", text: "YouTube", Icon: <Youtube /> },
        { key: "youtu.be", text: "YouTube", Icon: <Youtube /> },
        { key: "dribbble", text: "Dribbble", Icon: <Dribbble /> },
        { key: "telegram", text: "Telegram", Icon: <Send /> },
        { key: "t.me", text: "Telegram", Icon: <Send /> },
        { key: "codeforces", text: "Codeforces", Icon: <ChartNoAxesColumn /> },
        { key: "mail", text: "Email", Icon: <Mail /> },
    ]

    let skills: string[] = [];
    let languages: LanguageObject[] = [];
    if (member) {
        skills = [...member?.skillsAndSocials?.stackAndLinks?.stack];
        languages = [...member?.skillsAndSocials.languages];
    }

    const memberSocials = member?.skillsAndSocials?.stackAndLinks?.social;
    const memberSocialsFiltered = memberSocials?.filter((link) => {
        return link.trim() !== "";
    });

    return (
        <aside className="w-full bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8 top-24">

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{member?.personalDetails?.name}</h2>

            <hr className="border-gray-100" />

            <div className="py-6">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary text-xs font-medium rounded-full border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
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
                        <div key={lang?.lang} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{lang.lang}</span>
                            <span className="text-xs text-primary dark:text-primary bg-primary/20 dark:bg-primary/20 px-2 py-0.5 hover:bg-primary/20 dark:hover:bg-primary/20 rounded-md font-semibold">
                                {lang.level}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            <div className="pt-6">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Social Media</h3>
                {
                    memberSocialsFiltered && memberSocialsFiltered.length >= 1 ?
                        <div className="grid grid-cols-2 gap-3">
                            {
                                memberSocialsFiltered?.map((link, idx) => {
                                    const chosenLogo = logos.find((logo) => link.includes(logo.key))
                                    return (
                                        <a key={idx} href={link} target='_blank' className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-primary/10 dark:hover:bg-primary/10 transition-all text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/50" >
                                            {chosenLogo ? chosenLogo.Icon : <Globe />}
                                            <span className="text-xs font-medium">{chosenLogo ? chosenLogo.text : "External"}</span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                        :
                        <p className="text-gray-400 dark:text-gray-500">No Socials Provided</p>
                }
            </div>
        </aside >
    );
};