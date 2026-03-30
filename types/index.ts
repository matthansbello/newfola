export interface Project {
  id: number;
  title: string;
  thumb: string;
  meta?: string;
  text?: string;
  photos: {
    header: string;
    footer: string;
    left: string;
    right: string;
    banner: string;
  };
}

export interface Client {
  name: string;
  category: string;
  logo: string;
}

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  img: string;
}

