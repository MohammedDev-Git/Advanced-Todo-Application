import { Header } from "@/components/Header/Header"
import { RightPanel } from "@/components/RightPanel/RightPanel"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { useEffect, useRef } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router"

const RootLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div className="flex h-screen overflow-hidden transition-all bg-primary/10 font-sans text-foreground">
                {/* Left Sidebar - Fixed Width */}
                <aside className="w-62.5 shrink-0 hidden md:block border-r dark:border-slate-700 h-full">
                    <Sidebar />
                </aside>

                {/* Main Content Area - Flex Grow */}
                <div ref={scrollContainerRef} className="flex-1 transition-all flex flex-col min-w-0 bg-gray-50/50 dark:bg-gray-900/50 overflow-y-auto scrollbar-hide">
                    <header className="shrink-0 px-8 bg-gray-50/50 transition-all dark:bg-gray-900/50 sticky top-0 z-50 backdrop-blur-sm">
                        <Header />
                    </header>

                    <main className="flex-1 pb-4">
                        <div className="max-w-5xl mx-auto md:mx-0 w-full">
                            <div className="px-4 sm:px-8 pt-5">
                                <Outlet />
                            </div>
                            {/* Right Panel for Mobile/Tablet */}
                            <div className="xl:hidden mt-8">
                                <RightPanel className="w-full h-auto border-l-0 border-t pt-8 px-4" />
                            </div>
                        </div>
                    </main>
                </div>

                {/* Right Sidebar - Fixed Width */}
                <aside className="w-[320px] transition-all shrink-0 hidden xl:block border-l dark:border-slate-700 h-full bg-white dark:bg-card">
                    <RightPanel />
                </aside>
            </div>
            <ScrollRestoration />
        </>
    )
}

export default RootLayout