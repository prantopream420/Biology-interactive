import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Disc3, ShieldAlert, Sparkles, Sliders, Play, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

type BciApplicationMode = 'wheelchair' | 'prosthetic_hand' | 'fatigue_monitor' | 'locked_in_speller';

export const BciPipelineSimulator: React.FC = () => {
  const [activeApp, setActiveApp] = useState<BciApplicationMode>('wheelchair');
  const [mentalIntent, setMentalIntent] = useState<'forward' | 'left' | 'right' | 'idle'>('idle');
  const [wheelchairPos, setWheelchairPos] = useState<{ x: number; y: number; angle: number }>({ x: 100, y: 70, angle: 0 });
  const [handGrip, setHandGrip] = useState<number>(0); // 0 = open, 100 = closed
  const [vigilanceScore, setVigilanceScore] = useState<number>(88); // %
  const [spelledText, setSpelledText] = useState<string>('HELP');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [decodedCommand, setDecodedCommand] = useState<string>('STANDBY');

  const executeMentalCommand = (intent: 'forward' | 'left' | 'right' | 'idle') => {
    sound.playClick();
    setMentalIntent(intent);
    setIsProcessing(true);
    setDecodedCommand('DECODING...');

    setTimeout(() => {
      setIsProcessing(false);
      sound.playSpike();

      if (intent === 'forward') {
        setDecodedCommand('MOTOR_IMAGERY: DRIVE FORWARD');
        setWheelchairPos((prev) => ({
          ...prev,
          x: Math.min(220, prev.x + 25),
        }));
        setHandGrip(85);
        setVigilanceScore(94);
      } else if (intent === 'left') {
        setDecodedCommand('MOTOR_IMAGERY: STEER LEFT');
        setWheelchairPos((prev) => ({
          ...prev,
          y: Math.max(30, prev.y - 20),
          angle: -15,
        }));
        setHandGrip(40);
      } else if (intent === 'right') {
        setDecodedCommand('MOTOR_IMAGERY: STEER RIGHT');
        setWheelchairPos((prev) => ({
          ...prev,
          y: Math.min(110, prev.y + 20),
          angle: 15,
        }));
        setHandGrip(60);
      } else {
        setDecodedCommand('RESTING / ALPHA RHYTHM');
        setHandGrip(10);
        setVigilanceScore(70);
      }
    }, 400);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            3-Stage BCI Architecture & Live Actuator
          </h4>
          <p className="text-xs text-slate-400">Sensors ➔ Signal Processing / ML ➔ Application Device</p>
        </div>
        <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
          Closed-Loop BCI
        </span>
      </div>

      {/* 3-Stage Diagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Stage 1: Measuring Device */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">1</span>
              Measuring Device
            </span>
            <span className="text-[10px] font-mono text-slate-400">EEG Cap</span>
          </div>
          <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Channel C3 (Motor L):</span>
              <span className="font-mono text-cyan-300">{mentalIntent === 'right' ? 'Mu Suppression' : '10 Hz'}</span>
            </div>
            {/* Animated waveform simulation */}
            <div className="h-6 flex items-center gap-0.5 overflow-hidden">
              {[12, 18, 8, 22, 14, 26, 6, 19, 11, 24, 15, 20, 9, 21].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-cyan-500/70 rounded-full transition-all duration-300"
                  style={{
                    height: `${isProcessing ? Math.min(24, h * 1.3) : h}px`,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Electrode: Scalp 10-20</span>
              <span>1000 Hz Sampling</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Detects microvolt cortical electrical potentials non-invasively from the scalp.
          </p>
        </div>

        {/* Stage 2: Processing System */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold">2</span>
              Processing System
            </span>
            <span className="text-[10px] font-mono text-slate-400">DSP / Classifier</span>
          </div>
          <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Bandpass Filter:</span>
              <span className="font-mono text-purple-300">8 - 30 Hz</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Feature Extractor:</span>
              <span className="font-mono text-purple-300">CSP / FFT Power</span>
            </div>
            <div className="p-1.5 rounded bg-purple-950/40 border border-purple-800/40 text-[11px] font-mono text-purple-200 truncate">
              {isProcessing ? '⚡ Decrypting Mu/Beta rhythm...' : decodedCommand}
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Filters ocular/muscle artifacts and uses ML to decode the intended motor command.
          </p>
        </div>

        {/* Stage 3: Application Device */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold">3</span>
              Application Device
            </span>
            <span className="text-[10px] font-mono text-slate-400">Actuator</span>
          </div>
          <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Active Device:</span>
              <span className="font-semibold text-emerald-300 capitalize">{activeApp.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Status:</span>
              <span className="font-mono text-emerald-400">ACTIVE CONTROLLER</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Closed-loop feedback returned to user
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Translates digitized classification into physical actuation without peripheral nerves.
          </p>
        </div>
      </div>

      {/* Select Application Mode Tabs */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-slate-300">Choose BCI Application Demo:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {[
            { id: 'wheelchair', label: 'Power Wheelchair' },
            { id: 'prosthetic_hand', label: 'Neuroprosthetic Hand' },
            { id: 'fatigue_monitor', label: 'Fatigue Assessment' },
            { id: 'locked_in_speller', label: 'Locked-In Speller' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                sound.playClick();
                setActiveApp(mode.id as BciApplicationMode);
              }}
              className={`text-xs py-2 px-2 rounded-xl font-medium transition text-center ${
                activeApp === mode.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Interactive Actuator Stage */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
        {activeApp === 'wheelchair' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Motorized Wheelchair Navigation Simulator</span>
              <span className="text-cyan-400 font-mono text-[11px]">Target: Room 102 Hospital Corridor</span>
            </div>
            {/* Visual 2D Navigation Map */}
            <div className="h-32 w-full bg-slate-900 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
              {/* Floor grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

              {/* Destination marker */}
              <div className="absolute right-6 top-6 px-2 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                Goal Point
              </div>

              {/* Wheelchair avatar */}
              <div
                className="absolute w-12 h-12 rounded-xl bg-cyan-600/90 border-2 border-cyan-300 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 transition-all duration-300"
                style={{
                  left: `${wheelchairPos.x}px`,
                  top: `${wheelchairPos.y}px`,
                  transform: `rotate(${wheelchairPos.angle}deg)`,
                }}
              >
                <span className="text-[10px] font-bold">♿ BCI</span>
              </div>
            </div>

            {/* Neural intent buttons */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => executeMentalCommand('forward')}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium border border-cyan-800/40 active:scale-95"
              >
                Forward (Think)
              </button>
              <button
                onClick={() => executeMentalCommand('left')}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium border border-cyan-800/40 active:scale-95"
              >
                Steer Left (L-Hand)
              </button>
              <button
                onClick={() => executeMentalCommand('right')}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium border border-cyan-800/40 active:scale-95"
              >
                Steer Right (R-Hand)
              </button>
              <button
                onClick={() => executeMentalCommand('idle')}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 active:scale-95"
              >
                Stop / Relax
              </button>
            </div>
          </div>
        )}

        {activeApp === 'prosthetic_hand' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Robotic Neuroprosthetic Hand Actuation</span>
              <span className="font-mono text-cyan-400">Grip Force: {handGrip}%</span>
            </div>
            <div className="h-32 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-around px-6">
              {/* SVG Robotic Hand Graphic */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-3xl mx-auto shadow-inner">
                  {handGrip > 50 ? '✊' : '✋'}
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block font-mono">
                  {handGrip > 50 ? 'Grip Closed (Cup Grasped)' : 'Resting Open Hand'}
                </span>
              </div>
              <div className="w-1/2 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Flexor Actuator Pressure:</span>
                  <span className="font-mono text-cyan-400">{handGrip * 1.8} N</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${handGrip}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  User imagines flexing their fingers. BCI decodes the motor cortex burst to drive micro-servos.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.playSpike();
                  setHandGrip(90);
                }}
                className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-semibold"
              >
                Imagine Squeezing / Grasping
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setHandGrip(10);
                }}
                className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Imagine Opening Fingers
              </button>
            </div>
          </div>
        )}

        {activeApp === 'fatigue_monitor' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Operator Fatigue & Vigilance Tracker (Air Traffic / Rail)</span>
              <span className={`font-mono font-bold ${vigilanceScore > 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                Vigilance Index: {vigilanceScore}%
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">Brainwave Spectral Power:</span>
                <div className="text-xs font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Beta (13-30 Hz Alert):</span>
                    <span className="text-emerald-400">{vigilanceScore > 75 ? 'HIGH (Active)' : 'DROPPING'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Theta (4-8 Hz Drowsy):</span>
                    <span className="text-amber-400">{vigilanceScore > 75 ? 'SUPPRESSED' : 'ELEVATED ⚠️'}</span>
                  </div>
                </div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 flex flex-col justify-center text-center">
                <span className="text-[11px] text-slate-400">Safety Status:</span>
                <span className={`text-xs font-bold font-mono mt-1 ${vigilanceScore > 75 ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                  {vigilanceScore > 75 ? 'OPERATOR FIT FOR DUTY' : 'FATIGUE DETECTED - ALARM'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.playSuccess();
                  setVigilanceScore(95);
                }}
                className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
              >
                Simulate Focused Attention (High Alert)
              </button>
              <button
                onClick={() => {
                  sound.playError();
                  setVigilanceScore(55);
                }}
                className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium"
              >
                Simulate 3 AM Microsleep / Drowsiness
              </button>
            </div>
          </div>
        )}

        {activeApp === 'locked_in_speller' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">P300 Speller Matrix (Locked-In Communication)</span>
              <span className="font-mono text-cyan-400">Target Word: {spelledText}</span>
            </div>
            <div className="grid grid-cols-6 gap-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center font-mono font-bold text-xs">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'].map((letter) => (
                <div
                  key={letter}
                  className={`p-2 rounded transition-colors ${
                    spelledText.includes(letter)
                      ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400'
                      : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.playSpike();
                  setSpelledText((t) => (t.length > 8 ? 'YES' : t + 'E'));
                }}
                className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-semibold"
              >
                Focus on Flashing Letter (P300 Flash)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSpelledText('');
                }}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
