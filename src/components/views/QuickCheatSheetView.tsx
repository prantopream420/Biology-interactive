import React, { useState } from 'react';
import { Layers, CheckCircle2, Zap, Brain, Shield, Crosshair, Dna, Copy, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

export const QuickCheatSheetView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyCheatsheet = () => {
    sound.playSuccess();
    const text = `
IMMUNE & BRAIN-COMPUTER INTERFACE (BCI) CT REVISION CHEATSHEET

1. MOTOR NEURON STRUCTURE:
- Soma (Cell body): Nucleus, metabolic hub, integrates signals.
- Dendrites: Receive input signals from other neurons.
- Axon: Transmits action potential away from soma.
- Axon terminal: Swollen distal ends that form synapses.

2. ACTION POTENTIAL GENERATION:
- Resting potential: -70 mV (Na+/K+ pump: 3 Na+ out, 2 K+ in).
- Threshold: -55 mV (All-or-None).
- Depolarization: Voltage-gated Na+ channels OPEN -> Na+ rushes IN -> +30 mV.
- Repolarization: Na+ inactivates, Voltage-gated K+ channels OPEN -> K+ rushes OUT.
- Hyperpolarization: Undershoot (~ -85 mV) -> recovery to -70 mV.

3. SYNAPSE & SIGNAL TRANSFER:
- Functional junction between neuron and another cell.
- AP arrives at terminal -> Voltage-gated Ca2+ channels open -> Ca2+ influx.
- Ca2+ causes vesicles to fuse with presynaptic membrane -> Exocytosis of neurotransmitters.
- Neurotransmitters cross 20nm cleft -> bind postsynaptic receptors -> ion channels open -> EPSP -> new AP.

4. BCI DEFINITION & 3 COMPONENTS:
- Translates direct brain intent into device control without peripheral nerves.
- 1. Measuring device (EEG cap, sensors)
- 2. Processing system (Filter, FFT, feature extraction, ML decoder)
- 3. Application (Wheelchair, robotic limb, speller)

5. BCI APPLICATIONS:
- Locked-in syndrome / ALS communication.
- Power wheelchairs & prosthetic limbs.
- Functional Electrical Stimulation (FES) rehabilitation.
- Operator fatigue & vigilance monitoring (air traffic, rail).
- Immersive VR/gaming and neuromarketing.

6. ANN VS BNN:
- ANN: Math perceptron, continuous weights, backpropagation, high GPU power (kW).
- BNN: Living neuron, all-or-none electrical spikes & neurotransmitters, Hebbian plasticity, ultra-low energy (~20W).

7. INNATE VS ADAPTIVE:
- Innate: Immediate (0-12h), non-specific, no memory, skin/macrophages/NK.
- Adaptive: Delayed (days), high antigen specificity, lifelong memory B/T cells, antibodies.

8. NATURAL KILLER (NK) CELLS:
- Detects "Missing Self" (absence of MHC Class I on virus/tumor cells).
- Punches pores with Perforin -> injects Granzymes -> triggers Apoptosis.
- Secretes cytokines (IFN-gamma).
- Distinction: Attacks self infected/malignant cells, not free external microbes.

9. mRNA VACCINES ADVANTAGES:
- Safe genetic blueprint (no live pathogen, cannot cause disease, no DNA integration).
- Strong dual immunity (neutralizing antibodies + cytotoxic T cells).
- Rapid synthetic in vitro production & fast update for variants.

10. VACCINE PROTECTION MECHANISM:
- Safe exposure -> Primary response produces antibodies and Memory B/T cells.
- Secondary encounter -> Memory cells recognize instantly -> immediate massive antibody surge prevents disease.

11. 7 VACCINE TYPES:
- Whole Inactivated (Salk Polio, Sinovac)
- Live-Attenuated (MMR, Sabin Polio, Yellow Fever)
- Subunit / Peptide (Hepatitis B, Novavax)
- Viral Vector (Oxford-AstraZeneca, J&J)
- mRNA (Pfizer-BioNTech, Moderna)
- DNA (ZyCoV-D)
- Virus-Like Particle - VLP (HPV Gardasil)
`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 pb-20 space-y-4 px-4 pt-3 max-w-2xl mx-auto w-full">
      {/* Header with copy button */}
      <div className="glass-pebble p-5 border border-white/15 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Class Test Rapid Cheat Sheet
          </h2>
          <p className="text-xs text-slate-300">High-yield bullet points for 5-minute pre-exam revision</p>
        </div>

        <button
          onClick={copyCheatsheet}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full glass-pill hover:bg-white/10 text-xs text-slate-200 hover:text-white transition active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy All'}</span>
        </button>
      </div>

      {/* Grid of cheat cards */}
      <div className="space-y-3">
        {/* Card 1: Motor Neuron & Action Potential */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              1 & 2. Motor Neuron & Action Potential
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Voltages</span>
          </div>
          <ul className="text-xs text-slate-200 space-y-1 leading-relaxed">
            <li><strong>Structure:</strong> Soma (cell body/nucleus), Dendrites (receive), Axon (carries impulse away), Axon Terminal (synapse).</li>
            <li><strong>Resting:</strong> <span className="font-mono text-cyan-300 font-bold">-70 mV</span> maintained by Na+/K+ ATPase pump.</li>
            <li><strong>Threshold:</strong> <span className="font-mono text-amber-300 font-bold">-55 mV</span> (All-or-None firing principle).</li>
            <li><strong>Depolarization:</strong> Voltage-gated Na+ channels open ➔ rapid Na+ INFLUX ➔ <span className="font-mono text-emerald-300 font-bold">+30 mV</span>.</li>
            <li><strong>Repolarization:</strong> Na+ channels inactivate, Voltage-gated K+ channels open ➔ K+ EFFLUX ➔ negativity restored.</li>
            <li><strong>Hyperpolarization:</strong> Transient undershoot (~ -85 mV) before returning to -70 mV resting.</li>
          </ul>
        </div>

        {/* Card 2: Synapse and Signal Transfer */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              3. Synapse and Signal Transfer
            </span>
            <span className="text-[10px] font-mono text-purple-400">Chemical Junction</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            <strong>Definition:</strong> Functional connection between a neuron and another cell across which impulses pass.
          </p>
          <p className="text-xs text-slate-200 leading-relaxed">
            <strong>Mechanism:</strong> AP arrives at presynaptic terminal ➔ opens voltage-gated <strong>Ca2+ channels</strong> ➔ Ca2+ influx triggers <strong>vesicle exocytosis</strong> ➔ neurotransmitters diffuse across 20nm cleft ➔ bind postsynaptic receptors ➔ opens ion channels generating <strong>EPSP / action potential</strong>.
          </p>
        </div>

        {/* Card 3: BCI Definition, Components & Applications */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              4 & 5. Brain-Computer Interface (BCI)
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Direct Brain-Link</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            <strong>Definition:</strong> Hardware & software system translating functional intent directly from brain activity without peripheral nerves or muscles.
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono py-1">
            <div className="p-2 glass-pill text-[11px] text-cyan-300">1. Sensors (EEG)</div>
            <div className="p-2 glass-pill text-[11px] text-purple-300">2. Processing (ML)</div>
            <div className="p-2 glass-pill text-[11px] text-emerald-300">3. Application</div>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            <strong>Applications:</strong> (1) Locked-in syndrome/ALS communication speller, (2) Power wheelchair and neuroprosthetics, (3) FES rehabilitation therapy, (4) Operator fatigue assessment in air traffic control, (5) VR, gaming, neuromarketing.
          </p>
        </div>

        {/* Card 4: ANN vs BNN */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            6. ANN vs BNN
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <strong className="text-cyan-300 block">ANN (Artificial):</strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">Math perceptron, continuous floating-point weights, backpropagation optimization, synchronous GPU matrix math, high power.</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <strong className="text-emerald-300 block">BNN (Biological):</strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">Living neurons, electrochemical spikes & neurotransmitters, Hebbian plasticity & LTP, asynchronous parallel, ~20W ultra-low power.</p>
            </div>
          </div>
        </div>

        {/* Card 5: Innate vs Adaptive Immunity */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            7. Innate vs Adaptive Immunity
          </span>
          <ul className="text-xs text-slate-200 space-y-1 leading-relaxed">
            <li><strong>Innate:</strong> Rapid (0-12 hours), non-specific PAMP recognition, no immunological memory, skin/mucus, phagocytes (macrophages/neutrophils), NK cells.</li>
            <li><strong>Adaptive:</strong> Delayed (days to weeks), highly antigen-specific, builds long-lived immunological memory (B & T memory cells), produces high-affinity antibodies.</li>
          </ul>
        </div>

        {/* Card 6: Natural Killer (NK) Cells */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-rose-400" />
            8. Natural Killer (NK) Cells
          </span>
          <ul className="text-xs text-slate-200 space-y-1 leading-relaxed">
            <li><strong>Target Recognition:</strong> Missing-Self hypothesis (targets cells that have downregulated MHC Class I).</li>
            <li><strong>Mechanism:</strong> Exocytoses <strong>Perforin</strong> (punches pores into membrane) + injects <strong>Granzymes</strong> (induces caspase-mediated apoptosis).</li>
            <li><strong>Cytokines:</strong> Secretes IFN-gamma to stimulate macrophages.</li>
            <li><strong>CT Distinction:</strong> Unlike most WBCs that engulf external pathogens, NK cells kill the body's OWN virus-infected or tumor cells!</li>
          </ul>
        </div>

        {/* Card 7: Vaccines & mRNA Highlights */}
        <div className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-2">
          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <Dna className="w-3.5 h-3.5 text-cyan-400" />
            9, 10 & 11. Vaccines & mRNA Technology
          </span>
          <ul className="text-xs text-slate-200 space-y-1 leading-relaxed">
            <li><strong>mRNA Advantages:</strong> (1) Genetic blueprint only (no live pathogen, non-infectious, zero DNA integration), (2) Robust antibody + cytotoxic T-cell immunity, (3) Rapid cell-free modular synthesis for variants.</li>
            <li><strong>Protection Mechanism:</strong> Safe primary exposure creates Memory B & T cells. Secondary pathogen breach triggers immediate, exponential antibody surge before illness occurs.</li>
            <li><strong>7 Vaccine Types:</strong> Whole Inactivated (Salk), Live-Attenuated (MMR), Subunit (Hep B), Viral Vector (AstraZeneca), mRNA (Pfizer), DNA (ZyCoV-D), VLP (HPV Gardasil).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
