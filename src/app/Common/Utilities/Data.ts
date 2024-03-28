export interface Tag {
  lang: string;
  color: string;
  selected?: boolean;
}

export interface Icategory {
  name: string;
  value: string;
}

export const Tags: Tag[] = [
  { lang: 'Javascript', color: '#a08f03' },
  { lang: 'Typescript', color: 'royalblue' },
  { lang: 'Go', color: 'skyblue' },
  { lang: 'Elixir', color: '#5a366a' },
  { lang: 'Angular', color: 'red' },
  { lang: 'Nodejs', color: 'green' },
  { lang: 'Nestjs', color: 'red' },
  { lang: 'Phoenix', color: '#ff6f61' },
  { lang: 'Solidity', color: 'black' },
  { lang: 'Ionic', color: 'skyblue' },
  { lang: 'Nx', color: '#0f172a' },
  { lang: 'Docker', color: '#1d63ed' },
  { lang: 'K8s', color: '#316ce6' },
  { lang: 'Web App', color: 'black' },
  { lang: 'Mobile App', color: 'black' },
  { lang: 'Microservice', color: 'black' },
  { lang: 'Microfrontend', color: 'black' },
  { lang: 'System Design', color: 'black' },
  { lang: 'Clone', color: 'black' },


];

export interface IWhatILearnt {
  point: string;
}

export const categories: Icategory[] = [
  { name: 'Important', value: 'Important' },
  { name: 'All', value: 'All' },
];
