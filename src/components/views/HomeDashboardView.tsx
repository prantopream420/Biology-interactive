import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Activity, 
  BookOpen, 
  Award, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Zap, 
  Brain, 
  Shield, 
  FileText,
  RotateCw,
  Search,
  Bookmark
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { CT_TOPICS } from '../../data/ctTopics';
import { CTTopic } from '../../types';

interface HomeDashboardViewProps {
  onNavigateToTab: (tab: 'topics' | 'simulations' | 'precise' | 'quiz' | 'cheatsheet') => void;
  onSelectTopic: (topic: CTTopic) => void;
  savedCount: number;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  onNavigateToTab,
  onSelectTopic,
  savedCount,
}) => {
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const flashcards = [
    {
      q: 'What triggers rapid depolarization in an action potential?',
      a: 'Voltage-gated Na+ channels open at -55mV threshold, allowing rapid Na+ influx into the cell up to +30mV.',
      tag: 'Q 1 & 2'
    },
    {
      q: 'What are the 3 major components of a BCI system in order?',
      a: '1. Measuring device (sensors/EEG) -> 2. Processing system (feature extraction/ML decoder) -> 3. Application device (wheelchair/prosthesis).',
      tag: 'Q 4'
    },
    {
      q: 'How do Natural Killer (NK) cells kill altered self cells?',
      a: 'They release Perforin to punch membrane pores, inject Granzymes to induce apoptosis, and secrete IFN-γ cytokines.',
      tag: 'Q 8'
    },
    {
      q: 'What are the 3 core advantages of mRNA vaccines?',
      a: '1. Safe genetic blueprint (no live pathogen) | 2. Strong dual antibody + T-cell immunity | 3. Rapid modular design from genetic sequence.',
      tag: 'Q 9'
    }
  ];

  const currentFlashcard = flashcards[activeFlashcardIndex];

  const nextFlashcard = () => {
    sound.playClick();
    setIsFlipped(false);
    setActiveFlashcardIndex((i) => (i + 1) % flashcards.length);
  };

  return (
    <div className="flex-1 pb-20 space-y-5 px-4 pt-3 max-w-3xl mx-auto w-full">
      {/* Liquid Glass Hero Greeting Banner */}
      <div className="relative rounded-[32px] overflow-hidden glass-pebble p-6 border border-white/15 shadow-2xl">
        {/* Ambient liquid backdrop lighting */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold px-3 py-1 rounded-full glass-pill border border-cyan-400/30">
              CT Exam Readiness Dashboard
            </span>
            <span className="text-xs font-mono text-slate-400">
              11 Questions Prepared
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Immune & Brain-Computer Interface
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Transparent liquid laboratory with interactive biological animations, automated 20-question randomized drills, and dedicated precise exam answers.
            </p>
          </div>

          {/* Quick Action Pebble Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateToTab('precise');
              }}
              className="py-2.5 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition"
            >
              <FileText className="w-4 h-4" />
              Precise Answers (CT Ready)
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateToTab('quiz');
              }}
              className="py-2.5 px-4 rounded-full glass-pill hover:bg-white/10 active:scale-95 text-slate-200 border border-white/15 text-xs font-semibold flex items-center gap-2 transition"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              Random 20 CT Drill
            </button>
          </div>
        </div>
      </div>

      {/* 4 Feature Pebble Hubs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Hub 1: Precise Answers */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigateToTab('precise');
          }}
          className="glass-pebble p-4 cursor-pointer hover:border-cyan-400/40 transition-all duration-300 active:scale-95 space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              Precise Answers
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Point-by-point model answers for all 11 questions.
            </p>
          </div>
        </div>

        {/* Hub 2: Interactive Labs */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigateToTab('simulations');
          }}
          className="glass-pebble p-4 cursor-pointer hover:border-purple-400/40 transition-all duration-300 active:scale-95 space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
              Interactive Labs
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              9 real-time biological process simulators.
            </p>
          </div>
        </div>

        {/* Hub 3: 20-Question CT Drill */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigateToTab('quiz');
          }}
          className="glass-pebble p-4 cursor-pointer hover:border-emerald-400/40 transition-all duration-300 active:scale-95 space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
              Random 20 Drill
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Auto-regenerates every 30m or on app reload.
            </p>
          </div>
        </div>

        {/* Hub 4: Quick Cheat Sheet */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigateToTab('cheatsheet');
          }}
          className="glass-pebble p-4 cursor-pointer hover:border-amber-400/40 transition-all duration-300 active:scale-95 space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
              Quick Cheat Sheet
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Key numbers & formulas for 5-min revision.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive High-Yield Flashcard Widget */}
      <div className="glass-pebble p-5 border border-white/10 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            HIGH-YIELD CT FLASHCARD ({currentFlashcard.tag})
          </span>
          <button
            onClick={nextFlashcard}
            className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Next Card
          </button>
        </div>

        {/* Flashcard Body (Flip on tap) */}
        <div
          onClick={() => {
            sound.playClick();
            setIsFlipped((v) => !v);
          }}
          className="min-h-[110px] p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 cursor-pointer flex flex-col justify-center transition-all duration-300 text-center"
        >
          {!isFlipped ? (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Tap to Reveal Answer
              </span>
              <p className="text-sm font-semibold text-slate-100 leading-snug">
                {currentFlashcard.q}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 animate-fadeIn">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                Answer Key
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {currentFlashcard.a}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Syllabus Domains Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Syllabus Core Modules
          </h3>
          <span className="text-[11px] font-mono text-cyan-400">
            {savedCount > 0 ? `${savedCount} bookmarked` : 'All topics accessible'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Module A: Neuro & BCI */}
          <div
            onClick={() => {
              sound.playClick();
              onNavigateToTab('topics');
            }}
            className="glass-pebble p-4 cursor-pointer hover:border-cyan-400/40 transition space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  Brain & Neural Interface
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Q1 to Q6
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Motor neurons, voltage clamp action potential dynamics, synaptic transmission, BCI 3-stage architecture, real-world actuators, and ANN vs BNN.
            </p>
            <div className="flex items-center justify-between text-xs text-cyan-400/90 font-medium pt-1">
              <span>6 Questions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module B: Immunology & Vaccines */}
          <div
            onClick={() => {
              sound.playClick();
              onNavigateToTab('topics');
            }}
            className="glass-pebble p-4 cursor-pointer hover:border-emerald-400/40 transition space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                  Immunology & Vaccines
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Q7 to Q11
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Innate vs Adaptive immunity, Natural Killer perforin/granzyme cytotoxic attack, mRNA genetic blueprint advantages, and 7 vaccine modalities.
            </p>
            <div className="flex items-center justify-between text-xs text-emerald-400/90 font-medium pt-1">
              <span>5 Questions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
