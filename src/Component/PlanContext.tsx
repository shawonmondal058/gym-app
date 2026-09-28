
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export interface Exercise {
  id: number;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions: string[];
}

interface PlanType {
  todayPlan: Exercise[];
  savedPlan: Exercise[];
  addToToday: (exercise: Exercise) => void;
  saveForLater: (exercise: Exercise) => void;
  removeFromToday: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Exercise[]>([]);
  const [savedPlan, setSavedPlan] = useState<Exercise[]>([]);
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    const today = localStorage.getItem('todayPlan');
    const saved = localStorage.getItem('savedPlan');

    if (today) {
      setTodayPlan(JSON.parse(today));
    }

    if (saved) {
      setSavedPlan(JSON.parse(saved));
    }

    setLoaded(true);
  }, []);

  
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('todayPlan', JSON.stringify(todayPlan));
      localStorage.setItem('savedPlan', JSON.stringify(savedPlan));
    }
  }, [todayPlan, savedPlan, loaded]);

  
  const addToToday = (exercise: Exercise) => {
    const alreadyAdded = todayPlan.find((item) => item.id === exercise.id);

    if (!alreadyAdded) {
      setTodayPlan([...todayPlan, exercise]);
    }

    setSavedPlan(savedPlan.filter((item) => item.id !== exercise.id));
  };

  
  const saveForLater = (exercise: Exercise) => {
    const alreadySaved = savedPlan.find((item) => item.id === exercise.id);

    if (!alreadySaved) {
      setSavedPlan([...savedPlan, exercise]);
    }

    setTodayPlan(todayPlan.filter((item) => item.id !== exercise.id));
  };

  
  const removeFromToday = (id: number) => {
    setTodayPlan(todayPlan.filter((item) => item.id !== id));
  };

  
  const removeFromSaved = (id: number) => {
    setSavedPlan(savedPlan.filter((item) => item.id !== id));
  };

  
  const markAsDone = (id: number) => {
    setTodayPlan(todayPlan.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        addToToday,
        saveForLater,
        removeFromToday,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error('usePlan must be used inside PlanProvider');
  }

  return context;
}