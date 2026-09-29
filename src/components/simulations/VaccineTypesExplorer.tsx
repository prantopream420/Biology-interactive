import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface VaccineTypeInfo {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  mechanism: string;
  pros: string[];
  cons: string[];
  examples: string[];
  coldChain: string;
  highlight?: boolean;
}

const VACCINE_TYPES: VaccineTypeInfo[] = [
  {
    id: 'inactivated',
    name: 'Whole Inactivated',
    category: 'Killed Pathogen',
    icon: '🧪',
    description: 'Pathogen killed with heat, radiation, or chemicals (formalin); cannot reproduce or cause infection.',
    mechanism: 'Presents dead intact viral capsid antigens to circulating antigen-presenting cells to produce humoral antibodies.',
    pros: ['Completely safe; cannot mutate back to virulence', 'Stable storage'],
    cons: ['Requires multiple booster doses', 'Slightly weaker cellular T-cell response'],
    examples: ['Salk Polio Vaccine (IPV)', 'Sinovac / CoronaVac', 'Rabies vaccine', 'Hepatitis A'],
    coldChain: 'Standard refrigeration (2°C to 8°C)',
  },
  {
    id: 'live_attenuated',
    name: 'Live-Attenuated',
    category: 'Weakened Living Pathogen',
    icon: '🦠',
    description: 'Living pathogen grown in lab conditions until it loses pathogenicity while retaining replication ability.',
    mechanism: 'Simulates a mild, harmless infection in the host, providing broad, lifelong humoral and cellular T-cell protection.',
    pros: ['Very strong, long-lasting immunity with 1-2 doses', 'High efficacy'],
    cons: ['Risk in immunocompromised individuals', 'Rare risk of reversion to virulence'],
    examples: ['MMR (Measles, Mumps, Rubella)', 'Oral Polio Vaccine (Sabin)', 'Yellow Fever', 'Varicella'],
    coldChain: 'Requires strict freezing / refrigeration',
  },
  {
    id: 'subunit',
    name: 'Subunit / Synthetic Peptide',
    category: 'Purified Protein Antigen',
    icon: '🧬',
    description: 'Contains only isolated, purified antigenic fragments (e.g., surface proteins or capsular polysaccharides).',
    mechanism: 'Only the harmless antigenic epitope is presented; adjuvant is added to boost immune recognition.',
    pros: ['Extremely safe; minimal adverse reactions', 'Can be given to immunocompromised patients'],
    cons: ['Requires chemical adjuvants and periodic boosters', 'Complex protein manufacturing'],
    examples: ['Hepatitis B vaccine', 'Novavax (COVID-19)', 'Pertussis (Whooping cough)', 'Shingrix (Shingles)'],
    coldChain: 'Standard refrigeration (2°C to 8°C)',
  },
  {
    id: 'viral_vector',
    name: 'Recombinant Viral-Vector',
    category: 'Carrier Virus Delivery',
    icon: '🚀',
    description: 'A harmless, replication-deficient virus (such as adenovirus) engineered to carry the genetic code for the antigen.',
    mechanism: 'Vector infects cells, delivers the antigen gene, and host cells express the antigen to elicit dual T-cell and B-cell immunity.',
    pros: ['Strong cellular and antibody response', 'Robust single or double-dose efficacy'],
    cons: ['Pre-existing immunity against vector virus can reduce effectiveness', 'Complex biological production'],
    examples: ['Oxford-AstraZeneca (ChAdOx1)', 'Johnson & Johnson (Ad26)', 'Ebola (Ervebo)', 'Sputnik V'],
    coldChain: 'Standard refrigeration (2°C to 8°C)',
  },
  {
    id: 'mrna',
    name: 'mRNA Vaccines',
    category: 'Genetic Instructions',
    icon: '⚡',
    description: 'Synthetic messenger RNA encoding the viral antigen enclosed in protective lipid nanoparticles (LNPs).',
    mechanism: 'Cellular ribosomes translate mRNA directly into harmless antigen in cytoplasm. Zero pathogen, zero genomic integration.',
    pros: ['Rapid digital redesign against new variants', 'Potent antibody + T-cell immunity', 'No live pathogen'],
    cons: ['Requires ultra-cold freezer storage (-80°C to -20°C)', 'New manufacturing infrastructure'],
    examples: ['Pfizer-BioNTech (Comirnaty)', 'Moderna (Spikevax)'],
    coldChain: 'Ultra-cold storage (-80°C to -20°C)',
    highlight: true,
  },
  {
    id: 'dna',
    name: 'DNA Vaccines',
    category: 'Plasmid Genetic Code',
    icon: '🔬',
    description: 'Engineered circular bacterial plasmid DNA containing the gene coding for the antigen.',
    mechanism: 'DNA must enter the nucleus to be transcribed to mRNA, then translated by ribosomes into antigen protein.',
    pros: ['Extremely stable at ambient room temperature', 'Inexpensive large-scale synthesis'],
    cons: ['Requires electroporation or needle-free injectors', 'Theoretical genomic integration scrutiny'],
    examples: ['ZyCoV-D (Approved in India for COVID-19)', 'Veterinary West Nile virus vaccines'],
    coldChain: 'High room temperature stability (25°C)',
  },
  {
    id: 'vlp',
    name: 'Virus-Like Particles (VLP)',
    category: 'Viral Shell Replica',
    icon: '⚽',
    description: 'Empty multiprotein structural capsids that closely mimic authentic viral architecture but contain zero viral genetic material.',
    mechanism: 'Repetitive surface geometry strongly cross-links B-cell receptors, triggering intense antibody production without any replication risk.',
    pros: ['Extremely immunogenic and safe', 'Completely non-infectious'],
    cons: ['Challenging to assemble in cell cultures', 'High production cost'],
    examples: ['Gardasil / Cervarix (HPV Human Papillomavirus)', 'Engerix-B'],
    coldChain: 'Standard refrigeration (2°C to 8°C)',
  },
];

