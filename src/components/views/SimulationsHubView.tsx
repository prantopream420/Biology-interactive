import React, { useState } from 'react';
import { Activity, Sparkles, ChevronRight, Zap, Play } from 'lucide-react';
import { sound } from '../../utils/audio';

import { ActionPotentialSimulator } from '../simulations/ActionPotentialSimulator';
import { NeuronStructureExplorer } from '../simulations/NeuronStructureExplorer';
import { SynapseSimulator } from '../simulations/SynapseSimulator';
import { BciPipelineSimulator } from '../simulations/BciPipelineSimulator';
import { AnnVsBnnArena } from '../simulations/AnnVsBnnArena';
import { InnateVsAdaptiveSimulator } from '../simulations/InnateVsAdaptiveSimulator';
import { NkCellSimulator } from '../simulations/NkCellSimulator';
import { MrnaVaccineSimulator } from '../simulations/MrnaVaccineSimulator';
import { VaccineTypesExplorer } from '../simulations/VaccineTypesExplorer';

interface SimulationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  component: React.ReactNode;
}

export const SimulationsHubView: React.FC = () => {
  const [activeSimId, setActiveSimId] = useState<string>('action_potential');

  const sims: SimulationItem[] = [
    {
      id: 'action_potential',
      title: 'Action Potential Voltage Clamp',
      category: 'Question 1 & 2',
      description: 'Trigger -70mV to +30mV spikes, monitor voltage-gated Na+ influx and K+ efflux in real-time.',
      component: <ActionPotentialSimulator />,
    },
    {
      id: 'neuron_anatomy',
      title: 'Motor Neuron Anatomy Explorer',
      category: 'Question 1 & 2',
      description: 'Inspect Soma, Dendrites, Axon Hillock, Myelin Sheath, Nodes of Ranvier, and Axon Terminals.',
      component: <NeuronStructureExplorer />,
    },
    {
      id: 'synapse',
      title: 'Chemical Synapse Transmission',
      category: 'Question 3',
      description: 'Ca2+ influx, neurotransmitter vesicle exocytosis, 20nm cleft diffusion, and postsynaptic EPSP.',
      component: <SynapseSimulator />,
    },
    {
      id: 'bci_pipeline',
      title: '3-Stage BCI System & Actuators',
      category: 'Question 4 & 5',
      description: 'EEG sensors ➔ DSP/ML feature classification ➔ Actuate wheelchair, prosthetic hand, or fatigue alarm.',
      component: <BciPipelineSimulator />,
    },
    {
      id: 'ann_vs_bnn',
      title: 'ANN Perceptron vs Biological Neuron',
      category: 'Question 6',
      description: 'Compare mathematical weight dot-products with biological electrochemical summation.',
      component: <AnnVsBnnArena />,
    },
    {
      id: 'innate_adaptive',
      title: 'Innate vs Adaptive Immune Battle',
      category: 'Question 7',
      description: 'Experience hours 0-12 innate phagocytosis vs days 4-7 adaptive antibody surge and memory formation.',
      component: <InnateVsAdaptiveSimulator />,
    },
    {
      id: 'nk_cells',
      title: 'NK Cell Missing-Self Attack',
      category: 'Question 8',
      description: 'Inspect MHC-I surface markers, punch membrane holes with Perforin, and inject Granzymes.',
      component: <NkCellSimulator />,
    },
    {
      id: 'mrna_vaccine',
      title: 'mRNA Vaccine Translation & Shield',
      category: 'Question 9 & 10',
      description: 'LNP cellular entry, cytoplasmic ribosome translation, and primary vs secondary memory curves.',
      component: <MrnaVaccineSimulator />,
    },
    {
      id: 'vaccine_types',
      title: '7 Vaccine Modalities Explorer',
      category: 'Question 11',
      description: 'Explore Whole Inactivated, Live-Attenuated, Subunit, Viral-Vector, mRNA, DNA, and VLP vaccines.',
      component: <VaccineTypesExplorer />,
    },
  ];

  const currentSim = sims.find((s) => s.id === activeSimId) || sims[0];

  return (
    <div className="flex-1 pb-20 space-y-4 px-4 pt-3 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="glass-pebble p-5 border border-white/15 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
          <Activity className="w-4 h-4" />
          <span>Interactive Science Laboratory</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Biological Process Simulators
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Manipulate variables, observe ion currents, trigger immune responses, and explore what actually happens behind the scenes.
        </p>
      </div>

      {/* Horizontal Carousel Selector */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-slate-300 font-mono pl-1">SELECT A SIMULATOR:</span>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {sims.map((s) => {
            const isSelected = s.id === activeSimId;
            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSimId(s.id);
                }}
                className={`p-3.5 rounded-[24px] border text-left shrink-0 w-52 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'glass-pebble-active text-white'
                    : 'glass-pebble hover:border-white/20 text-slate-300'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 block font-semibold">{s.category}</span>
                  <span className="text-xs font-bold leading-tight block mt-0.5 text-white">{s.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 line-clamp-2">{s.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Simulator Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold text-slate-100">{currentSim.title}</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 glass-pill px-2.5 py-0.5 border border-cyan-400/30">
            {currentSim.category}
          </span>
        </div>

        {currentSim.component}
      </div>
    </div>
  );
};
