import React from 'react';
import { MoveClassification } from '@/types/chess';
import { Badge } from '@/components/ui/badge';

interface MoveClassificationBadgeProps {
  type: MoveClassification;
  showText?: boolean;
}

export const CLASSIFICATION_CONFIG: Record<
  MoveClassification,
  { label: string; icon: string; bg: string; text: string; border: string }
> = {
  brilliant: { label: 'Brilliant', icon: '‼️', bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/40' },
  great: { label: 'Great Move', icon: '💎', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/40' },
  best: { label: 'Best Move', icon: '⭐️', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/40' },
  excellent: { label: 'Excellent', icon: '👍', bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/40' },
  good: { label: 'Good', icon: '✔️', bg: 'bg-teal-500/10', text: 'text-teal-300', border: 'border-teal-500/30' },
  book: { label: 'Book Move', icon: '📖', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/40' },
  inaccuracy: { label: 'Inaccuracy', icon: '⚠️', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/40' },
  mistake: { label: 'Mistake', icon: '❓', bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/40' },
  blunder: { label: 'Blunder', icon: '❌', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/40' },
};

export const MoveClassificationBadge: React.FC<MoveClassificationBadgeProps> = ({
  type,
  showText = true,
}) => {
  const config = CLASSIFICATION_CONFIG[type];

  return (
    <Badge
      variant="outline"
      className={`px-2 py-0.5 text-xs font-semibold rounded-md border flex items-center gap-1 ${config.bg} ${config.text} ${config.border}`}
    >
      <span>{config.icon}</span>
      {showText && <span>{config.label}</span>}
    </Badge>
  );
};