import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'motor-neuron-ap',
    question: 'During the rapid depolarization phase of an action potential, what is the primary ion movement?',
    options: [
      'K+ ions rapidly leave the cell through leak channels',
      'Na+ ions rapidly rush into the cell through voltage-gated channels',
      'Cl- ions enter the cell through GABA receptors',
      'Ca2+ ions are actively pumped out by ATP pumps'
    ],
    correctIndex: 1,
    explanation: 'Depolarization occurs when the threshold (~-55mV) is met, causing voltage-gated Na+ channels to open rapidly. Na+ rushes down its electrochemical gradient into the cell, shifting membrane potential to ~+30mV.',
    keyTakeaway: 'Depolarization = Na+ IN; Repolarization = K+ OUT.'
  },
  {
    id: 'q2',
    topicId: 'motor-neuron-ap',
    question: 'What is the typical resting membrane potential of a motor neuron?',
    options: [
      '-55 mV',
      '+30 mV',
      '-70 mV',
      '0 mV'
    ],
    correctIndex: 2,
    explanation: 'A resting motor neuron sits at approximately -70mV, maintained by high internal K+, low internal Na+, and the active Na+/K+ ATPase pump.',
    keyTakeaway: 'Resting = -70mV; Threshold = -55mV.'
  },
  {
    id: 'q3',
    topicId: 'synapse-signal-transfer',
    question: 'What directly triggers the fusion and exocytosis of neurotransmitter vesicles at the presynaptic terminal?',
    options: [
      'Influx of Calcium ions (Ca2+) through voltage-gated channels',
      'Efflux of Potassium ions (K+)',
      'Direct contact with the postsynaptic dendrite',
      'Reuptake of Sodium ions by glial cells'
    ],
    correctIndex: 0,
    explanation: 'When the action potential reaches the presynaptic terminal, membrane depolarization triggers voltage-gated Ca2+ channels to open. The influx of Ca2+ induces vesicle fusion with the presynaptic membrane.',
    keyTakeaway: 'Ca2+ influx is the essential chemical trigger for neurotransmitter vesicle release.'
  },
  {
    id: 'q4',
    topicId: 'bci-definition-components',
    question: 'Which of the following is NOT one of the three primary components of a Brain-Computer Interface (BCI)?',
    options: [
      'Measuring device (e.g. EEG headset)',
      'Processing system (signal filtering and decoding algorithms)',
      'Peripheral spinal cord motor bypass cable',
      'Application device (e.g. wheelchair, prosthetic hand)'
    ],
    correctIndex: 2,
    explanation: 'BCI systems bypass peripheral nerves completely. The three foundational components are: (1) Measuring device, (2) Processing system, and (3) Application device.',
    keyTakeaway: 'The 3 BCI pillars: Measuring Device -> Processing System -> Application.'
  },
  {
    id: 'q5',
    topicId: 'bci-applications',
    question: 'In addition to assistive mobility and locked-in communication, how is BCI applied in high-attention jobs like air traffic control?',
    options: [
      'By hypnotizing operators to work overnight without sleep',
      'By performing real-time fatigue and vigilance assessment from brainwaves',
      'By replacing all human controllers with automated AI bots',
      'By sending electrical shocks when an error occurs'
    ],
    correctIndex: 1,
    explanation: 'BCI EEG monitors detect shifts in alpha, theta, and beta rhythms to assess mental fatigue and drowsiness in operators before critical lapses occur.',
    keyTakeaway: 'BCI serves both assistive neurorehabilitation and industrial fatigue/vigilance tracking.'
  },
  {
    id: 'q6',
    topicId: 'ann-vs-bnn',
    question: 'How do Artificial Neural Networks (ANNs) typically update their connections during learning, compared to Biological Neural Networks (BNNs)?',
    options: [
      'ANNs use neurotransmitter vesicles, while BNNs use gradient descent',
      'ANNs adjust scalar weights via backpropagation, while BNNs adjust synaptic strength through biological plasticity (LTP/Hebbian learning)',
      'ANNs generate ion action potentials across dendrites',
      'There is no computational difference between ANNs and BNNs'
    ],
    correctIndex: 1,
    explanation: 'ANNs calculate mathematical loss and propagate gradients to update numeric weights. BNNs learn through biochemical changes in synaptic receptor density and dendritic morphology (Hebbian plasticity: neurons that fire together, wire together).',
    keyTakeaway: 'ANN = Mathematical weights & Backpropagation; BNN = Synaptic plasticity & Biochemical neurotransmission.'
  },
  {
    id: 'q7',
    topicId: 'innate-vs-adaptive',
    question: 'Which characteristic differentiates Adaptive Immunity from Innate Immunity?',
    options: [
      'Adaptive immunity is immediate while innate immunity takes days',
      'Adaptive immunity is non-specific and lacks memory',
      'Adaptive immunity features high antigen specificity and builds lifelong immunological memory',
      'Adaptive immunity relies solely on physical skin barriers'
    ],
    correctIndex: 2,
    explanation: 'Innate immunity is fast and non-specific with no memory. Adaptive immunity is antigen-specific and creates memory B and T cells that persist for future encounters.',
    keyTakeaway: 'Innate = Fast, Non-specific, No memory. Adaptive = Delayed, Highly specific, Long-lived memory.'
  },
  {
    id: 'q8',
    topicId: 'nk-cells',
    question: 'How do Natural Killer (NK) cells eliminate their target cells?',
    options: [
      'By swallowing whole bacteria via endocytosis',
      'By secreting perforin to create membrane pores and injecting granzymes to induce apoptosis',
      'By producing neutralizing antibodies against viruses',
      'By converting infected cells into benign stem cells'
    ],
    correctIndex: 1,
    explanation: 'NK cells dock onto abnormal or virus-infected cells lacking MHC-I, exocytose perforin (which polymerizes to form transmembrane pores), and release granzymes to trigger programmed apoptotic cell death.',
    keyTakeaway: 'Perforin punches holes; Granzymes trigger programmed suicide (apoptosis).'
  },
  {
    id: 'q9',
    topicId: 'nk-cells',
    question: 'What makes Natural Killer (NK) cells distinct from most other white blood cells?',
    options: [
      'NK cells cannot migrate through blood vessels',
      'NK cells primary targets are the body\'s own infected or cancerous cells, rather than free external pathogens',
      'NK cells only function inside the liver',
      'NK cells require 2 weeks to activate'
    ],
    correctIndex: 1,
    explanation: 'While white blood cells like neutrophils and macrophages engulf external pathogens, NK cells specialize in surveying and destroying the body\'s own compromised, infected, or malignant cells.',
    keyTakeaway: 'NK cells eliminate altered self-cells (tumors & virus-infected cells).'
  },
  {
    id: 'q10',
    topicId: 'mrna-vaccine-advantages',
    question: 'Which is a core advantage of mRNA vaccines over traditional live-attenuated vaccines?',
    options: [
      'mRNA permanently integrates into human genomic DNA',
      'mRNA provides only genetic instructions for an antigen, with zero risk of causing the disease',
      'mRNA vaccines require no cold-chain storage at all',
      'mRNA eliminates the need for the immune system to produce antibodies'
    ],
    correctIndex: 1,
    explanation: 'mRNA vaccines deliver only instructions to produce a harmless antigen protein. No live or inactivated viral pathogen is introduced, completely eliminating the risk of disease transmission.',
    keyTakeaway: 'mRNA = Safe genetic blueprint, no disease risk, modular and rapid design.'
  },
  {
    id: 'q11',
    topicId: 'vaccine-protection-mechanism',
    question: 'Why is the secondary immune response to a pathogen much faster and stronger than the primary response?',
    options: [
      'Skin barriers become 10 times thicker after vaccination',
      'Pre-existing memory B and T cells immediately recognize the antigen and launch rapid antibody production',
      'The pathogen loses all virulence on second contact',
      'White blood cells multiply indefinitely without regulation'
    ],
    correctIndex: 1,
    explanation: 'Memory cells generated during the primary response or vaccination recognize the matching antigen immediately upon re-exposure, producing high-affinity antibodies in huge quantities before illness occurs.',
    keyTakeaway: 'Memory cells turn a weeks-long primary defense into a rapid secondary counter-attack.'
  },
  {
    id: 'q12',
    topicId: 'vaccine-types-overview',
    question: 'Which vaccine type uses a harmless, modified carrier virus (such as an adenovirus) to deliver the genetic code for the antigen?',
    options: [
      'Subunit vaccine',
      'Live-attenuated vaccine',
      'Recombinant viral-vector vaccine',
      'Virus-like particle (VLP)'
    ],
    correctIndex: 2,
    explanation: 'Recombinant viral-vector vaccines (e.g. Oxford-AstraZeneca, Johnson & Johnson) utilize an engineered, harmless carrier virus to deliver the genetic payload encoding the target antigen.',
    keyTakeaway: 'Viral-vector = Harmless carrier virus delivers target antigen gene.'
  }
];
