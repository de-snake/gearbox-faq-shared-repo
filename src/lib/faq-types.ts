export type FaqBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export type FaqQuestion = {
  id: string;
  title: string;
  blocks: FaqBlock[];
  plainText: string;
};

export type FaqSection = {
  id: string;
  title: string;
  questions: FaqQuestion[];
};

export type FaqDocument = {
  title: string;
  intro: FaqBlock[];
  sections: FaqSection[];
  sectionCount: number;
  questionCount: number;
};

export type BrandLink = {
  label: string;
  url: string;
};

export type FaqBrand = {
  eyebrow: string;
  titleSuffix?: string;
  description: string;
  links: BrandLink[];
};
