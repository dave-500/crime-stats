interface Street {
  id: number;
  name: string;
}

interface Location {
  latitude: string;
  street: Street;
  longitude: string;
}

interface OutcomeStatus {
  category: string;
  date: string;
}

export interface Crime {
  category: string;
  location_type: string;
  location: Location;
  context: string;
  outcome_status: OutcomeStatus | null;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
}

export interface CrimeCol extends Crime {
  // add extra field for table column
  landmark: string;
}
