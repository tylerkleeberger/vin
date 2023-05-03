export interface VINDetails {
  vin: string;
  year?: number;
  make?: string;
  model?: string;
  manufacturer?: string;
  engine?: string;
  trim?: string;
  transmission?: string;
}

export interface StampedVINDetails extends VINDetails {
  timestamp?: number;
}
