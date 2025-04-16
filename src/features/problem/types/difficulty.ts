export type DifficultyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';

export const DIFFICULTY_TIERS: Record<DifficultyTier, { min: number; max: number; icon: string }> = {
  bronze: { min: 1, max: 5, icon: '/icons/bronze.svg' },
  silver: { min: 6, max: 10, icon: '/icons/silver.svg' },
  gold: { min: 11, max: 15, icon: '/icons/gold.svg' },
  platinum: { min: 16, max: 20, icon: '/icons/platinum.svg' },
  diamond: { min: 21, max: 25, icon: '/icons/diamond.svg' },
  master: { min: 26, max: 30, icon: '/icons/master.svg' }
};

export const getDifficultyTier = (difficulty: number): DifficultyTier => {
  if (difficulty <= 5) return 'bronze';
  if (difficulty <= 10) return 'silver';
  if (difficulty <= 15) return 'gold';
  if (difficulty <= 20) return 'platinum';
  if (difficulty <= 25) return 'diamond';
  return 'master';
}; 