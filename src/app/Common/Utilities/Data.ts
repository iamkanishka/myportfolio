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
  { lang: 'Javascript/HTML/CSS', color: '#a08f03' },
  { lang: 'Typescript', color: 'royalblue' },
  { lang: 'Go', color: 'skyblue' },
  { lang: 'Elixir', color: '#5a366a' },
  { lang: 'Angular', color: 'red' },
  { lang: 'Nodejs/Deno/Bun', color: 'green' },
  { lang: 'Nestjs', color: 'red' },
  { lang: 'Phoenix', color: '#ff6f61' },
  { lang: 'Rust', color: 'black' },
  { lang: 'Solidity', color: 'black' },
  { lang: 'Ionic/Flutter', color: 'skyblue' },
  { lang: 'Nx', color: '#0f172a' },
  { lang: 'AI/ML', color: 'black' },
  { lang: 'Microservice', color: 'black' },
  { lang: 'Microfrontend', color: 'black' },
  { lang: 'System Design', color: 'black' },
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
