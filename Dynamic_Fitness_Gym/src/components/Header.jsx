import logo from "../assets/logogym-removebg-preview.png"
import TrueFocus from "./TrueFocus";
export const Header = () => {
    return (
        <header className="text-white p-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
               
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="Brand Logo"
                        className="h-12 w-12 md:h-16 md:w-16 object-contain"
                    />
                    <div className="flex flex-col text-left">
                        <h1 className="text-3xl md:text-5xl font-bold text-red-400 tracking-tight">
                            Dynamic Fitness
                        </h1>
                        <span className="text-sm md:text-base text-gray-300 tracking-widest uppercase">
                            Unisex Gym
                        </span>
                    </div>
                </div>

            
                <div className="mt-4 md:mt-0 text-center md:text-right">
                    <span className="text-l md:text-xl font-semibold">
                        <TrueFocus
                            sentence="Sweat, Smile, Repeat"
                            manualMode={false}
                            blurAmount={5}
                            borderColor="purple"
                            animationDuration={0.5}
                            pauseBetweenAnimations={1}
                        />
                    </span>
                </div>
            </div>
        </header>
    );
};