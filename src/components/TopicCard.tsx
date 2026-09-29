import React from 'react';
import { Bookmark, ChevronRight, Activity, Zap } from 'lucide-react';
import { CTTopic } from '../types';
import { sound } from '../utils/audio';

interface TopicCardProps {
  topic: CTTopic;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (topic: CTTopic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isBookmarked,
  onToggleBookmark,
  onSelect,
}) => {
  return (
    <div
      onClick={() => {
        sound.playClick();
        onSelect(topic);
      }}
      className="glass-pebble p-4 sm:p-5 hover:border-cyan-400/40 active:scale-[0.99] transition-all duration-300 cursor-pointer space-y-3 group shadow-md"
    >
      {/* Top row: Question index and bookmark button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="font-bold text-cyan-400">QUESTION {topic.questionNumber}</span>
          <span className="text-slate-500" aria-hidden="true">·</span>
          <span className="text-slate-400 capitalize">
            {topic.category === 'neuro_bci' ? 'Neuro & BCI' : 'Immunology'}
          </span>
        </div>

        <button
          onClick={(e) => {
            sound.playClick();
            onToggleBookmark(topic.id, e);
          }}
          className={`p-1.5 rounded-full transition ${
            isBookmarked
              ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-400/30'
              : 'text-slate-400 hover:text-white glass-pill hover:bg-white/10'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Main Title & Short Summary */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
          {topic.title}
        </h3>
        <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
          {topic.shortSummary}
        </p>
      </div>

      {/* Footer metadata */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <span className="flex items-center gap-1.5 text-cyan-300 font-medium text-[11px]">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          Interactive Lab Ready
        </span>

        <span className="flex items-center gap-1 text-slate-300 group-hover:text-white text-xs font-medium transition-colors">
          Open Prep
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
