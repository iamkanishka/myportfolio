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
  { lang: 'HTML || CSS', color: '#a08f03' },
  { lang: 'Javascript || Typescript', color: 'royalblue' },
  { lang: 'Angular', color: 'red' },
  { lang: 'Nodejs || Deno', color: 'green' },
  { lang: 'Nestjs', color: 'red' },
  { lang: 'Nx', color: '#0f172a' },
  { lang: 'Elixir', color: '#5a366a' },
  { lang: 'Phoenix', color: '#ff6f61' },
  { lang: 'Go', color: 'skyblue' },
  { lang: 'Rust', color: 'black' },
  { lang: 'Architecture', color: 'black' },
  { lang: 'Blockchain', color: 'black' },
  { lang: 'Ionic || Flutter', color: 'skyblue' },
  { lang: 'AI || ML', color: 'black' },
  { lang: 'DSA', color: 'black' },
  { lang: 'System Design', color: 'black' },
  { lang: 'AWS || GCP || Azure', color: 'black' },
  { lang: 'Astronomy || Cosmos', color: 'black' },


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
