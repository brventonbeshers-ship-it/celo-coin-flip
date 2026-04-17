"use client";
export default function StreakDisplay({ streak }: { streak: number }) {
  if (streak < 2) return null;
  return <div className="text-center text-accent font-bold text-lg animate-bounce">{streak}x Win Streak!</div>;
}
