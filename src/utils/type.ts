// Interface for parameters of adToBS function
export interface AdToBSParams {
  adYear: number;
  adMonth: number;
  adDay: number;
}

// Interface for parameters of bsToAD function
export interface BsToADParams {
  bsYear: number;
  bsMonth: number;
  bsDay: number;
}

// Interface for parameters of convertDate function
export interface ConvertDateParams {
  year: number;
  month: number;
  day: number;
  toBs?: boolean; // Optional flag indicating direction of conversion
}

// Interface for the response of the date conversion
export interface ResponseType {
  year: number; // The converted year in BS
  month: number; // The converted month in BS
  day: number; // The converted day in BS
}
