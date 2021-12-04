export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: "Alien" | "Human";
  type: string;
  gender: "Female" | "Male" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
};
