export interface OpportunityData {
  month:
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";
  applied: number;
  recommended: number;
  interview: number;
  offer: number;
  hired: number;
}

export interface Opportunity {
  opportunityName: string;
  active: OpportunityData[];
  disqualified: OpportunityData[];
}

export interface CompanyData {
  companyName: string;
  opportunity: Opportunity[];
}
