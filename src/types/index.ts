export type Category = 'neuro_bci' | 'immunology';

export interface CTTopic {
  id: string;
  questionNumber: string;
  title: string;
  category: Category;
  shortSummary: string;
  detailedAnswers: {
    heading: string;
    items: string[];
    highlight?: string;
  }[];
  keyTerms: string[];
  examTips: string;
  simulationType: 'neuron_ap' | 'synapse' | 'bci_pipeline' | 'bci_applications' | 'ann_vs_bnn' | 'innate_adaptive' | 'nk_cells' | 'mrna_advantages' | 'vaccine_mechanism' | 'vaccine_types';
  imageAsset?: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  keyTakeaway: string;
}
