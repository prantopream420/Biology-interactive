import React, { useState, useEffect } from 'react';
import { Zap, Play, RotateCcw, Info, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Vesicle {
  id: number;
  x: number;
  y: number;
  fused: boolean;
  released: boolean;
}

interface Molecule {
  id: number;
  x: number;
  y: number;
  bound: boolean;
}

export const SynapseSimulator: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'ap_arriving' | 'ca_influx' | 'exocytosis' | 'cleft_diffusion' | 'receptor_binding' | 'epsp_fired'>('idle');
  const [caGatedOpen, setCaGatedOpen] = useState<boolean>(false);
  const [postsynapticV, setPostsynapticV] = useState<number>(-70);
  const [vesicles, setVesicles] = useState<Vesicle[]>([
    { id: 1, x: 70, y: 50, fused: false, released: false },
    { id: 2, x: 120, y: 65, fused: false, released: false },
    { id: 3, x: 170, y: 70, fused: false, released: false },
    { id: 4, x: 220, y: 60, fused: false, released: false },
    { id: 5, x: 270, y: 55, fused: false, released: false },
  ]);
  const [molecules, setMolecules] = useState<Molecule[]>([]);

  const fireSynapticPulse = () => {
    sound.playSpike();
    setStage('ap_arriving');
    setPostsynapticV(-70);
    setMolecules([]);

    // 1. AP arrives at terminal (0 - 400ms)
    setTimeout(() => {
      setStage('ca_influx');
      setCaGatedOpen(true);
      sound.playClick();
    }, 450);

    // 2. Ca2+ triggers vesicle fusion (400 - 900ms)
    setTimeout(() => {
      setStage('exocytosis');
      setVesicles((prev) =>
        prev.map((v, i) => ({ ...v, fused: i % 2 === 0 }))
      );
    }, 900);

    // 3. Neurotransmitter release into cleft (900 - 1500ms)
    setTimeout(() => {
      setStage('cleft_diffusion');
      const newMolecules: Molecule[] = [];
      for (let i = 0; i < 28; i++) {
        newMolecules.push({
          id: i,
          x: 40 + Math.random() * 260,
          y: 110 + Math.random() * 25,
          bound: false,
        });
      }
      setMolecules(newMolecules);
    }, 1450);

    // 4. Receptor binding (1500 - 2200ms)
    setTimeout(() => {
      setStage('receptor_binding');
      setMolecules((prev) =>
        prev.map((m, i) => (i % 2 === 0 ? { ...m, bound: true, y: 145 } : m))
      );
      setPostsynapticV(-52); // crosses threshold!
    }, 2200);

    // 5. Postsynaptic Action Potential fired!
    setTimeout(() => {
      setStage('epsp_fired');
      setPostsynapticV(+28);
      sound.playSuccess();
    }, 2800);
  };

  const resetSynapse = () => {
    sound.playClick();
    setStage('idle');
    setCaGatedOpen(false);
    setPostsynapticV(-70);
    setMolecules([]);
    setVesicles([
      { id: 1, x: 70, y: 50, fused: false, released: false },
      { id: 2, x: 120, y: 65, fused: false, released: false },
      { id: 3, x: 170, y: 70, fused: false, released: false },
      { id: 4, x: 220, y: 60, fused: false, released: false },
      { id: 5, x: 270, y: 55, fused: false, released: false },
    ]);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            Synaptic Transmission Interactive Simulator
          </h4>
          <p className="text-xs text-slate-400">Presynaptic terminal ➔ Synaptic cleft ➔ Postsynaptic receptor</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Postsynaptic Vm</span>
          <p className="text-xl font-bold font-mono text-purple-400 tabular-nums">
            {postsynapticV > 0 ? `+${postsynapticV}` : postsynapticV} mV
          </p>
        </div>
      </div>

      {/* Synaptic Junction Canvas SVG */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 relative overflow-hidden select-none">
        <svg viewBox="0 0 360 210" className="w-full h-auto max-h-56">
          <defs>
            <linearGradient id="preGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#312e81" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="postGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Presynaptic Terminal Membrane (Top) */}
          <path
            d="M 20,0 L 20,70 Q 180,115 340,70 L 340,0 Z"
            fill="url(#preGrad)"
            stroke="#6366f1"
            strokeWidth="2"
          />
          <text x="30" y="24" fill="#a5b4fc" fontSize="10" fontWeight="bold">PRESYNAPTIC TERMINAL</text>

          {/* Voltage-gated Ca2+ channels on presynaptic membrane */}
          <g>
            <rect x="45" y="60" width="16" height="14" rx="2" fill={caGatedOpen ? '#10b981' : '#334155'} stroke="#6ee7b7" strokeWidth="1" />
            <rect x="295" y="60" width="16" height="14" rx="2" fill={caGatedOpen ? '#10b981' : '#334155'} stroke="#6ee7b7" strokeWidth="1" />
            <text x="35" y="55" fill="#34d399" fontSize="8">Ca2+ Gate</text>
            <text x="285" y="55" fill="#34d399" fontSize="8">Ca2+ Gate</text>
            {caGatedOpen && (
              <>
                <circle cx="53" cy="78" r="3" fill="#6ee7b7" className="animate-ping" />
                <circle cx="303" cy="78" r="3" fill="#6ee7b7" className="animate-ping" />
              </>
            )}
          </g>

          {/* Synaptic Vesicles inside presynaptic terminal */}
          {vesicles.map((v) => (
            <g key={v.id} transform={`translate(${v.x}, ${v.fused ? 80 : v.y})`}>
              <circle cx="0" cy="0" r="11" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
              {/* Neurotransmitter dots inside vesicle */}
              <circle cx="-3" cy="-3" r="2" fill="#facc15" />
              <circle cx="3" cy="-2" r="2" fill="#facc15" />
              <circle cx="0" cy="3" r="2" fill="#facc15" />
            </g>
          ))}

          {/* Synaptic Cleft (Middle Gap 20nm) */}
          <rect x="20" y="95" width="320" height="45" fill="rgba(30, 41, 59, 0.3)" stroke="none" />
          <text x="180" y="118" fill="#94a3b8" fontSize="9" textAnchor="middle" fontStyle="italic">
            Synaptic Cleft (20-40 nm fluid gap)
          </text>

          {/* Free diffusing neurotransmitter molecules */}
          {molecules.map((m) => (
            <circle
              key={m.id}
              cx={m.x}
              cy={m.y}
              r="3"
              fill={m.bound ? '#10b981' : '#facc15'}
              stroke="#ca8a04"
              strokeWidth="0.5"
            />
          ))}

          {/* Postsynaptic Membrane (Bottom) */}
          <path
            d="M 20,140 Q 180,140 340,140 L 340,210 L 20,210 Z"
            fill="url(#postGrad)"
            stroke={postsynapticV > -50 ? '#38bdf8' : '#334155'}
            strokeWidth={postsynapticV > -50 ? 2.5 : 1.5}
          />
          <text x="30" y="195" fill="#bae6fd" fontSize="10" fontWeight="bold">POSTSYNAPTIC CELL MEMBRANE</text>

          {/* Ligand-gated receptors */}
          {[60, 110, 160, 210, 260].map((rx, idx) => (
            <g key={idx} transform={`translate(${rx}, 132)`}>
              {/* Receptor protein cup */}
              <path d="M 0,8 Q 0,0 8,0 Q 16,0 16,8 L 16,14 L 0,14 Z" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1" />
              {/* Ion channel opening below */}
              <line x1="8" y1="14" x2="8" y2="24" stroke={postsynapticV > -50 ? '#34d399' : '#475569'} strokeWidth="3" />
            </g>
          ))}
        </svg>

        {/* Status tracker banner */}
        <div className="flex items-center justify-between text-[11px] font-mono bg-slate-900/90 rounded-lg p-2 border border-slate-800">
          <span className="text-slate-400">Current Phase:</span>
          <span className="font-semibold text-cyan-300">
            {stage === 'idle' && '1. Resting (Awaiting Action Potential)'}
            {stage === 'ap_arriving' && '2. AP Arrives at Presynaptic Terminal'}
            {stage === 'ca_influx' && '3. Ca2+ Channels Open ➔ Influx'}
            {stage === 'exocytosis' && '4. Vesicles Fuse ➔ Exocytosis'}
            {stage === 'cleft_diffusion' && '5. Neurotransmitters Diffuse Cleft'}
            {stage === 'receptor_binding' && '6. Ligand Receptors Bound (EPSP)'}
            {stage === 'epsp_fired' && '7. Threshold Met ➔ Postsynaptic AP Fired!'}
          </span>
        </div>
      </div>

      {/* Step Breakdown Sequence */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className={`p-2 rounded-xl border ${stage === 'ca_influx' || stage === 'exocytosis' ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
          <span className="font-bold text-[10px] block text-cyan-400">STEP 1</span>
          Ca2+ Influx
        </div>
        <div className={`p-2 rounded-xl border ${stage === 'cleft_diffusion' ? 'bg-purple-950/40 border-purple-500/50 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
          <span className="font-bold text-[10px] block text-purple-400">STEP 2</span>
          Cleft Diffusion
        </div>
        <div className={`p-2 rounded-xl border ${stage === 'epsp_fired' ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
          <span className="font-bold text-[10px] block text-emerald-400">STEP 3</span>
          Postsynaptic AP
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={fireSynapticPulse}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-xs transition shadow-md shadow-purple-600/20"
        >
          <Zap className="w-4 h-4 fill-current" />
          Transmit Synaptic Signal
        </button>
        <button
          onClick={resetSynapse}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 text-xs font-medium transition"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Synapse
        </button>
      </div>

      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-purple-950/20 border border-purple-800/30 text-xs text-purple-300">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p>
          <strong>Electrical ➔ Chemical ➔ Electrical:</strong> Note how the high-speed electrical nerve signal converts into chemical neurotransmitter diffusion across the 20nm gap, and then initiates a brand-new electrical action potential if threshold is reached.
        </p>
      </div>
    </div>
  );
};
