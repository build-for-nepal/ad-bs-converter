// Interface for parameters of convertDate function
export interface ConvertDateParams {
  year?: number;
  month?: number;
  day?: number;
  fromBS?: boolean; // Optional flag indicating bs to ad conversion
}

// Interface for the response of the date conversion
export interface ResponseType {
  year: number;
  month: number;
  day: number;
}
