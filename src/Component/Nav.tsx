'use client'
import Image from 'next/image';
import React from 'react';
import logo from '@/assetes/logo.png'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/Component/PlanContext';
const Nav = () => {

const pathname = usePathname();
const { todayPlan , savedPlan } = usePlan();

    const links = <>
    
    <li><Link className={pathname === '/Workouts' ? 'bg-[#1A2312] text-[#C2F800] rounded-full font-semibold transition-colors duration-200' : ' '} href="/Workouts">Workouts</Link></li>
        
        <li><Link className={pathname === '/MyPlan' ? 'bg-[#1A2312] text-[#C2F800] rounded-full font-semibold transition-colors duration-200' : ' '} href="/MyPlan">My Plan</Link></li>
    
    </>

    return (
        <div className='sticky top-0 z-50 bg-black shadow-sm border-b border-gray-800 flex justify-between container mx-auto'>

        <div className="navbar  ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className="flex gap-2">
        <Image src={logo} alt={''} />
        <p className='text-2xl font-bold'>FITLOG</p>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
 <div className="navbar-end gap-4">
  <div>
    Plan
    <span className="ml-2 bg-[#C2F800] text-black rounded-full px-2 py-1 font-bold ">
      {todayPlan.length}
    </span>
  </div>

  <div>
    Saved
    <span className="ml-2 bg-[#2D313B] text-white rounded-full px-2 py-1 font-bold ">
      {savedPlan.length}
    </span>
  </div>
</div>
</div>
</div>
    );
};

export default Nav;