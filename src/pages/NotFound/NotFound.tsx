import { useNavigate } from 'react-router'
import Lottie from 'lottie-react'
import animationData from '@/assets/lottie/Robot404.json'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 flex items-center justify-center font-sans selection:bg-gray-200 dark:selection:bg-gray-700">
            <div className="max-w-[50dvw] w-full text-center space-y-10 p-12 rounded-[2.5rem] bg-white dark:bg-card">

                <div className="relative m-0 w-full h-72 flex items-center justify-center rounded-3xl overflow-hidden">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        className='w-full h-full'
                    />
                </div>

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
                        className="group relative px-10 py-4 bg-gray-900 text-white rounded-2xl font-medium overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10">Back to Earth</span>
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-10 py-4 bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 rounded-2xl font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-slate-600 active:scale-95"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;