import { CTTopic } from '../types';

export const CT_TOPICS: CTTopic[] = [
  {
    id: 'motor-neuron-ap',
    questionNumber: '1 & 2',
    title: 'Motor Neuron Structure & Action Potential Generation',
    category: 'neuro_bci',
    shortSummary: 'Anatomy of motor neurons (soma, dendrites, axon, axon terminal) and the sequential stages of action potential generation from resting -70mV to depolarization and repolarization.',
    imageAsset: '/src/assets/images/motor_neuron_synapse_art_1790658353194.jpg',
    simulationType: 'neuron_ap',
    keyTerms: ['Soma', 'Dendrites', 'Axon', 'Axon Terminal', 'Resting Potential (-70mV)', 'Threshold (-55mV)', 'Depolarization (Na+ influx)', 'Repolarization (K+ efflux)', 'Refractory Period'],
    examTips: 'Remember the precise voltage numbers: Resting = -70 mV, Threshold = ~-55 mV, Peak overshoot = +30 mV to +40 mV. Na+ ions rush IN during depolarization, K+ ions rush OUT during repolarization.',
    detailedAnswers: [
      {
        heading: 'Motor Neuron Structure',
        items: [
          'Cell body (soma): Contains the nucleus and metabolic machinery; controls all cell activities and integrates incoming graded potentials.',
          'Dendrites: Branched extensions that receive chemical and electrical signals from other neurons and convey them toward the soma.',
          'Axon: A single, elongated cylindrical process carrying nerve impulses (action potentials) away from the cell body toward target cells.',
          'Axon terminal: The distal end of the axon that forms a functional synapse with muscle fibers (neuromuscular junction) or other neurons.'
        ]
      },
      {
        heading: 'Action Potential Generation (Step-by-Step)',
        items: [
          '1. Resting Potential: The membrane starts at a resting state of roughly -70mV, maintained actively by the Na+/K+ ATPase pump (3 Na+ out, 2 K+ in).',
          '2. Stimulus & Threshold: An excitatory incoming stimulus causes graded depolarization until reaching the critical firing threshold (~-55mV).',
          '3. Rapid Depolarization: Voltage-gated Na+ channels swing open; extracellular Na+ rushes down its electrochemical gradient into the cell, rapidly inverting the membrane potential up to +30mV.',
          '4. Repolarization: Voltage-gated Na+ channels inactivate, and voltage-gated K+ channels open; K+ moves out of the intracellular space, restoring internal negativity.',
          '5. Hyperpolarization & Return: Brief undershoot (~-80mV to -90mV) before voltage-gated K+ channels close and the resting potential (-70mV) is fully re-established.'
        ],
        highlight: 'All-or-None Principle: If the stimulus reaches -55mV threshold, a full action potential will fire with identical amplitude regardless of stimulus strength.'
      }
    ]
  },
  {
    id: 'synapse-signal-transfer',
    questionNumber: '3',
    title: 'Synapse and Signal Transfer',
    category: 'neuro_bci',
    shortSummary: 'Definition of a synapse and the biochemical sequence of neurotransmitter release, cleft diffusion, and postsynaptic excitation.',
    imageAsset: '/src/assets/images/motor_neuron_synapse_art_1790658353194.jpg',
    simulationType: 'synapse',
    keyTerms: ['Synapse', 'Presynaptic Terminal', 'Synaptic Cleft', 'Neurotransmitter Vesicles', 'Voltage-gated Ca2+ channels', 'Exocytosis', 'Postsynaptic Receptors', 'EPSP / Action Potential'],
    examTips: 'Make sure to mention calcium (Ca2+) influx as the trigger for vesicle fusion and exocytosis. Emphasize that the signal transitions from ELECTRICAL (axon) to CHEMICAL (synapse) and back to ELECTRICAL (postsynaptic cell).',
    detailedAnswers: [
      {
        heading: 'Definition of a Synapse',
        items: [
          'A synapse is a specialized functional connection or junction between a neuron and another cell (such as another neuron, muscle fiber, or gland cell) across which nerve signals are communicated.'
        ]
      },
      {
        heading: 'The Signal Transfer Process',
        items: [
          'Arrival of Action Potential: When an action potential reaches the presynaptic axon terminal, the local depolarization opens voltage-gated Ca2+ channels.',
          'Vesicle Fusion: Influx of Ca2+ causes synaptic vesicles filled with chemical messengers (neurotransmitters like Acetylcholine or Glutamate) to fuse with the presynaptic membrane.',
          'Exocytosis into Cleft: Neurotransmitters are released into the narrow synaptic gap (approx 20-40 nm wide) and diffuse across.',
          'Receptor Binding: These chemical messengers bind specifically to matching ligand-gated ionotropic or metabotropic receptors on the postsynaptic membrane.',
          'Postsynaptic Excitation: Receptor binding opens ion channels, causing local membrane potential shifts (EPSP). If the threshold is reached at the postsynaptic trigger zone, a brand new action potential is generated.'
        ],
        highlight: 'Termination: The signal is quickly terminated via enzymatic degradation (e.g., Acetylcholinesterase) or presynaptic reuptake transporters to prepare for subsequent pulses.'
      }
    ]
  },
  {
    id: 'bci-definition-components',
    questionNumber: '4',
    title: 'Brain-Computer Interface (BCI) Definition & Components',
    category: 'neuro_bci',
    shortSummary: 'Direct communication link translating functional intent from neural electrophysiology into external machine commands without using peripheral nerves or muscles.',
    imageAsset: '/src/assets/images/bci_neural_interface_hero_1790658339030.jpg',
    simulationType: 'bci_pipeline',
    keyTerms: ['Brain-Computer Interface (BCI)', 'Measuring Device (EEG)', 'Processing System (DSP/ML)', 'Application / Actuator', 'Feature Extraction', 'Electrodes', 'Neuroprosthetics'],
    examTips: 'For CT exams, always list the 3 major components in order: (1) Measuring Device, (2) Processing System, (3) Application. State clearly that BCI bypasses damaged muscular/peripheral pathways.',
    detailedAnswers: [
      {
        heading: 'BCI Definition',
        items: [
          'A Brain-Computer Interface (BCI) is a hardware and software communication system that determines a person\'s functional intent directly from brain activity (electrophysiological or hemodynamic signals) to control external devices without relying on peripheral nerves or muscular pathways.'
        ]
      },
      {
        heading: 'Major Components of a BCI System',
        items: [
          '1. Measuring Device: High-precision sensors (such as an EEG cap with electrode arrays, ECoG grid, or microelectrode array) that safely detect and record neural signals from the scalp or cortex.',
          '2. Processing System: A computational pipeline that filters noise/artifacts, extracts distinctive neural features (like P300 waves or sensorimotor Mu/Beta rhythms), and uses machine learning decoders to classify the intended command.',
          '3. Application Device: The end effector or external tool (such as a motorized wheelchair, robotic prosthetic arm, communication speller grid, or computer cursor) that executes the intended action.'
        ],
        highlight: 'Closed-Loop Biofeedback: Modern BCI systems provide visual, auditory, or haptic sensory feedback back to the user, allowing the brain to adapt its neural output.'
      }
    ]
  },
  {
    id: 'bci-applications',
    questionNumber: '5',
    title: 'Applications of Brain-Computer Interfaces',
    category: 'neuro_bci',
    shortSummary: 'Medical and non-medical uses of BCI: Locked-in syndrome communication, wheelchair control, FES therapy, cognitive fatigue monitoring, and VR/gaming.',
    imageAsset: '/src/assets/images/bci_neural_interface_hero_1790658339030.jpg',
    simulationType: 'bci_applications',
    keyTerms: ['Locked-in Syndrome', 'Amyotrophic Lateral Sclerosis (ALS)', 'Motorized Wheelchair', 'Neuroprosthetic Limbs', 'Functional Electrical Stimulation (FES)', 'Vigilance / Fatigue Monitoring', 'Neuromarketing & VR'],
    examTips: 'Group applications into Assistive/Medical (Communication, Wheelchair, Prosthetics, FES) and Cognitive/Commercial (Fatigue monitoring in air-traffic control, VR, Gaming).',
    detailedAnswers: [
      {
        heading: 'Key Real-World Applications',
        items: [
          'Communication for Locked-in Syndrome: Restores speech or text spelling for individuals with severe physical disabilities, ALS, or brainstem stroke through P300 or motor imagery spellers.',
          'Locomotion & Prosthetic Control: Enables paralyzed patients to steer powered wheelchairs and actuate multi-degree-of-freedom robotic limbs or prosthetic hands.',
          'Functional Electrical Stimulation (FES) Therapies: Delivers timed electrical pulses to paralyzed muscles triggered directly by motor cortex intent to promote neuroplastic rehabilitation after spinal cord injury.',
          'Fatigue & Vigilance Assessment: Monitors cognitive load, drowsiness, and vigilance drop-offs for high-attention safety-critical operators (e.g., air traffic controllers, pilots, train operators).',
          'Immersive Gaming, VR & Neuromarketing: Enables hands-free virtual avatar control in gaming and measures subconscious emotional attention/engagement during consumer studies.'
        ]
      }
    ]
  },
  {
    id: 'ann-vs-bnn',
    questionNumber: '6',
    title: 'Artificial Neural Network (ANN) vs Biological Neural Network (BNN)',
    category: 'neuro_bci',
    shortSummary: 'In-depth contrast between artificial computational models (weights, backprop, digital arithmetic) and biological nervous systems (synapses, electrochemical spikes, Hebbian plasticity).',
    imageAsset: '/src/assets/images/motor_neuron_synapse_art_1790658353194.jpg',
    simulationType: 'ann_vs_bnn',
    keyTerms: ['Artificial Neuron (Perceptron)', 'Biological Neuron', 'Synaptic Weight', 'Neurotransmitters', 'Backpropagation', 'Hebbian Learning / Plasticity', 'Spike Train vs Scalar Activations'],
    examTips: 'Draw a simple comparison table in your CT answer: Building blocks, Signal type, Transmission mode, Learning algorithm, and Energy efficiency (~20W for human brain vs Kilowatts for AI servers).',
    detailedAnswers: [
      {
        heading: 'Artificial Neural Network (ANN)',
        items: [
          'Nature: A mathematical computational architecture inspired by the brain\'s structure.',
          'Units: Composed of artificial nodes (perceptrons) organized into input, hidden, and output layers.',
          'Signal: Operates with numerical continuous/discrete values (matrices, floating-point vectors).',
          'Learning: Mathematical optimization algorithm (Backpropagation and Stochastic Gradient Descent) that updates numerical weight matrices.',
          'Processing: Synchronous matrix operations executed on high-energy electronic processors (CPUs/GPUs/TPUs).'
        ]
      },
      {
        heading: 'Biological Neural Network (BNN)',
        items: [
          'Nature: The living network of interconnected neurons and glial cells in biological organisms.',
          'Units: Living biological motor, sensory, and interneurons with soma, dendritic arbor, and axon.',
          'Signal: Asynchronous all-or-none electrical action potentials (spikes) combined with biochemical neurotransmitter flux.',
          'Learning: Natural synaptic plasticity (Long-Term Potentiation/Depression and Hebbian learning: "neurons that fire together, wire together").',
          'Efficiency: Ultra-low power consumption (~20 Watts for the entire human brain) with massive parallel fault-tolerant connectivity.'
        ]
      }
    ]
  },
  {
    id: 'innate-vs-adaptive',
    questionNumber: '7',
    title: 'Innate vs Adaptive Immunity',
    category: 'immunology',
    shortSummary: 'Non-specific, rapid first line of defense present from birth vs specific, memory-forming immune response powered by B cells, T cells, and antibodies.',
    imageAsset: '/src/assets/images/immune_system_defense_art_1790658364706.jpg',
    simulationType: 'innate_adaptive',
    keyTerms: ['Innate Immunity', 'Adaptive (Acquired) Immunity', 'Non-specific', 'Antigen-specific', 'Immunological Memory', 'Phagocytes (Macrophages, Neutrophils)', 'B Cells & T Cells', 'Antibodies'],
    examTips: 'CT golden points: Innate = Immediate (0-12 hrs), Non-specific, No memory. Adaptive = Delayed (days), Highly antigen-specific, Generates lifelong memory cells.',
    detailedAnswers: [
      {
        heading: 'Innate Immunity (First Line of Defense)',
        items: [
          'Onset: Rapid, immediate response (acting within minutes to hours upon pathogen contact).',
          'Specificity: Non-specific; recognizes broad generic pathogen patterns (PAMPs) via pattern recognition receptors.',
          'Heritage: Present from birth; does not change or improve upon repeated exposure.',
          'Memory: Has no immunological memory.',
          'Components: Physical/chemical barriers (skin, mucosal linings, stomach acid), circulating phagocytic cells (macrophages, neutrophils, dendritic cells), complement system, and Natural Killer cells.'
        ]
      },
      {
        heading: 'Adaptive Immunity (Acquired Defense)',
        items: [
          'Onset: Delayed primary response (takes days to weeks to clone and mobilize specific lymphocytes).',
          'Specificity: Extremely specific; precisely recognizes unique antigen epitopes via custom receptor configurations.',
          'Heritage: Acquired and tailored over a lifetime following infection, antigen exposure, or vaccination.',
          'Memory: Possesses long-lasting immunological memory (Memory B and T cells provide rapid protection against secondary infections).',
          'Components: B lymphocytes (humoral immunity; plasma cells secreting antibodies) and T lymphocytes (cell-mediated immunity; CD4+ Helper T cells, CD8+ Cytotoxic T cells).'
        ]
      }
    ]
  },
  {
    id: 'nk-cells',
    questionNumber: '8',
    title: 'Natural Killer (NK) Cells: Operation & Distinction',
    category: 'immunology',
    shortSummary: 'How NK cells target altered-self cells using perforin and granzyme apoptosis, and why they differ from conventional white blood cells.',
    imageAsset: '/src/assets/images/immune_system_defense_art_1790658364706.jpg',
    simulationType: 'nk_cells',
    keyTerms: ['Natural Killer (NK) Cells', 'Perforin', 'Granzymes', 'Apoptosis (Programmed Cell Death)', 'MHC Class I ("Missing Self")', 'Cytokines (IFN-γ)', 'Tumor Surveillance'],
    examTips: 'Keywords for full marks: "Perforin punches holes", "Granzymes enter to induce apoptosis", "Attacks body\'s own infected/malignant cells rather than free bacteria".',
    detailedAnswers: [
      {
        heading: 'How Natural Killer (NK) Cells Operate',
        items: [
          'Recognition of Abnormal Cells: NK cells inspect body cells. When a cell lacks normal MHC Class I molecules (a common evasion tactic of viruses and cancerous tumors) or displays stress ligands, inhibitory signals vanish and activating signals dominate.',
          'Attachment & Perforin Release: The NK cell adheres tightly to the target cell membrane and polarizes its secretory granules, exocytosing perforin molecules.',
          'Pore Formation: Perforin polymerizes into pore-like channels that physically punch holes into the target cell membrane.',
          'Granzyme-Induced Apoptosis: Granzymes (cytotoxic serine proteases) enter through these pores, cleaving vital intracellular proteins and activating the caspase cascade to trigger programmed cell death (apoptosis).',
          'Cytokine Amplification: NK cells simultaneously secrete proinflammatory cytokines (like Interferon-gamma / IFN-γ) to activate surrounding macrophages and stimulate the broader immune system.'
        ]
      },
      {
        heading: 'Key Distinction from Other White Blood Cells',
        items: [
          'Target Focus: While most white blood cells (like neutrophils or circulating monocytes) directly attack, engulf, or target foreign outside invaders (free bacteria, parasites), NK cells specifically hunt and eliminate the body\'s OWN compromised, virus-infected, or malignant/cancerous cells.'
        ]
      }
    ]
  },
  {
    id: 'mrna-vaccine-advantages',
    questionNumber: '9',
    title: 'Advantages of mRNA Vaccines',
    category: 'immunology',
    shortSummary: 'Why mRNA vaccine technology provides superior safety, high potency, rapid synthetic production, and nimble adaptability against viral variants.',
    imageAsset: '/src/assets/images/mrna_vaccine_nanoparticle_art_1790658377298.jpg',
    simulationType: 'mrna_advantages',
    keyTerms: ['mRNA Vaccine', 'Genetic Blueprint', 'Lipid Nanoparticles (LNP)', 'Non-infectious', 'Humoral & Cellular Response', 'Rapid Modular Synthesis', 'Spike Protein'],
    examTips: 'Remember the 3 pillars: (1) Safety (genetic blueprint, no live virus, no genomic integration), (2) High Efficacy (antibodies + killer T-cells), (3) Rapid Scalability (cell-free in vitro transcription).',
    detailedAnswers: [
      {
        heading: 'Three Core Advantages of mRNA Vaccines',
        items: [
          '1. Genetic Blueprint Safety: They deliver only an mRNA instructional blueprint coding for a harmless antigen, without introducing any actual live, weakened, or killed virus. There is zero risk of causing the disease, and mRNA degrades naturally without ever entering the host cell nucleus or integrating into genomic DNA.',
          '2. Strong, Dual Immune Response: Once translated by host cellular ribosomes, the antigen is displayed both extracellularly and via MHC pathways, triggering a potent dual response: high-affinity neutralizing antibodies (B cells) and cytotoxic T-cell cellular immunity.',
          '3. Rapid Manufacturing & Nimble Adaptability: Production is cell-free (synthesized in vitro). As soon as a newly emerging viral variant is sequenced digitally, updated mRNA vaccines can be synthesized within weeks simply by editing the RNA sequence.'
        ]
      }
    ]
  },
  {
    id: 'vaccine-protection-mechanism',
    questionNumber: '10',
    title: 'Vaccine Protection Mechanism',
    category: 'immunology',
    shortSummary: 'How safe antigen exposure triggers primary immune response, establishes long-lived memory cells, and ensures instantaneous destruction upon secondary pathogen invasion.',
    imageAsset: '/src/assets/images/mrna_vaccine_nanoparticle_art_1790658377298.jpg',
    simulationType: 'vaccine_mechanism',
    keyTerms: ['Primary Response', 'Secondary (Anamnestic) Response', 'Memory B Cells', 'Memory T Cells', 'Neutralizing Antibodies', 'Immune Memory', 'Pathogen Neutralization'],
    examTips: 'CT examiners look for: Primary response is slower and produces moderate antibodies; secondary response is immediate, higher in magnitude, and prevents disease manifestation.',
    detailedAnswers: [
      {
        heading: 'Step-by-Step Protection Mechanism',
        items: [
          'Safe Exposure: The vaccine introduces a harmless, non-pathogenic form of the disease agent (inactivated virus, protein subunit, or genetic mRNA blueprint) into the body without causing illness.',
          'Primary Immune Activation: Antigen-presenting cells (dendritic cells) capture and display the antigen. Helper T cells activate B cells to differentiate into plasma cells that secrete specific antibodies, while cytotoxic T cells are primed.',
          'Memory Cell Formation: A critical population of long-lived Memory B cells and Memory T cells is created, which continuously circulates through the bloodstream and lymphoid organs for months to decades.',
          'Secondary Attack (The "Shield"): If the virulent wild pathogen ever enters the body in the future, these memory cells recognize the antigen instantly. They unleash an immediate, exponential antibody surge and cytotoxic response that neutralizes the invader before it can multiply and cause serious illness.'
        ]
      }
    ]
  },
  {
    id: 'vaccine-types-overview',
    questionNumber: '11',
    title: 'Vaccine Types & Complete Overview',
    category: 'immunology',
    shortSummary: 'Comprehensive classification of 7 vaccine modalities: Whole Inactivated, Live-Attenuated, Subunit, Recombinant Viral-Vector, mRNA, DNA, and Virus-Like Particles (VLP).',
    imageAsset: '/src/assets/images/mrna_vaccine_nanoparticle_art_1790658377298.jpg',
    simulationType: 'vaccine_types',
    keyTerms: ['Whole Inactivated', 'Live-Attenuated', 'Subunit / Peptide', 'Recombinant Viral Vector', 'mRNA Vaccine', 'DNA Vaccine', 'Virus-Like Particle (VLP)'],
    examTips: 'Be ready to name all 7 types with real examples (e.g. MMR = Live-attenuated, Salk Polio = Inactivated, Hep B = Subunit, COVID-19 Pfizer = mRNA, AstraZeneca = Viral Vector, HPV = VLP).',
    detailedAnswers: [
      {
        heading: 'How Vaccines Help the Immune System',
        items: [
          'By safely presenting antigens without disease-causing virulence, vaccines train the immune system to synthesize high-affinity antibodies and build an enduring reserve of memory cells for rapid future defense.'
        ]
      },
      {
        heading: 'The 7 Major Types of Vaccines',
        items: [
          '1. Whole Inactivated: Contains viruses or bacteria killed with chemicals or heat (e.g., Salk Polio, Sinovac, Rabies). Stable, cannot revert to virulence.',
          '2. Live-Attenuated: Uses living pathogen weakened in the lab (e.g., MMR, Yellow Fever, Oral Polio Sabin). Triggers strong lifelong immunity with 1-2 doses.',
          '3. Subunit / Synthetic Peptide: Contains only specific purified fragments or proteins of the pathogen (e.g., Hepatitis B, Novavax, Pertussis). Very safe with minimal side effects.',
          '4. Recombinant Viral-Vector: Uses a harmless unrelated carrier virus (like Adenovirus) engineered to deliver the gene for the target antigen (e.g., Oxford-AstraZeneca, J&J, Ebola).',
          '5. mRNA Vaccines: Encapsulates messenger RNA inside lipid nanoparticles, teaching human host cells to synthesize the antigen protein directly (e.g., Pfizer-BioNTech, Moderna).',
          '6. DNA Vaccines: Delivers engineered circular plasmid DNA encoding the antigen directly into host cells (e.g., ZyCoV-D). Very heat-stable.',
          '7. Virus-Like Particle (VLP): Multiprotein structures that mimic the authentic viral exterior but lack any genetic material inside (e.g., HPV Gardasil vaccine). Highly immunogenic and non-infectious.'
        ]
      },
      {
        heading: 'Why mRNA Vaccines Are Highlighted',
        items: [
          'mRNA represents a major technological leap because it safely instructs our own cellular protein factories (ribosomes) to manufacture the exact antigen, bypassing the need for cultured pathogens or viral vectors, eliminating infection risk, and enabling rapid redesign against variants.'
        ]
      }
    ]
  }
];
