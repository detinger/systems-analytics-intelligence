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
    id: "case-adaptive-grocery",
    title: "FreshMart Demand Shock Response",
    subtitle: "Using feedback loops to keep an adaptive grocery system stable",
    description: "FreshMart, a regional grocery chain, noticed that weekend demand for fresh bakery products changed sharply after a competitor opened nearby. Store managers needed the business system to sense the change and adjust purchasing, production, and staffing before waste increased.",
    problem: "Bakery shelves were empty on Saturday mornings, but excess stock was thrown away on Mondays. The company had data at checkout, production logs in the bakery, and supplier lead times in procurement, but no closed feedback loop connecting outputs back to planning.",
    solution: "FreshMart connected POS sales, spoilage logs, and supplier delivery data into a daily feedback report. Managers reviewed demand signals each afternoon, adjusted next-day production targets, and changed supplier orders when weekend demand exceeded thresholds.",
    impact: "Stockouts fell by 31%, bakery waste dropped by 18%, and managers could explain how inputs, processes, outputs, feedback, and environmental change interacted inside one adaptive business system.",
    category: "Business Information Systems"
  },
  {
    id: "case-warehouse-flow",
    title: "Warehouse Flow Visibility",
    subtitle: "Separating material, data, information, and management control flows",
    description: "A home-appliance distributor wanted to understand why physical warehouse operations looked busy while management reports showed inconsistent inventory accuracy.",
    problem: "Forklift teams moved goods correctly, but barcode scans were delayed, inventory data was incomplete, and managers made replenishment decisions from late reports. Material movement, data capture, information reporting, and management control were mixed together in conversations.",
    solution: "The team mapped four flows separately: material flow from receiving to shipping, data flow from barcode scans, information flow through stock reports, and management control flow through reorder decisions. Missing scan points were added at receiving, staging, and outbound loading.",
    impact: "Inventory accuracy improved from 86% to 97%, urgent recounts dropped, and supervisors could diagnose whether a problem came from physical movement, missing data, weak information, or poor management control.",
    category: "Business Information Systems"
  },
  {
    id: "case-hospital-systems",
    title: "Hospital Information System Pyramid",
    subtitle: "Matching TPS, MIS, and DSS to operational, tactical, and strategic needs",
    description: "A private hospital group was modernizing its information systems but kept mixing daily transaction recording, management reporting, and strategic scenario analysis in one overloaded application.",
    problem: "Reception needed fast appointment registration, department managers needed weekly utilization reports, and executives needed scenario models for a new cardiology unit. Treating all three needs as the same system created slow screens and weak decisions.",
    solution: "The hospital separated system roles. A TPS captured appointments, lab orders, and billing events. An MIS summarized bed occupancy, waiting times, and department performance. A DSS modeled staffing, investment cost, and projected demand for strategic expansion decisions.",
    impact: "Reception workflows became faster, department reports became more reliable, and executives could evaluate expansion scenarios without disrupting daily hospital operations.",
    category: "Business Information Systems"
  },
  {
    id: "case-furniture-erp",
    title: "FurnitureCo ERP Integration",
    subtitle: "Replacing departmental silos with shared process data",
    description: "FurnitureCo manufactured custom office furniture using separate systems for sales quotes, production planning, warehouse inventory, finance, and purchasing.",
    problem: "Sales promised delivery dates without current inventory, production planners used spreadsheet exports, finance retyped order data, and procurement often ordered materials too late. Every department had its own version of the truth.",
    solution: "FurnitureCo implemented an ERP system with shared customer, order, inventory, bill-of-materials, and invoice data. Sales quotes reserve capacity, production consumes inventory, finance receives automatic invoice events, and procurement gets reorder signals.",
    impact: "Manual re-entry fell by 70%, late material orders dropped by 24%, and managers gained a single operational view of orders from quote to delivery.",
    category: "Business Information Systems"
  },
  {
    id: "case-order-to-cash",
    title: "Order-to-Cash Process Redesign",
    subtitle: "Connecting sales, manufacturing, finance, and logistics into one end-to-end process",
    description: "A B2B equipment supplier was organized by strong departments, but customers experienced the company through one long order-to-cash process: proposal, configuration, credit check, production scheduling, delivery, billing, and collections.",
    problem: "Each business function optimized its own tasks, but handoffs were slow and invisible. Sales promised delivery dates without checking production capacity, Finance repeated credit checks manually, Logistics received late shipment information, and customers had to call multiple departments for order status.",
    solution: "Business analysts mapped the process across functions using swimlanes, identified ownership at each handoff, and connected the process to an ERP workflow. Sales proposals now reserve configuration data, Manufacturing confirms capacity, Finance runs credit rules automatically, Logistics receives delivery tasks, and Billing is triggered by shipment confirmation.",
    impact: "Order cycle time dropped by 35%, billing errors fell by 28%, and customer service calls about order status were reduced by half because every function now works from the same process data.",
    category: "Business Information Systems"
  },
  {
    id: "case-subscription-roles",
    title: "StreamWave Churn Investigation",
    subtitle: "Separating business analysis, BI, and analytics in one customer problem",
    description: "StreamWave, a subscription video platform, saw rising cancellations after a price change and needed to decide which discipline should handle which part of the problem.",
    problem: "Teams used the terms business analysis, BI, and business analytics interchangeably. Product managers wanted dashboards, operations wanted process fixes, and data scientists wanted predictive models, but the work was not coordinated.",
    solution: "A business analyst mapped the cancellation journey and identified confusing renewal communication. BI developers built dashboards for churn by plan, region, and acquisition channel. Analytics specialists built a churn-risk model to identify customers likely to cancel in the next 30 days.",
    impact: "The company reduced churn by 9% in one quarter and learned that process redesign, monitoring, and prediction are related but distinct forms of analysis work.",
    category: "Business Analytics"
  },
  {
    id: "case-airline-maturity",
    title: "AeroLine Analytics Maturity Upgrade",
    subtitle: "Moving from descriptive reports to prescriptive disruption response",
    description: "AeroLine had years of flight delay data but still handled disruption planning mostly through manual control-room judgment.",
    problem: "Managers could report what happened last month, but they struggled to explain why delays clustered, predict which routes would be disrupted, or recommend crew and aircraft recovery actions.",
    solution: "The airline built maturity in stages: descriptive dashboards for delay history, diagnostic drill-downs by airport and weather condition, predictive models for delay probability, and prescriptive optimization for aircraft reassignment during disruptions.",
    impact: "Delay response planning became faster, recovery costs fell by 12%, and managers could clearly distinguish descriptive, diagnostic, predictive, and prescriptive analytics.",
    category: "Business Analytics"
  },
  {
    id: "case-fashion-warehouse",
    title: "StyleHub Data Warehouse",
    subtitle: "Creating a separate analytical repository for omnichannel retail",
    description: "StyleHub sold fashion through stores, e-commerce, and mobile campaigns, but each channel stored customer and sales data in separate operational systems.",
    problem: "Analysts queried production databases directly, slowing checkout systems and producing inconsistent sales totals. Historical comparison was difficult because product codes and customer identifiers changed across channels.",
    solution: "StyleHub created a subject-oriented, integrated, non-volatile, time-variant data warehouse. Sales, customer, product, channel, and calendar data were standardized and stored separately from operational transaction systems.",
    impact: "Executives gained consistent historical reporting across channels, operational systems stayed fast, and analysts could compare seasons, regions, and customer segments without disturbing live sales systems.",
    category: "Business Analytics"
  },
  {
    id: "case-pharmacy-etl",
    title: "PharmaPlus ETL Quality Pipeline",
    subtitle: "Cleaning operational data before loading the data warehouse",
    description: "PharmaPlus collected prescription sales, supplier shipments, insurance claims, and store inventory data from hundreds of pharmacies.",
    problem: "The raw data used different drug codes, duplicated customer records, missing supplier IDs, and inconsistent date formats. Reports were unreliable because dirty operational data was loaded directly into analytics tables.",
    solution: "The ETL team extracted data from source systems, transformed it through validation, deduplication, code mapping, currency conversion, and missing-value handling, then loaded clean records into warehouse fact and dimension tables each night.",
    impact: "Rejected records were visible before reporting, inventory forecasts improved, and regulatory sales summaries could be produced with auditable data lineage.",
    category: "Business Analytics"
  },
  {
    id: "case-supermarket-olap",
    title: "SuperMarket OLAP Profit Cube",
    subtitle: "Using dimensions and measures to explore profitability instantly",
    description: "A supermarket chain needed managers to analyze profit by product category, store region, promotion type, and week without waiting for custom SQL reports.",
    problem: "Managers asked questions from different angles: which region underperformed, which promotions reduced margin, and which categories grew in holiday weeks. Flat spreadsheet reports could not support fast slice, dice, pivot, and drill-down analysis.",
    solution: "The BI team built an OLAP cube with Sales Revenue, Units Sold, Discount, and Gross Margin as measures, and Product, Store, Region, Promotion, and Time as dimensions.",
    impact: "Managers could drill from year to week, slice by promotion, dice region and category combinations, and identify margin leakage in minutes instead of days.",
    category: "Business Analytics"
  },
  {
    id: "case-fleet-decision",
    title: "Delivery Fleet Replacement Decision",
    subtitle: "Structuring alternatives, criteria, uncertainty, and implementation",
    description: "A logistics company had to decide whether to keep diesel vans, lease electric vans, or outsource last-mile delivery in dense urban zones.",
    problem: "The decision involved cost, reliability, emissions regulation, charging infrastructure, brand image, and uncertain fuel prices. Stakeholders argued from different assumptions and could not compare alternatives consistently.",
    solution: "Analysts defined the decision problem, listed alternatives, established criteria, estimated risks, scored each option, and documented implementation consequences. They separated facts, assumptions, preferences, and uncertainties before recommending a phased electric-van lease.",
    impact: "The decision became transparent, executives understood the trade-offs, and the company reduced urban delivery emissions while limiting capital risk.",
    category: "Decision Support"
  },
  {
    id: "case-returns-rules",
    title: "E-Commerce Returns Decision Table",
    subtitle: "Turning operational policy into complete and consistent rules",
    description: "An e-commerce retailer needed a repeatable way to decide whether returned products should be refunded, exchanged, inspected, rejected, or escalated.",
    problem: "Customer support agents interpreted return policy differently. Refunds varied by agent, high-value items skipped inspection, and edge cases caused delays and customer complaints.",
    solution: "Business analysts built a decision table with conditions such as return window, product condition, warranty status, order value, fraud flag, and customer tier. Outcomes included Auto-Refund, Exchange, Manual Review, Reject, and Quality Inspection.",
    impact: "Policy consistency improved, average return handling time fell by 45%, and managers could audit rule completeness and overlapping conditions before deployment.",
    category: "Decision Support"
  },
  {
    id: "case-model-portfolio",
    title: "OmniLogistics Decision Model Portfolio",
    subtitle: "Choosing optimization, simulation, heuristics, predictive, rule-based, and AHP models for different decisions",
    description: "OmniLogistics wanted to improve operational and strategic decisions across dispatching, warehouse staffing, late-delivery risk, customer escalation, disruption response, and fleet investment.",
    problem: "Managers kept asking for 'a decision model' as if one method could solve every problem. Route planning had hard constraints, warehouse staffing had uncertain arrival patterns, delivery risk needed prediction, customer escalation needed repeatable rules, disruption response needed fast practical choices, and fleet investment required stakeholder trade-offs.",
    solution: "The analytics team built a portfolio of model categories. Optimization assigned routes under capacity and time-window constraints. Simulation tested warehouse congestion. Predictive models estimated late-delivery risk. Rule-based models handled escalation policies. Heuristics supported fast dispatch choices during disruptions. AHP compared fleet technologies across cost, emissions, reliability, and strategic fit.",
    impact: "Model selection became clearer and faster. Teams stopped forcing every decision into one technique, operational decisions became more consistent, and strategic investment discussions became more transparent.",
    category: "Decision Support"
  },
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
