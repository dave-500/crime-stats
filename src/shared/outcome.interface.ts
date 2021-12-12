interface Street {
  id: number;
  name: string;
}

interface Location {
  latitude: string;
  street: Street;
  longitude: string;
}

interface Crime {
  category: string;
  persistent_id: string;
  location_subtype: string;
  location_type: string;
  location: Location;
  context: string;
  month: string;
  id: number;
}

interface Category {
  code: string;
  name: string;
}

export interface Outcome {
  category: Category;
  date: string;
  person_id: string | null;
}

export interface OutcomeResponse {
  crime: Crime;
  outcomes: Outcome[];
}
