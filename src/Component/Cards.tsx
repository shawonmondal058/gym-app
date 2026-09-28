import React from "react";
import { PiFireSimpleFill } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { Exercise } from "./PlanContext";
import cardData from '@/data/card.json';
const getInfo = async (): Promise<Exercise[]> => {
  return cardData;
};


const Cards = () => {
  const infoData = cardData;

  return (
    <>
      <div className="container mx-auto py-9">
        <h1 className="font-extrabold text-2xl">THE LIBRARY</h1>
        <p className="text-gray-700 text-sm">Twelve lifts covering every major muscle group.</p>
      </div>
      <div className="container mx-auto ">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {infoData.map((card) => (
            <Link
              key={card.id}
              href={`/Workouts/${card.id}`}
              className="bg-[#15161d] border border-gray-800 rounded-lg overflow-hidden block hover:border-[#C2F800] transition-colors duration-200"
            >

              <img
                src={card.image}
                alt={card.name}
                className="w-full h-125 "
              />


              <div className="p-4">


                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-[#C2F800] text-black text-[9px] font-bold px-2 py-1 rounded">
                    {card.difficulty.toUpperCase()}
                  </span>

                  {card.muscleGroups.map((muscle, index) => (
                    <span
                      key={index}
                      className="bg-[#C2F800] text-black text-[9px] font-bold px-2 py-1 rounded"
                    >
                      {muscle.toUpperCase()}
                    </span>
                  ))}
                </div>


                <h2 className="text-white text-lg font-bold uppercase">
                  {card.name}
                </h2>


                <p className="text-gray-500 text-xs mt-1">
                  {card.equipment}
                </p>

                <div className="flex justify-between items-center mt-4 text-gray-400 text-xs">
                  <span>⏱ {card.duration} min</span>

                  <span className="flex items-center gap-1 "><PiFireSimpleFill /> {card.caloriesBurned} kcal</span>

                  <span className="flex  gap-1"><FaRegStar />{card.rating}</span>
                </div>


                <div className="border-t border-gray-800 mt-3 pt-3">
                  <div className="flex justify-between text-gray-400 text-xs">
                    <span>Sets: {card.sets}</span>

                    <span>Reps: {card.reps}</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;