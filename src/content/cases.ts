export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  category: "Business Information Systems" | "Business Analytics" | "Decision Support";
};

export const caseStudies: CaseStudy[] = [
  {
    id: "case-cloud",
    title: "Cloud Provider Selection Analysis",
    subtitle: "Choosing between AWS, Azure, and Google Cloud using decision modeling",
    description: "A financial services firm wants to migrate its core transactional and analytical data storage to a public cloud provider. They need to evaluate alternatives against complex, conflicting criteria including cost, security, establishment, and availability zones.",
    problem: "The IT Director favors technical maturity, the CFO wants optimized billing and low costs, and the Chief Compliance Officer requires extreme security. With competing interests, they struggled to reach a consensus.",
    solution: "They built a multi-criteria decision model using pairwise comparisons. They structured the criteria into: Establishment, Availability Zones, Market Share, Services, and Pricing Models. Pairwise sliders helped align stakeholders and highlighted consistency issues (ensuring Consistency Ratio CR < 0.1).",
    impact: "The AHP analysis resolved the conflict, selecting the provider that balanced all criteria. They achieved a 99.99% system uptime migration with full board alignment and a 15% budget savings.",
    category: "Decision Support"
  },
  {
    id: "case-loan",
    title: "Loan Approval Decision Automation",
    subtitle: "Scaling retail banking approvals using structured decision tables",
    description: "A commercial bank struggled with high operational costs and slow loan processing times due to manual loan officer evaluations. They needed a repeatable system to automate credit approvals and identify high-risk applications.",
    problem: "Loan officers applied rules inconsistently. Some rejected good candidates, while others approved high-risk applicants. Processing a single loan application took 3 to 5 business days.",
    solution: "The business analysts modeled the approval process using a unified Decision Table. They mapped conditions (Customer Credit Score, Debt-to-Income, Income Stability, Risk Score) to specific outcomes (Auto-Approve, Reject, Manual Review). The table was checked for logical completeness and overlapping rules.",
    impact: "Loan processing times dropped from 4 days to 30 seconds for 75% of applications. Operational costs fell by 40%, and credit portfolio defaults dropped by 8% due to consistent, objective rule application.",
    category: "Decision Support"
  },
  {
    id: "case-retail",
    title: "Retail Sales Performance Analytics",
    subtitle: "Building a dimensional Data Warehouse and OLAP reporting stack",
    description: "A global retail chain struggled to analyze regional, product, and temporal sales performance because data was scattered across separate transactional (OLTP) POS cash register databases.",
    problem: "Running historical report queries on production POS systems slowed down checkouts, causing customer frustration. Furthermore, regional sales formats were inconsistent.",
    solution: "They designed a dedicated dimensional Data Warehouse. They built an ETL pipeline to nightly extract sales logs, clean duplicate entries, convert currencies to EUR, and load the data into a multidimensional sales cube (Time x Product x Region x Customer Segment).",
    impact: "Managers can now slice sales by region, dice by product categories, and pivot trends instantly. Query speeds dropped from 15 minutes to 2 seconds, and checkout performance remained fast and unaffected.",
    category: "Business Analytics"
  }
];
