
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/Component/PlanContext';
import { toast } from "react-toastify";
const MyPlanpage = () => {

    const {
        todayPlan,
        savedPlan,
        removeFromToday,
        removeFromSaved,
        markAsDone,
    } = usePlan();

    const [activeTab, setActiveTab] = useState('today');
    const [sortBy, setSortBy] = useState('duration');

    const exercises = activeTab === 'today' ? todayPlan : savedPlan;


    const totalExercises = exercises.length;


    const totalMinutes = exercises.reduce(
        (total, item) => total + Number(item.duration),
        0
    );


    const totalCalories = exercises.reduce(
        (total, item) => total + Number(item.caloriesBurned),
        0
    );


    const sortedExercises = [...exercises].sort((a, b) => {
        return Number(b[sortBy]) - Number(a[sortBy]);
    });


   const handleRemove = (id) => {
    const exercise = exercises.find((item) => item.id === id);

    if (activeTab === 'today') {
        removeFromToday(id);
        toast.success(`${exercise?.name} removed from Today's Plan`);
    } else {
        removeFromSaved(id);
        toast.success(`${exercise?.name} removed from Saved`);
    }
};


    return (
        <div className="container mx-auto px-4 py-8">


            <h1 className="text-3xl font-extrabold uppercase">MY PLAN</h1>

            <p className="text-gray-500 text-sm mt-2 mb-7">
                Keep track of your workout plan. Finish them, then load more.
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-3 bg-[#15161d] border border-gray-800 rounded-xl mb-6">

                <div className="p-5 border-b sm:border-b-0 sm:border-r border-gray-800">
                    <p className="text-gray-500 text-xs">Exercises</p>
                    <h2 className="text-[#C2F800] text-2xl font-extrabold mt-1">
                        {totalExercises}
                    </h2>
                </div>

                <div className="p-5 border-b sm:border-b-0 sm:border-r border-gray-800">
                    <p className="text-gray-500 text-xs">Minutes</p>
                    <h2 className="text-white text-2xl font-extrabold mt-1">
                        {totalMinutes}
                    </h2>
                </div>

                <div className="p-5">
                    <p className="text-gray-500 text-xs">Calories</p>
                    <h2 className="text-white text-2xl font-extrabold mt-1">
                        {totalCalories}
                    </h2>
                </div>

            </div>


            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

                <div className="flex gap-2 bg-[#15161d] border border-gray-800 rounded-lg p-1 w-fit">

                    <button
                        onClick={() => setActiveTab('today')}
                        className={`px-4 py-2 rounded-md text-xs font-semibold ${activeTab === 'today'
                            ? 'bg-[#2B303D] text-white'
                            : 'text-gray-400'
                            }`}
                    >
                        Today's Plan ({todayPlan.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`px-4 py-2 rounded-md text-xs font-semibold ${activeTab === 'saved'
                            ? 'bg-[#2B303D] text-white'
                            : 'text-gray-400'
                            }`}
                    >
                        Saved ({savedPlan.length})
                    </button>

                </div>

                {/* Sort By */}
                <div className="flex items-center gap-3">
                    <label htmlFor="sort" className="text-gray-500 text-xs">
                        Sort By
                    </label>

                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#15161d] border border-gray-800 text-white text-xs rounded-lg px-4 py-3 outline-none"
                    >
                        <option value="duration">Duration</option>
                        <option value="caloriesBurned">Calories</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

            </div>

            {/* Exercise List */}
            {sortedExercises.length === 0 ? (

                <div className="min-h-[300px] border border-gray-800 rounded-xl flex flex-col items-center justify-center text-center p-6 bg-[#0d0e13]">

                    <h2 className="text-white font-bold text-lg uppercase">
                        Nothing here yet
                    </h2>

                    <p className="text-gray-500 text-xs mt-2">
                        Browse the library and add exercises to your plan.
                    </p>

                    <Link
                        href="/Workouts"
                        className="mt-5 bg-[#C2F800] text-black text-xs font-bold px-5 py-3 rounded-full"
                    >
                        Go to workouts
                    </Link>

                </div>

            ) : (

                <div className="space-y-4">

                    {sortedExercises.map((exercise) => (

                        <div
                            key={exercise.id}
                            className="bg-[#15161d] border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                        >

                            <img
                                src={exercise.image}
                                alt={exercise.name}
                                className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded-lg"
                            />

                            <div className="flex-1">

                                <h2 className="text-white text-sm font-extrabold uppercase">
                                    {exercise.name}
                                </h2>

                                <p className="text-gray-500 text-xs mt-1">
                                    {exercise.equipment}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-3 text-gray-400 text-xs">
                                    <span>◷ {exercise.duration} min</span>
                                    <span>🔥 {exercise.caloriesBurned} kcal</span>
                                    <span>★ {exercise.rating}</span>
                                </div>

                            </div>

                            <div className="flex flex-wrap items-center gap-2">

                                <Link
                                    href={`/Workouts/${exercise.id}`}
                                    className="border border-gray-700 text-gray-300 text-xs px-4 py-3 rounded-lg"
                                >
                                    View Details
                                </Link>

                                {activeTab === 'today' && (
                                    <button
                                        onClick={() => {
                                            markAsDone(exercise.id);

                                            toast.success(`${exercise.name} completed!`);
                                        }}
                                        className="bg-[#C2F800] text-black text-xs font-bold px-4 py-3 rounded-lg"
                                    >
                                        ✓ Mark as Done
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRemove(exercise.id)}
                                    className="text-gray-500 hover:text-red-500 text-xl px-2"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default MyPlanpage;