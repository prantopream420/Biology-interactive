import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Info, FastForward } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ActionPotentialSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [voltage, setVoltage] = useState<number>(-70);
  const [time, setTime] = useState<number>(0);
  const [phase, setPhase] = useState<'resting' | 'depolarizing' | 'repolarizing' | 'hyperpolarizing'>('resting');
  const [naChannelsOpen, setNaChannelsOpen] = useState<boolean>(false);
  const [kChannelsOpen, setKChannelsOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<{ t: number; v: number }[]>([]);
  const [stimulusStrength, setStimulusStrength] = useState<number>(65); // mV equivalent

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Trigger Action Potential sequence
  const triggerSpike = () => {
    sound.playSpike();
    if (stimulusStrength < 50) {
      // Subthreshold graded potential
      setPhase('resting');
      const startV = -70;
      const peakV = -70 + (stimulusStrength / 50) * 12; // doesn't reach -55
      let step = 0;
      const subInterval = setInterval(() => {
        step++;
        if (step <= 10) {
          setVoltage(startV + ((peakV - startV) * step) / 10);
        } else if (step <= 25) {
          setVoltage(peakV - ((peakV - startV) * (step - 10)) / 15);
        } else {
          setVoltage(-70);
          clearInterval(subInterval);
        }
      }, 30);
      return;
    }

    // Full All-or-None Action Potential
    let step = 0;
    const apInterval = setInterval(() => {
      step++;
      if (step <= 5) {
        // Stimulus to threshold (-55)
        setPhase('depolarizing');
        setVoltage(-70 + step * 3);
      } else if (step <= 18) {
        // Fast Depolarization (Na+ in)
        setNaChannelsOpen(true);
        setKChannelsOpen(false);
        setPhase('depolarizing');
        setVoltage(Math.min(35, -55 + (step - 5) * 7));
      } else if (step <= 32) {
        // Repolarization (Na+ closed, K+ out)
        setNaChannelsOpen(false);
        setKChannelsOpen(true);
        setPhase('repolarizing');
        setVoltage(Math.max(-85, 35 - (step - 18) * 8.5));
      } else if (step <= 44) {
        // Hyperpolarization undershoot (-85 to -70)
        setPhase('hyperpolarizing');
        setKChannelsOpen(false);
        setVoltage(Math.min(-70, -85 + (step - 32) * 1.25));
      } else {
        // Return to resting
        setPhase('resting');
        setVoltage(-70);
        setNaChannelsOpen(false);
        setKChannelsOpen(false);
        clearInterval(apInterval);
      }
    }, 45);
  };

  // Keep rolling history for the oscilloscope graph
  useEffect(() => {
    setHistory((prev) => {
      const next = [...prev, { t: time, v: voltage }];
      if (next.length > 120) return next.slice(next.length - 120);
      return next;
    });
  }, [voltage, time]);

  // Main clock
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Draw Oscilloscope Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = 0; y < height; y += 30) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    for (let x = 0; x < width; x += 30) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();

    // Voltage mapping function (-90mV at bottom, +50mV at top)
    const mapY = (v: number) => {
      const minV = -90;
      const maxV = 50;
      const normalized = (v - minV) / (maxV - minV);
      return height - normalized * height;
    };

    // Threshold line (-55 mV)
    const threshY = mapY(-55);
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, threshY);
    ctx.lineTo(width, threshY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('Threshold: -55mV', 8, threshY - 4);

    // Resting line (-70 mV)
    const restY = mapY(-70);
    ctx.strokeStyle = '#06b6d4';
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(0, restY);
    ctx.lineTo(width, restY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('Resting: -70mV', 8, restY + 12);

    // Peak mark (+30 mV)
    const peakY = mapY(30);
    ctx.fillStyle = '#10b981';
    ctx.fillText('Peak overshoot: +30mV', 8, peakY - 4);

    // Trace curve
    if (history.length > 1) {
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = phase === 'depolarizing' ? '#10b981' : phase === 'repolarizing' ? '#38bdf8' : '#06b6d4';
      ctx.beginPath();
      history.forEach((pt, i) => {
        const x = (i / 120) * width;
        const y = mapY(pt.v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Current pulse head point
      const last = history[history.length - 1];
      const headX = ((history.length - 1) / 120) * width;
      const headY = mapY(last.v);
      ctx.beginPath();
      ctx.arc(headX, headY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [history, phase]);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            Action Potential Voltage Clamp Simulator
          </h4>
          <p className="text-xs text-slate-400">Live membrane potential and ion gating dynamics</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Membrane Vm</span>
          <p className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
            {voltage > 0 ? `+${voltage.toFixed(1)}` : voltage.toFixed(1)} mV
          </p>
        </div>
      </div>

      {/* Oscilloscope canvas */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
        <canvas ref={canvasRef} width={400} height={190} className="w-full h-44 block" />
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded px-2 py-1 text-[11px] font-mono">
          <span className="text-slate-400">Phase: </span>
          <span className="font-semibold text-cyan-300 uppercase tracking-wide">
            {phase === 'resting' ? 'Resting (-70mV)' : phase === 'depolarizing' ? 'Depolarization (Na+ In)' : phase === 'repolarizing' ? 'Repolarization (K+ Out)' : 'Hyperpolarization'}
          </span>
        </div>
      </div>

      {/* Molecular Ion Channel Cross-Section Visualizer */}
      <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-300">Axon Membrane Cross-Section (Lipid Bilayer)</span>
          <span className="text-slate-400">Extracellular (High Na+) ➔ Intracellular (High K+)</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Voltage-Gated Na+ Channel */}
          <div className={`p-3 rounded-xl border transition-all ${naChannelsOpen ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-500/10' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-emerald-400">Voltage-Gated Na+ Channel</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${naChannelsOpen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                {naChannelsOpen ? 'OPEN (INFLUX)' : 'CLOSED'}
              </span>
            </div>
            <div className="h-10 relative flex items-center justify-center bg-slate-950/80 rounded border border-slate-800 overflow-hidden">
              {naChannelsOpen ? (
                <div className="flex items-center gap-1.5 animate-pulse">
                  <span className="text-xs font-mono font-bold text-emerald-400">Na+ ➔➔</span>
                  <span className="text-[10px] text-emerald-300">Rushing into cell</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500 font-mono">Gate shut at -70mV</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Opens rapidly at <span className="text-amber-400">-55mV</span>. Reverses polarity to +30mV.
            </p>
          </div>

          {/* Voltage-Gated K+ Channel */}
          <div className={`p-3 rounded-xl border transition-all ${kChannelsOpen ? 'bg-sky-950/30 border-sky-500/50 shadow-md shadow-sky-500/10' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-sky-400">Voltage-Gated K+ Channel</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${kChannelsOpen ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'}`}>
                {kChannelsOpen ? 'OPEN (EFFLUX)' : 'CLOSED'}
              </span>
            </div>
            <div className="h-10 relative flex items-center justify-center bg-slate-950/80 rounded border border-slate-800 overflow-hidden">
              {kChannelsOpen ? (
                <div className="flex items-center gap-1.5 animate-pulse">
                  <span className="text-xs font-mono font-bold text-sky-400">➔➔ K+</span>
                  <span className="text-[10px] text-sky-300">Leaving cell</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500 font-mono">Closed until peak</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Opens at peak to allow K+ efflux, returning membrane to negative resting potential.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Controls Deck */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Stimulus Current</span>
              <span className="font-mono text-cyan-400 font-semibold">{stimulusStrength} mV ({stimulusStrength >= 50 ? 'Supra-threshold' : 'Sub-threshold'})</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={stimulusStrength}
              onChange={(e) => setStimulusStrength(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={triggerSpike}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-semibold text-xs transition shadow-md shadow-cyan-500/20"
          >
            <Zap className="w-4 h-4 fill-current" />
            Inject Stimulus Pulse
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setVoltage(-70);
              setPhase('resting');
              setNaChannelsOpen(false);
              setKChannelsOpen(false);
              setHistory([]);
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 text-xs font-medium transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Resting State
          </button>
        </div>

        {/* CT Exam takeaway note */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
          <Info className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
          <p>
            <strong>All-or-None Law:</strong> If the stimulus injects enough current to reach the -55mV threshold, a full +30mV action potential is guaranteed. Increasing stimulus strength further does NOT make the spike taller; it only increases firing frequency!
          </p>
        </div>
      </div>
    </div>
  );
};
