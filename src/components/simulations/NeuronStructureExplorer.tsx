import React, { useState } from 'react';
import { Info, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NeuronPart {
  id: string;
  name: string;
  shortRole: string;
  description: string;
  ctHighlight: string;
}

const NEURON_PARTS: NeuronPart[] = [
  {
    id: 'soma',
    name: 'Cell Body (Soma) & Nucleus',
    shortRole: 'Metabolic & integration center',
    description: 'Houses the nucleus, Nissl bodies (rough ER), Golgi apparatus, and mitochondria. Synthesizes vital neurotransmitters and proteins, and integrates incoming graded dendritic potentials.',
    ctHighlight: 'Integrates all excitatory and inhibitory inputs from dendrites to determine whether to trigger an action potential.'
  },
  {
    id: 'dendrites',
    name: 'Dendrites (Branching Arbor)',
    shortRole: 'Input signal receivers',
    description: 'Extensively branched cellular projections radiating from the soma. Covered with thousands of synaptic connections to receive chemical signals from presynaptic neurons.',
    ctHighlight: 'Carries graded electrical impulses INWARD toward the cell body.'
  },
  {
    id: 'axon_hillock',
    name: 'Axon Hillock (Trigger Zone)',
    shortRole: 'Action potential decision gate',
    description: 'The conical region connecting the soma to the axon initial segment. Possesses the highest density of voltage-gated Na+ channels.',
    ctHighlight: 'The critical site where summation of incoming EPSPs must reach the ~-55mV threshold to fire.'
  },
  {
    id: 'axon',
    name: 'Axon (Nerve Fiber & Myelin)',
    shortRole: 'Long-distance high-speed conduit',
    description: 'A long cylindrical cytoplasmic extension up to 1 meter in length, wrapped in insulating myelin sheath segments separated by Nodes of Ranvier for rapid saltatory conduction.',
    ctHighlight: 'Carries action potentials AWAY from the cell body toward target muscle cells or neurons.'
  },
  {
    id: 'terminals',
    name: 'Axon Terminal (Synaptic Boutons)',
    shortRole: 'Chemical transmission output',
    description: 'The swollen distal ends of axon branches. Filled with thousands of synaptic vesicles containing neurotransmitters (like Acetylcholine at the neuromuscular junction).',
    ctHighlight: 'Converts the electrical action potential into chemical neurotransmitter exocytosis into the synaptic cleft.'
  }
];

export const NeuronStructureExplorer: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<NeuronPart>(NEURON_PARTS[0]);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Interactive Motor Neuron Anatomy
          </h4>
          <p className="text-xs text-slate-400">Tap anatomical structures to inspect functional components</p>
        </div>
        <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
          Anatomy Inspector
        </span>
      </div>

      {/* Interactive SVG Diagram */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 relative overflow-hidden">
        <svg viewBox="0 0 520 220" className="w-full h-auto max-h-56 select-none">
          <defs>
            <linearGradient id="somaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="axonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="myelinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Dendrites radiating from soma */}
          <g
            onClick={() => {
              sound.playClick();
              setSelectedPart(NEURON_PARTS[1]);
            }}
            className="cursor-pointer group"
          >
            {/* Top dendrites */}
            <path d="M 100 80 Q 70 40 40 30 M 70 40 Q 50 15 25 10 M 70 40 Q 90 20 110 10" stroke={selectedPart.id === 'dendrites' ? '#34d399' : '#64748b'} strokeWidth={selectedPart.id === 'dendrites' ? 3.5 : 2} fill="none" strokeLinecap="round" />
            {/* Left dendrites */}
            <path d="M 80 110 Q 40 100 15 95 M 40 100 Q 20 120 10 135" stroke={selectedPart.id === 'dendrites' ? '#34d399' : '#64748b'} strokeWidth={selectedPart.id === 'dendrites' ? 3.5 : 2} fill="none" strokeLinecap="round" />
            {/* Bottom dendrites */}
            <path d="M 95 140 Q 60 170 30 190 M 60 170 Q 75 195 90 210" stroke={selectedPart.id === 'dendrites' ? '#34d399' : '#64748b'} strokeWidth={selectedPart.id === 'dendrites' ? 3.5 : 2} fill="none" strokeLinecap="round" />
            <text x="30" y="65" fill="#34d399" fontSize="10" fontWeight="bold">Dendrites (Inputs)</text>
          </g>

          {/* Soma (Cell Body) */}
          <g
            onClick={() => {
              sound.playClick();
              setSelectedPart(NEURON_PARTS[0]);
            }}
            className="cursor-pointer group"
          >
            <path
              d="M 90 90 C 70 120, 80 145, 110 145 C 135 145, 140 125, 145 110 C 140 85, 125 75, 90 90 Z"
              fill={selectedPart.id === 'soma' ? 'url(#somaGrad)' : '#065f46'}
              stroke={selectedPart.id === 'soma' ? '#6ee7b7' : '#10b981'}
              strokeWidth={selectedPart.id === 'soma' ? 3 : 1.5}
            />
            {/* Nucleus */}
            <circle cx="110" cy="112" r="14" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="112" cy="110" r="5" fill="#a7f3d0" />
            <text x="96" y="116" fill="#ecfdf5" fontSize="8" fontWeight="600">Nucleus</text>
            <text x="80" y="165" fill="#10b981" fontSize="10" fontWeight="bold">Soma (Cell Body)</text>
          </g>

          {/* Axon Hillock */}
          <g
            onClick={() => {
              sound.playClick();
              setSelectedPart(NEURON_PARTS[2]);
            }}
            className="cursor-pointer group"
          >
            <polygon
              points="140,105 165,108 165,116 140,119"
              fill={selectedPart.id === 'axon_hillock' ? '#f59e0b' : '#b45309'}
              stroke={selectedPart.id === 'axon_hillock' ? '#fef08a' : '#d97706'}
              strokeWidth="1.5"
            />
            <text x="135" y="94" fill="#fbbf24" fontSize="8" fontWeight="bold">Axon Hillock</text>
          </g>

          {/* Long Axon line through center */}
          <g
            onClick={() => {
              sound.playClick();
              setSelectedPart(NEURON_PARTS[3]);
            }}
            className="cursor-pointer group"
          >
            <line x1="165" y1="112" x2="420" y2="112" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />

            {/* Myelin Sheath segments */}
            {[175, 235, 295, 355].map((x, idx) => (
              <g key={idx}>
                <rect
                  x={x}
                  y="98"
                  width="48"
                  height="28"
                  rx="6"
                  fill="url(#myelinGrad)"
                  stroke={selectedPart.id === 'axon' ? '#fde047' : '#f59e0b'}
                  strokeWidth={selectedPart.id === 'axon' ? 2 : 1}
                />
                <circle cx={x + 24} cy="112" r="3" fill="#78350f" />
              </g>
            ))}

            {/* Nodes of Ranvier indicator */}
            <text x="260" y="85" fill="#f59e0b" fontSize="8" textAnchor="middle">Node of Ranvier</text>
            <line x1="288" y1="90" x2="288" y2="105" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />

            {/* Signal Direction Arrow */}
            <path d="M 230 145 L 340 145 M 335 140 L 345 145 L 335 150" stroke="#06b6d4" strokeWidth="2" fill="none" />
            <text x="285" y="160" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Action Potential Pulse (Away from Soma)</text>
          </g>

          {/* Axon Terminal / Boutons */}
          <g
            onClick={() => {
              sound.playClick();
              setSelectedPart(NEURON_PARTS[4]);
            }}
            className="cursor-pointer group"
          >
            <path d="M 420 112 Q 450 90 480 75 M 480 75 L 495 65" stroke={selectedPart.id === 'terminals' ? '#c084fc' : '#8b5cf6'} strokeWidth={selectedPart.id === 'terminals' ? 3 : 2} fill="none" strokeLinecap="round" />
            <circle cx="495" cy="65" r="7" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1.5" />

            <path d="M 420 112 Q 455 112 490 112" stroke={selectedPart.id === 'terminals' ? '#c084fc' : '#8b5cf6'} strokeWidth={selectedPart.id === 'terminals' ? 3 : 2} fill="none" strokeLinecap="round" />
            <circle cx="495" cy="112" r="7" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1.5" />

            <path d="M 420 112 Q 450 135 480 150 M 480 150 L 495 160" stroke={selectedPart.id === 'terminals' ? '#c084fc' : '#8b5cf6'} strokeWidth={selectedPart.id === 'terminals' ? 3 : 2} fill="none" strokeLinecap="round" />
            <circle cx="495" cy="160" r="7" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1.5" />

            <text x="440" y="190" fill="#c084fc" fontSize="9" fontWeight="bold">Axon Terminals (Synapses)</text>
          </g>
        </svg>

        {/* Quick selector buttons */}
        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-800">
          {NEURON_PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => {
                sound.playClick();
                setSelectedPart(part);
              }}
              className={`text-xs py-1 px-2.5 rounded-lg font-medium transition ${
                selectedPart.id === part.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {part.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Card for Selected Part */}
      <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            {selectedPart.name}
          </h5>
          <span className="text-[11px] font-mono text-cyan-400">{selectedPart.shortRole}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{selectedPart.description}</p>
        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-200">CT Exam Insight:</strong> {selectedPart.ctHighlight}
          </div>
        </div>
      </div>
    </div>
  );
};
