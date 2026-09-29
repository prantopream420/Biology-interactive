import React from 'react';
import { ArrowLeft, Bookmark, Sparkles, CheckCircle2, Info, Award, HelpCircle } from 'lucide-react';
import { CTTopic } from '../../types';
import { sound } from '../../utils/audio';

// Import our simulations
import { ActionPotentialSimulator } from '../simulations/ActionPotentialSimulator';
import { NeuronStructureExplorer } from '../simulations/NeuronStructureExplorer';
import { SynapseSimulator } from '../simulations/SynapseSimulator';
import { BciPipelineSimulator } from '../simulations/BciPipelineSimulator';
import { AnnVsBnnArena } from '../simulations/AnnVsBnnArena';
import { InnateVsAdaptiveSimulator } from '../simulations/InnateVsAdaptiveSimulator';
import { NkCellSimulator } from '../simulations/NkCellSimulator';
import { MrnaVaccineSimulator } from '../simulations/MrnaVaccineSimulator';
import { VaccineTypesExplorer } from '../simulations/VaccineTypesExplorer';

interface TopicDetailViewProps {
  topic: CTTopic;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onJumpToQuiz: (topicId: string) => void;
}

export const TopicDetailView: React.FC<TopicDetailViewProps> = ({
  topic,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onJumpToQuiz,
}) => {
  const renderSimulation = () => {
    switch (topic.simulationType) {
      case 'neuron_ap':
        return (
          <div className="space-y-4">
            <ActionPotentialSimulator />
            <NeuronStructureExplorer />
          </div>
        );
      case 'synapse':
        return <SynapseSimulator />;
      case 'bci_pipeline':
      case 'bci_applications':
        return <BciPipelineSimulator />;
      case 'ann_vs_bnn':
        return <AnnVsBnnArena />;
      case 'innate_adaptive':
        return <InnateVsAdaptiveSimulator />;
      case 'nk_cells':
        return <NkCellSimulator />;
      case 'mrna_advantages':
      case 'vaccine_mechanism':
        return <MrnaVaccineSimulator />;
      case 'vaccine_types':
        return <VaccineTypesExplorer />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 pb-20 space-y-4 px-4 pt-3 max-w-2xl mx-auto w-full">
      {/* Navigation Top Bar with Pebble Glass Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white py-1.5 px-3 rounded-full glass-pill hover:bg-white/10 transition active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
          Back to Questions
        </button>

        <button
          onClick={(e) => {
            sound.playClick();
            onToggleBookmark(topic.id, e);
          }}
          className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full transition ${
            isBookmarked
              ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300'
              : 'glass-pill text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-cyan-400' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="glass-pebble p-5 border border-white/15 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="font-bold text-cyan-400">QUESTION {topic.questionNumber}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 capitalize">
            {topic.category === 'neuro_bci' ? 'Neuro & BCI' : 'Immunology'}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
          {topic.title}
        </h2>

        <p className="text-xs text-slate-200 leading-relaxed bg-white/[0.04] p-3 rounded-2xl border border-white/10">
          {topic.shortSummary}
        </p>

        {/* Key Terms */}
        <div className="pt-1">
          <span className="text-[10px] font-mono text-cyan-400 block mb-1.5 font-bold">KEY TERMS FOR CT:</span>
          <div className="flex flex-wrap gap-1.5">
            {topic.keyTerms.map((term, i) => (
              <span
                key={i}
                className="text-[11px] font-mono glass-pill text-slate-200 border border-white/10 px-2.5 py-0.5 rounded-full"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE SIMULATION SECTION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Interactive Concept Laboratory
          </span>
          <span className="text-[10px] text-cyan-400 font-mono">Live Simulation</span>
        </div>

        {renderSimulation()}
      </div>

      {/* DETAILED CT EXAM ANSWERS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            Simplified CT Exam Answers
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Point-by-Point</span>
        </div>

        {topic.detailedAnswers.map((sec, idx) => (
          <div
            key={idx}
            className="glass-pebble p-5 border border-white/12 space-y-2.5 shadow-sm"
          >
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              {sec.heading}
            </h4>

            <div className="space-y-2 text-xs text-slate-200 leading-relaxed">
              {sec.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {sec.highlight && (
              <div className="mt-2 p-2.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                <strong>Important Principle: </strong> {sec.highlight}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EXAM TIPS CALLOUT */}
      <div className="p-4 rounded-3xl bg-amber-950/30 border border-amber-500/30 space-y-1.5 text-xs text-amber-200">
        <div className="flex items-center gap-2 font-bold text-amber-300">
          <Info className="w-4 h-4 text-amber-400" />
          <span>CT Exam Scoring Tip</span>
        </div>
        <p className="leading-relaxed text-amber-100/90">{topic.examTips}</p>
      </div>

      {/* Quick Quiz CTA button */}
      <div className="pt-2">
        <button
          onClick={() => {
            sound.playClick();
            onJumpToQuiz(topic.id);
          }}
          className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-[0.99] transition"
        >
          <Award className="w-4 h-4" />
          Practice in 20-Question CT Drill ➔
        </button>
      </div>
    </div>
  );
};
