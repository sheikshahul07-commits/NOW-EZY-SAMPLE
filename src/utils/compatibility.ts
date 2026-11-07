import { HabitPreferences } from '../types';

export interface CompatibilityResult {
  score: number;
  badge: 'Exceptional Match' | 'Great Match' | 'Good Fit' | 'Moderate Match';
  badgeColor: string;
  matchedTraits: string[];
  mismatchedTraits: string[];
}

export function calculateCompatibility(
  myHabits: HabitPreferences,
  theirHabits: HabitPreferences
): CompatibilityResult {
  let score = 0;
  const matchedTraits: string[] = [];
  const mismatchedTraits: string[] = [];

  // 1. Sleep Schedule (35 points)
  if (myHabits.sleepSchedule === theirHabits.sleepSchedule) {
    score += 35;
    matchedTraits.push(`Both prefer ${myHabits.sleepSchedule} routine`);
  } else if (
    myHabits.sleepSchedule === 'Flexible' ||
    theirHabits.sleepSchedule === 'Flexible'
  ) {
    score += 25;
    matchedTraits.push('Flexible schedule alignment');
  } else {
    score += 10;
    mismatchedTraits.push('Differing sleep cycles (Early Bird vs Night Owl)');
  }

  // 2. Diet Alignment (30 points)
  if (myHabits.diet === theirHabits.diet) {
    score += 30;
    matchedTraits.push(`Both prefer ${myHabits.diet} diet`);
  } else if (
    (myHabits.diet === 'Non-Vegetarian' && theirHabits.diet === 'Eggetarian') ||
    (myHabits.diet === 'Eggetarian' && theirHabits.diet === 'Non-Vegetarian')
  ) {
    score += 22;
    matchedTraits.push('Dietary preferences compatible');
  } else {
    score += 12;
    mismatchedTraits.push('Dietary preference variation');
  }

  // 3. Work Style (20 points)
  if (myHabits.workStyle === theirHabits.workStyle) {
    score += 20;
    matchedTraits.push(`Identical work routine (${myHabits.workStyle})`);
  } else {
    score += 10;
  }

  // 4. Cleanliness Standard (15 points)
  const cleanDiff = Math.abs(myHabits.cleanliness - theirHabits.cleanliness);
  if (cleanDiff === 0) {
    score += 15;
    matchedTraits.push('Exact cleanliness expectations');
  } else if (cleanDiff === 1) {
    score += 12;
    matchedTraits.push('Close cleanliness tolerance');
  } else {
    mismatchedTraits.push('Cleanliness rating difference');
  }

  const finalScore = Math.min(100, Math.max(45, score));

  let badge: CompatibilityResult['badge'] = 'Moderate Match';
  let badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';

  if (finalScore >= 90) {
    badge = 'Exceptional Match';
    badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  } else if (finalScore >= 75) {
    badge = 'Great Match';
    badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (finalScore >= 60) {
    badge = 'Good Fit';
    badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
  }

  return {
    score: finalScore,
    badge,
    badgeColor,
    matchedTraits,
    mismatchedTraits
  };
}
