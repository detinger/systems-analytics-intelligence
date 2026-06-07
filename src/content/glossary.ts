export type GlossaryTerm = {
  term: string;
  croatian: string;
  definition: string;
  category: "Business Systems" | "Data Warehousing" | "Analytics & BI" | "Decision Support";
};

export const glossaryData: GlossaryTerm[] = [
  {
    term: "Raw Data",
    croatian: "Sirovi podaci",
    definition: "Unprocessed facts captured from transactions, operations, customers, employees, products, financial activity, markets, and external sources.",
    category: "Analytics & BI"
  },
  {
    term: "People",
    croatian: "Ljudi",
    definition: "The users, managers, analysts, specialists, and stakeholders who create, operate, govern, interpret, and act on information.",
    category: "Business Systems"
  },
  {
    term: "Process",
    croatian: "Proces",
    definition: "A repeatable set of connected activities that transforms inputs into a defined business result.",
    category: "Business Systems"
  },
  {
    term: "Data",
    croatian: "Podaci",
    definition: "Recorded facts or observations that gain business meaning when they are organized, interpreted, and placed in context.",
    category: "Analytics & BI"
  },
  {
    term: "Technology",
    croatian: "Tehnologija",
    definition: "The hardware, software, networks, platforms, and technical services used to capture, process, store, protect, and communicate information.",
    category: "Business Systems"
  },
  {
    term: "Planning",
    croatian: "Planiranje",
    definition: "Defining objectives, priorities, resources, actions, and expected results before work is performed.",
    category: "Business Systems"
  },
  {
    term: "Organizing",
    croatian: "Organiziranje",
    definition: "Arranging people, responsibilities, resources, and workflows so that plans can be executed effectively.",
    category: "Business Systems"
  },
  {
    term: "Directing",
    croatian: "Usmjeravanje",
    definition: "Guiding, coordinating, and motivating people while communicating decisions and operational priorities.",
    category: "Business Systems"
  },
  {
    term: "Controlling",
    croatian: "Kontroliranje",
    definition: "Comparing actual performance with plans and taking corrective action when results differ from expectations.",
    category: "Business Systems"
  },
  {
    term: "Strategic Management",
    croatian: "Stratesko upravljanje",
    definition: "Long-term management concerned with direction, competitive position, value creation, major investments, and uncertain nonrecurring decisions.",
    category: "Decision Support"
  },
  {
    term: "Managerial Management",
    croatian: "Takticko upravljanje",
    definition: "Medium-term management that converts strategy into plans, allocates resources, and monitors performance through semi-structured decisions.",
    category: "Decision Support"
  },
  {
    term: "Operational Management",
    croatian: "Operativno upravljanje",
    definition: "Short-term management focused on recurring work, efficient execution, quality control, and structured daily decisions.",
    category: "Business Systems"
  },
  {
    term: "Unstructured Decision",
    croatian: "Nestrukturirana odluka",
    definition: "A novel or complex decision with no complete predefined procedure, requiring judgement, interpretation, and consideration of uncertainty.",
    category: "Decision Support"
  },
  {
    term: "Semi-structured Decision",
    croatian: "Polustrukturirana odluka",
    definition: "A decision with some defined rules or analytical steps but also a significant need for managerial judgement.",
    category: "Decision Support"
  },
  {
    term: "Structured Decision",
    croatian: "Strukturirana odluka",
    definition: "A routine and repeatable decision governed by clear inputs, rules, procedures, and expected outcomes.",
    category: "Decision Support"
  },
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
    term: "Executive Information System (EIS)",
    croatian: "Izvrsni informacijski sustav",
    definition: "A high-level information system that gives executives concise access to strategic indicators, trends, exceptions, and external intelligence.",
    category: "Business Systems"
  },
  {
    term: "Information System",
    croatian: "Informacijski sustav",
    definition: "An organized combination of people, processes, data, and technology that collects, transforms, stores, and distributes information.",
    category: "Business Systems"
  },
  {
    term: "Information Value Chain",
    croatian: "Lanac vrijednosti informacija",
    definition: "The progression from collecting raw data through processing, informing, analyzing, deciding, acting, and measuring results.",
    category: "Analytics & BI"
  },
  {
    term: "Business Value Chain",
    croatian: "Poslovni lanac vrijednosti",
    definition: "The linked primary and support activities through which an organization transforms resources into customer value and competitive advantage.",
    category: "Business Systems"
  },
  {
    term: "Primary Activities",
    croatian: "Primarne aktivnosti",
    definition: "Value-chain activities directly involved in receiving inputs, producing, delivering, marketing, selling, and servicing an offering.",
    category: "Business Systems"
  },
  {
    term: "Support Activities",
    croatian: "Potporne aktivnosti",
    definition: "Activities such as infrastructure, human resources, technology development, and procurement that enable primary activities.",
    category: "Business Systems"
  },
  {
    term: "Better Decisions and Results",
    croatian: "Bolje odluke i rezultati",
    definition: "The business outcome of using reliable information to improve performance, drive efficiency, create value, and manage risk.",
    category: "Decision Support"
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
