import Image from 'next/image';
import React from 'react';
import img from '@/assetes/banner.png'

const Banner = () => {
    return (
        <div className='flex items-center justify-between container mx-auto p-8 bg-[#15171D] rounded-lg '>

        <div>
          <p className='text-xs text-[#C2F800]'>WORKOUT LIBRARY</p>
          
          <h1 className='text-5xl font-extrabold my-6'>TRAIN WITH INTENT.LOG <br />
            EVERY SET.</h1>  
            

          <p className='text-xs text-gray-500 my-4'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br></br>
          into today's plan, and watch the week's work add up.</p>
                
        <button className="btn bg-[#C2F800] text-black">
                BROWSE WORKOUTS
        </button>   
                
        </div>
        <div>
            <Image src={img}  alt={''} />
        </div>
        </div>
    );
};

export default Banner;