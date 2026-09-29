export interface PreciseAnswer {
  number: string;
  question: string;
  category: 'neuro_bci' | 'immunology';
  sections: {
    title?: string;
    points: string[];
  }[];
  keyTakeaway?: string;
}

export const PRECISE_CT_ANSWERS: PreciseAnswer[] = [
  {
    number: '1 & 2',
    question: 'Motor Neuron Structure and Action Potential Generation',
    category: 'neuro_bci',
    sections: [
      {
        title: 'Structure of Motor Neuron',
        points: [
          'Cell body (soma): Contains the nucleus and controls cell activities.',
          'Dendrites: Receive signals from other neurons.',
          'Axon: A long process carrying impulses away from the cell body.',
          'Axon terminal: The end of the axon that forms a synapse.'
        ]
      },
      {
        title: 'Action Potential Generation',
        points: [
          '1. Starts at a resting potential of roughly -70mV.',
          '2. A stimulus causes depolarization until reaching a threshold (-55mV).',
          '3. Voltage-gated Na+ channels open, Na+ enters, and the membrane rapidly depolarizes (up to +30mV).',
          '4. Na+ channels inactivate, K+ channels open, and K+ moves out (repolarization).',
          '5. The membrane returns to resting potential.'
        ]
      }
    ],
    keyTakeaway: 'Threshold: -55mV | Depolarization: Na+ IN | Repolarization: K+ OUT | Resting: -70mV'
  },
  {
    number: '3',
    question: 'Synapse and Signal Transfer',
    category: 'neuro_bci',
    sections: [
      {
        title: 'Definition',
        points: [
          'A synapse is a functional connection between a neuron and another cell.'
        ]
      },
      {
        title: 'Transfer Process',
        points: [
          'When an action potential reaches the presynaptic axon terminal, it releases neurotransmitters from vesicles.',
          'These chemicals cross the synaptic gap and bind to receptors on the postsynaptic neuron.',
          'This creates a membrane change that generates a new action potential if the threshold is reached.'
        ]
      }
    ],
    keyTakeaway: 'Electrical AP -> Ca2+ influx -> Vesicle exocytosis -> Cleft diffusion -> Receptor binding -> Postsynaptic AP'
  },
  {
    number: '4',
    question: 'Brain-Computer Interface (BCI) Definition & Components',
    category: 'neuro_bci',
    sections: [
      {
        title: 'Definition',
        points: [
          'A system that determines a person\'s functional intent directly from brain activity to control a device.'
        ]
      },
      {
        title: 'Major Components',
        points: [
          '1. Measuring device: Sensors (like a headset) that detect brain signals.',
          '2. Processing system: Analyzes the signals to interpret intended actions.',
          '3. Application: The device (e.g., wheelchair) performing the desired action.'
        ]
      }
    ],
    keyTakeaway: '3 Pillars: Sensors (EEG) -> Processing (Feature extraction/decoder) -> Application (Actuator)'
  },
  {
    number: '5',
    question: 'Applications of BCI',
    category: 'neuro_bci',
    sections: [
      {
        points: [
          'Communication for locked-in syndrome or severe physical disabilities.',
          'Controlling power wheelchairs and prosthetic limbs.',
          'Functional Electrical Stimulation (FES) therapies.',
          'Fatigue assessment for high-attention jobs (e.g., traffic controllers).',
          'Immersive video games, virtual reality, and neuromarketing.'
        ]
      }
    ],
    keyTakeaway: 'Key areas: Locked-in communication, Wheelchair locomotion, Prosthetics, FES rehabilitation, Fatigue tracking, Gaming/VR'
  },
  {
    number: '6',
    question: 'Artificial Neural Network (ANN) vs. Biological Neural Network (BNN)',
    category: 'neuro_bci',
    sections: [
      {
        title: 'Artificial Neural Network (ANN)',
        points: [
          'A mathematical computer model inspired by the brain.',
          'Uses artificial neurons (perceptrons), calculates information mathematically.',
          'Learns by adjusting weights using training data and backpropagation algorithms.'
        ]
      },
      {
        title: 'Biological Neural Network (BNN)',
        points: [
          'The natural network of living neurons in the body.',
          'Transmits information via electrical signals (action potentials) and neurotransmitters.',
          'Learns naturally from real-life experiences by changing synaptic strength (plasticity).'
        ]
      }
    ],
    keyTakeaway: 'ANN = Math nodes, floating-point weights, backpropagation | BNN = Living cells, electrochemical spikes, synaptic plasticity'
  },
  {
    number: '7',
    question: 'Innate vs. Adaptive Immunity',
    category: 'immunology',
    sections: [
      {
        title: 'Innate Immunity',
        points: [
          'The body\'s rapid, non-specific first line of defense.',
          'Present from birth.',
          'Has no immunological memory (e.g., skin, phagocytes).'
        ]
      },
      {
        title: 'Adaptive Immunity',
        points: [
          'A specific immune response that develops after pathogen exposure or vaccination.',
          'Features immunological memory.',
          'Utilizes B cells, T cells, and antibodies.'
        ]
      }
    ],
    keyTakeaway: 'Innate: Fast, non-specific, no memory | Adaptive: Delayed, antigen-specific, lifelong memory'
  },
  {
    number: '8',
    question: 'Natural Killer (NK) Cells',
    category: 'immunology',
    sections: [
      {
        title: 'Operation',
        points: [
          'NK cells recognize infected/abnormal cells, attach to them, and release perforin to punch holes in the target\'s membrane.',
          'They then release granzymes to kill the cell (inducing apoptosis).',
          'They secrete cytokines to boost other immune cells.'
        ]
      },
      {
        title: 'Distinction from Other WBCs',
        points: [
          'Unlike most white blood cells that directly attack outside pathogens, NK cells primarily attack the body\'s OWN infected or cancerous cells.'
        ]
      }
    ],
    keyTakeaway: 'Punches pores with Perforin -> Injects Granzymes -> Kills altered SELF cells'
  },
  {
    number: '9',
    question: 'Advantages of mRNA Vaccines',
    category: 'immunology',
    sections: [
      {
        points: [
          'They provide a genetic blueprint rather than introducing an actual live pathogen into the body.',
          'They trigger a strong immune response (producing antibodies and memory cells).',
          'They can be developed rapidly from a genetic sequence and are easily adaptable for different antigens.'
        ]
      }
    ],
    keyTakeaway: '1. Safe genetic blueprint (no disease risk) | 2. Strong dual immunity | 3. Rapid modular design'
  },
  {
    number: '10',
    question: 'Vaccine Protection Mechanism',
    category: 'immunology',
    sections: [
      {
        points: [
          'Vaccines introduce a safe form of a pathogen (or a blueprint for its antigen) into the body, triggering an immune response without causing the actual disease.',
          'The immune system produces specific antibodies and memory cells.',
          'If the actual pathogen enters later, memory cells recognize it instantly and mount a faster, stronger attack before serious illness occurs.'
        ]
      }
    ],
    keyTakeaway: 'Safe training -> Memory B & T cells generated -> Immediate secondary surge upon viral encounter'
  },
  {
    number: '11',
    question: 'Vaccine Types & Complete Overview',
    category: 'immunology',
    sections: [
      {
        title: 'How They Help',
        points: [
          'By safely exposing the immune system to an antigen, vaccines train the body to build memory cells for rapid future defense.'
        ]
      },
      {
        title: 'The 7 Types of Vaccines',
        points: [
          '1. Whole inactivated',
          '2. Live-attenuated',
          '3. Subunit/synthetic peptide',
          '4. Recombinant viral-vector',
          '5. mRNA',
          '6. DNA',
          '7. Virus-like particle (VLP)'
        ]
      },
      {
        title: 'mRNA Advantage',
        points: [
          'They are highly beneficial because they safely provide instructions for antigen production directly to the cells, safely training the immune system without ever risking disease exposure.'
        ]
      }
    ],
    keyTakeaway: '7 Types: Inactivated, Live-attenuated, Subunit, Viral-vector, mRNA, DNA, VLP. mRNA provides direct cellular instructions.'
  }
];
