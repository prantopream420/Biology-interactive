import React, { useState } from 'react';
import { Shield, ShieldAlert, Sparkles, RefreshCw, Zap, Award, Info } from 'lucide-react';
import { sound } from '../../utils/audio';

export const InnateVsAdaptiveSimulator: React.FC = () => {
  const [phase, setPhase] = useState<'healthy' | 'breach' | 'innate_response' | 'dendritic_travel' | 'adaptive_expansion' | 'cleared' | 'reinfection_secondary'>('healthy');
  const [pathogenCount, setPathogenCount] = useState<number>(0);
  const [antibodyCount, setAntibodyCount] = useState<number>(0);
  const [memoryCellsCreated, setMemoryCellsCreated] = useState<boolean>(false);
  const [timelineHour, setTimelineHour] = useState<number>(0);

  const startInfection = () => {
    sound.playSpike();
    setPhase('breach');
    setPathogenCount(40);
    setAntibodyCount(0);
    setTimelineHour(1);

    // 1. Innate swarm (Hours 2 - 12)
    setTimeout(() => {
      setPhase('innate_response');
      setTimelineHour(6);
      setPathogenCount(25); // Innate phagocytes eat some
      sound.playClick();
    }, 1000);

    // 2. Dendritic travel (Day 1 - 2)
    setTimeout(() => {
      setPhase('dendritic_travel');
      setTimelineHour(24);
      setPathogenCount(35); // Pathogens multiplying while adaptive prepares
      sound.playClick();
    }, 2200);

    // 3. Adaptive clonal expansion (Day 4 - 7)
    setTimeout(() => {
      setPhase('adaptive_expansion');
      setTimelineHour(96);
      setAntibodyCount(120);
      setPathogenCount(10);
      sound.playClick();
    }, 3600);

    // 4. Infection Cleared & Memory Formed
    setTimeout(() => {
      setPhase('cleared');
      setTimelineHour(168); // 1 week
      setPathogenCount(0);
      setMemoryCellsCreated(true);
      sound.playSuccess();
    }, 5000);
  };

  const testReinfection = () => {
    sound.playSpike();
    setPhase('reinfection_secondary');
    setPathogenCount(50);
    setTimelineHour(2); // secondary is lightning fast!

    setTimeout(() => {
      // Memory cells recognize immediately
      setAntibodyCount(300); // massive antibody surge
      setPathogenCount(0);
      sound.playSuccess();
    }, 1200);
  };

  const resetAll = () => {
    sound.playClick();
    setPhase('healthy');
    setPathogenCount(0);
    setAntibodyCount(0);
    setTimelineHour(0);
    setMemoryCellsCreated(false);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Innate vs Adaptive Defense Simulator
          </h4>
          <p className="text-xs text-slate-400">Rapid non-specific first line vs targeted memory-forming response</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Timeline</span>
          <p className="text-sm font-bold font-mono text-emerald-400">
            {timelineHour === 0 ? 'Healthy' : timelineHour < 24 ? `${timelineHour} Hours` : `Day ${Math.round(timelineHour / 24)}`}
          </p>
        </div>
      </div>

      {/* Live Cellular Battlefield Graphic */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 relative overflow-hidden min-h-[190px] flex flex-col justify-between">
        {/* Top Indicators */}
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-red-400">Pathogen Load: {pathogenCount} microbes</span>
          <span className="text-cyan-400">Neutralizing Antibodies: {antibodyCount}</span>
        </div>

        {/* Dynamic Visual Stage */}
        <div className="my-auto py-3">
          {phase === 'healthy' && (
            <div className="text-center space-y-1.5">
              <span className="text-3xl">🛡️</span>
              <p className="text-xs font-medium text-slate-300">Intact Epithelial Barrier (Skin & Mucus)</p>
              <p className="text-[11px] text-slate-500">Innate defenses in resting surveillance mode</p>
            </div>
          )}

          {phase === 'breach' && (
            <div className="text-center space-y-1 animate-pulse">
              <span className="text-3xl">🦠💥</span>
              <p className="text-xs font-bold text-red-400">Pathogen Breach!</p>
              <p className="text-[11px] text-slate-400">Microbes penetrate skin barrier; inflammatory alarms trigger.</p>
            </div>
          )}

          {phase === 'innate_response' && (
            <div className="space-y-2">
              <div className="flex justify-center items-center gap-4 text-2xl">
                <span className="animate-bounce">🧫</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">➔ Macrophage Engulfment ➔</span>
                <span className="animate-pulse">🦠</span>
              </div>
              <p className="text-center text-xs text-emerald-300 font-medium">
                Innate Phase (Hours 0-12): Macrophages & Neutrophils arrive to phagocytose pathogens non-specifically.
              </p>
            </div>
          )}

          {phase === 'dendritic_travel' && (
            <div className="text-center space-y-2">
              <span className="text-3xl">🔬 ➔ 🏛️</span>
              <p className="text-xs font-bold text-amber-300">
                Antigen Presentation: Dendritic cell migrates to Lymph Node
              </p>
              <p className="text-[11px] text-slate-400">
                Informing Helper T-cells with specific microbial peptides (Bridge to Adaptive).
              </p>
            </div>
          )}

          {phase === 'adaptive_expansion' && (
            <div className="text-center space-y-2">
              <div className="flex justify-center gap-2 text-2xl">
                <span>🧬</span>
                <span className="text-cyan-400 font-bold">YYYY</span>
                <span>🦠</span>
              </div>
              <p className="text-xs font-bold text-cyan-300">
                Adaptive Clonal Surge: B-cells differentiate into Plasma Cells!
              </p>
              <p className="text-[11px] text-slate-400">
                High-affinity antibodies bind antigen epitopes with surgical precision.
              </p>
            </div>
          )}

          {phase === 'cleared' && (
            <div className="text-center space-y-1.5">
              <span className="text-3xl">✅</span>
              <p className="text-xs font-bold text-emerald-400">Infection Successfully Neutralized!</p>
              <p className="text-[11px] text-emerald-200">
                Lifelong Memory B & T cells generated and positioned in lymph reservoirs.
              </p>
            </div>
          )}

          {phase === 'reinfection_secondary' && (
            <div className="text-center space-y-1.5 animate-pulse">
              <span className="text-3xl">⚡🛡️</span>
              <p className="text-xs font-bold text-cyan-400">Secondary Response Triggered!</p>
              <p className="text-[11px] text-cyan-200">
                Memory cells recognized pathogen instantly. Massive antibody flood eliminated virus in 2 hours! Zero disease symptoms.
              </p>
            </div>
          )}
        </div>

        {/* Phase progress tracker */}
        <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center pt-2 border-t border-slate-800">
          <div className={`p-1 rounded ${phase === 'breach' || phase === 'innate_response' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'text-slate-500'}`}>
            1. Innate (Hours)
          </div>
          <div className={`p-1 rounded ${phase === 'dendritic_travel' ? 'bg-amber-950 text-amber-400 border border-amber-700' : 'text-slate-500'}`}>
            2. Presentation
          </div>
          <div className={`p-1 rounded ${phase === 'adaptive_expansion' ? 'bg-cyan-950 text-cyan-400 border border-cyan-700' : 'text-slate-500'}`}>
            3. Adaptive (Days)
          </div>
          <div className={`p-1 rounded ${memoryCellsCreated ? 'bg-purple-950 text-purple-300 border border-purple-700' : 'text-slate-500'}`}>
            4. Memory Formed
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          onClick={startInfection}
          disabled={phase !== 'healthy' && phase !== 'cleared'}
          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-xs transition"
        >
          Simulate Pathogen Breach
        </button>

        <button
          onClick={testReinfection}
          disabled={!memoryCellsCreated}
          className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold text-xs transition"
        >
          Test Secondary Encounter
        </button>

        <button
          onClick={resetAll}
          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
        >
          Reset Simulation
        </button>
      </div>

      {/* Comparison table */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
        <div className="flex justify-between font-semibold text-slate-300 pb-1 border-b border-slate-800">
          <span>Innate Immunity</span>
          <span className="text-cyan-400">Adaptive Immunity</span>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>• Response: Minutes to hours</span>
          <span className="text-cyan-300">• Response: Days to weeks</span>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>• Non-specific pattern recognition</span>
          <span className="text-cyan-300">• Exquisitely antigen-specific</span>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>• No immunological memory</span>
          <span className="text-cyan-300">• Generates lifelong memory cells</span>
        </div>
      </div>
    </div>
  );
};
