import React, { useState } from 'react';
import { Network, Brain, Cpu, Zap, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AnnVsBnnArena: React.FC = () => {
  // ANN Perceptron parameters
  const [x1, setX1] = useState<number>(0.8);
  const [x2, setX2] = useState<number>(0.5);
  const [w1, setW1] = useState<number>(0.9);
  const [w2, setW2] = useState<number>(-0.4);
  const [bias, setBias] = useState<number>(0.1);
  const [activationType, setActivationType] = useState<'sigmoid' | 'relu' | 'step'>('sigmoid');

  // BNN parameters
  const [bioInput1, setBioInput1] = useState<number>(18); // mV EPSP
  const [bioInput2, setBioInput2] = useState<number>(12); // mV EPSP
  const [restingVm] = useState<number>(-70);
  const [isBioSpiking, setIsBioSpiking] = useState<boolean>(false);

  // Compute ANN output
  const weightedSum = Number((x1 * w1 + x2 * w2 + bias).toFixed(2));
  let annOutput = 0;
  if (activationType === 'sigmoid') {
    annOutput = Number((1 / (1 + Math.exp(-weightedSum))).toFixed(3));
  } else if (activationType === 'relu') {
    annOutput = Number(Math.max(0, weightedSum).toFixed(3));
  } else {
    annOutput = weightedSum >= 0 ? 1 : 0;
  }

  // Compute BNN output
  const bioSumVm = restingVm + bioInput1 + bioInput2;
  const doesBioSpike = bioSumVm >= -55;

  const triggerBioPulse = () => {
    sound.playSpike();
    setIsBioSpiking(true);
    setTimeout(() => {
      setIsBioSpiking(false);
    }, 700);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            ANN vs BNN Interactive Dual Arena
          </h4>
          <p className="text-xs text-slate-400">Side-by-side computation vs biological electrochemical spiking</p>
        </div>
        <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
          Computational Neuro
        </span>
      </div>

      {/* Side-by-Side Playground */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BNN: Biological Neuron */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-emerald-400" />
              Biological Neuron (BNN)
            </span>
            <span className="text-[10px] font-mono text-emerald-300/80 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
              Electrochemical (~20W)
            </span>
          </div>

          <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Synapse 1 (Glutamate):</span>
              <span className="font-mono text-emerald-300">+{bioInput1} mV</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              value={bioInput1}
              onChange={(e) => setBioInput1(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Synapse 2 (Acetylcholine):</span>
              <span className="font-mono text-emerald-300">+{bioInput2} mV</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              value={bioInput2}
              onChange={(e) => setBioInput2(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Axon Hillock Summation:</span>
              <span className="font-mono font-bold text-emerald-400 tabular-nums">
                {bioSumVm} mV
              </span>
            </div>
          </div>

          {/* Biological State Box */}
          <div className={`p-3 rounded-lg border text-center transition-all ${
            doesBioSpike || isBioSpiking
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/60 border-slate-800 text-slate-400'
          }`}>
            <span className="text-xs font-semibold block">
              {doesBioSpike || isBioSpiking ? '⚡ ACTION POTENTIAL FIRED (+30mV)' : '💤 SUBTHRESHOLD (No Spike Fired)'}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Threshold: -55mV (Current: {bioSumVm}mV)
            </span>
          </div>

          <button
            onClick={triggerBioPulse}
            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs transition"
          >
            Spike Dendritic Stimulus
          </button>
        </div>

        {/* ANN: Artificial Neuron (Perceptron) */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Artificial Perceptron (ANN)
            </span>
            <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
              Mathematical / Matrix (~kW)
            </span>
          </div>

          <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Weight 1 (w₁):</span>
              <span className="font-mono text-cyan-300">{w1}</span>
            </div>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.1}
              value={w1}
              onChange={(e) => setW1(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Weight 2 (w₂):</span>
              <span className="font-mono text-cyan-300">{w2}</span>
            </div>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.1}
              value={w2}
              onChange={(e) => setW2(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Bias (b):</span>
              <span className="font-mono text-cyan-300">{bias}</span>
            </div>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.1}
              value={bias}
              onChange={(e) => setBias(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Dot Product Σ(w·x)+b:</span>
              <span className="font-mono font-bold text-cyan-400 tabular-nums">
                {weightedSum}
              </span>
            </div>
          </div>

          {/* Activation Function & Result */}
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {(['sigmoid', 'relu', 'step'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    sound.playClick();
                    setActivationType(type);
                  }}
                  className={`flex-1 text-[11px] py-1 rounded font-mono uppercase ${
                    activationType === type
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-center">
              <span className="text-[11px] text-slate-400 block font-mono">Activation Output y = f(z):</span>
              <span className="text-base font-bold font-mono text-cyan-300 tabular-nums">
                {annOutput}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table for CT exam */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-x-auto">
        <h5 className="text-xs font-semibold text-slate-300 mb-2">Class Test Comparison Summary:</h5>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="py-1.5 px-2">Dimension</th>
              <th className="py-1.5 px-2 text-cyan-400">Artificial (ANN)</th>
              <th className="py-1.5 px-2 text-emerald-400">Biological (BNN)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
            <tr>
              <td className="py-1.5 px-2 font-medium text-slate-400">Basic Unit</td>
              <td className="py-1.5 px-2">Perceptron (Math Node)</td>
              <td className="py-1.5 px-2">Biological Neuron (Soma + Axon)</td>
            </tr>
            <tr>
              <td className="py-1.5 px-2 font-medium text-slate-400">Signal Nature</td>
              <td className="py-1.5 px-2">Continuous float matrices</td>
              <td className="py-1.5 px-2">All-or-none electrical action potentials (spikes)</td>
            </tr>
            <tr>
              <td className="py-1.5 px-2 font-medium text-slate-400">Transmission</td>
              <td className="py-1.5 px-2">Weight multiplication ($w \cdot x$)</td>
              <td className="py-1.5 px-2">Neurotransmitters across synaptic cleft</td>
            </tr>
            <tr>
              <td className="py-1.5 px-2 font-medium text-slate-400">Learning Method</td>
              <td className="py-1.5 px-2">Backpropagation & Gradient Descent</td>
              <td className="py-1.5 px-2">Hebbian synaptic plasticity (LTP/LTD)</td>
            </tr>
            <tr>
              <td className="py-1.5 px-2 font-medium text-slate-400">Energy Draw</td>
              <td className="py-1.5 px-2">High power (Kilowatts for GPU servers)</td>
              <td className="py-1.5 px-2">Ultra-low power (~20 Watts for human brain)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
