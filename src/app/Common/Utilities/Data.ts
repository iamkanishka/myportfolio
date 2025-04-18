export interface Tag {
  lang: string;
  color: string;
  selected?: boolean;
}

export interface Icategory {
  name: string;
  value: string;
  description?: string;
}

export const Tags: Tag[] = [
  { lang: 'HTML || CSS || JS || TS', color: '#a08f03' },
  { lang: 'Angular', color: 'red' },
  { lang: 'Nodejs || Nestjs', color: 'black' },
  { lang: 'Elixir || Phoenix', color: '#5a366a' },
  { lang: 'Go', color: 'skyblue' },
  { lang: 'Solidity', color: '#363636' },
  { lang: 'NS || Flutter', color: 'skyblue' },
  { lang: 'AI || ML', color: 'black' },
  { lang: 'SASS', color: 'black' },
  { lang: 'System Design', color: 'black' },
  { lang: 'AWS || GCP || Azure', color: 'black' },
  { lang: 'Blockchain', color: 'black' },
  { lang: 'Healthcare ', color: 'black' },
  { lang: 'Finance ', color: 'black' },
  { lang: 'Astronomy', color: 'black' },
];

export interface IWhatILearnt {
  point: string;
}

export const categories: Icategory[] = [
  { name: 'Important', value: 'Important' },
  { name: 'All', value: 'All' },
];

export const projectCategories: Icategory[] = [
  { name: 'Important', value: 'Important', description: '' },
  { name: 'All', value: 'All', description: '' },
];

export const articleCategories: Icategory[] = [
  { name: 'Important', value: 'Important' },
  { name: 'All', value: 'All', description: '' },
];
