
import PlanActions from '@/Component/PlanActions';
import { Exercise } from '@/Component/PlanContext';
import { notFound } from 'next/navigation';
import cardData from '@/data/card.json';

interface ExerciseDetailsProps {
  params: Promise<{
    details: string;
  }>;
}

const ExerciseDetails = async ({
  params,
}: ExerciseDetailsProps) => {
  const { details } = await params;

  const exercises: Exercise[] = cardData;

  const exercise = exercises.find(
    (item) => String(item.id) === String(details)
  );

  if (!exercise) {
    notFound();
  }

  const stats = [
    {
      label: 'Equipment',
      value: exercise.equipment,
    },
    {
      label: 'Difficulty',
      value: exercise.difficulty,
    },
    {
      label: 'Sets',
      value: exercise.sets,
    },
    {
      label: 'Reps',
      value: exercise.reps,
    },
    {
      label: 'Duration',
      value: `${exercise.duration} min`,
    },
    {
      label: 'Calories',
      value: `${exercise.caloriesBurned} kcal`,
    },
    {
      label: 'Rating',
      value: exercise.rating,
    },
  ];

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#0d0e13]">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            
            <div className="relative bg-black">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="h-full min-h-[350px] w-full object-cover lg:min-h-[650px]"
              />

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Exercise Name on Mobile/Image */}
              <div className="absolute bottom-5 left-5 lg:hidden">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#C2F800]">
                  Exercise
                </p>

                <h1 className="text-2xl font-extrabold uppercase">
                  {exercise.name}
                </h1>
              </div>
            </div>

           
            <div className="p-5 sm:p-7 lg:p-10">

              {/* Heading */}
              <div className="mb-6">

                <p className="mb-2 hidden text-xs font-bold uppercase tracking-[3px] text-[#C2F800] lg:block">
                  Exercise Details
                </p>

                <h1 className="hidden text-3xl font-extrabold uppercase leading-tight lg:block xl:text-4xl">
                  {exercise.name}
                </h1>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {exercise.description}
                </p>
              </div>

              
              <div className="mb-7">

                <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Target Muscles
                </h2>

                <div className="flex flex-wrap gap-2">
                  {exercise.muscleGroups.map(
                    (muscle: string, index: number) => (
                      <span
                        key={`${muscle}-${index}`}
                        className="rounded-full bg-[#C2F800] px-3 py-1.5 text-xs font-bold text-black"
                      >
                        {muscle}
                      </span>
                    )
                  )}
                </div>
              </div>

              
              <div className="mb-8 overflow-hidden rounded-xl border border-gray-800 bg-[#171820]">

                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex items-center justify-between gap-4 px-4 py-4 ${
                      index !== stats.length - 1
                        ? 'border-b border-gray-800'
                        : ''
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      {stat.label}
                    </span>

                    <span className="text-right text-sm font-semibold text-gray-200">
                      {stat.value}
                    </span>
                  </div>
                ))}

              </div>

              
              <div className="mb-8">

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C2F800]">
                    How to perform
                  </p>

                  <h2 className="mt-1 text-xl font-bold uppercase">
                    Instructions
                  </h2>
                </div>

                <ol className="space-y-4">
                  {exercise.instructions.map(
                    (instruction: string, index: number) => (
                      <li
                        key={index}
                        className="flex gap-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#171820] text-xs font-bold text-[#C2F800]"
                        >
                          {index + 1}
                        </span>

                        <p className="pt-1 text-sm leading-6 text-gray-400">
                          {instruction}
                        </p>
                      </li>
                    )
                  )}
                </ol>

              </div>

             
              <div className="border-t border-gray-800 pt-6">
                <PlanActions exercise={exercise} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ExerciseDetails;

