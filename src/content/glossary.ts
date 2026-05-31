export type GlossaryTerm = {
  term: string;
  croatian: string;
  definition: string;
  category: "Business Systems" | "Data Warehousing" | "Analytics & BI" | "Decision Support";
};

export const glossaryData: GlossaryTerm[] = [
  {
    term: "Business Process",
    croatian: "Poslovni proces",
    definition: "A structured, sequence of tasks or activities that an organization performs to produce a specific service or product for customers.",
    category: "Business Systems"
  },
  {
    term: "Value Chain",
    croatian: "Lanac vrijednosti",
    definition: "A framework for analyzing the linked primary and support activities an organization performs to create value and competitive advantage.",
    category: "Business Systems"
  },
  {
    term: "Business Function",
    croatian: "Poslovna funkcija",
    definition: "A specialized organizational area or capability, such as sales, finance, logistics, production, HR, or marketing, responsible for a domain of work.",
    category: "Business Systems"
  },
  {
    term: "Workflow",
    croatian: "Tijek rada",
    definition: "The ordered movement of tasks, information, approvals, and responsibilities through people, departments, systems, or partner organizations.",
    category: "Business Systems"
  },
  {
    term: "Transaction Processing System (TPS)",
    croatian: "Sustav za obradu transakcija",
    definition: "An information system that captures and records the routine daily transactions necessary to conduct business (e.g., sales orders, inventory, payroll).",
    category: "Business Systems"
  },
  {
    term: "Management Information System (MIS)",
    croatian: "Upravljački informacijski sustav",
    definition: "A system that provides routine, pre-programmed reports on operational performance to mid-level managers to assist in planning and control.",
    category: "Business Systems"
  },
  {
    term: "Decision Support System (DSS)",
    croatian: "Sustav za potporu odlučivanju",
    definition: "An interactive, computer-based information system that combines data and mathematical models to help managers make semi-structured or unstructured decisions.",
    category: "Decision Support"
  },
  {
    term: "Enterprise Resource Planning (ERP)",
    croatian: "Sustav za planiranje resursa poduzeća",
    definition: "A suite of integrated software modules and a common database that links an organization's core business processes (sales, finance, HR, production) into one cohesive flow.",
    category: "Business Systems"
  },
  {
    term: "Data Warehouse",
    croatian: "Skladište podataka",
    definition: "A subject-oriented, integrated, non-volatile, and time-variant repository of historical data prepared specifically for complex query analysis and decision support.",
    category: "Data Warehousing"
  },
  {
    term: "ETL (Extraction, Transformation, Load)",
    croatian: "ETL procedure (Izvlačenje, Transformacija i Učitavanje)",
    definition: "The core process of extracting data from multiple source systems, cleaning and converting it into a consistent format, and loading it into a data warehouse.",
    category: "Data Warehousing"
  },
  {
    term: "OLAP (Online Analytical Processing)",
    croatian: "Online analitička obrada podataka",
    definition: "A software technology that enables users to analyze multidimensional data dynamically from multiple perspectives using core operations like slice, dice, pivot, drill-down, and drill-up.",
    category: "Analytics & BI"
  },
  {
    term: "Key Performance Indicator (KPI)",
    croatian: "Ključni pokazatelj uspješnosti (KPI)",
    definition: "A quantifiable measure used to evaluate the success of an organization or of a particular activity in meeting strategic and operational performance targets.",
    category: "Analytics & BI"
  },
  {
    term: "Dashboard",
    croatian: "Elektronička poslovna kontrolna ploča",
    definition: "A visual interface that displays key business metrics and KPIs on a single screen in a clean, graphic layout, allowing managers to monitor organizational performance at a glance.",
    category: "Analytics & BI"
  },
  {
    term: "Database Data Representation",
    croatian: "Prikaz podataka u bazi podataka",
    definition: "The structural model a database uses to organize data, such as key-value pairs, documents, column families, graphs, or relational tables.",
    category: "Analytics & BI"
  },
  {
    term: "Business Intelligence (BI)",
    croatian: "Poslovna inteligencija",
    definition: "A technology-driven process for analyzing business data and presenting actionable information to help corporate executives, managers, and other end users make informed decisions.",
    category: "Analytics & BI"
  },
  {
    term: "Business Analytics",
    croatian: "Poslovna analitika",
    definition: "The continuous iterative exploration and investigation of past business performance using statistical and quantitative models to gain insights and drive business planning.",
    category: "Analytics & BI"
  },
  {
    term: "Decision Analysis",
    croatian: "Analiza odluka",
    definition: "A systematic, quantitative approach to assessing complex decision problems, evaluating alternative courses of action, and calculating outcomes under conditions of uncertainty.",
    category: "Decision Support"
  },
  {
    term: "Decision Table",
    croatian: "Tablica odlučivanja",
    definition: "A tabular representation of business logic showing rows of specific conditions and mapping their combinations to designated actions or outcomes.",
    category: "Decision Support"
  },
  {
    term: "Decision Tree",
    croatian: "Stablo odlučivanja",
    definition: "A graphical model of decisions and their possible consequences (including chance event outcomes, resource costs, and utility) represented as a branching structure.",
    category: "Decision Support"
  },
  {
    term: "Consistency Ratio (CR)",
    croatian: "Omjer konzistentnosti (CR)",
    definition: "In decision models, a mathematical measure indicating the logical consistency of pairwise comparisons. In AHP, a CR value below 0.1 (10%) is considered acceptable, while higher values indicate inconsistent judgments.",
    category: "Decision Support"
  },
  {
    term: "MapReduce",
    croatian: "MapReduce obrada",
    definition: "A software framework and programming model for processing massive, semi-structured or unstructured datasets in parallel across distributed cluster systems.",
    category: "Analytics & BI"
  }
];
