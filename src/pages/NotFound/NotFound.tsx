import { useNavigate } from 'react-router'

import { useThemeContext } from '@/contexts/theme/ThemeProvider';

const NotFound = () => {
    const navigate = useNavigate();

    const { theme } = useThemeContext();
    console.log(theme);

    return (
        <div className="min-h-screen bg-primary/10 dark:bg-primary/10 flex items-center justify-center font-sans selection:bg-gray-200 dark:selection:bg-gray-700">
            <div className="max-w-[50dvw] w-full text-center space-y-10 p-12 rounded-[2.5rem]">

               

                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Lost in the digital void?
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base max-w-sm mx-auto leading-relaxed">
                        The page you're looking for doesn't exist or has been moved to another galaxy.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="group border-gray-200 dark:border-slate-700 border relative px-10 py-4 bg-gray-900 text-white rounded-2xl font-medium overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 ">Back to Earth</span>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-10 py-4 bg-transparent text-gray-600 dark:text-gray-400 border border-gray-500 dark:border-slate-700 rounded-2xl font-medium transition-all hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-slate-600 active:scale-95"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;