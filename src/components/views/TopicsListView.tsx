import React, { useState } from 'react';
import { BookOpen, Sparkles, Filter, Bookmark, Activity, CheckCircle2 } from 'lucide-react';
import { CTTopic } from '../../types';
import { TopicCard } from '../TopicCard';
import { sound } from '../../utils/audio';

interface TopicsListViewProps {
  topics: CTTopic[];
  searchQuery: string;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectTopic: (topic: CTTopic) => void;
  onOpenSimulations: () => void;
}

export const TopicsListView: React.FC<TopicsListViewProps> = ({
  topics,
  searchQuery,
  bookmarkedIds,
  onToggleBookmark,
  onSelectTopic,
  onOpenSimulations,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'neuro_bci' | 'immunology' | 'bookmarked'>('all');

  const filteredTopics = topics.filter((topic) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = topic.title.toLowerCase().includes(q);
      const matchesSummary = topic.shortSummary.toLowerCase().includes(q);
      const matchesTerms = topic.keyTerms.some((t) => t.toLowerCase().includes(q));
      const matchesQNum = topic.questionNumber.toLowerCase().includes(q);
      if (!matchesTitle && !matchesSummary && !matchesTerms && !matchesQNum) {
        return false;
      }
    }

    if (selectedFilter === 'neuro_bci') return topic.category === 'neuro_bci';
    if (selectedFilter === 'immunology') return topic.category === 'immunology';
    if (selectedFilter === 'bookmarked') return bookmarkedIds.has(topic.id);
    return true;
  });

  return (
    <div className="flex-1 pb-20 space-y-4 px-4 pt-3 max-w-2xl mx-auto w-full">
      {/* Editorial Liquid Glass Banner */}
      <div className="relative rounded-[32px] overflow-hidden glass-pebble border border-white/15 shadow-xl">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src="/src/assets/images/bci_neural_interface_hero_1790658339030.jpg"
            alt="Brain-Computer Interface & Neural Bio-Engineering"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="p-4 -mt-10 relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <span>Syllabus Questions</span>
            <span>·</span>
            <span>11 Topics with Labs</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
            Questions & Answers Hub
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Detailed answers, key terms, and embedded interactive simulators for every syllabus question.
          </p>
        </div>
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex items-center gap-1.5 p-1 glass-pill border border-white/10 text-xs overflow-x-auto">
        <button
          onClick={() => {
            sound.playClick();
            setSelectedFilter('all');
          }}
          className={`py-1.5 px-3 rounded-full font-medium transition whitespace-nowrap ${
            selectedFilter === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All (11)
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedFilter('neuro_bci');
          }}
          className={`py-1.5 px-3 rounded-full font-medium transition whitespace-nowrap ${
            selectedFilter === 'neuro_bci'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Neuro & BCI (Q1-6)
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedFilter('immunology');
          }}
          className={`py-1.5 px-3 rounded-full font-medium transition whitespace-nowrap ${
            selectedFilter === 'immunology'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Immunology (Q7-11)
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedFilter('bookmarked');
          }}
          className={`py-1.5 px-3 rounded-full font-medium transition whitespace-nowrap flex items-center gap-1 ${
            selectedFilter === 'bookmarked'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-3 h-3" />
          <span>Saved ({bookmarkedIds.size})</span>
        </button>
      </div>

      {/* List of Topic Cards */}
      <div className="space-y-3">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 glass-pebble p-6 space-y-2 border border-white/10">
            <span className="text-2xl">🔍</span>
            <h4 className="text-sm font-semibold text-slate-200">No matching questions found</h4>
            <p className="text-xs text-slate-400">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        ) : (
          filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isBookmarked={bookmarkedIds.has(topic.id)}
              onToggleBookmark={onToggleBookmark}
              onSelect={onSelectTopic}
            />
          ))
        )}
      </div>
    </div>
  );
};
