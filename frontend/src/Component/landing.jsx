import React from 'react';
import { Spotlight } from '../Component/ui/Spotlight';
import { cn } from '../lib/utils';
import { Link } from 'react-router';


const Landing = () => {
    return (
        <div>
            <div className="h-[46rem]  w-full rounded-md pt-32 md:items-center md:justify-centerantialiased bg-grid-white/[0.02] relative overflow-hidden">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="cyan"
                />
                <div className="  max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                   <span className=' text-7xl font-black text-transparent bg-clip-text 
          bg-gradient-to-br from-purple-400 to-cyan-400 
          drop-shadow-[0_0_20px_rgba(0,198,255,1.3)] '>Arise !</span> <br /> the Monarch within you.
                    </h1>
                    <p className="mt-6 md:text-xl text-blue-400/80 max-w-2xl font-normal text-base text-center mx-auto">
                    <span className="text-cyan-400 font-medium">Warning:</span> The Monarch's Shadow 
              has awoken. Reforge your destiny through endless dungeon conquests and 
              claim your place in the hunter hierarchy.
                    </p>

                </div>
                <div className='flex justify-center mt-14'>
                 <Link
                            to={'/signup'}
                            className="flex items-center gap-2 border border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg hover:border-cyan-400/60 transition-all duration-300 hover:shadow-glow-blue 
                                     bg-[#1a1a2f] hover:bg-[rgba(0,163,255,0.1)] 
                                     "
                          >
                            
                            Begin Ascension
                          </Link>
                </div>
               
            </div>
        </div>
    );
}

export default Landing;