export const VaccineTypesExplorer: React.FC = () => {
  const [selectedType, setSelectedType] = useState<VaccineTypeInfo>(VACCINE_TYPES[4]); // mRNA default

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            The 7 Major Vaccine Modalities
          </h4>
          <p className="text-xs text-slate-400">Class Test Question 11: Complete classification & mRNA spotlight</p>
        </div>
        <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
          7 Types Matrix
        </span>
      </div>

      {/* Horizontal Carousel / Grid of 7 Vaccine Types */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
        {VACCINE_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              sound.playClick();
              setSelectedType(type);
            }}
            className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-between min-h-[75px] ${
              selectedType.id === type.id
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-lg">{type.icon}</span>
            <span className="text-[11px] font-semibold leading-tight mt-1 line-clamp-2">
              {type.name}
            </span>
            {type.highlight && (
              <span className="text-[9px] font-mono text-cyan-300 font-bold mt-0.5">★ Highlight</span>
            )}
          </button>
        ))}
      </div>

      {/* Selected Vaccine Detailed Card */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">{selectedType.icon}</span>
            <div>
              <h5 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                {selectedType.name}
                {selectedType.highlight && (
                  <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/40">
                    CT Focus Question
                  </span>
                )}
              </h5>
              <span className="text-xs text-cyan-400 font-mono">{selectedType.category}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {selectedType.coldChain}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{selectedType.description}</p>

        {/* Mechanism box */}
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <strong className="text-slate-200 block mb-0.5">Biological Mechanism:</strong>
          <span className="text-slate-300 text-[11px]">{selectedType.mechanism}</span>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-1">
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Key Advantages
            </span>
            <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
              {selectedType.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1">
            <span className="font-semibold text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Limitations & Considerations
            </span>
            <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
              {selectedType.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real-world Clinical Examples */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Examples for CT Answer:</span>
          {selectedType.examples.map((ex, i) => (
            <span
              key={i}
              className="text-[11px] font-mono bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-800"
            >
              {ex}
            </span>
          ))}
        </div>
      </div>

      {/* CT Focus Note on mRNA */}
      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-cyan-100">Why CT Questions Emphasize mRNA Vaccines:</strong>
          <span className="ml-1 text-slate-300">
            They safely provide instructions for antigen production directly to human ribosomes, training humoral antibodies and cytotoxic T cells without risking disease exposure or genetic integration.
          </span>
        </div>
      </div>
    </div>
  );
};
