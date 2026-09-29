import { QuizQuestion } from '../types';

export const EXPANDED_QUIZ_POOL: QuizQuestion[] = [
  // Question 1 & 2: Motor Neuron & Action Potential
  {
    id: 'exp_ap_1',
    topicId: 'motor-neuron-ap',
    question: 'During an action potential, which event causes the rapid depolarization phase from -55mV to +30mV?',
    options: [
      'Voltage-gated K+ channels opening, causing K+ efflux',
      'Voltage-gated Na+ channels opening, allowing rapid Na+ influx into the cell',
      'The active shutdown of all ATP-dependent pumps',
      'Chloride ions rapidly flooding out of the cell'
    ],
    correctIndex: 1,
    explanation: 'Once threshold (-55mV) is reached, voltage-gated Na+ channels rapidly open, allowing Na+ to rush down its electrochemical gradient into the cell, inverting membrane polarity up to +30mV.',
    keyTakeaway: 'Depolarization = Fast Na+ influx.'
  },
  {
    id: 'exp_ap_2',
    topicId: 'motor-neuron-ap',
    question: 'What is the primary role of the dendrites in a motor neuron?',
    options: [
      'To insulate the nerve fiber with myelin sheaths',
      'To synthesize all cellular ATP in the synaptic terminal',
      'To receive incoming electrical and chemical signals from other neurons',
      'To carry impulses away from the cell body toward muscle effectors'
    ],
    correctIndex: 2,
    explanation: 'Dendrites are branching cellular arborizations that receive incoming inputs from adjacent neurons and conduct graded potentials toward the soma.',
    keyTakeaway: 'Dendrites receive incoming signals; Axon carries signals away.'
  },
  {
    id: 'exp_ap_3',
    topicId: 'motor-neuron-ap',
    question: 'What happens during the repolarization phase of an action potential?',
    options: [
      'Na+ channels open wider and K+ channels close tightly',
      'Na+ channels inactivate, and voltage-gated K+ channels open allowing K+ to move out',
      'Calcium ions are pumped out of the soma',
      'The membrane potential stays fixed at +30mV permanently'
    ],
    correctIndex: 1,
    explanation: 'Repolarization restores internal negativity when voltage-gated Na+ channels inactivate and voltage-gated K+ channels open, allowing K+ ions to exit the cell.',
    keyTakeaway: 'Repolarization = K+ channels open, K+ moves OUT.'
  },
  {
    id: 'exp_ap_4',
    topicId: 'motor-neuron-ap',
    question: 'What is the typical resting membrane potential of a resting neuron?',
    options: ['-55 mV', '+30 mV', '-70 mV', '0 mV'],
    correctIndex: 2,
    explanation: 'The baseline resting potential of a motor neuron is approximately -70mV, maintained actively by the Na+/K+ ATPase pump.',
    keyTakeaway: 'Resting potential = -70mV.'
  },
  {
    id: 'exp_ap_5',
    topicId: 'motor-neuron-ap',
    question: 'Which anatomical part of a neuron contains the nucleus and controls cell activities?',
    options: ['Axon terminal', 'Cell body (soma)', 'Node of Ranvier', 'Myelin sheath'],
    correctIndex: 1,
    explanation: 'The cell body, or soma, contains the nucleus and metabolic organelles, governing the operational life of the neuron.',
    keyTakeaway: 'Soma = Cell body containing the nucleus.'
  },
  {
    id: 'exp_ap_6',
    topicId: 'motor-neuron-ap',
    question: 'What is the critical membrane potential threshold required to trigger an all-or-none action potential?',
    options: ['-70 mV', '-55 mV', '+30 mV', '-90 mV'],
    correctIndex: 1,
    explanation: 'A stimulus must depolarize the axon hillock membrane from -70mV to approximately -55mV (threshold) to fire a full action potential.',
    keyTakeaway: 'Firing threshold = -55mV.'
  },

  // Question 3: Synapse and Signal Transfer
  {
    id: 'exp_syn_1',
    topicId: 'synapse-signal-transfer',
    question: 'What is the scientific definition of a synapse?',
    options: [
      'The protective lipid covering around an axon',
      'A functional connection between a neuron and another cell',
      'A protein channel that pumps glucose into the brain',
      'The nucleus of a Schwann cell'
    ],
    correctIndex: 1,
    explanation: 'A synapse is a specialized functional connection across which a neuron communicates with another neuron, muscle fiber, or gland cell.',
    keyTakeaway: 'Synapse = Functional junction between neuron and another cell.'
  },
  {
    id: 'exp_syn_2',
    topicId: 'synapse-signal-transfer',
    question: 'When an action potential arrives at the presynaptic axon terminal, what is immediately released from vesicles?',
    options: [
      'Myelin fragments',
      'Neurotransmitters',
      'Hemoglobin molecules',
      'Ribosomal RNA strands'
    ],
    correctIndex: 1,
    explanation: 'Depolarization opens voltage-gated Ca2+ channels, which stimulates synaptic vesicles to fuse with the membrane and release neurotransmitters into the cleft.',
    keyTakeaway: 'Vesicles release chemical neurotransmitters.'
  },
  {
    id: 'exp_syn_3',
    topicId: 'synapse-signal-transfer',
    question: 'How do neurotransmitters transmit information across the synaptic cleft?',
    options: [
      'They physically crawl along microtubule tracks across the gap',
      'They diffuse across the narrow synaptic gap and bind to matching receptors on the postsynaptic membrane',
      'They convert into electrical lightning arcs that spark across the gap',
      'They enter the postsynaptic cell via endocytosis and travel to the nucleus'
    ],
    correctIndex: 1,
    explanation: 'Neurotransmitters diffuse across the fluid-filled 20-40nm synaptic cleft and bind specifically to receptor proteins on the postsynaptic membrane.',
    keyTakeaway: 'Neurotransmitters diffuse across cleft and bind postsynaptic receptors.'
  },
  {
    id: 'exp_syn_4',
    topicId: 'synapse-signal-transfer',
    question: 'What causes a new action potential to generate in the postsynaptic neuron?',
    options: [
      'Receptor binding causes ion channels to open; if membrane changes reach threshold, a new AP fires',
      'The presynaptic axon terminal physically fuses with the postsynaptic dendrite',
      'Neurotransmitters permanently block all postsynaptic ion flow',
      'The postsynaptic cell undergoes apoptosis'
    ],
    correctIndex: 0,
    explanation: 'Receptor-ligand binding triggers ion influx, causing an excitatory postsynaptic potential (EPSP). If the threshold (-55mV) is met, a new action potential is launched.',
    keyTakeaway: 'Receptor binding -> ion flow -> threshold reached -> new action potential.'
  },

  // Question 4: BCI Definition & Components
  {
    id: 'exp_bci_1',
    topicId: 'bci-definition-components',
    question: 'What is the core definition of a Brain-Computer Interface (BCI)?',
    options: [
      'A software program that teaches users how to code using voice commands',
      'A system that determines a person\'s functional intent directly from brain activity to control a device',
      'A surgical robot that removes brain tumors automatically',
      'An optical scanner that monitors eye blinks to type words'
    ],
    correctIndex: 1,
    explanation: 'A BCI system translates neural activity directly into control commands for an external device, bypassing muscular and peripheral nerve pathways.',
    keyTakeaway: 'BCI = Direct brain intent to device control without peripheral nerves.'
  },
  {
    id: 'exp_bci_2',
    topicId: 'bci-definition-components',
    question: 'Which of the following correctly lists the 3 major components of a BCI system in sequential order?',
    options: [
      'Application device -> Peripheral muscle -> Brain cortex',
      'Measuring device -> Processing system -> Application device',
      'Motor neuron -> Spinal cord -> Prosthetic battery',
      'Audio headset -> Speech synthesizer -> Eyeglass camera'
    ],
    correctIndex: 1,
    explanation: 'The 3 foundational components are: (1) Measuring device (sensors/EEG), (2) Processing system (signal analysis & decoding), and (3) Application (wheelchair/prosthesis).',
    keyTakeaway: 'Measuring device -> Processing system -> Application device.'
  },
  {
    id: 'exp_bci_3',
    topicId: 'bci-definition-components',
    question: 'What is the role of the "Processing system" in a Brain-Computer Interface?',
    options: [
      'To provide electricity to the wheelchair motors directly',
      'To analyze raw brain signals and interpret the user\'s intended actions',
      'To record video of the patient\'s facial expressions',
      'To implant microchips into the skull'
    ],
    correctIndex: 1,
    explanation: 'The processing system filters electrical noise, extracts relevant neural wave features (e.g. Mu or Beta rhythm suppression), and classifies intended commands.',
    keyTakeaway: 'Processing system analyzes signals to decode user intent.'
  },

  // Question 5: BCI Applications
  {
    id: 'exp_bciapp_1',
    topicId: 'bci-applications',
    question: 'How does BCI assist patients suffering from "locked-in syndrome"?',
    options: [
      'By surgically repairing damaged spinal nerves with stem cells',
      'By restoring direct communication and spelling capability using brain signals alone',
      'By putting them into an artificial coma',
      'By replacing the cerebral cortex with an artificial processor'
    ],
    correctIndex: 1,
    explanation: 'Patients with locked-in syndrome (cognitively intact but completely paralyzed) use BCI spellers (e.g. P300 or motor imagery) to type letters and communicate.',
    keyTakeaway: 'BCI restores communication in locked-in syndrome.'
  },
  {
    id: 'exp_bciapp_2',
    topicId: 'bci-applications',
    question: 'Which of the following is an industrial or non-medical application of BCI systems?',
    options: [
      'Fatigue and vigilance assessment for high-attention jobs like air traffic controllers',
      'Replacing human jet engines with neural batteries',
      'Manufacturing physical car tires using thoughts',
      'Generating electricity for commercial skyscrapers'
    ],
    correctIndex: 0,
    explanation: 'BCI EEG monitors track cognitive load, drowsiness, and lapses in attention for high-stakes operators such as air traffic controllers and high-speed train drivers.',
    keyTakeaway: 'BCI monitors cognitive fatigue in safety-critical roles.'
  },
  {
    id: 'exp_bciapp_3',
    topicId: 'bci-applications',
    question: 'What is Functional Electrical Stimulation (FES) in the context of BCI therapy?',
    options: [
      'Playing high-frequency audio to stimulate the eardrum',
      'Applying timed electrical impulses to paralyzed muscles triggered directly by brain intent to promote rehabilitation',
      'Using laser pointers to guide robotic arms',
      'Injecting hormonal stimulants into the bloodstream'
    ],
    correctIndex: 1,
    explanation: 'FES pairs brain motor intent with synchronized peripheral muscle stimulation, promoting neuroplastic rewiring after stroke or spinal cord trauma.',
    keyTakeaway: 'FES therapy delivers brain-triggered stimulation to paralyzed muscles.'
  },
  {
    id: 'exp_bciapp_4',
    topicId: 'bci-applications',
    question: 'Which assistive mobility application is commonly powered by BCI?',
    options: [
      'Autonomous airplanes without pilots',
      'Power wheelchairs and prosthetic limbs driven by neural intent',
      'Electric bicycles with foot pedals',
      'Magnetic levitation trains'
    ],
    correctIndex: 1,
    explanation: 'BCIs translate sensorimotor rhythm shifts or imagined limb movements into directional commands for motorized wheelchairs and bionic hands.',
    keyTakeaway: 'BCI controls power wheelchairs and prosthetic limbs.'
  },

  // Question 6: ANN vs BNN
  {
    id: 'exp_ann_1',
    topicId: 'ann-vs-bnn',
    question: 'What is an Artificial Neural Network (ANN)?',
    options: [
      'A network of living brain cells grown inside a glass petri dish',
      'A mathematical computer model inspired by the brain that learns by adjusting numerical weights',
      'A radio transmitter that connects smartphones directly to neurons',
      'A biological organ found in vertebrate animals'
    ],
    correctIndex: 1,
    explanation: 'An ANN is a mathematical architecture consisting of artificial nodes and numeric weight matrices that update via training algorithms like backpropagation.',
    keyTakeaway: 'ANN = Mathematical computer model with artificial weights.'
  },
  {
    id: 'exp_ann_2',
    topicId: 'ann-vs-bnn',
    question: 'How does a Biological Neural Network (BNN) transmit information, compared to an ANN?',
    options: [
      'BNN transmits via discrete floating-point numbers in GPU memory',
      'BNN transmits via electrical signals (action potentials) and chemical neurotransmitters',
      'BNN transmits through optical fiber cables',
      'BNN cannot transmit information across cells'
    ],
    correctIndex: 1,
    explanation: 'Biological networks communicate using asynchronous electrochemical action potentials and neurotransmitter exocytosis across synapses.',
    keyTakeaway: 'BNN uses electrical impulses and biochemical neurotransmitters.'
  },
  {
    id: 'exp_ann_3',
    topicId: 'ann-vs-bnn',
    question: 'How do Biological Neural Networks (BNNs) learn from real-life experiences?',
    options: [
      'By running gradient descent code compiled in Python',
      'Naturally by changing synaptic connection strength (synaptic plasticity / LTP)',
      'By rebooting the neuron memory chips every night',
      'By replacing biological neurons with artificial chips'
    ],
    correctIndex: 1,
    explanation: 'BNNs learn through synaptic plasticity (Hebbian learning and Long-Term Potentiation), strengthening or weakening biological synaptic junctions based on activity.',
    keyTakeaway: 'BNN learns by changing synaptic strength naturally.'
  },
  {
    id: 'exp_ann_4',
    topicId: 'ann-vs-bnn',
    question: 'What is the primary difference in learning mechanisms between ANNs and BNNs?',
    options: [
      'ANNs learn by adjusting weights using training data; BNNs learn through real-life synaptic strength changes',
      'ANNs learn using neurotransmitters; BNNs learn using backpropagation',
      'ANNs learn only while sleeping; BNNs learn during software updates',
      'There is no difference in their learning mechanisms'
    ],
    correctIndex: 0,
    explanation: 'ANNs rely on mathematical loss functions and weight updates via backpropagation, while BNNs modify dendritic spines, ion channels, and synaptic receptivity.',
    keyTakeaway: 'ANN = Backpropagation on training data | BNN = Synaptic plasticity from real life.'
  },

  // Question 7: Innate vs Adaptive Immunity
  {
    id: 'exp_imm_1',
    topicId: 'innate-vs-adaptive',
    question: 'What is the defining characteristic of Innate Immunity?',
    options: [
      'It takes several weeks to develop and produces antibodies',
      'It is the body\'s rapid, non-specific first line of defense present from birth with no memory',
      'It is only acquired through synthetic mRNA vaccines',
      'It specifically targets single amino-acid mutations in viruses'
    ],
    correctIndex: 1,
    explanation: 'Innate immunity responds immediately (0-12 hours) to broad pathogen patterns, is present from birth, and does not possess immunological memory.',
    keyTakeaway: 'Innate = Rapid, non-specific, present from birth, no memory.'
  },
  {
    id: 'exp_imm_2',
    topicId: 'innate-vs-adaptive',
    question: 'Which of the following is a key feature of Adaptive Immunity?',
    options: [
      'It acts within seconds and never retains memory of past infections',
      'It features immunological memory and utilizes B cells, T cells, and antibodies',
      'It consists strictly of physical skin and hair',
      'It is inherited identically across all living organisms without change'
    ],
    correctIndex: 1,
    explanation: 'Adaptive immunity develops after exposure, features extreme epitope specificity, and generates long-lived memory B and T cells.',
    keyTakeaway: 'Adaptive = Immunological memory with B cells, T cells, and antibodies.'
  },
  {
    id: 'exp_imm_3',
    topicId: 'innate-vs-adaptive',
    question: 'Which cellular components belong to Innate Immunity?',
    options: [
      'Skin, phagocytes (macrophages/neutrophils), and natural physical barriers',
      'Plasma B cells producing IgG antibodies',
      'CD4+ Helper T cells and CD8+ Cytotoxic T cells exclusively',
      'Memory B lymphocytes'
    ],
    correctIndex: 0,
    explanation: 'Innate defenses include the skin, mucous membranes, complement system, and circulating phagocytes like neutrophils and macrophages.',
    keyTakeaway: 'Innate components: Skin, mucus, phagocytes, complement.'
  },
  {
    id: 'exp_imm_4',
    topicId: 'innate-vs-adaptive',
    question: 'Why is adaptive immunity delayed during a primary infection compared to innate immunity?',
    options: [
      'Innate immunity paralyzes adaptive cells permanently',
      'Specific B and T cells matching the antigen must be selected, cloned, and differentiated into effector cells',
      'Adaptive immunity only turns on after death',
      'Antibodies cannot travel through the bloodstream'
    ],
    correctIndex: 1,
    explanation: 'Because naive antigen-specific lymphocytes are rare, clonal expansion and differentiation into plasma cells and effector T cells takes several days to a week.',
    keyTakeaway: 'Adaptive primary response takes days for clonal expansion.'
  },

  // Question 8: Natural Killer (NK) Cells
  {
    id: 'exp_nk_1',
    topicId: 'nk-cells',
    question: 'How do Natural Killer (NK) cells punch holes into the target cell membrane?',
    options: [
      'By releasing digestive hydrochloric acid',
      'By secreting the protein Perforin, which polymerizes into membrane pores',
      'By spinning mechanical flagella against the cell wall',
      'By injecting lipid nanoparticles'
    ],
    correctIndex: 1,
    explanation: 'Upon recognizing an abnormal cell, the NK cell exocytoses perforin monomers that insert into the target cell membrane and form ring-like cylindrical pores.',
    keyTakeaway: 'Perforin punches holes in the target membrane.'
  },
  {
    id: 'exp_nk_2',
    topicId: 'nk-cells',
    question: 'After perforin forms pores in the target cell, what do NK cells release to kill the cell?',
    options: [
      'Granzymes that induce apoptosis (programmed cell death)',
      'Glucose to overfeed the cell',
      'Myelin fragments to insulate the cell',
      'Antibodies that repair the membrane'
    ],
    correctIndex: 0,
    explanation: 'Granzymes are cytotoxic serine proteases that pass through perforin pores into the cytoplasm, activating caspases that trigger apoptosis.',
    keyTakeaway: 'Granzymes enter through pores to induce apoptosis.'
  },
  {
    id: 'exp_nk_3',
    topicId: 'nk-cells',
    question: 'What is the major distinction between NK cells and most other white blood cells?',
    options: [
      'NK cells cannot travel through blood vessels',
      'Unlike WBCs that attack outside pathogens, NK cells primarily attack the body\'s own infected or cancerous cells',
      'NK cells only attack harmless red blood cells',
      'NK cells produce viral genetic sequences'
    ],
    correctIndex: 1,
    explanation: 'While neutrophils and macrophages phagocytose free extracellular bacteria, NK cells specialize in eliminating altered "self" cells (virus-infected or malignant).',
    keyTakeaway: 'NK cells attack the body\'s OWN infected or cancerous cells.'
  },
  {
    id: 'exp_nk_4',
    topicId: 'nk-cells',
    question: 'What additional chemical messengers do NK cells secrete to boost surrounding immune cells?',
    options: ['Insulin', 'Cytokines (such as IFN-gamma)', 'Neurotransmitters', 'Cholesterol'],
    correctIndex: 1,
    explanation: 'NK cells secrete proinflammatory cytokines (like Interferon-gamma) that stimulate macrophages and coordinate the broader immune response.',
    keyTakeaway: 'NK cells secrete cytokines to boost other immune cells.'
  },

  // Question 9: Advantages of mRNA Vaccines
  {
    id: 'exp_mrna_1',
    topicId: 'mrna-vaccine-advantages',
    question: 'Why are mRNA vaccines safer than traditional live-attenuated vaccines?',
    options: [
      'They provide only a genetic blueprint rather than introducing an actual live pathogen into the body',
      'They permanently change the human genome',
      'They eliminate the need for the immune system to produce antibodies',
      'They contain antibiotics that kill all bacteria'
    ],
    correctIndex: 0,
    explanation: 'mRNA vaccines deliver non-infectious instructions. No live or inactivated viral particle is introduced, completely eliminating the risk of disease.',
    keyTakeaway: 'mRNA provides a genetic blueprint, not a live pathogen.'
  },
  {
    id: 'exp_mrna_2',
    topicId: 'mrna-vaccine-advantages',
    question: 'Which of the following is an advantage of mRNA vaccine manufacturing?',
    options: [
      'They require years of egg incubation to grow viral cultures',
      'They can be developed rapidly from a digital genetic sequence and are easily adaptable for different antigens',
      'They cannot be modified once designed in the lab',
      'They require zero refrigeration throughout their lifespan'
    ],
    correctIndex: 1,
    explanation: 'Because mRNA production is synthetic and cell-free, new vaccine batches can be synthesized within weeks simply by editing the RNA sequence for new variants.',
    keyTakeaway: 'Rapid development from genetic sequence and easy adaptability.'
  },
  {
    id: 'exp_mrna_3',
    topicId: 'mrna-vaccine-advantages',
    question: 'What kind of immune response do mRNA vaccines trigger in the body?',
    options: [
      'Only weak, short-lived mucus irritation',
      'A strong immune response producing both specific antibodies and memory cells',
      'Suppression of all white blood cells',
      'Innate skin inflammation without any memory cells'
    ],
    correctIndex: 1,
    explanation: 'mRNA vaccines induce robust humoral immunity (neutralizing antibodies from B cells) and potent cellular immunity (cytotoxic CD8+ T cells and memory cells).',
    keyTakeaway: 'mRNA triggers strong immunity with antibodies and memory cells.'
  },

  // Question 10: Vaccine Protection Mechanism
  {
    id: 'exp_prot_1',
    topicId: 'vaccine-protection-mechanism',
    question: 'How do vaccines safely protect the body from disease without making the person sick?',
    options: [
      'By destroying all white blood cells so symptoms never appear',
      'By introducing a safe form of a pathogen (or its blueprint) to trigger an immune response without causing actual disease',
      'By replacing human blood with synthetic plasma',
      'By creating a physical plastic shell inside arteries'
    ],
    correctIndex: 1,
    explanation: 'Vaccines present a harmless antigen shape or genetic blueprint, allowing the immune system to mount a primary response safely.',
    keyTakeaway: 'Safe exposure triggers immune response without causing disease.'
  },
  {
    id: 'exp_prot_2',
    topicId: 'vaccine-protection-mechanism',
    question: 'What essential cells are produced during vaccination that guarantee long-term protection?',
    options: [
      'Only red blood cells and platelets',
      'Specific antibodies and long-lived memory cells',
      'Epithelial skin cells',
      'Glial Schwann cells'
    ],
    correctIndex: 1,
    explanation: 'Vaccination generates high-affinity antibodies and a reserve pool of Memory B and Memory T cells that persist for months to decades.',
    keyTakeaway: 'Vaccination produces specific antibodies and memory cells.'
  },
  {
    id: 'exp_prot_3',
    topicId: 'vaccine-protection-mechanism',
    question: 'What happens when a vaccinated person later encounters the actual virulent pathogen?',
    options: [
      'The body takes two weeks to notice the virus',
      'Memory cells recognize it instantly and mount a faster, stronger attack before serious illness occurs',
      'The immune system shuts down completely',
      'The memory cells turn into pathogenic bacteria'
    ],
    correctIndex: 1,
    explanation: 'Memory cells launch an immediate, exponential antibody surge (secondary response) that neutralizes the virus before it can replicate and cause disease.',
    keyTakeaway: 'Memory cells recognize pathogen instantly and mount a faster attack.'
  },

  // Question 11: Vaccine Types & Complete Overview
  {
    id: 'exp_types_1',
    topicId: 'vaccine-types-overview',
    question: 'How many major types of vaccines are classified in your CT syllabus?',
    options: ['3 types', '5 types', '7 types', '12 types'],
    correctIndex: 2,
    explanation: 'The 7 major types are: Whole inactivated, Live-attenuated, Subunit/synthetic peptide, Recombinant viral-vector, mRNA, DNA, and Virus-like particle (VLP).',
    keyTakeaway: '7 Vaccine Types: Inactivated, Live-attenuated, Subunit, Viral vector, mRNA, DNA, VLP.'
  },
  {
    id: 'exp_types_2',
    topicId: 'vaccine-types-overview',
    question: 'Which vaccine type uses a killed pathogen that cannot replicate (e.g. Salk Polio)?',
    options: ['Live-attenuated', 'Whole inactivated', 'DNA vaccine', 'mRNA vaccine'],
    correctIndex: 1,
    explanation: 'Whole inactivated vaccines use physical or chemical means (heat/formalin) to kill the pathogen, making it unable to replicate.',
    keyTakeaway: 'Whole inactivated = Killed pathogen that cannot replicate.'
  },
  {
    id: 'exp_types_3',
    topicId: 'vaccine-types-overview',
    question: 'What is a Virus-Like Particle (VLP) vaccine (e.g., HPV Gardasil)?',
    options: [
      'A synthetic pill that cures viral infections',
      'A multiprotein shell that mimics the outer viral structure but contains zero viral genetic material',
      'A live virus harvested from pond water',
      'A blood transfusion containing animal antibodies'
    ],
    correctIndex: 1,
    explanation: 'VLPs are empty multiprotein structures that mimic authentic viral capsid geometry without any genetic core, making them completely non-infectious.',
    keyTakeaway: 'VLP = Outer viral shell without genetic material.'
  },
  {
    id: 'exp_types_4',
    topicId: 'vaccine-types-overview',
    question: 'Why are mRNA vaccines considered a revolutionary advantage in immunology?',
    options: [
      'They safely provide instructions for antigen production directly to cells without risking disease exposure',
      'They cure every disease known to humankind in one dose',
      'They replace all need for food and water',
      'They convert human cells into plant cells'
    ],
    correctIndex: 0,
    explanation: 'mRNA vaccines teach human ribosomes to synthesize the harmless antigen directly, training both cellular and humoral immunity without introducing live pathogens.',
    keyTakeaway: 'mRNA safely provides cellular instructions for antigen production.'
  },
  {
    id: 'exp_types_5',
    topicId: 'vaccine-types-overview',
    question: 'Which vaccine type uses a weakened form of the living germ (e.g. MMR, Oral Polio)?',
    options: ['Whole inactivated', 'Live-attenuated', 'Subunit', 'DNA vaccine'],
    correctIndex: 1,
    explanation: 'Live-attenuated vaccines contain living pathogens that have been weakened in the lab so they reproduce mildly without causing disease in healthy people.',
    keyTakeaway: 'Live-attenuated = Weakened living pathogen.'
  }
];
