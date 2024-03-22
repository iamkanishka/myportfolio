export interface Tag {
  lang: string;
  color: string;
  selected?:boolean
}

export const Tags: Tag[] = [
  { lang: 'Javascript', color: '#a08f03' },
  { lang: 'Typescript', color: 'royalblue' },
  { lang: 'Go', color: 'skyblue' },
  { lang: 'Elixir', color: '#5a366a' },
  { lang: 'Erlang', color: '#a2003e' },

  { lang: 'Rust', color: 'black' },
  { lang: 'Angular', color: 'red' },
  { lang: 'React', color: 'skyblue' },
  { lang: 'Nodejs', color: 'green' },
  { lang: 'Nestjs', color: 'red' },
  { lang: 'Phoenix', color: '#ff6f61' },
  { lang: 'Ionic', color: 'skyblue' },
  { lang: 'Nx', color: '#0f172a' },
  { lang: 'Clone', color: 'black' },

  { lang: 'Microservice', color: 'black' },

  { lang: 'Microfrontend', color: 'black' },

  { lang: 'Mobile App', color: 'black' },
  { lang: 'System Design', color: 'black' },
  { lang: 'Web App', color: 'black' },
  { lang: 'Docker', color: '#1d63ed' },
  { lang: 'K8s', color: '#316ce6' },
];


export interface IWhatILearnt {
  point: string;
}


export const categories:String[]=['Important', 'All']