import { CompanyData, OpportunityData } from "./app.interface";

interface CompanyOpportunityData {
  active: OpportunityData[];
  disqualified: OpportunityData[];
}

export type TotalData = {
  applied: number;
  recommended: number;
  interview: number;
  offer: number;
  hired: number;
};

function calculateColumnTotals(
  companyData: CompanyData[],
  section: "active" | "disqualified"
): TotalData {
  const allData: OpportunityData[] = [];

  // Extract and combine all data for the selected section
  companyData.forEach((company) => {
    const opportunityData: CompanyOpportunityData = company.opportunity[0];
    if (section === "active") {
      allData.push(...opportunityData.active);
    } else {
      allData.push(...opportunityData.disqualified);
    }
  });

  // Calculate the totals for each column
  const totals: TotalData = {
    applied: allData.reduce((total, item) => total + item.applied, 0),
    recommended: allData.reduce((total, item) => total + item.recommended, 0),
    interview: allData.reduce((total, item) => total + item.interview, 0),
    offer: allData.reduce((total, item) => total + item.offer, 0),
    hired: allData.reduce((total, item) => total + item.hired, 0),
  };

  return totals;
}

export {calculateColumnTotals,}

// Example usage:
// const companyData: CompanyData[] = [/* Your array of company data here */];
// const activeTotals = calculateColumnTotals(companyData, "active");
// const disqualifiedTotals = calculateColumnTotals(companyData, "disqualified");

// console.log("Active Totals:", activeTotals);
// console.log("Disqualified Totals:", disqualifiedTotals);
