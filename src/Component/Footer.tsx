import React from 'react';
import logo from "@/assetes/logo.png"
import Image from 'next/image';
const Footer = () => {
    return (
        
        <div className=' bg-[#090A0D] mt-4 border-t border-gray-800 mt-3 pt-3'>

        <div className='flex items-center justify-between container mx-auto p-6'>
            <div className="flex gap-2">
                <Image src={logo} alt={''} />
                <p className='text-2xl font-bold'>FITLOG</p>
            </div>

                <p className='text-xs text-gray-500'>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>
        
        </div>
    );
};

export default Footer;