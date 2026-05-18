export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

export interface CharactersResponse {
  results: Character[];
  totalPages: number;
}
