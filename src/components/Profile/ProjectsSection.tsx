import type { MemberObject, MemberProject } from '@/types';
import MemberProjectCard from '@/components/Profile/MemberProjectCard';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

import astroFirst from "@/assets/noProjects/first.webp";
import astroSecond from "@/assets/noProjects/second.webp";
import astroThird from "@/assets/noProjects/third.webp";
import astroFourth from "@/assets/noProjects/fourth.webp";
import astroFifth from "@/assets/noProjects/fifth.webp";
import astroSixth from "@/assets/noProjects/sixth.webp";
import { useThemeContext } from '@/contexts/theme/ThemeProvider';

interface ProjectProps {
    member: MemberObject | undefined;
    resetEditModes: () => void;
    projectsEditMode: boolean;
    setProjectsEditMode: (mode: boolean) => void;
    deleteProjectsModalOpen: boolean;
    setDeleteProjectsModalOpen: (open: boolean) => void;
    addProjectModalOpen: boolean;
    setAddProjectModalOpen: (open: boolean) => void;
    deleteOneProjectModal: boolean;
    setDeleteOneProjectModal: (open: boolean) => void;
    setDeleteingProjectIdx: (idx: number) => void;
}

export const ProjectsSection = ({
    member,
    resetEditModes,
    projectsEditMode,
    setProjectsEditMode,
    setDeleteProjectsModalOpen,
    setAddProjectModalOpen,
    deleteOneProjectModal,
    setDeleteOneProjectModal,
    setDeleteingProjectIdx,
}: ProjectProps) => {

    const projects: MemberProject[] = member ? [...member.projects] : [];

    const reversedProjects: MemberProject[] = [...projects].reverse();

    const theme = useThemeContext();

    const imgRender = {
        first: astroFirst,
        second: astroSecond,
        third: astroThird,
        fourth: astroFourth,
        fifth: astroFifth,
        sixth: astroSixth,
    }

    return (
        <section className="bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8">
            <div className="mb-8 flex justify-between items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Projects</h2>
                {
                    projectsEditMode ?
                        <></>
                        :
                        <div className='flex justify-between items-center gap-2'>
                            {
                                projects.length === 0 ?
                                    ""
                                    :
                                    <Button
                                        onClick={() => {
                                            setDeleteProjectsModalOpen(true);
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                            }
                            <Button onClick={() => {
                                setAddProjectModalOpen(true);
                            }}>
                                <Plus />
                            </Button>
                        </div>

                }
            </div>

            {
                projects.length === 0 ?
                    <div
                        onClick={() => {
                            setAddProjectModalOpen(true);
                        }}
                        className="w-full cursor-pointer flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dotted border-primary bg-primary/10 backdrop-blur-sm p-6 text-center shadow-[0_0_15px_rgba(var(--primary),0.3)] dark:shadow-[0_0_25px_rgba(var(--primary),0.2)] transition-all duration-300">
                        <img className='size-40' src={imgRender[theme.theme]} />
                        <div className="space-y-2 relative z-10">
                            <p className="text-sm max-w-sm mx-auto">
                                There are no projects yet.
                            </p>
                        </div>

                    </div>
                    :
                    <div className="space-y-6">
                        {member && reversedProjects.map((project) => (
                            <div key={project.id}>
                                <MemberProjectCard
                                    setDeleteingProjectIdx={setDeleteingProjectIdx}
                                    member={member}
                                    project={project}
                                    projectsEditMode={projectsEditMode}
                                    resetEditModes={resetEditModes}
                                    setProjectsEditMode={setProjectsEditMode}
                                    deleteOneProjectModal={deleteOneProjectModal}
                                    setDeleteOneProjectModal={setDeleteOneProjectModal}
                                />
                            </div>
                        ))}
                    </div>
            }
        </section>
    );
};