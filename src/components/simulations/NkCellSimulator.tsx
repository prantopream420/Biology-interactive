import React, { useState } from 'react';
import { ShieldCheck, Crosshair, Zap, AlertTriangle, Info, Play, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

type TargetCellType = 'healthy' | 'virus_infected' | 'cancer_tumor';

export const NkCellSimulator: React.FC = () => {
  const [targetType, setTargetType] = useState<TargetCellType>('virus_infected');
  const [stage, setStage] = useState<'approaching' | 'inspecting' | 'perforin_release' | 'apoptosis' | 'spared'>('approaching');
  const [poreFormed, setPoreFormed] = useState<boolean>(false);

  const runNkInspection = (type: TargetCellType) => {
    sound.playClick();
    setTargetType(type);
    setStage('approaching');
    setPoreFormed(false);

    // 1. Inspecting MHC-I surface markers (500ms)
    setTimeout(() => {
      setStage('inspecting');
      sound.playClick();
    }, 600);

    // 2. Decision based on Missing Self
    setTimeout(() => {
      if (type === 'healthy') {
        setStage('spared');
        sound.playSuccess();
      } else {
        // Missing MHC-I -> Release Perforin
        setStage('perforin_release');
        setPoreFormed(true);
        sound.playSpike();

        // 3. Granzymes enter -> Apoptosis
        setTimeout(() => {
          setStage('apoptosis');
          sound.playError();
        }, 1200);
      }
    }, 1400);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-coral-400 text-rose-400" />
            NK Cell Cytotoxic Attack Simulator
          </h4>
          <p className="text-xs text-slate-400">Missing-Self recognition, Perforin pore-punching & Granzyme apoptosis</p>
        </div>
        <span className="text-[11px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded">
          Perforin & Granzyme
        </span>
      </div>

      {/* Target Selector */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-slate-300">Select Target Cell for NK Inspection:</span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'healthy', label: 'Healthy Body Cell', tag: 'Normal MHC-I' },
            { id: 'virus_infected', label: 'Virus-Infected Cell', tag: 'Downregulated MHC-I' },
            { id: 'cancer_tumor', label: 'Malignant Tumor Cell', tag: 'No MHC-I + Stress' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => runNkInspection(item.id as TargetCellType)}
              className={`p-2 rounded-xl text-left transition border ${
                targetType === item.id
                  ? 'bg-rose-950/40 border-rose-500/60 shadow-sm'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={`text-xs font-semibold block ${targetType === item.id ? 'text-rose-300' : 'text-slate-300'}`}>
                {item.label}
              </span>
              <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{item.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Microscopic Engagement Canvas */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative select-none">
        <div className="flex items-center justify-around h-44 relative">
          {/* NK Cell (Attacker) */}
          <div className="text-center z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-600 to-red-800 border-2 border-rose-400 flex flex-col items-center justify-center text-white shadow-lg shadow-rose-900/40 relative">
              <span className="text-xs font-bold font-mono">NK CELL</span>
              <span className="text-[9px] text-rose-200">Large Granular</span>

              {/* Granules inside NK cell */}
              <div className="flex gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Perforin" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" title="Granzymes" />
              </div>

              {/* Secretory Perforin & Granzymes stream */}
              {stage === 'perforin_release' && (
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1 animate-ping">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                </div>
              )}
            </div>
            <span className="text-[11px] text-rose-300 mt-2 block font-medium">Cytotoxic Effector</span>
          </div>

          {/* Molecular Synaptic Gap / Receptor Junction */}
          <div className="flex flex-col items-center justify-center px-2 text-center">
            {stage === 'inspecting' && (
              <span className="text-[10px] font-mono text-amber-300 animate-pulse bg-slate-900 px-2 py-1 rounded border border-amber-800">
                Scanning for MHC Class I...
              </span>
            )}
            {stage === 'spared' && (
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                MHC-I Detected ➔ INHIBITED (Spared)
              </span>
            )}
            {(stage === 'perforin_release' || stage === 'apoptosis') && (
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-1 rounded border border-rose-800">
                Missing MHC-I! ➔ PUNCHING PORES
              </span>
            )}
          </div>

          {/* Target Cell */}
          <div className="text-center z-10">
            <div
              className={`w-24 h-24 rounded-full border-2 transition-all duration-500 flex flex-col items-center justify-center relative ${
                stage === 'apoptosis'
                  ? 'bg-slate-900 border-dashed border-red-500 scale-90 opacity-60'
                  : targetType === 'healthy'
                  ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200'
                  : 'bg-purple-950/70 border-purple-400 text-purple-200'
              }`}
            >
              {/* Membrane pores created by perforin */}
              {poreFormed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-5 rounded-full bg-red-600 border border-amber-400" />
              )}

              {/* MHC-I Surface Markers on target */}
              {targetType === 'healthy' ? (
                <div className="absolute -left-2 top-4 w-3 h-3 bg-emerald-400 rounded-sm" title="MHC Class I" />
              ) : (
                <div className="absolute -left-2 top-4 w-2 h-2 bg-red-500/40 rounded-full" title="No MHC Class I" />
              )}

              <span className="text-xs font-bold font-mono">
                {stage === 'apoptosis' ? 'APOPTOSIS' : targetType === 'healthy' ? 'SELF CELL' : 'MUTATED'}
              </span>
              <span className="text-[9px] text-slate-300">
                {targetType === 'healthy' ? 'MHC-I Present' : 'MHC-I Absent'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block font-medium">Target Cell</span>
          </div>
        </div>

        {/* Real-time mechanism readout */}
        <div className="mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-rose-300">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>Behind-the-Scenes Mechanism:</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
            {stage === 'spared' && 'Normal self-cells display MHC Class I. This binds the NK cell\'s inhibitory receptor (KIR), actively suppressing cytotoxic killing.'}
            {stage === 'perforin_release' && 'Without the inhibitory signal from MHC Class I, activating receptors trigger polarization. NK cell exocytoses Perforin monomers that assemble into cylindrical pores in the target lipid membrane.'}
            {stage === 'apoptosis' && 'Granzymes (serine proteases) enter through the perforin pores into the cytoplasm, cleaving Bid and activating Caspase-3, leading to programmed suicide (apoptosis) and DNA fragmentation.'}
            {stage === 'approaching' && 'NK cell scanning target cell surface proteins for "Missing Self" signature.'}
            {stage === 'inspecting' && 'Receptor inspection in progress...'}
          </p>
        </div>
      </div>

      {/* Critical CT Distinction Alert */}
      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-xs text-rose-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-rose-100">Key CT Exam Distinction:</strong>
          <span className="ml-1 text-slate-300">
            Unlike standard white blood cells (neutrophils/macrophages) that directly ingest external invaders (bacteria/parasites), Natural Killer cells primarily destroy the body's <em>own</em> stressed, virus-hijacked, or cancerous cells!
          </span>
        </div>
      </div>
    </div>
  );
};
