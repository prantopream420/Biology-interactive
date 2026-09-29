import React, { useState } from 'react';
import { Dna, ShieldAlert, Sparkles, CheckCircle2, TrendingUp, RefreshCw, Info } from 'lucide-react';
import { sound } from '../../utils/audio';

export const MrnaVaccineSimulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [showSecondaryGraph, setShowSecondaryGraph] = useState<boolean>(false);

  const nextStep = () => {
    sound.playClick();
    setStep((s) => (s < 5 ? s + 1 : 1));
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Dna className="w-4 h-4 text-cyan-400" />
            mRNA Vaccine Delivery & Memory Induction
          </h4>
          <p className="text-xs text-slate-400">Lipid nanoparticle delivery ➔ Cytoplasmic translation ➔ Memory shield</p>
        </div>
        <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
          mRNA Platform
        </span>
      </div>

      {/* 5-Step Process Stepper */}
      <div className="grid grid-cols-5 gap-1.5 text-center">
        {[
          { num: 1, label: 'LNP Delivery' },
          { num: 2, label: 'mRNA Release' },
          { num: 3, label: 'Ribosome' },
          { num: 4, label: 'MHC Display' },
          { num: 5, label: 'Memory Cells' },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => {
              sound.playClick();
              setStep(s.num);
            }}
            className={`py-1.5 px-1 rounded-lg border text-xs transition ${
              step === s.num
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block font-mono text-[10px] text-cyan-400">0{s.num}</span>
            <span className="text-[10px] truncate block">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Cellular Visualizer */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden min-h-[200px] flex flex-col justify-between select-none">
        <div className="text-center py-4 space-y-3">
          {step === 1 && (
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400 bg-cyan-950/40 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-cyan-500/20">
                🧬🫧
              </div>
              <h5 className="text-sm font-semibold text-cyan-300">Step 1: Lipid Nanoparticle (LNP) Encapsulation</h5>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Fragile mRNA strands are wrapped in protective lipid nanoparticles that shield them from enzymes and fuse with the human cell membrane via endocytosis.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-full border-2 border-cyan-500 bg-slate-900 flex items-center justify-center mx-auto text-2xl">
                ~🧬~
              </div>
              <h5 className="text-sm font-semibold text-cyan-300">Step 2: Cytoplasmic Release (NO Nuclear Entry!)</h5>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                The mRNA enters strictly into the host <strong>cytoplasm</strong>. It never enters the nucleus and cannot integrate into human DNA. It degrades naturally within hours.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3 text-3xl">
                <span>🏭</span>
                <span className="text-xs font-mono text-cyan-300 font-bold">➔ Translation ➔</span>
                <span>👑</span>
              </div>
              <h5 className="text-sm font-semibold text-cyan-300">Step 3: Host Ribosome Translates Spike Antigen</h5>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                The cell's own ribosomes read the mRNA codon sequence and manufacture harmless viral spike proteins. No actual pathogen is ever produced.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-2xl">
                <span className="p-2 rounded-lg bg-emerald-950 border border-emerald-500 text-xs text-emerald-300 font-mono">
                  MHC-I Complex
                </span>
                <span>➔</span>
                <span>🛡️ T-Cell & B-Cell Activation</span>
              </div>
              <h5 className="text-sm font-semibold text-emerald-300">Step 4: Antigen Presentation & Dual Activation</h5>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Spike proteins are presented on the cell surface. Helper T cells, Cytotoxic CD8+ T cells, and B cells are rigorously trained to recognize this precise antigen shape.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3 text-3xl">
                <span>🛡️</span>
                <span>🧠</span>
                <span className="text-cyan-400 font-bold">YYYY</span>
              </div>
              <h5 className="text-sm font-semibold text-emerald-300">Step 5: Enduring Memory Cell Formation</h5>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Plasma cells churn out neutralizing antibodies while long-lived <strong>Memory B & T cells</strong> patrol the bloodstream, providing instantaneous defense against future infection!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400">Step {step} of 5</span>
          <button
            onClick={nextStep}
            className="py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition"
          >
            {step === 5 ? 'Restart Pathway' : 'Next Step ➔'}
          </button>
        </div>
      </div>

      {/* Primary vs Secondary Immune Response Curve (Question 10 Highlight) */}
      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Vaccine Protection: Primary vs Secondary Response Curve
          </h5>
          <button
            onClick={() => {
              sound.playClick();
              setShowSecondaryGraph((v) => !v);
            }}
            className="text-[11px] font-mono text-cyan-400 underline hover:text-cyan-300"
          >
            {showSecondaryGraph ? 'Reset View' : 'Simulate Secondary Encounter'}
          </button>
        </div>

        {/* SVG Response Curve */}
        <div className="relative bg-slate-900/80 rounded-lg p-2 border border-slate-800">
          <svg viewBox="0 0 360 140" className="w-full h-auto">
            {/* Grid & Axes */}
            <line x1="30" y1="120" x2="350" y2="120" stroke="#334155" strokeWidth="1" />
            <line x1="30" y1="10" x2="30" y2="120" stroke="#334155" strokeWidth="1" />
            <text x="25" y="15" fill="#64748b" fontSize="8" textAnchor="end">Antibody Titre</text>
            <text x="340" y="132" fill="#64748b" fontSize="8">Time (Weeks)</text>

            {/* Dose 1 (Vaccine) marker at week 1 */}
            <line x1="50" y1="20" x2="50" y2="120" stroke="#06b6d4" strokeDasharray="2 2" />
            <text x="52" y="30" fill="#06b6d4" fontSize="8">1st Dose</text>

            {/* Primary curve: Slow, modest peak at week 2-3 */}
            <path
              d="M 50,120 Q 80,118 100,80 Q 120,60 140,75 Q 160,90 190,105"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <text x="100" y="55" fill="#38bdf8" fontSize="8">Primary Response (Lag period, IgM/IgG)</text>

            {/* Pathogen Exposure marker at week 4 */}
            <line x1="190" y1="20" x2="190" y2="120" stroke="#f43f5e" strokeDasharray="2 2" />
            <text x="194" y="30" fill="#f43f5e" fontSize="8">Pathogen Encounter</text>

            {/* Secondary curve: Instant surge, huge peak */}
            {showSecondaryGraph && (
              <path
                d="M 190,105 Q 205,40 220,18 Q 250,18 290,30 Q 330,45 350,55"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                className="animate-pulse"
              />
            )}
            {showSecondaryGraph && (
              <text x="230" y="15" fill="#10b981" fontSize="9" fontWeight="bold">
                Secondary Memory Surge (High Affinity IgG)
              </text>
            )}
          </svg>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          <strong>Why vaccination protects:</strong> In an unvaccinated person, the immune system takes 7-14 days to mount a defense, allowing the virus to replicate and cause illness. With vaccine memory cells, the secondary response erupts in hours, eliminating the virus immediately!
        </p>
      </div>

      {/* 3 Core Advantages Pill List (Question 9 Answers) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="font-semibold text-cyan-300 block mb-1">1. Genetic Blueprint Safety</span>
          <span className="text-[11px] text-slate-400">Zero live pathogen used; non-infectious; cannot cause disease or integrate into genome.</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="font-semibold text-emerald-300 block mb-1">2. Strong Dual Immunity</span>
          <span className="text-[11px] text-slate-400">Activates both neutralizing antibodies (B cells) and cytotoxic CD8+ killer T cells.</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="font-semibold text-purple-300 block mb-1">3. Rapid Adaptability</span>
          <span className="text-[11px] text-slate-400">Synthesized cell-free in vitro; easily updated against new viral mutations within weeks.</span>
        </div>
      </div>
    </div>
  );
};
