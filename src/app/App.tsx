import React, { useRef, useState } from 'react';
import { 
  BookOpen, 
  Sliders, 
  Briefcase, 
  HelpCircle, 
  ArrowRight, 
  ChevronRight,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { courseModules, CourseModule, Lesson } from '../content/modules';
import { glossaryData } from '../content/glossary';
import { caseStudies } from '../content/cases';
import { BADGE_DETAILS } from '../store/progressStore';

function AppLogoMark() {
  return (
    <svg className="app-logo-mark" viewBox="0 0 48 48" role="img" aria-label="Systems Analytics Intelligence logo">
      <defs>
        <linearGradient id="logo-flow" x1="8" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="55%" stopColor="#2F9CFF" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <rect x="5" y="5" width="38" height="38" rx="9" fill="rgba(255,255,255,0.08)" />
      <path d="M13 31L20 24L26 27L35 16" fill="none" stroke="url(#logo-flow)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="31" r="3.4" fill="#2DD4BF" />
      <circle cx="20" cy="24" r="3.4" fill="#2F9CFF" />
      <circle cx="26" cy="27" r="3.4" fill="#D8E9FF" />
      <circle cx="35" cy="16" r="4" fill="#A78BFA" />
      <path d="M14 13H24M14 18H20M29 34H36" stroke="rgba(216,233,255,0.72)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const chartAxisTick = { fill: 'var(--text-secondary)', fontSize: 11 };
const chartAxisLine = { stroke: 'var(--border-light)' };
const chartGridStroke = 'rgba(164, 181, 204, 0.22)';
const chartTooltipStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-elevated)',
  border: '1px solid var(--border-light)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
};
const chartTooltipLabelStyle: React.CSSProperties = {
  color: 'var(--text-primary)',
  fontWeight: 700,
};
const chartTooltipItemStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
};
const chartTooltipCursor = {
  fill: 'rgba(47, 156, 255, 0.055)',
  stroke: 'rgba(96, 165, 250, 0.18)',
};

const visualAssets = {
  splash: new URL('../../pictures/splash.png', import.meta.url).href,
  businessSystem: new URL('../../pictures/poslovni_sustav.png', import.meta.url).href,
  businessSystemFlows: new URL('../../pictures/poslovni_sustav_tokovi.png', import.meta.url).href,
  systemsPyramid: new URL('../../pictures/info-sustav.png', import.meta.url).href,
  managementLevels: new URL('../../pictures/level-smo.png', import.meta.url).href,
  challenges: new URL('../../pictures/challanges.png', import.meta.url).href,
  dss: new URL('../../pictures/DSS.png', import.meta.url).href,
  decisions: new URL('../../pictures/decisions.png', import.meta.url).href,
  decisionMakingProcess: new URL('../../pictures/decision-making-process.png', import.meta.url).href,
  mis: new URL('../../pictures/MIS.png', import.meta.url).href,
  erp: new URL('../../pictures/ERP.png', import.meta.url).href,
  taxonomyData: new URL('../../pictures/Taxonomy-of-data.png', import.meta.url).href,
  baKnowledgeAreas: new URL('../../pictures/business-analysis-knowledge-areas.png', import.meta.url).href,
  analysisVsAnalytics: new URL('../../pictures/Business-Analysis-vs-Business-Analytics.png', import.meta.url).href,
  evolution: new URL('../../pictures/evolution.png', import.meta.url).href,
  businessAnalytics: new URL('../../pictures/business_analytics.png', import.meta.url).href,
  dataWarehouseFramework: new URL('../../pictures/data-warehouse-framework.png', import.meta.url).href,
  biArchitecture: new URL('../../pictures/BI-architecture.png', import.meta.url).href,
  data: new URL('../../pictures/data.png', import.meta.url).href,
  baSkills: new URL('../../pictures/BA-skills.png', import.meta.url).href,
  olapCube: new URL('../../pictures/data-cube-slicing.png', import.meta.url).href,
  biVsDataScience: new URL('../../pictures/BI_vs_DataScience.png', import.meta.url).href,
  nosql: new URL('../../pictures/nosql.png', import.meta.url).href,
  etlPipeline: new URL('../../pictures/ETL-process.png', import.meta.url).href,
  analyticsSpectrum: new URL('../../pictures/analytics_spectrum.png', import.meta.url).href,
  analyticsMaturity: new URL('../../pictures/analytics-maturity.png', import.meta.url).href,
  decisionTable: new URL('../../pictures/decision_table.png', import.meta.url).href,
  decisionTree: new URL('../../pictures/decision_tree.png', import.meta.url).href,
  decisionRequirements: new URL('../../pictures/decision_requirements_diagram.png', import.meta.url).href,
  dmPaBa: new URL('../../pictures/DM-PA-BA.png', import.meta.url).href,
  decisionModels: new URL('../../pictures/PA-models.png', import.meta.url).href,
  ahpHierarchy: new URL('../../pictures/AHP.png', import.meta.url).href,
  processValueChain: new URL('../../pictures/process1.png', import.meta.url).href,
  processFunctions: new URL('../../pictures/process2.png', import.meta.url).href,
  processSwimlane: new URL('../../pictures/process3.png', import.meta.url).href,
  processPartnerships: new URL('../../pictures/process4.png', import.meta.url).href,
};

const sourceVisualConcepts = [
  { title: "Business System", category: "Business Information Systems", image: visualAssets.businessSystem, concepts: "Adaptive enterprise system, inputs, outputs, control mechanism, feedback." },
  { title: "Business System Flows", category: "Business Information Systems", image: visualAssets.businessSystemFlows, concepts: "Material, data, information, and management flows across the enterprise." },
  { title: "Information System Structure", category: "Business Information Systems", image: visualAssets.systemsPyramid, concepts: "Information systems as support for operational, managerial, and executive work." },
  { title: "Strategic, Managerial, and Operational Levels", category: "Business Information Systems", image: visualAssets.managementLevels, concepts: "Strategic, managerial, and operational information-system levels with their users, decisions, and time horizons." },
  { title: "Information System Challenges", category: "Business Information Systems", image: visualAssets.challenges, concepts: "Implementation, integration, organizational change, and data quality risks." },
  { title: "Decision Support Systems", category: "Business Information Systems", image: visualAssets.dss, concepts: "Model-driven support for complex, semi-structured decisions." },
  { title: "Decision Types", category: "Business Information Systems", image: visualAssets.decisions, concepts: "Structured, semi-structured, and unstructured decisions across management levels." },
  { title: "Decision-Making Process", category: "Business Information Systems", image: visualAssets.decisionMakingProcess, concepts: "Intelligence, design, choice, implementation, and feedback." },
  { title: "Management Information Systems", category: "Business Information Systems", image: visualAssets.mis, concepts: "Routine reports, managerial summaries, control information, internal performance." },
  { title: "ERP", category: "Business Information Systems", image: visualAssets.erp, concepts: "Integrated modules, shared database, enterprise process coordination." },
  { title: "Porter's Value Chain", category: "Business Information Systems", image: visualAssets.processValueChain, concepts: "Primary and support processes combine to create competitive advantage." },
  { title: "Business Processes and Functions", category: "Business Information Systems", image: visualAssets.processFunctions, concepts: "End-to-end processes cross specialized functions such as sales, manufacturing, finance, and logistics." },
  { title: "Cross-Functional Process Flow", category: "Business Information Systems", image: visualAssets.processSwimlane, concepts: "Swimlane workflows show how responsibility passes between customers and departments." },
  { title: "Information Partnerships", category: "Business Information Systems", image: visualAssets.processPartnerships, concepts: "Collaboration, workflow, content, and knowledge systems connect internal functions with partner organizations." },
  { title: "Taxonomy of Data", category: "Analytics and BI", image: visualAssets.taxonomyData, concepts: "Data classes, source types, structured and unstructured data." },
  { title: "Business Analysis Knowledge Areas", category: "Analytics and BI", image: visualAssets.baKnowledgeAreas, concepts: "Requirements, stakeholders, strategy, solution evaluation, change support." },
  { title: "Business Analysis vs Business Analytics", category: "Analytics and BI", image: visualAssets.analysisVsAnalytics, concepts: "Process-change discipline versus quantitative data modelling discipline." },
  { title: "Analytics Evolution", category: "Analytics and BI", image: visualAssets.evolution, concepts: "Development path from reporting toward advanced analytical capability." },
  { title: "Business Analytics", category: "Analytics and BI", image: visualAssets.businessAnalytics, concepts: "Descriptive, diagnostic, predictive, and prescriptive analytical thinking." },
  { title: "Data Warehouse Framework", category: "Analytics and BI", image: visualAssets.dataWarehouseFramework, concepts: "Source systems, ETL, warehouse storage, marts, OLAP, reporting layer." },
  { title: "BI Architecture", category: "Analytics and BI", image: visualAssets.biArchitecture, concepts: "End-to-end BI stack from data sources to user-facing insight." },
  { title: "Data Concept", category: "Analytics and BI", image: visualAssets.data, concepts: "Raw data, meaning, context, transformation into information." },
  { title: "Business Analyst Skills", category: "Analytics and BI", image: visualAssets.baSkills, concepts: "Analytical, communication, domain, technical, and stakeholder skills." },
  { title: "OLAP Cube Slicing", category: "Analytics and BI", image: visualAssets.olapCube, concepts: "Multidimensional analysis, slice, dice, pivot, drill-down." },
  { title: "BI vs Data Science", category: "Analytics and BI", image: visualAssets.biVsDataScience, concepts: "Operational reporting and monitoring versus advanced modelling and experimentation." },
  { title: "Database Data Representations", category: "Analytics and BI", image: visualAssets.nosql, concepts: "Different ways databases represent data: key-value, graph, column-family, and document models." },
  { title: "ETL Process", category: "Analytics and BI", image: visualAssets.etlPipeline, concepts: "Extract, clean, transform, load, and prepare warehouse-ready data." },
  { title: "Analytics Spectrum", category: "Decision Modelling", image: visualAssets.analyticsSpectrum, concepts: "Descriptive, diagnostic, predictive, and prescriptive analytics." },
  { title: "Analytics Maturity Spectrum", category: "Decision Modelling", image: visualAssets.analyticsMaturity, concepts: "Business value and difficulty as analytics moves toward optimization." },
  { title: "Decision Modelling in PA and BA", category: "Decision Modelling", image: visualAssets.dmPaBa, concepts: "Prescriptive analytics, decision modelling, and business analytics relationship." },
  { title: "Decision Model Categories", category: "Decision Modelling", image: visualAssets.decisionModels, concepts: "Optimization, simulation, heuristics, predictive and rule-based models." },
  { title: "AHP Decision Hierarchy", category: "Decision Modelling", image: visualAssets.ahpHierarchy, concepts: "Goal, criteria, and alternatives arranged as a multi-criteria decision hierarchy." },
  { title: "Decision Table", category: "Decision Modelling", image: visualAssets.decisionTable, concepts: "Conditions, actions, business rules, completeness and consistency." },
  { title: "Decision Tree", category: "Decision Modelling", image: visualAssets.decisionTree, concepts: "Decision nodes, chance nodes, outcomes, payoff comparison." },
  { title: "Decision Requirements Diagram", category: "Decision Modelling", image: visualAssets.decisionRequirements, concepts: "Decision dependencies, input data, knowledge sources, DMN-style structure." },
];

const visualExplanations: Record<string, string> = {
  "Business System": "Read this diagram as a simple model of how an organization survives in its environment. Inputs such as people, capital, materials, data, and technology enter the business; internal processes transform those inputs; outputs such as products, services, reports, and customer value leave the system. The most important part is feedback: results from the output side return to management as signals about quality, cost, demand, delays, or errors. A business becomes adaptive when managers use that feedback to change resources, rules, workflows, or goals instead of repeating the same process regardless of what is happening outside.",
  "Business System Flows": "This diagram is useful because it separates flows that are often mixed together in everyday language. Material flow is the physical movement of goods, documents, equipment, or people. Data flow is the capture of raw events, such as a scan, order, payment, or status update. Information flow is what happens after data is organized into reports, dashboards, alerts, or instructions that people can interpret. Management control flow moves in the opposite direction: managers use information to send decisions, plans, approvals, and corrections back into operations. If a process fails, the diagram helps you ask which flow broke.",
  "Information System Structure": "The structure shows why one organization needs several kinds of information systems rather than one universal tool. At the operational level, systems must be fast, detailed, and reliable because they record daily transactions. At the managerial level, systems summarize those transactions so supervisors can monitor performance, compare actual results with plans, and detect exceptions. At the strategic level, systems support broader questions about markets, investments, risk, and long-term direction. The higher you move, the less routine the decision becomes and the more aggregation, interpretation, and judgement are needed.",
  "Strategic, Managerial, and Operational Levels": "This visual connects people, decisions, time horizons, and information needs. Operational users focus on immediate work, so they need current, detailed, accurate records. Middle managers coordinate resources and performance over weeks or months, so they need summaries, trends, and exception reports. Strategic leaders make long-range and uncertain decisions, so they need external data, forecasts, scenarios, and high-level indicators. The same business event can serve all three levels, but it must be transformed from raw transaction detail into information that matches each decision context.",
  "Information System Challenges": "The diagram reminds us that information-system projects fail for reasons beyond programming. A system may be technically functional but still weak if users do not adopt it, departments refuse to share data, legacy systems cannot integrate, security rules are unclear, or data quality is poor. Organizational change is often the hardest part: new systems change responsibilities, decision rights, routines, and performance visibility. A good implementation therefore needs process redesign, training, governance, stakeholder alignment, and technical architecture working together.",
  "Decision Support Systems": "This visual presents a DSS as a decision environment, not just a report. Data provides facts about the situation, models represent relationships and assumptions, and the user explores alternatives through questions such as what if, how much, under which constraints, and with what risk. A DSS is especially valuable when decisions are semi-structured: part of the problem can be calculated, but judgement is still needed. The diagram also shows why model quality matters. If the model or input data is weak, the system can produce confident but misleading recommendations.",
  "Decision Types": "The diagram classifies decisions by how clearly the rules and outcomes are known. Structured decisions are repetitive and rule-based, such as calculating reorder points or applying eligibility rules. Semi-structured decisions have some analyzable parts but still require human interpretation, such as choosing a supplier under uncertain demand. Unstructured decisions are novel, ambiguous, and strategic, such as entering a new market. This classification matters because it tells us what kind of information system is appropriate: automation for structured decisions, DSS for semi-structured decisions, and broad analytical support for unstructured decisions.",
  "Decision-Making Process": "The diagram turns decision making into a sequence rather than a single click. In the intelligence phase, the organization discovers and defines the problem. In design, it develops alternatives, models, criteria, and assumptions. In choice, it compares alternatives and selects an option. In implementation, the decision is translated into action, budgets, responsibilities, and system changes. Feedback closes the loop by checking whether the chosen action worked. This is important because many poor decisions fail not at selection, but at problem definition or implementation.",
  "Management Information Systems": "This image positions MIS as the managerial reporting layer built on top of operational data. Transaction systems record detailed events, but managers need those events aggregated into meaningful indicators such as sales by region, stock exceptions, productivity, waiting time, or budget variance. MIS usually supports routine monitoring rather than open-ended discovery. The visual helps students see why MIS reports must be timely, consistent, and aligned with management responsibility: each report should help someone plan, control, or correct an area of the business.",
  "ERP": "The ERP diagram shows integration across functions through common modules and a shared database. In a fragmented company, Sales, Finance, Production, HR, and Logistics may each store their own copy of customer, order, employee, or inventory data. ERP reduces this duplication by making one business event update all affected areas. For example, a confirmed sales order can reserve inventory, trigger production planning, update revenue expectations, and prepare invoicing. The key idea is not simply software size; it is process integration and data consistency across the enterprise.",
  "Porter's Value Chain": "The diagram separates primary business processes from support processes and points them toward competitive advantage. Primary processes form the value-creating path that customers experience most directly: inbound logistics bring resources in, operations transform them, outbound logistics deliver them, marketing and sales create demand, and customer service sustains value after the sale. Support processes sit above this chain because they enable every primary activity: administration coordinates the organization, HR provides people, technology development improves methods, procurement supplies resources, and intranets, extranets, and portals connect work digitally. The arrow means advantage comes from how well all activities fit together, not from one isolated department.",
  "Business Processes and Functions": "This picture shows why process thinking is different from department thinking. The horizontal chain is the business process: proposal, commitment, configuration, credit checking, delivery, billing, and collections. The boxes underneath are business functions such as Sales, Manufacturing, Finance, and Logistics. A function owns specialized knowledge, but a process crosses several functions to deliver a complete result to the customer. The connecting lines are the handoffs where delays, duplicate data entry, unclear responsibility, and system gaps often appear. Information systems add value when they make these handoffs visible and coordinated.",
  "Cross-Functional Process Flow": "This swimlane diagram makes responsibility visible. Each horizontal lane represents an actor or department, and each process step appears in the lane responsible for doing it. The flow starts with the customer, passes to Department 1 to receive demand, moves to Department 2 for quotation, shifts to Department 3 to close the contract, then returns to Department 1 to deliver the product and complete the process. The lesson is that the customer sees one process, but the organization performs it through multiple handoffs. Swimlanes help analysts locate bottlenecks, missing approvals, duplicated tasks, and weak system support.",
  "Information Partnerships": "The triangle shows that modern information systems extend beyond internal departments. Accounting, distribution, production, and marketing need to coordinate inside Organization #1, but the organization also exchanges information with partners, suppliers, customers, and other organizations. Collaboration systems sit in the center because they manage shared documents, workflow, knowledge, communication, and content. The picture helps explain why groupware, content management, knowledge management, and workflow tools are strategic: they reduce coordination friction across functional and organizational boundaries.",
  "Taxonomy of Data": "The taxonomy shows that data differs by structure, source, format, and business use. Structured data fits neatly into tables, such as orders, products, payments, and inventory records. Semi-structured data has tags or flexible fields, such as JSON, XML, or logs. Unstructured data includes text, images, audio, video, and documents. The source also matters: internal operational data is usually easier to govern, while external data may be noisier but strategically valuable. This classification matters because storage, cleaning, integration, privacy control, and analytical methods differ for each data type.",
  "Business Analysis Knowledge Areas": "This diagram expands business analysis beyond writing requirements. It shows that analysts help define strategy, understand stakeholders, elicit needs, analyze requirements, evaluate solutions, and support change. Each area answers a different question: Why change? Who is affected? What is needed? How should the solution behave? Did it create value? The diagram is useful because it places business analysts between business goals and solution delivery. Their work connects processes, rules, information systems, people, and measurable outcomes.",
  "Business Analysis vs Business Analytics": "The comparison shows two related but different disciplines. Business analysis is about understanding organizational needs, processes, stakeholders, requirements, and solutions. It asks what should change and how the business should work. Business analytics is about using data, statistics, models, and quantitative methods to explain patterns or support decisions. It asks what the data reveals and what might happen next. Many projects need both: business analysis defines the problem and process context, while analytics provides evidence, patterns, forecasts, or optimization support.",
  "Analytics Evolution": "The evolution diagram shows how organizations typically move from simple reporting toward more advanced analytical capability. Early stages focus on collecting data and describing past performance. As data quality, tooling, and skills improve, organizations begin diagnosing causes, forecasting future outcomes, and recommending actions. The important point is that advanced analytics depends on earlier foundations: reliable data, shared definitions, integrated systems, and business trust. An organization cannot jump straight to predictive or prescriptive analytics if basic reporting is inconsistent.",
  "Business Analytics": "This diagram organizes business analytics around increasingly advanced business questions. Descriptive analytics answers what happened by summarizing historical data. Diagnostic analytics asks why it happened by drilling into causes, relationships, and exceptions. Predictive analytics asks what is likely to happen using statistical or machine learning models. Prescriptive analytics asks what should be done by combining predictions with constraints, objectives, and optimization. The diagram helps students see analytics as a progression from awareness to explanation to anticipation to action.",
  "Data Warehouse Framework": "The framework shows the path from operational systems to analytical decision support. Source systems contain transactional data from daily work, but that data is often fragmented, inconsistent, and optimized for recording rather than analysis. ETL or ELT processes extract, clean, transform, and integrate that data into a warehouse. From there, data marts, OLAP structures, reports, dashboards, and analytical tools serve business users. The key idea is separation of concerns: operational systems run the business, while the warehouse supports analysis without disrupting daily operations.",
  "BI Architecture": "The BI architecture diagram shows that user-facing dashboards are only the visible top of a larger stack. Underneath are data sources, integration processes, staging areas, warehouses, semantic layers, cubes or models, security, and presentation tools. Each layer has a role: sources record activity, integration standardizes it, storage preserves history, models define business meaning, and front-end tools make insight accessible. If a dashboard is wrong, the problem may be anywhere in the pipeline, so analysts need to understand the whole architecture.",
  "Data Concept": "This visual distinguishes raw data from information and knowledge. A value by itself, such as 42 or 2026-05-31, has limited meaning until it is placed in context. When data is structured, labeled, compared, aggregated, or interpreted, it becomes information. When people use that information with experience, goals, and judgement, it supports knowledge and decisions. The diagram is a reminder that information systems do not create insight merely by storing data; they must preserve meaning, context, quality, and relevance.",
  "Business Analyst Skills": "The skills diagram shows that business analysts need a hybrid profile. They must communicate with stakeholders, understand business domains, analyze processes, model requirements, reason about data, and work with technical teams. Soft skills matter because analysts must elicit needs, resolve ambiguity, and build agreement. Technical literacy matters because proposed solutions often become information systems. Analytical thinking matters because analysts must separate symptoms from root causes. The diagram makes the role look less like note-taking and more like structured problem solving.",
  "OLAP Cube Slicing": "The cube illustrates multidimensional thinking. A measure such as sales revenue, units sold, or profit can be analyzed across dimensions such as time, product, region, customer segment, or channel. Slice means filtering to one value of a dimension, such as only Q1. Dice means filtering multiple dimensions, such as Q1 and laptops in one region. Pivot rotates the view, while drill-down moves from summary to detail and drill-up aggregates back upward. The cube matters because it lets managers explore data interactively without writing a new query for every question.",
  "BI vs Data Science": "The visual compares two ways of extracting value from data. BI focuses on known metrics, historical monitoring, dashboards, reports, and business performance management. It is usually close to operational and managerial control. Data science is more exploratory and model-driven: it may use experiments, prediction, classification, clustering, recommendation, or anomaly detection to discover patterns and estimate future outcomes. The diagram is not saying one is better. It shows that BI helps organizations understand and monitor the business, while data science helps investigate uncertainty and build predictive capabilities.",
  "Database Data Representations": "This diagram compares four ways a database can represent and organize data. A key-value model stores each item under a unique key, which is useful for fast lookup when the application already knows what it wants to retrieve. A graph database represents data as nodes and relationships, making it suitable for networks such as customers, products, suppliers, social links, recommendations, or fraud connections. A column-family model stores data by columns or column groups, which can be efficient for very large, sparse, distributed datasets. A document model stores richer records as flexible documents, often matching real business objects such as orders, profiles, invoices, or product descriptions. The main lesson is that database design depends on how business data is shaped, queried, related, and updated.",
  "ETL Process": "The ETL diagram follows data from source systems into a trusted analytical store. Extraction reads data from operational databases, files, APIs, or external sources. Transformation cleans errors, standardizes formats, resolves duplicates, maps codes, checks business rules, and prepares dimensions and facts. Loading writes the prepared data into the warehouse or data mart. The diagram is important because most analytical quality is created before users open a dashboard. If ETL is weak, reports may look polished while hiding inconsistent or unreliable data.",
  "Analytics Spectrum": "The spectrum places analytics types in order of increasing analytical ambition. Descriptive analytics reports what happened. Diagnostic analytics investigates causes. Predictive analytics estimates future outcomes. Prescriptive analytics recommends or automates actions based on objectives, constraints, and predicted consequences. As the spectrum advances, business value may increase because decisions become more proactive, but difficulty also rises because the organization needs better data, stronger models, clearer governance, and more trust in analytical outputs.",
  "Analytics Maturity Spectrum": "The maturity spectrum shows analytics as an organizational capability, not merely a set of tools. At low maturity, teams often rely on manual reports, inconsistent definitions, and reactive decisions. As maturity grows, data becomes integrated, metrics are standardized, dashboards become trusted, and analysts can diagnose causes. Higher maturity adds forecasting, optimization, simulation, and automated recommendations. The diagram helps explain why culture, skills, data governance, and business adoption are just as important as algorithms.",
  "Decision Modelling in PA and BA": "This visual connects decision modelling to prescriptive analytics and business analytics. Descriptive and predictive analysis can tell managers what happened or what might happen, but decision modelling asks what action should be chosen. It requires alternatives, objectives, constraints, criteria, assumptions, and sometimes uncertainty. In prescriptive analytics, models can recommend a course of action, such as an optimal schedule, portfolio, route, or policy. The diagram shows that decision models turn insight into structured choice.",
  "Decision Model Categories": "The category diagram shows that not all decision models solve the same kind of problem. Optimization models search for the best feasible solution under constraints. Simulation models explore how a system may behave under uncertainty. Heuristics provide practical rules when exact optimization is too costly. Predictive models estimate likely outcomes. Rule-based models encode business logic explicitly. The correct model depends on whether the problem is about choosing, forecasting, experimenting, automating, or managing uncertainty.",
  "AHP Decision Hierarchy": "This diagram shows how AHP structures a multi-criteria decision before any calculation happens. The top level is the goal, such as choosing the optimal option. The middle level contains criteria that express what matters for the decision, such as cost, reliability, usability, security, or strategic fit. The bottom level contains alternatives competing for selection. The arrows show that each alternative is evaluated through each criterion, and the criteria themselves are weighted according to their importance to the goal. In Lesson 13, AHP is one example of a multi-criteria decision model: it is useful when stakeholder preferences must be made explicit and checked for consistency.",
  "Decision Table": "The decision table visual turns business policy into a structured set of rules. Conditions describe the inputs that matter, such as customer type, risk level, amount, or status. Actions describe the decision outcome, such as approve, reject, escalate, discount, or inspect. Each row represents one rule combination. The power of the table is auditability: analysts can check whether every possible case is covered, whether two rules conflict, and whether overlapping conditions produce inconsistent outcomes. This makes decision logic easier to communicate and automate.",
  "Decision Tree": "The decision tree represents a decision as a branching structure of choices, uncertain events, and outcomes. Decision nodes show where the decision maker chooses an alternative. Chance nodes show events outside full control, such as market response, demand level, or system failure. Terminal nodes show consequences, costs, payoffs, or utilities. By attaching probabilities and values, the tree can support expected-value comparison. Even without calculations, it helps clarify assumptions and reveal hidden paths that people may overlook in a verbal discussion.",
  "Decision Requirements Diagram": "The DRD shows what a decision depends on before it can be made. A decision may require input data, business knowledge, supporting sub-decisions, and external knowledge sources such as policy, regulation, or expert judgement. The diagram is useful because it separates the question being decided from the information and rules needed to answer it. In system design, this helps analysts identify missing data, unclear ownership, reusable decisions, and business rules that should be documented before automation."
};

const moduleResourceMap: Record<string, { visualTitles: string[]; caseIds: string[]; glossaryTerms: string[] }> = {
  m1: {
    visualTitles: ["Business System", "Business System Flows", "Data Concept"],
    caseIds: ["case-retail"],
    glossaryTerms: ["Business Process", "Business Intelligence"]
  },
  m2: {
    visualTitles: ["Information System Structure", "Strategic, Managerial, and Operational Levels", "Management Information Systems", "ERP", "Porter's Value Chain", "Business Processes and Functions", "Cross-Functional Process Flow", "Information Partnerships", "Decision Support Systems", "Information System Challenges"],
    caseIds: ["case-retail"],
    glossaryTerms: ["Business Process", "Value Chain", "Business Function", "Workflow", "Transaction Processing System (TPS)", "Management Information System (MIS)", "Decision Support System (DSS)", "Enterprise Resource Planning (ERP)"]
  },
  m3: {
    visualTitles: ["Business Analysis vs Business Analytics", "Business Analysis Knowledge Areas", "Business Analyst Skills", "Business Analytics", "BI vs Data Science", "Analytics Spectrum", "Analytics Maturity Spectrum", "Analytics Evolution", "Database Data Representations"],
    caseIds: ["case-retail"],
    glossaryTerms: ["Business Intelligence (BI)", "Business Analytics", "Dashboard", "Key Performance Indicator (KPI)", "Database Data Representation"]
  },
  m4: {
    visualTitles: ["Data Warehouse Framework", "BI Architecture", "ETL Process", "Taxonomy of Data", "Data Concept"],
    caseIds: ["case-retail"],
    glossaryTerms: ["Data Warehouse", "ETL (Extraction, Transformation, Load)", "Business Intelligence (BI)"]
  },
  m5: {
    visualTitles: ["OLAP Cube Slicing", "BI Architecture", "Business Analytics"],
    caseIds: ["case-retail"],
    glossaryTerms: ["OLAP (Online Analytical Processing)", "Dashboard", "Key Performance Indicator (KPI)"]
  },
  m7: {
    visualTitles: ["Decision Types", "Decision-Making Process", "Decision Support Systems", "Decision Tree"],
    caseIds: ["case-cloud", "case-loan"],
    glossaryTerms: ["Decision Analysis", "Decision Support System (DSS)", "Decision Tree"]
  },
  m8: {
    visualTitles: ["Decision Modelling in PA and BA", "Decision Model Categories", "Decision Table", "Decision Tree", "Decision Requirements Diagram"],
    caseIds: ["case-loan"],
    glossaryTerms: ["Decision Table", "Decision Tree", "Decision Analysis"]
  },
  m9: {
    visualTitles: ["Decision Model Categories", "AHP Decision Hierarchy", "Analytics Maturity Spectrum", "Decision Modelling in PA and BA", "Decision Requirements Diagram"],
    caseIds: ["case-cloud"],
    glossaryTerms: ["Consistency Ratio (CR)", "Decision Analysis", "Decision Support System (DSS)"]
  },
};

const decisionModellingModuleIds = new Set(["m7", "m8", "m9"]);
const decisionModellingGroupTitle = "Decision Modelling and Analysis";
const decisionModellingGroupSubtitle = "Decision analysis, rules, trees, DRDs, optimization, simulation, and model categories";

function getDisplayModuleTitle(module: CourseModule) {
  return decisionModellingModuleIds.has(module.id) ? decisionModellingGroupTitle : module.title;
}

const lessonAnchorVisualTitles: Record<string, string> = {
  "l1-1": "Business System",
  "l1-2": "Business System Flows",
  "l2-1": "Strategic, Managerial, and Operational Levels",
  "l2-2": "ERP",
  "l2-3": "Porter's Value Chain",
  "l3-1": "Business Analysis vs Business Analytics",
  "l3-2": "Analytics Maturity Spectrum",
  "l4-1": "Data Warehouse Framework",
  "l4-2": "ETL Process",
  "l5-1": "OLAP Cube Slicing",
  "l7-1": "Decision-Making Process",
  "l8-1": "Decision Table",
  "l9-1": "Decision Model Categories"
};

const lessonVisualTitles: Record<string, string[]> = {
  "l1-1": ["Business System", "Data Concept"],
  "l1-2": ["Business System Flows", "Data Concept"],
  "l2-1": ["Information System Structure", "Strategic, Managerial, and Operational Levels", "Management Information Systems", "Decision Support Systems"],
  "l2-2": ["ERP", "Management Information Systems", "Information System Challenges"],
  "l2-3": ["Porter's Value Chain", "Business Processes and Functions", "Cross-Functional Process Flow", "Information Partnerships"],
  "l3-1": ["Business Analysis vs Business Analytics", "Business Analysis Knowledge Areas", "Business Analyst Skills", "BI vs Data Science"],
  "l3-2": ["Analytics Maturity Spectrum", "Analytics Spectrum", "Analytics Evolution", "Business Analytics", "Database Data Representations"],
  "l4-1": ["Data Warehouse Framework", "BI Architecture", "Taxonomy of Data", "Data Concept"],
  "l4-2": ["ETL Process", "Data Warehouse Framework", "BI Architecture"],
  "l5-1": ["OLAP Cube Slicing", "BI Architecture", "Business Analytics"],
  "l7-1": ["Decision-Making Process", "Decision Types", "Decision Support Systems", "Decision Tree"],
  "l8-1": ["Decision Table", "Decision Tree", "Decision Requirements Diagram"],
  "l9-1": ["Decision Model Categories", "AHP Decision Hierarchy", "Decision Modelling in PA and BA", "Decision Requirements Diagram", "Analytics Maturity Spectrum"],
};

const lessonCaseIds: Record<string, string[]> = {
  "l1-1": ["case-adaptive-grocery"],
  "l1-2": ["case-warehouse-flow"],
  "l2-1": ["case-hospital-systems"],
  "l2-2": ["case-furniture-erp"],
  "l2-3": ["case-order-to-cash"],
  "l3-1": ["case-subscription-roles"],
  "l3-2": ["case-airline-maturity"],
  "l4-1": ["case-fashion-warehouse"],
  "l4-2": ["case-pharmacy-etl"],
  "l5-1": ["case-supermarket-olap"],
  "l7-1": ["case-fleet-decision"],
  "l8-1": ["case-returns-rules"],
  "l9-1": ["case-model-portfolio"],
};

function getLessonAnchorVisual(lesson: Lesson, module: CourseModule) {
  const visualTitle = lessonAnchorVisualTitles[lesson.id];
  return sourceVisualConcepts.find(visual => visual.title === visualTitle)
    ?? getModuleVisuals(module)[0];
}

// Main Application Component
export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const contentBodyRef = useRef<HTMLDivElement | null>(null);

  const scrollToPageTop = (behavior: ScrollBehavior = 'auto') => {
    requestAnimationFrame(() => {
      contentBodyRef.current?.scrollTo({ top: 0, behavior });
      window.scrollTo({ top: 0, behavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  const navigateToPage = (page: string) => {
    setActivePage(page);
    scrollToPageTop();
  };

  const handleLessonSelect = (lesson: Lesson, module: CourseModule) => {
    setSelectedModule(module);
    setSelectedLesson(lesson);
    navigateToPage('lesson');
  };
  const goHome = () => {
    setSelectedModule(null);
    setSelectedLesson(null);
    setSelectedLabId(null);
    navigateToPage('home');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      {activePage !== 'home' && (
        <header className="sidebar">
          <button className="sidebar-header brand-home-link" type="button" onClick={goHome} aria-label="Go to homepage">
            <div className="sidebar-logo-icon">
              <AppLogoMark />
            </div>
            <div>
              <h1 className="sidebar-title">Systems Analytics Intelligence</h1>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>INFORMATION SYSTEMS LAB</p>
            </div>
          </button>

          <nav className="sidebar-menu">
            <a className={`sidebar-link ${['study', 'lesson'].includes(activePage) ? 'active' : ''}`} onClick={() => { setSelectedModule(null); setSelectedLesson(null); navigateToPage('study'); }}>
              <BookOpen size={18} /> Learning Path
            </a>
            <a className={`sidebar-link ${activePage === 'labs' ? 'active' : ''}`} onClick={() => { setSelectedLabId(null); navigateToPage('labs'); }}>
              <Sliders size={18} /> Applied Labs
            </a>
          </nav>
        </header>
      )}

      {/* Main Workspace Area */}
      <main className="main-workspace">
        {activePage !== 'home' && (
          <header className="top-bar">
            <div className="page-title-container">
              <h2 className="page-title">
                {activePage === 'study' && 'Learning Path'}
                {activePage === 'lesson' && selectedModule && selectedLesson && `${getDisplayModuleTitle(selectedModule)} | ${selectedLesson.title}`}
                {activePage === 'labs' && 'Applied Decision Labs'}
              </h2>
              <p className="page-subtitle">
                {activePage === 'study' && 'Start with a lesson. Each one contains explanations, visuals, concepts, applications, and a connected case study.'}
                {activePage === 'lesson' && 'Active study view.'}
                {activePage === 'labs' && 'Practise data warehouse design, multidimensional cube exploration, business process mapping, and decision logic modelling in live simulations.'}
              </p>
            </div>
          </header>
        )}

        <div className="content-body" ref={contentBodyRef}>
          {activePage === 'home' && renderHomePage(navigateToPage)}
          {activePage === 'study' && renderStudyPage(handleLessonSelect)}
          {activePage === 'lesson' && selectedLesson && selectedModule && renderLessonPage(selectedLesson, selectedModule, handleLessonSelect, () => navigateToPage('study'))}
          {activePage === 'labs' && renderLabsPage(selectedLabId, setSelectedLabId)}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// PAGE RENDERERS
// ==========================================

function renderStudyPage(
  handleLessonSelect: (l: Lesson, m: CourseModule) => void
) {
  let lessonNumber = 0;
  const studyGroups = [
    ...courseModules.filter(module => !decisionModellingModuleIds.has(module.id)).map(module => ({
      id: module.id,
      numberLabel: `Module ${module.number}`,
      title: module.title,
      subtitle: module.subtitle,
      modules: [module]
    })),
    {
      id: "decision-modelling-analysis",
      numberLabel: "Module 6",
      title: decisionModellingGroupTitle,
      subtitle: decisionModellingGroupSubtitle,
      modules: courseModules.filter(module => decisionModellingModuleIds.has(module.id))
    }
  ];

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <div className="lesson-module-groups">
        {studyGroups.map(group => (
          <section key={group.id} className="lesson-module-group">
            <div className="lesson-module-label">
              <span>{group.numberLabel}</span>
              <h4>{group.title}</h4>
              <p>{group.subtitle}</p>
            </div>
            <div className="lesson-path-list">
              {group.modules.flatMap(module =>
                module.lessons.map(lesson => {
                  lessonNumber += 1;
                  const anchorVisual = getLessonAnchorVisual(lesson, module);
                  return (
                    <button key={lesson.id} type="button" onClick={() => handleLessonSelect(lesson, module)}>
                      <span>{lessonNumber}</span>
                      <div>
                        <strong>{lesson.title}</strong>
                        <p>{lesson.bigQuestion}</p>
                      </div>
                      <ChevronRight size={18} />
                      {anchorVisual && (
                        <img
                          className="lesson-path-thumb"
                          src={anchorVisual.image}
                          alt=""
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// 1. Home Page Renderer
function renderHomePage(
  setActivePage: (p: string) => void
) {
  return (
    <div className="home-splash">
      <section className="home-splash-panel">
        <div className="home-splash-masthead">
          <div className="sidebar-logo-icon home-splash-logo">
            <AppLogoMark />
          </div>
          <p>Information Systems Lab</p>
          <h1>Systems Analytics Intelligence</h1>

          <p className="home-splash-lede">
            Learn how business operations become information systems, how data becomes analytics, and how analytics becomes intelligence for better decisions.
          </p>
        </div>

        <div className="home-splash-options">
          <button className="home-splash-option" type="button" onClick={() => setActivePage('study')}>
            <span><BookOpen size={20} /> Learning Path</span>
            <p>Move through structured lessons that combine explanations, visual concepts, key terms, business applications, and case studies.</p>
            <strong>Start lessons <ArrowRight size={15} /></strong>
          </button>

          <button className="home-splash-option" type="button" onClick={() => setActivePage('labs')}>
            <span><Sliders size={20} /> Applied Labs</span>
            <p>Practice with interactive simulations for ETL quality, OLAP profitability, decision rules, strategy trees, and KPI alerts.</p>
            <strong>Open labs <ArrowRight size={15} /></strong>
          </button>
        </div>

        <div className="home-splash-visual">
          <img src={visualAssets.splash} alt="Information systems, analytics, and intelligence learning map" />
        </div>
      </section>
    </div>
  );
}

// 2. Visual Textbook Page Renderer
function renderLearnPage(
  handleLessonSelect: (l: Lesson, m: CourseModule) => void,
  progress: any,
  openModule?: (moduleId: string) => void
) {
  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '800px' }}>
        Click on any module card below to open its integrated dashboard. Each module now contains its fitted visuals, lessons, case, knowledge check, glossary terms, and progress.
      </p>
      
      <div className="grid-cols-3">
        {courseModules.map((module) => {
          const completedInModule = module.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const totalInModule = module.lessons.length;
          const percent = totalInModule > 0 ? Math.round((completedInModule / totalInModule) * 100) : 0;
          
          return (
            <div key={module.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-blue">Module {module.number}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{module.estimatedTime}</span>
                </div>
                <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '8px', lineHeight: 1.3 }}>{module.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>{module.subtitle}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '16px' }}>
                  {module.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <span>Completed {completedInModule}/{totalInModule}</span>
                  <span>{percent}%</span>
                </div>
                <div style={{ background: 'rgba(47,156,255,0.10)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--blue)', height: '100%', width: `${percent}%` }}></div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-primary" style={{ flexGrow: 1, padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => openModule ? openModule(module.id) : handleLessonSelect(module.lessons[0], module)}>
                    Open Module <ChevronRight size={14} />
                  </button>
                  {module.relatedLab && (
                    <span className="badge badge-teal" style={{ padding: '8px', cursor: 'pointer' }} title="Has related interactive lab!">🧪</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderIntegratedModulePage(
  module: CourseModule,
  onBack: () => void,
  handleLessonSelect: (l: Lesson, m: CourseModule) => void,
  progress: any
) {
  const resources = moduleResourceMap[module.id];
  const visuals = sourceVisualConcepts.filter(visual => resources.visualTitles.includes(visual.title));
  const cases = caseStudies.filter(item => resources.caseIds.includes(item.id));
  const terms = glossaryData.filter(item => resources.glossaryTerms.includes(item.term));
  const completedLessons = module.lessons.filter(lesson => progress.completedLessons.includes(lesson.id)).length;
  const lessonPercent = module.lessons.length > 0 ? Math.round((completedLessons / module.lessons.length) * 100) : 0;

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← All Modules
      </button>

      <section className="module-hero">
        <div>
          <span className="badge badge-blue">Module {module.number}</span>
          <h3>{module.title}</h3>
          <p>{module.description}</p>
        </div>
        <div className="module-progress-card">
          <strong>{lessonPercent}%</strong>
          <span>{completedLessons}/{module.lessons.length} lessons complete</span>
          <div className="progress-summary-fill" style={{ width: '100%', marginTop: '10px' }}>
            <div className="progress-summary-fill-inner" style={{ width: `${lessonPercent}%` }}></div>
          </div>
          <button className="btn btn-teal" style={{ marginTop: '16px', width: '100%' }} onClick={() => handleLessonSelect(module.lessons[0], module)}>
            Start Lessons <ChevronRight size={14} />
          </button>
        </div>
      </section>

      <div className="module-integrated-grid">
        <section className="module-section module-section-wide">
          <div className="module-section-header">
            <h4>Lessons</h4>
            <span className="badge badge-teal">{module.estimatedTime}</span>
          </div>
          <div className="module-lesson-list">
            {module.lessons.map((lesson, idx) => (
              <button key={lesson.id} type="button" onClick={() => handleLessonSelect(lesson, module)}>
                <span>{idx + 1}</span>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.bigQuestion}</small>
                </div>
                {progress.completedLessons.includes(lesson.id) && <em>Done</em>}
              </button>
            ))}
          </div>
        </section>

        <section className="module-section module-section-wide">
          <div className="module-section-header">
            <h4>Visual Concepts</h4>
            <span className="badge badge-blue">{visuals.length} diagrams</span>
          </div>
          <div className="module-visual-strip">
            {visuals.map(visual => (
              <article key={visual.title}>
                <img src={visual.image} alt={visual.title} />
                <div>
                  <strong>{visual.title}</strong>
                  <p>{visual.concepts}</p>
                  {visualExplanations[visual.title] && (
                    <p className="visual-explanation">{visualExplanations[visual.title]}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="module-section module-section-wide">
          <div className="module-section-header">
            <h4>Case Studies</h4>
            <span className="badge badge-violet">{cases.length}</span>
          </div>
          {cases.map(item => (
            <div key={item.id} className="module-case">
              <div className="module-case-title">
                <span className="badge badge-blue">{item.category}</span>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </div>
              <p>{item.description}</p>
              <dl>
                <div>
                  <dt>Business problem</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>Analytical solution</dt>
                  <dd>{item.solution}</dd>
                </div>
                <div>
                  <dt>Measured impact</dt>
                  <dd>{item.impact}</dd>
                </div>
              </dl>
            </div>
          ))}
        </section>

        <section className="module-section">
          <div className="module-section-header">
            <h4>Glossary</h4>
            <span className="badge badge-teal">{terms.length} terms</span>
          </div>
          <div className="module-term-list">
            {terms.map(term => (
              <details key={term.term}>
                <summary>{term.term}</summary>
                <p>{term.definition}</p>
                <small>{term.croatian}</small>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, idx) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return <strong key={idx}>{boldMatch[1]}</strong>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function renderFormattedExplanation(text: string) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ol key={`list-${blocks.length}`} className="lesson-explanation-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineText(item.replace(/^\d+\.\s*/, ''))}</li>
          ))}
        </ol>
      );
      listItems = [];
  }
};

  lines.forEach(line => {
    if (/^\d+\.\s/.test(line)) {
      listItems.push(line);
      return;
    }

    flushList();
    if (line.startsWith('- ')) {
      blocks.push(
        <p key={`bullet-${blocks.length}`} className="lesson-explanation-bullet">
          {renderInlineText(line.slice(2))}
        </p>
      );
    } else {
      blocks.push(<p key={`p-${blocks.length}`}>{renderInlineText(line)}</p>);
    }
  });

  flushList();
  return <div className="lesson-explanation">{blocks}</div>;
}

function getModuleVisuals(module: CourseModule) {
  const resources = moduleResourceMap[module.id];
  if (!resources) return [];
  return sourceVisualConcepts.filter(visual => resources.visualTitles.includes(visual.title));
}

function renderLessonVisualConcepts(lesson: Lesson, module: CourseModule) {
  const visualTitles = lessonVisualTitles[lesson.id];
  const visuals = visualTitles
    ? sourceVisualConcepts.filter(visual => visualTitles.includes(visual.title))
    : getModuleVisuals(module);
  if (visuals.length === 0) return null;

  return (
    <div className="lesson-section">
      <div className="lesson-section-heading-row">
        <h4>Visual Concepts</h4>
        <span className="badge badge-blue">{visuals.length} diagrams</span>
      </div>
      <div className="lesson-visual-grid">
        {visuals.map(visual => (
          <article key={visual.title}>
            <div>
              <strong>{visual.title}</strong>
              <p>{visual.concepts}</p>
              {visualExplanations[visual.title] && (
                <p className="visual-explanation">{visualExplanations[visual.title]}</p>
              )}
            </div>
            <figure className={`lesson-visual-image-frame ${["Database Data Representations", "Decision Modelling in PA and BA"].includes(visual.title) ? "compact-visual" : ""} ${visual.title === "Cross-Functional Process Flow" ? "medium-visual" : ""} ${visual.title === "Porter's Value Chain" ? "large-visual" : ""}`}>
              <img src={visual.image} alt={visual.title} />
            </figure>
          </article>
        ))}
      </div>
    </div>
  );
}

function renderLessonCaseStudy(lesson: Lesson, module: CourseModule) {
  const resources = moduleResourceMap[module.id];
  const caseIds = lessonCaseIds[lesson.id] ?? resources.caseIds;
  const cases = caseStudies.filter(item => caseIds.includes(item.id));
  if (cases.length === 0) return null;

  return (
    <div className="lesson-section">
      <h4><Briefcase size={18} /> Case Study</h4>
      {cases.map(item => (
        <div key={item.id} className="lesson-case-study">
          <span className="badge badge-violet">{item.category}</span>
          <h5>{item.title}</h5>
          <p>{item.description}</p>
          <dl>
            <div>
              <dt>Problem</dt>
              <dd>{item.problem}</dd>
            </div>
            <div>
              <dt>Solution</dt>
              <dd>{item.solution}</dd>
            </div>
            <div>
              <dt>Impact</dt>
              <dd>{item.impact}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}

// 3. Lesson Page View Renderer
function renderLessonPage(
  lesson: Lesson, 
  module: CourseModule, 
  handleLessonSelect: (l: Lesson, m: CourseModule) => void,
  goToStudyIndex: () => void
) {
  const lessonPath = courseModules.flatMap(courseModule =>
    courseModule.lessons.map(courseLesson => ({ lesson: courseLesson, module: courseModule }))
  );
  const globalIdx = lessonPath.findIndex(item => item.lesson.id === lesson.id);
  const previousLesson = lessonPath[globalIdx - 1];
  const nextLesson = lessonPath[globalIdx + 1];

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={goToStudyIndex}>
          ← All Lessons
        </button>
        <span className="badge badge-teal">Lesson {globalIdx + 1} of {lessonPath.length}</span>
      </div>

      <article className="lesson-article">
        <span className="badge badge-blue" style={{ marginBottom: '12px' }}>{getDisplayModuleTitle(module)} | Lesson {globalIdx + 1}</span>
        <h3>{lesson.title}</h3>
        
        <div className="lesson-question">
          <HelpCircle size={18} />
          <div>
            <h5>The Big Question</h5>
            <p>
            {lesson.bigQuestion}
            </p>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="lesson-section">
          <h4>Core Explanation</h4>
          {renderFormattedExplanation(lesson.explanation)}
        </div>

        {renderLessonVisualConcepts(lesson, module)}

        <div className="lesson-section">
          <h4>Key Concepts</h4>
          <ul className="lesson-simple-list">
            {lesson.keyConcepts.map((concept, idx) => (
              <li key={idx}>{renderInlineText(concept)}</li>
            ))}
          </ul>
        </div>

        <div className="lesson-section">
          <h4><Briefcase size={18} /> Business Application</h4>
          <p>{renderInlineText(lesson.example)}</p>
        </div>

        {renderLessonCaseStudy(lesson, module)}

        <div className="lesson-section lesson-two-column">
          <div>
            <h4><AlertTriangle size={18} /> Common Mistakes</h4>
            <ul className="lesson-simple-list">
            {lesson.commonMistakes.map((mistake, idx) => (
              <li key={idx}>{renderInlineText(mistake)}</li>
            ))}
            </ul>
          </div>
          <div>
            <h4>Key Takeaways</h4>
            <ul className="lesson-simple-list">
            {lesson.summary.map((takeaway, idx) => (
              <li key={idx}>{renderInlineText(takeaway)}</li>
            ))}
            </ul>
          </div>
        </div>
      </article>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {previousLesson && (
            <button className="btn btn-secondary" onClick={() => handleLessonSelect(previousLesson.lesson, previousLesson.module)}>
              Previous Lesson
            </button>
          )}
        </div>

        {nextLesson ? (
          <button className="btn btn-primary" onClick={() => handleLessonSelect(nextLesson.lesson, nextLesson.module)}>
            Next Lesson <ArrowRight size={16} />
          </button>
        ) : (
          <button className="btn btn-teal" onClick={goToStudyIndex}>
            Back to Lesson Path
          </button>
        )}
      </div>
    </div>
  );
}

// 4. Learning Atlas Page Renderer (SVGs with Hotspots)
function renderMapsPage(selectedMapId: string | null, setSelectedMapId: (id: string | null) => void) {
  const maps = [
    { id: "map-stack", title: "Business Analytics Support Stack", desc: "Maps the pipeline transforming business processes to management insight.", image: visualAssets.businessSystem, svg: renderStackSVG() },
    { id: "map-pyramid", title: "Business Information Systems Pyramid", desc: "Positions TPS, collaboration, and management support systems.", image: visualAssets.systemsPyramid, svg: renderPyramidSVG() },
    { id: "map-analysis", title: "Business Analysis vs. Business Analytics", desc: "Contrasts process change focus with statistical data logic.", image: visualAssets.analysisVsAnalytics, svg: renderAnalysisSVG() },
    { id: "map-cube", title: "OLAP Cube slicing", desc: "Illustrates product, region, and time dimensions of data cubes.", image: visualAssets.olapCube, svg: renderCubeSVG() },
    { id: "map-etl", title: "Data Preprocessing ETL Pipeline", desc: "The steps converting dirty, raw database rows into clean warehouse tables.", image: visualAssets.etlPipeline, svg: renderPipelineSVG() },
    { id: "map-spectrum", title: "Analytics Maturity Spectrum", desc: "Plots descriptive, diagnostic, predictive, and prescriptive maturity levels.", image: visualAssets.analyticsSpectrum, svg: renderSpectrumSVG() },
    { id: "map-models", title: "Decision Model Categories", desc: "Structures optimization, simulation, and predictive analytical methods.", image: visualAssets.decisionModels, svg: renderModelsSVG() }
  ];

  if (selectedMapId) {
    const map = maps.find(m => m.id === selectedMapId);
    return (
      <div style={{ animation: 'slideIn 0.3s ease-out' }}>
        <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setSelectedMapId(null)}>
          ← Back to Atlas Gallery
        </button>
        
        <div className="glass-card" style={{ marginBottom: '32px' }}>
          <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px' }}>{map?.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            {map?.desc} <strong>Click on elements inside the diagram below to explore details!</strong>
          </p>
          {map?.image && (
            <img
              src={map.image}
              alt={`${map.title} reference diagram`}
              className="atlas-reference-image"
            />
          )}
          
          <div className="diagram-container">
            {map?.svg}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '800px' }}>
        Start with the interactive maps, then review every source diagram from the course folders in the complete concept gallery below.
      </p>

      <h3 className="section-heading">Interactive Maps</h3>
      <div className="grid-cols-3">
        {maps.map((map) => (
          <div key={map.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <img src={map.image} alt={`${map.title} preview`} className="atlas-card-image" />
              <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px', lineHeight: 1.3 }}>{map.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>{map.desc}</p>
            </div>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => setSelectedMapId(map.id)}>
              Open Map <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="source-gallery-header">
        <div>
          <h3 className="section-heading">Complete Source Concept Gallery</h3>
          <p>All diagrams stored beside the markdown lectures are included here as studyable concept cards.</p>
        </div>
        <span className="badge badge-teal">{sourceVisualConcepts.length} visuals</span>
      </div>

      <div className="visual-concept-grid">
        {sourceVisualConcepts.map((visual) => (
          <article key={`${visual.category}-${visual.title}`} className="visual-concept-card">
            <img src={visual.image} alt={visual.title} />
            <div>
              <span className="badge badge-blue">{visual.category}</span>
              <h4>{visual.title}</h4>
              <p>{visual.concepts}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// 5. Interactive Labs Router Page
function renderLabsPage(
  selectedLabId: string | null, 
  setSelectedLabId: (id: string | null) => void
) {
  const labs = [
    {
      id: "etl",
      title: "ETL Quality Engineering Lab",
      level: "Intermediate",
      desc: "Profile messy operational records, resolve duplicates and missing entities, standardize currencies, and publish warehouse-ready sales facts.",
      scenario: "Retail data team preparing a nightly load for executive reporting.",
      skills: ["data profiling", "quality rules", "warehouse loading"]
    },
    {
      id: "olap",
      title: "OLAP Profitability Analysis Lab",
      level: "Intermediate",
      desc: "Use slice, dice, pivot, and drill controls to explain regional product performance and defend a managerial interpretation.",
      scenario: "Regional sales analyst investigating margin differences across product lines.",
      skills: ["dimensional thinking", "aggregation", "drill analysis"]
    },
    {
      id: "process",
      title: "Business Process Handoff Lab",
      level: "Intermediate",
      desc: "Map an order-to-cash process across business functions, diagnose handoff risk, and choose information-system support for the weak points.",
      scenario: "Business analyst redesigning a cross-functional customer order process.",
      skills: ["process mapping", "handoff analysis", "workflow design"]
    },
    {
      id: "decision-table",
      title: "Decision Rule Governance Lab",
      level: "Advanced",
      desc: "Stress-test automated approval rules for completeness, conflict risk, risk escalation, and operational explainability.",
      scenario: "Business analyst validating an order approval policy before automation.",
      skills: ["rule design", "policy testing", "decision audit"]
    },
    {
      id: "decision-tree",
      title: "Risk-Weighted Strategy Lab",
      level: "Advanced",
      desc: "Model uncertain outcomes, tune probability/payoff assumptions, and compare expected monetary value against conservative alternatives.",
      scenario: "Strategy team evaluating whether a new product launch is worth the downside risk.",
      skills: ["uncertainty", "EMV", "sensitivity analysis"]
    },
    {
      id: "dashboard",
      title: "KPI Early-Warning Lab",
      level: "Intermediate",
      desc: "Configure executive KPI views, alert thresholds, and signal interpretation for revenue drops or churn risk.",
      scenario: "Operations manager designing a monitoring board for monthly performance exceptions.",
      skills: ["KPI design", "thresholds", "managerial alerts"]
    }
  ];

  if (selectedLabId === 'etl') {
    return <ETLSimulatorLab onBack={() => setSelectedLabId(null)} onComplete={() => undefined} isCompleted={false} />;
  }
  if (selectedLabId === 'olap') {
    return <OLAPExplorerLab onBack={() => setSelectedLabId(null)} onComplete={() => undefined} isCompleted={false} />;
  }
  if (selectedLabId === 'process') {
    return <BusinessProcessLab onBack={() => setSelectedLabId(null)} onComplete={() => undefined} isCompleted={false} />;
  }
  if (selectedLabId === 'decision-table') {
    return <DecisionTableLab onBack={() => setSelectedLabId(null)} onComplete={() => undefined} isCompleted={false} />;
  }
  if (selectedLabId === 'decision-tree') {
    return <DecisionTreeLab onBack={() => setSelectedLabId(null)} onComplete={() => undefined} isCompleted={false} />;
  }
  if (selectedLabId === 'dashboard') {
    return <DashboardBuilderLab onBack={() => setSelectedLabId(null)} onComplete={() => undefined} isCompleted={false} />;
  }

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <div className="labs-list">
        {labs.map((lab) => (
          <div key={lab.id} className="lab-card">
            <div className="lab-card-icon">{renderLabIcon(lab.id)}</div>
            <div className="lab-card-body">
              <div>
                <div className="lab-card-title-row">
                  <h4>{lab.title}</h4>
                </div>
                <p>{lab.desc}</p>
                <div className="lab-card-scenario">
                  <strong>Scenario:</strong> {lab.scenario}
                </div>
                <div className="lab-skill-row">
                  {lab.skills.map(skill => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => setSelectedLabId(lab.id)}>
                  Launch Lab <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderLabIcon(type: string) {
  if (type === 'etl') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <rect x="12" y="16" width="22" height="18" rx="4" />
        <rect x="12" y="62" width="22" height="18" rx="4" />
        <rect x="62" y="39" width="22" height="18" rx="4" />
        <path d="M34 25h14c6 0 11 5 11 11v4" />
        <path d="M34 71h14c6 0 11-5 11-11v-4" />
        <path d="M50 48h12" />
        <circle cx="48" cy="48" r="7" />
      </svg>
    );
  }

  if (type === 'olap') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M24 30l24-14 24 14-24 14-24-14z" />
        <path d="M24 30v28l24 14V44" />
        <path d="M72 30v28L48 72" />
        <path d="M36 37v28" />
        <path d="M60 37v28" />
        <path d="M24 44l24 14 24-14" />
      </svg>
    );
  }

  if (type === 'process') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <rect x="10" y="18" width="20" height="14" rx="4" />
        <rect x="38" y="18" width="20" height="14" rx="4" />
        <rect x="66" y="18" width="20" height="14" rx="4" />
        <rect x="22" y="60" width="20" height="14" rx="4" />
        <rect x="54" y="60" width="20" height="14" rx="4" />
        <path d="M30 25h8M58 25h8M76 32v12c0 6-5 10-11 10H42M22 32v12c0 6 5 10 11 10h21M42 67h12" />
        <circle cx="48" cy="48" r="7" />
      </svg>
    );
  }

  if (type === 'decision-table') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <rect x="16" y="18" width="64" height="56" rx="6" />
        <path d="M16 34h64M16 50h64M16 66h64M38 18v56M58 18v56" />
        <path d="M24 42l5 5 8-10" />
        <path d="M63 43h9M63 58h9" />
      </svg>
    );
  }

  if (type === 'decision-tree') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <rect x="40" y="12" width="16" height="16" rx="2" />
        <circle cx="24" cy="52" r="8" />
        <circle cx="72" cy="52" r="8" />
        <rect x="16" y="72" width="16" height="12" rx="2" />
        <rect x="64" y="72" width="16" height="12" rx="2" />
        <path d="M48 28v8M48 36L24 44M48 36l24 8M24 60v12M72 60v12" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <rect x="14" y="20" width="68" height="50" rx="6" />
      <path d="M26 58V44M42 58V34M58 58V40M74 58V30" />
      <path d="M22 70h52" />
      <path d="M26 32h16M26 40h8" />
      <circle cx="72" cy="24" r="8" />
    </svg>
  );
}

function renderLabBrief(
  _level: "Intermediate" | "Advanced",
  title: string,
  scenario: string,
  analystTask: string,
  deliverables: string[]
) {
  return (
    <div className="lab-brief">
      <div>
        <h3>{title}</h3>
        <p>{scenario}</p>
      </div>
      <div className="lab-brief-task">
        <strong>Analyst task</strong>
        <p>{analystTask}</p>
        <div className="lab-skill-row">
          {deliverables.map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}

function renderIndustryCaseFile(
  industry: string,
  pressure: string,
  dataReality: string,
  stakeholders: string[],
  deliverable: string
) {
  return (
    <section className="industry-case-file">
      <div>
        <span className="badge badge-teal">{industry}</span>
        <h4>Industry case file</h4>
        <p>{pressure}</p>
      </div>
      <div className="industry-case-grid">
        <div>
          <strong>Data reality</strong>
          <p>{dataReality}</p>
        </div>
        <div>
          <strong>Stakeholders</strong>
          <ul>
            {stakeholders.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <strong>Expected deliverable</strong>
          <p>{deliverable}</p>
        </div>
      </div>
    </section>
  );
}

// 6. Case Studies Page Renderer
function renderCasesPage() {
  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <div className="grid-cols-3">
        {caseStudies.map((item) => (
          <div key={item.id} className="glass-card" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '8px' }}>{item.category}</span>
              <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>{item.subtitle}</p>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p><strong>Problem:</strong> {item.problem}</p>
                <p><strong>Solution:</strong> {item.solution}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
              <span className="badge badge-green" style={{ marginBottom: '4px' }}>Measurable Impact</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. Quizzes Router Page
function renderQuizzesPage(
  handleStartQuiz: (m: CourseModule) => void,
  progress: any
) {
  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <div className="grid-cols-3">
        {courseModules.map((module) => {
          const score = progress.quizScores[module.quizId];
          const hasTaken = progress.completedQuizzes.includes(module.quizId);

          return (
            <div key={module.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '8px' }}>Quiz {module.number}</span>
                <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>{module.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Check your vocabulary and foundational theories for Module {module.number}.</p>
              </div>

              <div style={{ marginTop: '16px' }}>
                {hasTaken ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Best Score: <strong style={{ color: 'var(--green)' }}>{score}/3</strong></span>
                    <span className="badge badge-green">Completed</span>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Not attempted yet</p>
                )}
                
                <button className="btn btn-primary" style={{ width: '100%', padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => handleStartQuiz(module)}>
                  {hasTaken ? 'Retake Quiz' : 'Start Quiz'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Interactive Quiz Engine Widget
function renderQuizPage(
  module: CourseModule, 
  markQuizComplete: (quizId: string, score: number) => void,
  setActivePage: (p: string) => void
) {
  // Pre-load distinct questions based on module topics
  const questionsList = [
    {
      q: "What defines an open adaptive business system?",
      opts: ["It ignores customer inputs", "It possesses feedback loops to regulate itself based on changes", "It has static internal operational codes", "It operates independently of physical flows"],
      ans: "It possesses feedback loops to regulate itself based on changes",
      explain: "Adaptive systems constantly sense environment variations and adjust operations via critical feedback loops."
    },
    {
      q: "Which system primarily supports tactical mid-management reporting?",
      opts: ["Transaction Processing System (TPS)", "Decision Support System (DSS)", "Management Information System (MIS)", "Enterprise Resource Planning (ERP)"],
      ans: "Management Information System (MIS)",
      explain: "MIS packages operational TPS logs into aggregated, routine, structured performance updates for mid-level managers."
    },
    {
      q: "What characteristic of Data Warehouses prevents historical records from being modified?",
      opts: ["Integrated formatting", "Subject orientation", "Non-volatile storage", "Time-variant keys"],
      ans: "Non-volatile storage",
      explain: "Non-volatility means that data in a DWH is read-only after loading, ensuring historical reports remain consistent over time."
    }
  ];

  const [qIdx, setQIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = questionsList[qIdx];

  const handleNext = () => {
    if (selectedOpt === currentQ.ans) {
      setScore(s => s + 1);
    }
    
    if (qIdx + 1 < questionsList.length) {
      setQIdx(qIdx + 1);
      setSelectedOpt(null);
      setSubmitted(false);
    } else {
      const finalScore = score + (selectedOpt === currentQ.ans ? 1 : 0);
      setScore(finalScore);
      markQuizComplete(module.quizId, finalScore);
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <div className="glass-card" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', animation: 'slideIn 0.3s ease-out' }}>
        <span style={{ fontSize: '3rem' }}>🏆</span>
        <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '1.5rem', margin: '16px 0 8px 0' }}>Quiz Completed!</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Your score: <strong style={{ color: 'var(--blue)', fontSize: '1.25rem' }}>{score} / 3</strong>
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setActivePage('study')}>
            Back to Learning Path
          </button>
          <button className="btn btn-secondary" onClick={() => { setQIdx(0); setSelectedOpt(null); setScore(0); setSubmitted(false); setQuizFinished(false); }}>
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '20px auto', animation: 'slideIn 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        <span>Question {qIdx + 1} of 3</span>
        <span>Score: {score}</span>
      </div>

      <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '20px' }}>{currentQ.q}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {currentQ.opts.map((opt, idx) => {
          let btnStyle: React.CSSProperties = {
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            textAlign: 'left',
            cursor: submitted ? 'default' : 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            backgroundColor: 'var(--bg-surface)',
            transition: 'all 0.2s'
          };

          if (selectedOpt === opt) {
            btnStyle.borderColor = 'var(--blue)';
            btnStyle.backgroundColor = 'rgba(47,156,255,0.08)';
          }

          if (submitted) {
            if (opt === currentQ.ans) {
              btnStyle.borderColor = 'var(--green)';
              btnStyle.backgroundColor = 'rgba(91,140,58,0.1)';
              btnStyle.color = 'var(--green)';
            } else if (selectedOpt === opt) {
              btnStyle.borderColor = 'var(--orange)';
              btnStyle.backgroundColor = 'rgba(242,140,40,0.1)';
              btnStyle.color = 'var(--orange)';
            }
          }

          return (
            <button 
              key={idx} 
              style={btnStyle} 
              onClick={() => !submitted && setSelectedOpt(opt)}
              disabled={submitted}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button 
          className="btn btn-primary" 
          disabled={!selectedOpt} 
          onClick={() => setSubmitted(true)}
          style={{ opacity: selectedOpt ? 1 : 0.6, width: '100%' }}
        >
          Verify Answer
        </button>
      ) : (
        <div style={{ animation: 'slideIn 0.2s ease-out' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-base)', borderLeft: '4px solid var(--blue)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: selectedOpt === currentQ.ans ? 'var(--green)' : 'var(--orange)', marginBottom: '4px' }}>
              {selectedOpt === currentQ.ans ? '✓ Correct Answer' : '✗ Incorrect Answer'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{currentQ.explain}</p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext}>
            {qIdx + 1 < 3 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}

// 8. Glossary Page Renderer
function renderGlossaryPage(
  searchTerm: string, 
  setSearchTerm: (s: string) => void,
  filter: string,
  setFilter: (s: string) => void
) {
  const filtered = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.croatian.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ["All", "Business Systems", "Data Warehousing", "Analytics & BI", "Decision Support"];

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search glossary definitions..." 
          className="form-input" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '320px' }}
        />
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ padding: '6px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid-cols-3">
        {filtered.map((item, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '8px' }}>{item.category}</span>
              <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '2px' }}>{item.term}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>{item.croatian}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.definition}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>No glossary matches found.</p>
      )}
    </div>
  );
}

// 9. Achievements & Progress Page Renderer
function renderProgressPage(progress: any, resetProgress: () => void) {
  const completedLabsCount = progress.completedLabs.length;
  
  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2rem' }}>📖</span>
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, margin: '8px 0' }}>Completed Lessons</h4>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--blue)' }}>{progress.completedLessons.length}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>out of {courseModules.reduce((acc, m) => acc + m.lessons.length, 0)} total</p>
        </div>

        <div className="glass-card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2rem' }}>🧪</span>
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, margin: '8px 0' }}>Finished Labs</h4>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--teal)' }}>{completedLabsCount}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>out of 6 dynamic labs</p>
        </div>

        <div className="glass-card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2rem' }}>🧩</span>
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, margin: '8px 0' }}>Quizzes Taken</h4>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--violet)' }}>{progress.completedQuizzes.length}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>out of 9 checkpoints</p>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '20px' }}>Achievement Badge Room</h4>
        <div className="grid-cols-3">
          {BADGE_DETAILS.map(badge => {
            const isUnlocked = progress.badges.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                style={{ 
                  border: '1px solid var(--border-light)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px',
                  backgroundColor: isUnlocked ? 'rgba(91,140,58,0.03)' : 'transparent',
                  opacity: isUnlocked ? 1 : 0.4
                }}
              >
                <span style={{ fontSize: '2rem', filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>{badge.icon}</span>
                <div>
                  <h5 style={{ fontWeight: 700, color: isUnlocked ? 'var(--navy)' : 'var(--text-muted)' }}>
                    {badge.title} {isUnlocked ? '✓' : ''}
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{badge.desc}</p>
                  <span className="badge" style={{ marginTop: '4px', fontSize: '0.65rem', backgroundColor: isUnlocked ? 'rgba(91,140,58,0.1)' : 'rgba(0,0,0,0.05)', color: isUnlocked ? 'var(--green)' : 'var(--text-muted)' }}>
                    {isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button className="btn btn-secondary" style={{ color: 'red', borderColor: 'rgba(255,0,0,0.2)' }} onClick={() => { if (confirm("Reset all study progress?")) resetProgress(); }}>
          Reset All Progress
        </button>
      </div>
    </div>
  );
}

void renderMapsPage;
void renderCasesPage;
void renderQuizzesPage;
void renderQuizPage;
void renderLearnPage;
void renderIntegratedModulePage;
void renderGlossaryPage;
void renderProgressPage;

// ==========================================
// CANONICAL DIAGRAMS SVGS
// ==========================================

function renderStackSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 500" width="100%" height="auto">
      <defs>
        <linearGradient id="g-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002B5C" />
          <stop offset="100%" stopColor="#001833" />
        </linearGradient>
        <linearGradient id="g-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0067B1" />
          <stop offset="100%" stopColor="#004678" />
        </linearGradient>
        <linearGradient id="g-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A6A6" />
          <stop offset="100%" stopColor="#007a7a" />
        </linearGradient>
      </defs>

      {/* Layer 5: Management */}
      <g className="interactive-svg-node" onClick={() => alert("Management Level: Utilises consolidated BI and prescriptive models to steer the business, define budgets, and coordinate strategy.")}>
        <rect x="150" y="30" width="500" height="60" rx="10" fill="url(#g-navy)" />
        <text x="400" y="65" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">MANAGEMENT STRATEGY</text>
      </g>
      <path d="M400 90 L400 120" stroke="#002B5C" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />

      {/* Layer 4: Analytics */}
      <g className="interactive-svg-node" onClick={() => alert("Business Analytics: Employs statistical forecasting, regression, and data mining to predict sales trends and optimize resources.")}>
        <rect x="150" y="120" width="500" height="60" rx="10" fill="url(#g-blue)" />
        <text x="400" y="155" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">BUSINESS ANALYTICS (Predictive & Prescriptive)</text>
      </g>
      <path d="M400 180 L400 210" stroke="#0067B1" strokeWidth="3" fill="none" />

      {/* Layer 3: Reporting */}
      <g className="interactive-svg-node" onClick={() => alert("Reporting & OLAP: Provides standard quarterly grids, slice-and-dice data cubes, and KPI dashboard alerts showing what has happened.")}>
        <rect x="150" y="210" width="500" height="60" rx="10" fill="url(#g-teal)" />
        <text x="400" y="245" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">STATIC & DYNAMIC OLAP REPORTING (Descriptive)</text>
      </g>
      <path d="M400 270 L400 300" stroke="#00A6A6" strokeWidth="3" fill="none" />

      {/* Layer 2: DWH */}
      <g className="interactive-svg-node" onClick={() => alert("Data Warehouse & Integration: A clean, subject-oriented repository where transactional records from sales and finance are unified via nightly ETL.")}>
        <rect x="150" y="300" width="500" height="60" rx="10" fill="#1B3048" stroke="#2F9CFF" strokeWidth="2" />
        <text x="400" y="335" fill="#D8E9FF" fontSize="15" fontWeight="bold" textAnchor="middle">DATA INTEGRATION & DATA WAREHOUSE</text>
      </g>
      <path d="M400 360 L400 390" stroke="#2F9CFF" strokeWidth="3" fill="none" />

      {/* Layer 1: Operations */}
      <g className="interactive-svg-node" onClick={() => alert("Business Domain (TPS): Operational day-to-day transactions. Scanning items, fulfilling bank checks, and updating employee payroll logs.")}>
        <rect x="150" y="390" width="500" height="60" rx="10" fill="#142438" stroke="#8798AD" strokeWidth="2" />
        <text x="400" y="425" fill="#A9B7C8" fontSize="14" fontWeight="bold" textAnchor="middle">BUSINESS DOMAIN / PROCESS ACTIONS (TPS)</text>
      </g>
    </svg>
  );
}

function renderPyramidSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 500" width="100%" height="auto">
      <defs>
        <linearGradient id="g-orange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F28C28" />
          <stop offset="100%" stopColor="#d17215" />
        </linearGradient>
      </defs>

      {/* Strategic Apex */}
      <polygon points="400,40 250,180 550,180" fill="url(#g-navy)" className="interactive-svg-node" onClick={() => alert("Strategic Management Level: Long-term vision and unstructured decisions. Strongly supported by DSS and advanced external analytical models.")} />
      <text x="400" y="140" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">STRATEGIC (DSS)</text>

      {/* Tactical Middle */}
      <polygon points="250,180 550,180 650,320 150,320" fill="url(#g-blue)" className="interactive-svg-node" onClick={() => alert("Tactical Management Level: Medium-term operational control and departmental management. Supported by MIS summarized quarterly / monthly reports.")} />
      <text x="400" y="250" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">TACTICAL (MIS)</text>

      {/* Operational Base */}
      <polygon points="150,320 650,320 750,460 50,460" fill="url(#g-orange)" className="interactive-svg-node" onClick={() => alert("Operational Layer: High-volume, structured transaction tasks. TPS recordings represent cash flow and barcodes scanned.")} />
      <text x="400" y="400" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">OPERATIONAL (TPS)</text>
    </svg>
  );
}

function renderAnalysisSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 400" width="100%" height="auto">
      {/* Left Box: Business Analysis */}
      <g className="interactive-svg-node" onClick={() => alert("Business Analysis: Explores organizational hierarchies, gathers stakeholder requirements, and redesigns redundant workflows.")}>
        <rect x="50" y="50" width="300" height="250" rx="12" fill="#142438" stroke="#2F9CFF" strokeWidth="3" />
        <text x="200" y="90" fill="#D8E9FF" fontSize="18" fontWeight="bold" textAnchor="middle">Business Analysis</text>
        <text x="200" y="130" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Focuses on processes & structures</text>
        <text x="200" y="160" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Redesigns workflows & rules</text>
        <text x="200" y="190" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Deliverable: Requirements Doc</text>
        <text x="200" y="220" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Target: Change management</text>
      </g>

      {/* Central Connector */}
      <g className="interactive-svg-node" onClick={() => alert("Common Goal: Both disciplines are unified by a single purpose: enabling positive, scalable, value-driven change inside the enterprise.")}>
        <circle cx="400" cy="175" r="50" fill="#00A6A6" />
        <text x="400" y="170" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">SHARED</text>
        <text x="400" y="185" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">GOAL</text>
      </g>

      {/* Right Box: Business Analytics */}
      <g className="interactive-svg-node" onClick={() => alert("Business Analytics: Focuses on historical databases, statistical algorithms, regression, and data-driven prediction models.")}>
        <rect x="450" y="50" width="300" height="250" rx="12" fill="#142438" stroke="#2DD4BF" strokeWidth="3" />
        <text x="600" y="90" fill="#D8E9FF" fontSize="18" fontWeight="bold" textAnchor="middle">Business Analytics</text>
        <text x="600" y="130" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Focuses on data & statistics</text>
        <text x="600" y="160" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Builds mathematical models</text>
        <text x="600" y="190" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Deliverable: Predictive Insights</text>
        <text x="600" y="220" fill="#A9B7C8" fontSize="13" textAnchor="middle">• Target: Optimization & forecasts</text>
      </g>
    </svg>
  );
}

function renderCubeSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 400" width="100%" height="auto">
      {/* 3D Wireframe Cube Drawing */}
      <g className="interactive-svg-node" onClick={() => alert("OLAP Dimensional Cube: Data is modeled across multiple dimensions (Time, Geography, Product) rather than flat grids, enabling fast slice-and-dice summaries.")}>
        {/* Rear Face */}
        <rect x="250" y="100" width="200" height="200" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="5,5" />
        {/* Connector lines */}
        <line x1="150" y1="200" x2="250" y2="100" stroke="#94A3B8" strokeWidth="2" />
        <line x1="350" y1="200" x2="450" y2="100" stroke="#94A3B8" strokeWidth="2" />
        <line x1="150" y1="400" x2="250" y2="300" stroke="#94A3B8" strokeWidth="2" />
        <line x1="350" y1="400" x2="450" y2="300" stroke="#94A3B8" strokeWidth="2" />
        {/* Front Face */}
        <rect x="150" y="200" width="200" height="200" fill="rgba(0, 166, 166, 0.1)" stroke="#002B5C" strokeWidth="3" />
        
        {/* Dimension Labels */}
        <text x="250" y="430" fill="#002B5C" fontSize="15" fontWeight="bold" textAnchor="middle">Geography (Region)</text>
        <text x="80" y="300" fill="#0067B1" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(-90 80 300)">Product</text>
        <text x="430" y="150" fill="#F28C28" fontSize="15" fontWeight="bold" textAnchor="middle">Time (Quarter)</text>
      </g>

      <g transform="translate(480, 100)" className="interactive-svg-node" onClick={() => alert("Pivoting: Swaps rows and columns (e.g., swapping Products to columns and Time to rows) to view the dataset from a different perspective.")}>
        <rect x="50" y="20" width="220" height="50" rx="8" fill="#1B3048" stroke="#2F9CFF" />
        <text x="160" y="50" fill="#D8E9FF" fontSize="14" fontWeight="bold" textAnchor="middle">Slice & Dice operations</text>
      </g>
    </svg>
  );
}

function renderPipelineSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 300" width="100%" height="auto">
      {/* ETL Pipeline stages */}
      <g className="interactive-svg-node" onClick={() => alert("Extraction: Pulls new raw data from separate active transactional databases.")}>
        <circle cx="100" cy="150" r="40" fill="#002B5C" />
        <text x="100" y="155" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">Extract</text>
      </g>
      <path d="M140 150 L210 150" stroke="#002B5C" strokeWidth="3" fill="none" />

      <g className="interactive-svg-node" onClick={() => alert("Transformation (Cleaning): Resolves missing entries, standardizes formats, and deletes duplicated data records.")}>
        <circle cx="250" cy="150" r="40" fill="#0067B1" />
        <text x="250" y="155" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">Clean</text>
      </g>
      <path d="M290 150 L360 150" stroke="#0067B1" strokeWidth="3" fill="none" />

      <g className="interactive-svg-node" onClick={() => alert("Transformation (Formatting): Converts variables, converts currencies (e.g. USD to EUR), and builds unified relational schemas.")}>
        <circle cx="400" cy="150" r="40" fill="#00A6A6" />
        <text x="400" y="155" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">Transform</text>
      </g>
      <path d="M440 150 L510 150" stroke="#00A6A6" strokeWidth="3" fill="none" />

      <g className="interactive-svg-node" onClick={() => alert("Loading: Schedules nightly batch writes to upload the final polished records to the warehouse tables.")}>
        <circle cx="550" cy="150" r="40" fill="#F28C28" />
        <text x="550" y="155" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">Load</text>
      </g>
      <path d="M590 150 L660 150" stroke="#F28C28" strokeWidth="3" fill="none" />

      <g className="interactive-svg-node" onClick={() => alert("Analytical Warehouse: The target storage optimized for complex reporting and business intelligence queries.")}>
        <rect x="660" y="110" width="100" height="80" rx="10" fill="#5B8C3A" />
        <text x="710" y="155" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">DWH</text>
      </g>
    </svg>
  );
}

function renderSpectrumSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 450" width="100%" height="auto">
      {/* Grid Axes */}
      <line x1="80" y1="380" x2="750" y2="380" stroke="#1E293B" strokeWidth="3" />
      <line x1="80" y1="380" x2="80" y2="40" stroke="#1E293B" strokeWidth="3" />
      <text x="415" y="420" fill="#1E293B" fontSize="14" fontWeight="bold" textAnchor="middle">Difficulty / Technical Sophistication</text>
      <text x="30" y="210" fill="#1E293B" fontSize="14" fontWeight="bold" textAnchor="middle" transform="rotate(-90 30 210)">Business Value</text>

      {/* Maturity Line */}
      <path d="M120 340 Q 250 300, 420 180 T 700 80" fill="none" stroke="#6F42C1" strokeWidth="4" strokeDasharray="2" />

      {/* Node 1: Descriptive */}
      <g className="interactive-svg-node" onClick={() => alert("Descriptive Analytics (What happened?): Reviews past outcomes using standardized monthly spreadsheets and dashboards.")}>
        <circle cx="120" cy="340" r="16" fill="#002B5C" />
        <text x="120" y="375" fill="#002B5C" fontSize="12" fontWeight="bold" textAnchor="middle">Descriptive</text>
      </g>

      {/* Node 2: Diagnostic */}
      <g className="interactive-svg-node" onClick={() => alert("Diagnostic Analytics (Why did it happen?): Investigates root causes by drilling down into localized anomalies.")}>
        <circle cx="300" cy="270" r="16" fill="#0067B1" />
        <text x="300" y="305" fill="#0067B1" fontSize="12" fontWeight="bold" textAnchor="middle">Diagnostic</text>
      </g>

      {/* Node 3: Predictive */}
      <g className="interactive-svg-node" onClick={() => alert("Predictive Analytics (What will happen?): Utilizes machine learning models and regression to forecast market demand trends.")}>
        <circle cx="480" cy="160" r="16" fill="#00A6A6" />
        <text x="480" y="195" fill="#00A6A6" fontSize="12" fontWeight="bold" textAnchor="middle">Predictive</text>
      </g>

      {/* Node 4: Prescriptive */}
      <g className="interactive-svg-node" onClick={() => alert("Prescriptive Analytics (How can we make it happen?): Combines dynamic predictions with rule optimization to automate or recommend optimal company choices.")}>
        <circle cx="680" cy="90" r="16" fill="#F28C28" />
        <text x="680" y="125" fill="#F28C28" fontSize="12" fontWeight="bold" textAnchor="middle">Prescriptive</text>
      </g>
    </svg>
  );
}

function renderModelsSVG() {
  return (
    <svg className="interactive-svg-element" viewBox="0 0 800 400" width="100%" height="auto">
      {/* Optimization models */}
      <g className="interactive-svg-node" onClick={() => alert("Optimization Models: Models built to find the best possible outcome (e.g. max profit, min cost) under resource constraints. Includes Linear Programming.")}>
        <rect x="50" y="50" width="200" height="100" rx="8" fill="#002B5C" />
        <text x="150" y="105" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">Optimization Models</text>
      </g>

      {/* Simulation models */}
      <g className="interactive-svg-node" onClick={() => alert("Simulation Models: Mathematical representations of real-world scenarios to observe how outputs change when inputs vary. Includes Monte Carlo.")}>
        <rect x="300" y="50" width="200" height="100" rx="8" fill="#0067B1" />
        <text x="400" y="105" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">Simulation Models</text>
      </g>

      {/* Heuristics */}
      <g className="interactive-svg-node" onClick={() => alert("Heuristics: Rules of thumb or structured shortcuts used to make satisfactory choices quickly when optimal calculations are too complex.")}>
        <rect x="550" y="50" width="200" height="100" rx="8" fill="#00A6A6" />
        <text x="650" y="105" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">Heuristic Models</text>
      </g>

      {/* Rule based / Tables */}
      <g className="interactive-svg-node" onClick={() => alert("Rule-Based Models: Structures repeatable, operational decisions using decision tables, decision trees, and requirement networks.")}>
        <rect x="175" y="220" width="200" height="100" rx="8" fill="#F28C28" />
        <text x="275" y="275" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">Rule-Based Tables</text>
      </g>

      {/* Predictive Models */}
      <g className="interactive-svg-node" onClick={() => alert("Predictive Models: Machine learning algorithms and statistical forecasts built to discover historical patterns and predict future states.")}>
        <rect x="425" y="220" width="200" height="100" rx="8" fill="#5B8C3A" />
        <text x="525" y="275" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">Predictive Models</text>
      </g>
    </svg>
  );
}

// ==========================================
// INTERACTIVE LAB SIMULATORS
// ==========================================

// A. ETL SIMULATOR LAB COMPONENT
function ETLSimulatorLab({ onBack, onComplete, isCompleted: _isCompleted }: { onBack: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [step, setStep] = useState<number>(0);
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [cleanedData, setCleanedData] = useState<any[]>([]);
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  // Mock dirty rows extracted
  const initialDirtyRows = [
    { id: 1, name: "Darko Etinger", amount: "120 EUR", date: "2026-05-28", type: "Premium" },
    { id: 2, name: "Ana Horvat", amount: "150 USD", date: "2026-05-29", type: "Standard" },
    { id: 3, name: "Ivan Kovac", amount: "80 EUR", date: "2026-05-29", type: "Standard" },
    { id: 4, name: "Darko Etinger", amount: "120 EUR", date: "2026-05-28", type: "Premium" }, // Duplicate!
    { id: 5, name: "Missing Name", amount: "200 EUR", date: "2026-05-30", type: "Standard" } // Mismatched name!
  ];
  const issueCount = 3;
  const loadedRowCount = transformedData.length || 4;
  const qualityScore = loadingComplete ? Math.round(((initialDirtyRows.length - issueCount + 2) / initialDirtyRows.length) * 100) : 42;

  const handleExtract = () => {
    setExtractedData(initialDirtyRows);
    setStep(1);
  };

  const handleClean = () => {
    // Remove duplicates (ID 4) and handle missing names (ID 5)
    const cleaned = extractedData.filter(row => row.id !== 4).map(row => {
      if (row.id === 5) {
        return { ...row, name: "Placeholder Customer" };
      }
      return row;
    });
    setCleanedData(cleaned);
    setStep(2);
  };

  const handleTransform = () => {
    // Convert USD to EUR (ID 2: 150 USD -> 135 EUR assuming 0.9 exchange rate)
    const transformed = cleanedData.map(row => {
      if (row.amount.includes("USD")) {
        const val = parseFloat(row.amount);
        return { ...row, amount: `${Math.round(val * 0.9)} EUR` };
      }
      return row;
    });
    setTransformedData(transformed);
    setStep(3);
  };

  const handleLoad = () => {
    setLoadingComplete(true);
    onComplete();
  };

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← Back to Labs
      </button>

      <div className="lab-brief">
        <div>
          <h3>ETL Quality Engineering Lab</h3>
          <p>
            You are preparing a nightly retail sales load where duplicate rows, missing customer entities, and mixed currencies would corrupt executive reporting.
          </p>
        </div>
        <div className="lab-brief-task">
          <strong>Analyst task</strong>
          <p>Profile the source extract, apply cleaning and transformation rules, then load only warehouse-ready facts.</p>
          <div className="lab-skill-row">
            <span>quality rules</span>
            <span>currency standardization</span>
            <span>DWH load</span>
          </div>
        </div>

        <div
          className="etl-pipeline-viz"
          style={{ '--etl-progress': loadingComplete ? 1 : Math.max(0, step) / 3 } as React.CSSProperties}
        >
          <div className={`etl-pipeline-step ${step >= 0 ? 'active' : ''} ${step > 0 ? 'completed' : ''}`}>
            <div className="etl-pipeline-circle">1</div>
            <span className="etl-pipeline-label">Extract</span>
          </div>
          <div className={`etl-pipeline-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="etl-pipeline-circle">2</div>
            <span className="etl-pipeline-label">Clean</span>
          </div>
          <div className={`etl-pipeline-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="etl-pipeline-circle">3</div>
            <span className="etl-pipeline-label">Transform</span>
          </div>
          <div className={`etl-pipeline-step ${step >= 3 ? 'active' : ''} ${loadingComplete ? 'completed' : ''}`}>
            <div className="etl-pipeline-circle">4</div>
            <span className="etl-pipeline-label">Load</span>
          </div>
        </div>
      </div>

      {renderIndustryCaseFile(
        "Omnichannel Retail",
        "The CFO is preparing a Monday executive sales pack, but store POS data, webshop exports, and loyalty records disagree on customer names, currencies, and duplicate transactions.",
        "The batch contains EUR and USD values, repeated sales events, placeholder identities, and records that must be standardized before they are trusted by BI dashboards.",
        ["CFO: revenue accuracy", "Data engineer: repeatable ETL rules", "Regional manager: comparable store performance"],
        "A reconciled fact table with documented cleaning rules, currency normalization, and a clear audit trail for excluded or repaired rows."
      )}

      <div className="lab-layout">
        <div className="lab-sidebar">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem' }}>Pipeline Control</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Each stage executes automated or guided logic on the database to improve data quality before analytics.
          </p>

          {step === 0 && (
            <button className="btn btn-primary" onClick={handleExtract}>
              1. Extract Raw Logs
            </button>
          )}
          {step === 1 && (
            <button className="btn btn-teal" onClick={handleClean}>
              2. Clean Duplicates & Missing
            </button>
          )}
          {step === 2 && (
            <button className="btn btn-teal" onClick={handleTransform}>
              3. Transform USD to EUR
            </button>
          )}
          {step === 3 && !loadingComplete && (
            <button className="btn btn-primary" onClick={handleLoad}>
              4. Load into DWH
            </button>
          )}
          {loadingComplete && (
            <div style={{ backgroundColor: 'rgba(91,140,58,0.06)', padding: '12px', border: '1px solid rgba(91,140,58,0.3)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: '0.85rem' }}>✓ Pipeline Successful!</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Data loaded into the analytical warehouse preview.</p>
            </div>
          )}
        </div>

        <div className="lab-canvas">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '16px' }}>
            {step === 0 && 'Target Source Operational Logs'}
            {step === 1 && 'Extracted Inconsistent Database'}
            {step === 2 && 'Cleaned Operational Records'}
            {step === 3 && 'Transformed Standardised Rows'}
            {loadingComplete && 'Analytical Warehouse Dashboard Preview'}
          </h4>

          {step === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '80px' }}>
              Click 'Extract Raw Logs' to start the pipeline and inspect dirty transactional database data.
            </p>
          )}

          {step > 0 && !loadingComplete && (
            <table className="olap-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Row ID</th>
                  <th>Customer Name</th>
                  <th>Fulfillment Amount</th>
                  <th>Fulfillment Date</th>
                  <th>Account Type</th>
                </tr>
              </thead>
              <tbody>
                {(step === 1 ? extractedData : step === 2 ? cleanedData : transformedData).map((row, idx) => (
                  <tr key={idx} style={{ 
                    backgroundColor: step === 1 && (row.id === 4 || row.id === 5) ? 'rgba(242,140,40,0.08)' : 'transparent'
                  }}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td style={{ color: row.amount.includes("USD") ? 'var(--orange)' : 'inherit', fontWeight: row.amount.includes("USD") ? 700 : 'normal' }}>
                      {row.amount}
                    </td>
                    <td>{row.date}</td>
                    <td>{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {loadingComplete && (
            <div style={{ animation: 'slideIn 0.3s ease-out' }}>
              <div className="advanced-metric-grid">
                <div>
                  <span>Total EUR Sales</span>
                  <strong>485 EUR</strong>
                </div>
                <div>
                  <span>Rows Loaded</span>
                  <strong>{loadedRowCount}</strong>
                </div>
                <div>
                  <span>Quality Score</span>
                  <strong>{qualityScore}%</strong>
                </div>
                <div>
                  <span>Audit Exceptions</span>
                  <strong>3</strong>
                </div>
              </div>

              <div className="lab-insight-panel">
                <h5>ETL audit interpretation</h5>
                <p>
                  One duplicate was excluded, one identity defect was repaired with a placeholder, and one USD value was standardized to EUR. The load is analytically usable, but the placeholder customer should be routed to master-data stewardship before monthly close.
                </p>
              </div>

              <div style={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={[
                    { name: 'Darko Etinger', amount: 120 },
                    { name: 'Ana Horvat', amount: 135 },
                    { name: 'Ivan Kovac', amount: 80 },
                    { name: 'Placeholder Cust', amount: 200 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                    <XAxis dataKey="name" tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <YAxis tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <RechartsTooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipItemStyle} cursor={chartTooltipCursor} />
                    <Bar dataKey="amount" fill="var(--teal)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// B. OLAP CUBE EXPLORER COMPONENT
function OLAPExplorerLab({ onBack, onComplete, isCompleted: _isCompleted }: { onBack: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [sliceRegion, setSliceRegion] = useState<string>('All');
  const [diceProduct, setDiceProduct] = useState<string>('All');
  const [pivotRows, setPivotRows] = useState<'Product' | 'Region'>('Product');
  const [drillLevel, setDrillLevel] = useState<'Year' | 'Quarter'>('Year');

  // Hardcoded Cube Dataset
  const rawCubeData = [
    { year: "2026", quarter: "Q1", region: "Istria", product: "Laptops", sales: 12000, profit: 4500 },
    { year: "2026", quarter: "Q2", region: "Istria", product: "Laptops", sales: 15000, profit: 5200 },
    { year: "2026", quarter: "Q1", region: "Istria", product: "Tablets", sales: 8000, profit: 2400 },
    { year: "2026", quarter: "Q2", region: "Istria", product: "Tablets", sales: 9500, profit: 3000 },
    
    { year: "2026", quarter: "Q1", region: "Dalmatia", product: "Laptops", sales: 18000, profit: 6200 },
    { year: "2026", quarter: "Q2", region: "Dalmatia", product: "Laptops", sales: 21000, profit: 7500 },
    { year: "2026", quarter: "Q1", region: "Dalmatia", product: "Tablets", sales: 11000, profit: 3500 },
    { year: "2026", quarter: "Q2", region: "Dalmatia", product: "Tablets", sales: 13000, profit: 4200 },
  ];

  // Apply Slice & Dice
  const filteredData = rawCubeData.filter(row => {
    const matchesRegion = sliceRegion === 'All' || row.region === sliceRegion;
    const matchesProduct = diceProduct === 'All' || row.product === diceProduct;
    return matchesRegion && matchesProduct;
  });

  // Calculate aggregations
  const getAggregatedData = () => {
    const map: Record<string, { name: string, sales: number, profit: number }> = {};
    
    filteredData.forEach(row => {
      const key = pivotRows === 'Product' 
        ? row.product 
        : row.region;
      
      const timeKey = drillLevel === 'Quarter' ? ` (${row.quarter})` : '';
      const finalKey = key + timeKey;

      if (!map[finalKey]) {
        map[finalKey] = { name: finalKey, sales: 0, profit: 0 };
      }
      map[finalKey].sales += row.sales;
      map[finalKey].profit += row.profit;
    });

    return Object.values(map);
  };

  const chartData = getAggregatedData();
  const totalSales = chartData.reduce((sum, row) => sum + row.sales, 0);
  const totalProfit = chartData.reduce((sum, row) => sum + row.profit, 0);
  const averageMargin = totalSales > 0 ? Math.round((totalProfit / totalSales) * 100) : 0;
  const bestNode = chartData.reduce((best, row) => row.profit > best.profit ? row : best, chartData[0]);
  const weakestNode = chartData.reduce((weakest, row) => (row.profit / row.sales) < (weakest.profit / weakest.sales) ? row : weakest, chartData[0]);

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← Back to Labs
      </button>

      {renderLabBrief(
        "Intermediate",
        "OLAP Profitability Analysis Lab",
        "A regional sales director needs to understand whether profit variation is caused by geography, product mix, or quarterly movement.",
        "Use slice, dice, pivot, and drill controls to produce a defensible interpretation of the multidimensional sales cube.",
        ["slice and dice", "pivot analysis", "profitability view"]
      )}

      {renderIndustryCaseFile(
        "Consumer Electronics Distribution",
        "A distributor suspects tablets are growing revenue but weakening margin in one region, while laptop demand behaves differently by quarter.",
        "Sales and profit are stored as cube measures. Region, product, and quarter act as dimensions that can expose different management stories depending on the view.",
        ["Sales director: region comparison", "Category manager: product profitability", "Finance analyst: margin interpretation"],
        "A short profitability interpretation explaining which dimension view best supports the management decision and why."
      )}

      <div className="lab-layout">
        <div className="lab-sidebar">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem' }}>OLAP Cube Controls</h4>
          
          <div className="form-group">
            <label className="form-label">1. Slice by Region</label>
            <select className="form-select" value={sliceRegion} onChange={(e) => { setSliceRegion(e.target.value); onComplete(); }}>
              <option value="All">All Regions (Istria & Dalmatia)</option>
              <option value="Istria">Istria Only</option>
              <option value="Dalmatia">Dalmatia Only</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">2. Dice by Product</label>
            <select className="form-select" value={diceProduct} onChange={(e) => { setDiceProduct(e.target.value); onComplete(); }}>
              <option value="All">All Products (Laptops & Tablets)</option>
              <option value="Laptops">Laptops Only</option>
              <option value="Tablets">Tablets Only</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">3. Pivot Dimensions</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={`btn ${pivotRows === 'Product' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setPivotRows('Product'); onComplete(); }}>
                Rows: Product
              </button>
              <button className={`btn ${pivotRows === 'Region' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setPivotRows('Region'); onComplete(); }}>
                Rows: Region
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">4. Drill Down Level</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={`btn ${drillLevel === 'Year' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setDrillLevel('Year'); onComplete(); }}>
                Year level
              </button>
              <button className={`btn ${drillLevel === 'Quarter' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setDrillLevel('Quarter'); onComplete(); }}>
                Quarter level
              </button>
            </div>
          </div>

        </div>

        <div className="lab-canvas">
          <div>
            <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '16px' }}>Multidimensional Aggregation Grid</h4>

            <div className="advanced-metric-grid">
              <div>
                <span>Total Sales</span>
                <strong>{totalSales.toLocaleString()} $</strong>
              </div>
              <div>
                <span>Total Profit</span>
                <strong>{totalProfit.toLocaleString()} $</strong>
              </div>
              <div>
                <span>Avg. Margin</span>
                <strong>{averageMargin}%</strong>
              </div>
              <div>
                <span>Top Node</span>
                <strong>{bestNode?.name}</strong>
              </div>
            </div>

            <div className="lab-insight-panel">
              <h5>OLAP interpretation</h5>
              <p>
                Current view highlights <strong>{bestNode?.name}</strong> as the strongest profit node, while <strong>{weakestNode?.name}</strong> has the weakest margin. Use quarter drill-down to test whether that weakness is structural or time-specific.
              </p>
            </div>
            
            <table className="olap-table">
              <thead>
                <tr>
                  <th>Dimension Node</th>
                  <th>Aggregated Sales ($)</th>
                  <th>Aggregated Profit ($)</th>
                  <th>Margin (%)</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: 'var(--navy)' }}>{row.name}</td>
                    <td>{row.sales.toLocaleString()} $</td>
                    <td>{row.profit.toLocaleString()} $</td>
                    <td>{Math.round((row.profit / row.sales) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ width: '100%', height: '240px', marginTop: '24px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis dataKey="name" tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                <YAxis tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                <RechartsTooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipItemStyle} cursor={chartTooltipCursor} />
                <Legend fontSize={10} />
                <Bar dataKey="sales" fill="var(--blue)" radius={[4, 4, 0, 0]} name="Sales revenue" />
                <Bar dataKey="profit" fill="var(--green)" radius={[4, 4, 0, 0]} name="Gross profit" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// C. BUSINESS PROCESS HANDOFF LAB COMPONENT
function BusinessProcessLab({ onBack, onComplete, isCompleted: _isCompleted }: { onBack: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [systemMode, setSystemMode] = useState<'Silos' | 'Workflow ERP'>('Silos');
  const [handoffFocus, setHandoffFocus] = useState<'Speed' | 'Quality' | 'Visibility'>('Visibility');

  const processSteps = [
    { name: "Proposal", function: "Sales", baseDays: 2, risk: "Medium", system: "CRM", issue: "Customer requirements are captured, but production capacity is not yet visible." },
    { name: "Commitment", function: "Sales + Finance", baseDays: 3, risk: "High", system: "Workflow approval", issue: "A delivery promise is made before credit and resource checks are fully coordinated." },
    { name: "Configuration", function: "Manufacturing", baseDays: 4, risk: "Medium", system: "ERP product configuration", issue: "Product options must be translated into materials, capacity, and production instructions." },
    { name: "Credit Checking", function: "Finance", baseDays: 2, risk: "High", system: "Credit rules / DSS", issue: "Manual credit checks can delay approved orders or let risky commitments move too far." },
    { name: "Delivery", function: "Logistics", baseDays: 3, risk: "Medium", system: "Logistics module", issue: "Shipment planning depends on accurate completion dates from manufacturing." },
    { name: "Billing", function: "Finance", baseDays: 2, risk: "Low", system: "ERP invoicing", issue: "Invoices should be triggered by confirmed delivery instead of manual notification." },
    { name: "Collections", function: "Finance", baseDays: 5, risk: "Medium", system: "Receivables dashboard", issue: "Payment follow-up needs status visibility across account history and invoice age." },
  ];

  const activeStep = processSteps[selectedStep];
  const riskPenalty = activeStep.risk === 'High' ? 2 : activeStep.risk === 'Medium' ? 1 : 0;
  const modeImprovement = systemMode === 'Workflow ERP' ? 0.72 : 1;
  const focusImprovement = handoffFocus === 'Speed' ? 0.9 : handoffFocus === 'Quality' ? 0.95 : 0.86;
  const totalBaseDays = processSteps.reduce((sum, step) => sum + step.baseDays, 0);
  const redesignedDays = Math.round(totalBaseDays * modeImprovement * focusImprovement);
  const visibilityScore = systemMode === 'Workflow ERP' ? (handoffFocus === 'Visibility' ? 92 : 78) : (handoffFocus === 'Visibility' ? 58 : 42);
  const handoffRisk = Math.max(0, Math.round((riskPenalty + (systemMode === 'Silos' ? 3 : 1)) * (handoffFocus === 'Quality' ? 12 : 16)));
  const functionLoad = processSteps.reduce((acc, step) => {
    acc[step.function] = (acc[step.function] || 0) + step.baseDays;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← Back to Labs
      </button>

      {renderLabBrief(
        "Intermediate",
        "Business Process Handoff Lab",
        "A B2B supplier wants to redesign order-to-cash work that crosses Sales, Manufacturing, Finance, and Logistics.",
        "Inspect the process steps, locate weak handoffs, and choose information-system support that improves speed, quality, and visibility.",
        ["process mapping", "handoff diagnosis", "workflow support"]
      )}

      {renderIndustryCaseFile(
        "Industrial Equipment Sales",
        "Customers experience one order process, but internally the work moves across departments: proposal, commitment, configuration, credit checking, delivery, billing, and collections.",
        "The current process is functionally organized. Each department completes its own task, but status is hard to see, promises are made before checks are complete, and delays accumulate at handoffs.",
        ["Sales manager: reliable commitments", "Finance controller: credit and billing control", "Logistics planner: delivery visibility"],
        "A redesigned process map with identified handoff risks and recommended CRM, ERP, workflow, credit-rule, and dashboard support."
      )}

      <div className="lab-layout">
        <div className="lab-sidebar">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem' }}>Redesign Controls</h4>

          <div className="form-group">
            <label className="form-label">Information System Mode</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(["Silos", "Workflow ERP"] as const).map(mode => (
                <button key={mode} className={`btn ${systemMode === mode ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setSystemMode(mode); onComplete(); }}>
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Improvement Focus</label>
            <select className="form-select" value={handoffFocus} onChange={(e) => { setHandoffFocus(e.target.value as 'Speed' | 'Quality' | 'Visibility'); onComplete(); }}>
              <option value="Visibility">Visibility</option>
              <option value="Speed">Speed</option>
              <option value="Quality">Quality</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Inspect Process Step</label>
            <select className="form-select" value={selectedStep} onChange={(e) => { setSelectedStep(parseInt(e.target.value)); onComplete(); }}>
              {processSteps.map((step, idx) => (
                <option key={step.name} value={idx}>{idx + 1}. {step.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="lab-canvas">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem' }}>Order-to-Cash Process Map</h4>
            <span className={`badge ${activeStep.risk === 'High' ? 'badge-orange' : activeStep.risk === 'Medium' ? 'badge-violet' : 'badge-green'}`}>
              Selected risk: {activeStep.risk}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            {processSteps.map((step, idx) => (
              <button
                key={step.name}
                type="button"
                onClick={() => { setSelectedStep(idx); onComplete(); }}
                style={{
                  border: idx === selectedStep ? '2px solid var(--teal)' : '1px solid var(--border-light)',
                  background: idx === selectedStep ? 'rgba(45,212,191,0.08)' : 'var(--bg-base)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  minHeight: '102px'
                }}
              >
                <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '0.82rem' }}>{step.name}</strong>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '4px' }}>{step.function}</span>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '8px' }}>{step.baseDays} days baseline</span>
              </button>
            ))}
          </div>

          <div className="advanced-metric-grid">
            <div>
              <span>Baseline Cycle</span>
              <strong>{totalBaseDays} days</strong>
            </div>
            <div>
              <span>Redesigned Cycle</span>
              <strong>{redesignedDays} days</strong>
            </div>
            <div>
              <span>Visibility Score</span>
              <strong>{visibilityScore}%</strong>
            </div>
            <div>
              <span>Handoff Risk</span>
              <strong>{handoffRisk}%</strong>
            </div>
          </div>

          <div className="lab-insight-panel">
            <h5>{activeStep.name}: {activeStep.system}</h5>
            <p>
              {activeStep.issue} In <strong>{systemMode}</strong> mode with a <strong>{handoffFocus.toLowerCase()}</strong> focus, the redesign should prioritize shared status, clear ownership, and automated triggers between functions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px' }}>
            <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
              <h5 style={{ color: 'var(--navy)', fontWeight: 700, marginBottom: '10px' }}>Functional Workload</h5>
              {Object.entries(functionLoad).map(([fn, days]) => (
                <div key={fn} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>{fn}</span>
                    <strong>{days} days</strong>
                  </div>
                  <div className="progress-summary-fill" style={{ width: '100%' }}>
                    <div className="progress-summary-fill-inner" style={{ width: `${Math.round((days / totalBaseDays) * 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
              <h5 style={{ color: 'var(--navy)', fontWeight: 700, marginBottom: '10px' }}>Recommended System Support</h5>
              <ul className="lesson-simple-list compact">
                <li>CRM captures demand and proposal context.</li>
                <li>ERP links configuration, delivery, billing, and inventory data.</li>
                <li>Workflow routes commitments and credit checks before promises are finalized.</li>
                <li>Dashboards expose order status and aging collections.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// D. DECISION TABLE BUILDER LAB COMPONENT
function DecisionTableLab({ onBack, onComplete, isCompleted: _isCompleted }: { onBack: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [customerType, setCustomerType] = useState<'Premium' | 'Regular'>('Premium');
  const [orderValue, setOrderValue] = useState<number>(3000);
  const [paymentStatus, setPaymentStatus] = useState<'Verified' | 'Failed'>('Verified');
  const [riskLevel, setRiskLevel] = useState<'Low' | 'High'>('Low');

  // Hardcoded decision table logic
  const rules = [
    { id: 1, type: "Premium", maxVal: 5000, pay: "Verified", risk: "Low", decision: "Approve" },
    { id: 2, type: "Premium", maxVal: 99999, pay: "Verified", risk: "Low", decision: "Manual Review" }, // Over 5000 requires review
    { id: 3, type: "Any", maxVal: 99999, pay: "Failed", risk: "Any", decision: "Reject" }, // Failed payments are rejected
    { id: 4, type: "Any", maxVal: 99999, pay: "Any", risk: "High", decision: "Reject" }, // High risk is rejected
    { id: 5, type: "Regular", maxVal: 1000, pay: "Verified", risk: "Low", decision: "Approve" },
    { id: 6, type: "Regular", maxVal: 99999, pay: "Verified", risk: "Low", decision: "Manual Review" }, // Regular over 1000 requires review
  ];

  // Evaluator logic
  const evaluateCase = () => {
    // Check failed payment first (Rule 3)
    if (paymentStatus === 'Failed') return { decision: "Reject", ruleId: 3 };
    // Check high risk second (Rule 4)
    if (riskLevel === 'High') return { decision: "Reject", ruleId: 4 };

    if (customerType === 'Premium') {
      if (orderValue <= 5000) return { decision: "Approve", ruleId: 1 };
      return { decision: "Manual Review", ruleId: 2 };
    } else {
      if (orderValue <= 1000) return { decision: "Approve", ruleId: 5 };
      return { decision: "Manual Review", ruleId: 6 };
    }
  };

  const currentResult = evaluateCase();
  const scenarioUniverse = [
    { type: "Premium", value: 500, pay: "Verified", risk: "Low" },
    { type: "Premium", value: 7500, pay: "Verified", risk: "Low" },
    { type: "Regular", value: 500, pay: "Verified", risk: "Low" },
    { type: "Regular", value: 2500, pay: "Verified", risk: "Low" },
    { type: "Premium", value: 12000, pay: "Failed", risk: "Low" },
    { type: "Regular", value: 800, pay: "Verified", risk: "High" },
  ];
  const governanceCounts = scenarioUniverse.reduce((acc, scenario) => {
    const decision = scenario.pay === "Failed" || scenario.risk === "High"
      ? "Reject"
      : scenario.type === "Premium"
        ? scenario.value <= 5000 ? "Approve" : "Manual Review"
        : scenario.value <= 1000 ? "Approve" : "Manual Review";
    acc[decision] = (acc[decision] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← Back to Labs
      </button>

      {renderLabBrief(
        "Advanced",
        "Decision Rule Governance Lab",
        "A company wants to automate approvals but must prove that rules are complete, explainable, and safe under high-risk conditions.",
        "Stress-test condition combinations and inspect which policy row controls the final operational decision.",
        ["rule audit", "conflict control", "explainability"]
      )}

      {renderIndustryCaseFile(
        "B2B Order Management",
        "The operations team wants automatic approvals for low-risk orders, but compliance will not accept a black-box decision when payment or risk indicators fail.",
        "Inputs combine customer tier, order value, payment verification, and risk score. Some rules are intentionally strict because fraud exposure is more costly than manual review.",
        ["Operations lead: faster order release", "Compliance officer: rule traceability", "Credit controller: exposure limits"],
        "A tested decision table showing the triggered rule, the approval outcome, and evidence that risky combinations are rejected or routed to review."
      )}

      <div className="lab-layout">
        <div className="lab-sidebar">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem' }}>Test Case Inputs</h4>
          
          <div className="form-group">
            <label className="form-label">Customer Type</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={`btn ${customerType === 'Premium' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setCustomerType('Premium'); onComplete(); }}>
                Premium
              </button>
              <button className={`btn ${customerType === 'Regular' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setCustomerType('Regular'); onComplete(); }}>
                Regular
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Order Value ($): <strong>{orderValue} $</strong></label>
            <input 
              type="range" 
              min="100" 
              max="15000" 
              step="100"
              value={orderValue} 
              onChange={(e) => { setOrderValue(parseInt(e.target.value)); onComplete(); }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Payment Status</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={`btn ${paymentStatus === 'Verified' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setPaymentStatus('Verified'); onComplete(); }}>
                Verified
              </button>
              <button className={`btn ${paymentStatus === 'Failed' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setPaymentStatus('Failed'); onComplete(); }}>
                Failed
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Risk Level</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={`btn ${riskLevel === 'Low' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setRiskLevel('Low'); onComplete(); }}>
                Low Risk
              </button>
              <button className={`btn ${riskLevel === 'High' ? 'btn-primary' : 'btn-secondary'}`} style={{ flexGrow: 1, padding: '8px', fontSize: '0.75rem' }} onClick={() => { setRiskLevel('High'); onComplete(); }}>
                High Risk
              </button>
            </div>
          </div>
        </div>

        <div className="lab-canvas">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem' }}>Automated Decision Table</h4>
              <span className={`badge ${
                currentResult.decision === 'Approve' ? 'badge-green' : 
                currentResult.decision === 'Reject' ? 'badge-orange' : 'badge-violet'
              }`} style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                Outcome: {currentResult.decision}
              </span>
            </div>

            <table className="olap-table">
              <thead>
                <tr>
                  <th>Rule ID</th>
                  <th>Customer</th>
                  <th>Order Value ($)</th>
                  <th>Payment</th>
                  <th>Risk Score</th>
                  <th>Decision Action</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => {
                  const isActive = currentResult.ruleId === rule.id;
                  return (
                    <tr key={rule.id} style={{ 
                      backgroundColor: isActive ? 'rgba(0,166,166,0.08)' : 'transparent',
                      borderLeft: isActive ? '5px solid var(--teal)' : 'none',
                      fontWeight: isActive ? '700' : 'normal'
                    }}>
                      <td>Rule {rule.id}</td>
                      <td>{rule.type}</td>
                      <td>{rule.maxVal === 99999 ? 'Any' : `≤ ${rule.maxVal}`}</td>
                      <td>{rule.pay}</td>
                      <td>{rule.risk}</td>
                      <td>
                        <span className={`badge ${
                          rule.decision === 'Approve' ? 'badge-green' : 
                          rule.decision === 'Reject' ? 'badge-orange' : 'badge-violet'
                        }`}>
                          {rule.decision}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ backgroundColor: 'var(--bg-base)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginTop: '20px' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>Table Logic Checker</h5>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              • Completeness check: <strong>100% Covered</strong>. Every combination has a rule.<br />
              • Conflict Check: <strong>Consistent</strong>. No overlapping rows trigger different outcomes.
            </p>
          </div>

          <div className="lab-insight-panel">
            <h5>Governance stress test</h5>
            <p>
              Scenario universe result: {governanceCounts.Approve || 0} approvals, {governanceCounts["Manual Review"] || 0} manual reviews, and {governanceCounts.Reject || 0} rejections. Failed payment and high-risk flags override customer tier, which supports compliance explainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// D. DECISION TREE EXPLORER COMPONENT
function DecisionTreeLab({ onBack, onComplete, isCompleted: _isCompleted }: { onBack: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [successProb, setSuccessProb] = useState<number>(0.6); // 60% probability of high demand
  const [highDemandPayoff, setHighDemandPayoff] = useState<number>(120000);
  const [lowDemandPayoff, setLowDemandPayoff] = useState<number>(20000);
  const cost = 50000;

  const failureProb = Math.round((1 - successProb) * 10) / 10;

  // Expected Monetary Value (EMV)
  const emvLaunch = Math.round((successProb * highDemandPayoff) + (failureProb * lowDemandPayoff)) - cost;
  const emvDoNothing = 0;
  const breakEvenProbability = highDemandPayoff === lowDemandPayoff
    ? 1
    : Math.max(0, Math.min(1, (cost - lowDemandPayoff) / (highDemandPayoff - lowDemandPayoff)));
  const probabilityBuffer = Math.round((successProb - breakEvenProbability) * 100);

  const optimalChoice = emvLaunch > emvDoNothing ? "Launch Product" : "Do Nothing";

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← Back to Labs
      </button>

      {renderLabBrief(
        "Advanced",
        "Risk-Weighted Strategy Lab",
        "A strategy team is deciding whether to launch a product when market demand is uncertain and downside protection matters.",
        "Tune probability and payoff assumptions, compute EMV, and observe when the recommendation changes.",
        ["EMV", "uncertainty", "sensitivity"]
      )}

      {renderIndustryCaseFile(
        "Digital Product Strategy",
        "A SaaS company is weighing a paid analytics add-on. Marketing forecasts strong demand, but finance worries that development cost and weak adoption could destroy value.",
        "The decision depends on uncertain demand probabilities, high-demand payoff, low-demand payoff, and fixed launch cost. Small assumption changes can reverse the recommendation.",
        ["Product director: launch recommendation", "CFO: downside exposure", "Market analyst: probability assumptions"],
        "An EMV-backed recommendation plus a sensitivity note explaining which assumption would change the decision."
      )}

      <div className="lab-layout">
        <div className="lab-sidebar">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem' }}>Market Variables</h4>
          
          <div className="form-group">
            <label className="form-label">Success Probability (High Demand): <strong>{Math.round(successProb * 100)}%</strong></label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={successProb} 
              onChange={(e) => { setSuccessProb(parseFloat(e.target.value)); onComplete(); }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">High Demand Payoff ($)</label>
            <select className="form-select" value={highDemandPayoff} onChange={(e) => { setHighDemandPayoff(parseInt(e.target.value)); onComplete(); }}>
              <option value="80000">80,000 $</option>
              <option value="120000">120,000 $ (Default)</option>
              <option value="180000">180,000 $ (High)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Low Demand Payoff ($)</label>
            <select className="form-select" value={lowDemandPayoff} onChange={(e) => { setLowDemandPayoff(parseInt(e.target.value)); onComplete(); }}>
              <option value="0">0 $</option>
              <option value="20000">20,000 $ (Default)</option>
              <option value="40000">40,000 $</option>
            </select>
          </div>
        </div>

        <div className="lab-canvas">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem' }}>Sequential Decision Tree</h4>
              <span className="badge badge-green" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                Optimal: {optimalChoice}
              </span>
            </div>

            {/* Simulated Visual Tree Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '20px' }}>
              
              {/* Decision Node */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid var(--navy)', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>D</div>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>Project Launch Choice</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Launch Cost: {cost.toLocaleString()} $</p>
                </div>
              </div>

              {/* Branches */}
              <div style={{ borderLeft: '2px dashed var(--text-muted)', marginLeft: '15px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '24px', margin: '8px 0' }}>
                
                {/* Branch 1: Launch */}
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid var(--blue)', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>C</div>
                    <div>
                      <h5 style={{ fontWeight: 700, color: 'var(--blue)', fontSize: '0.85rem' }}>Path A: Launch Product (EMV: {emvLaunch.toLocaleString()} $)</h5>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '12px', marginTop: '4px' }}>
                        <span>• High Demand ({Math.round(successProb*100)}%): <strong>+{highDemandPayoff.toLocaleString()} $</strong></span>
                        <span>• Low Demand ({Math.round(failureProb*100)}%): <strong>+{lowDemandPayoff.toLocaleString()} $</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch 2: Do nothing */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid var(--text-muted)', backgroundColor: 'var(--bg-surface)' }}></div>
                    <div>
                      <h5 style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Path B: Do Nothing (EMV: 0 $)</h5>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>No investment risk. Zero yield.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-base)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginTop: '20px' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>Mathematical Formula</h5>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', marginTop: '6px' }}>
              EMV = (Prob_Success * Payoff_Success) + (Prob_Fail * Payoff_Fail) - Cost <br />
              EMV = ({successProb} * {highDemandPayoff}) + ({failureProb} * {lowDemandPayoff}) - {cost} = {emvLaunch.toLocaleString()} $
            </p>
          </div>

          <div className="lab-insight-panel">
            <h5>Sensitivity interpretation</h5>
            <p>
              Break-even probability is <strong>{Math.round(breakEvenProbability * 100)}%</strong>. Current probability is {Math.round(successProb * 100)}%, giving a {probabilityBuffer >= 0 ? '+' : ''}{probabilityBuffer} point buffer. {probabilityBuffer >= 0 ? 'The launch case survives the probability threshold.' : 'The launch case is below the minimum confidence threshold.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// E. DASHBOARD BUILDER COMPONENT
function DashboardBuilderLab({ onBack, onComplete, isCompleted: _isCompleted }: { onBack: () => void, onComplete: () => void, isCompleted: boolean }) {
  const [selectedKPI, setSelectedKPI] = useState<string>('sales');
  const [chartType, setChartType] = useState<'Bar' | 'Line' | 'Area'>('Bar');
  const [alertThreshold, setAlertThreshold] = useState<number>(3000);

  const salesData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 3800 },
  ];

  const churnData = [
    { name: 'Jan', value: 8 },
    { name: 'Feb', value: 12 },
    { name: 'Mar', value: 5 },
    { name: 'Apr', value: 15 },
    { name: 'May', value: 18 },
    { name: 'Jun', value: 4 },
  ];

  const activeData = selectedKPI === 'sales' ? salesData : churnData;
  const latestValue = activeData[activeData.length - 1].value;
  const previousValue = activeData[activeData.length - 2].value;
  const rollingAverage = Math.round(activeData.slice(-3).reduce((sum, item) => sum + item.value, 0) / 3);
  const varianceToThreshold = selectedKPI === 'sales'
    ? latestValue - alertThreshold
    : alertThreshold - latestValue;
  const monthChange = latestValue - previousValue;
  const isTriggered = selectedKPI === 'sales' 
    ? latestValue < alertThreshold 
    : latestValue > alertThreshold;
  const severity = Math.abs(varianceToThreshold) > (selectedKPI === 'sales' ? 1200 : 6) ? "High" : isTriggered ? "Medium" : "Normal";

  return (
    <div style={{ animation: 'slideIn 0.3s ease-out' }}>
      <button className="btn btn-secondary" style={{ marginBottom: '20px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={onBack}>
        ← Back to Labs
      </button>

      {renderLabBrief(
        "Intermediate",
        "KPI Early-Warning Lab",
        "An operations manager needs an executive signal board that highlights deteriorating sales or rising churn before monthly review meetings.",
        "Select a KPI, choose a visualization, calibrate the threshold, and interpret whether the alert should trigger action.",
        ["KPI design", "thresholds", "alerts"]
      )}

      {renderIndustryCaseFile(
        "Subscription Operations",
        "Leadership wants a board-level dashboard that separates ordinary noise from actionable performance exceptions before renewal campaigns are missed.",
        "Monthly revenue and churn move on different scales. A useful dashboard must pair the right chart type with a threshold that reflects the business risk of late response.",
        ["COO: operating rhythm", "Customer success lead: churn intervention", "BI analyst: readable KPI signal"],
        "A configured KPI widget with an alert rule and a concise explanation of what action should follow if the threshold is crossed."
      )}

      <div className="lab-layout">
        <div className="lab-sidebar">
          <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.05rem' }}>Widget Settings</h4>
          
          <div className="form-group">
            <label className="form-label">1. KPI Variable</label>
            <select className="form-select" value={selectedKPI} onChange={(e) => { setSelectedKPI(e.target.value); onComplete(); }}>
              <option value="sales">Monthly Sales Revenue ($)</option>
              <option value="churn">Customer Churn Rate (%)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">2. Chart Presentation</label>
            <select className="form-select" value={chartType} onChange={(e) => { setChartType(e.target.value as any); onComplete(); }}>
              <option value="Bar">Bar Chart Widget</option>
              <option value="Line">Line Graph Widget</option>
              <option value="Area">Area Aggregation Widget</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              3. Alert Trigger Threshold: <strong>{alertThreshold} {selectedKPI === 'sales' ? '$' : '%'}</strong>
            </label>
            <input 
              type="range" 
              min={selectedKPI === 'sales' ? 1000 : 5} 
              max={selectedKPI === 'sales' ? 8000 : 25} 
              step={selectedKPI === 'sales' ? 200 : 1}
              value={alertThreshold} 
              onChange={(e) => { setAlertThreshold(parseInt(e.target.value)); onComplete(); }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {selectedKPI === 'sales' ? 'Warns if revenue drops BELOW threshold' : 'Warns if churn rises ABOVE threshold'}
            </span>
          </div>
        </div>

        <div className="lab-canvas">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '1.15rem' }}>Active KPI Widget</h4>
              
              {isTriggered ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--orange)', fontWeight: 'bold', fontSize: '0.85rem', animation: 'pulseBorder 2s infinite' }} className="badge badge-orange">
                  <Flame size={14} /> ALERT TRIGGERED
                </div>
              ) : (
                <span className="badge badge-green">Status: Normal</span>
              )}
            </div>

            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'Bar' ? (
                  <RechartsBarChart data={activeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                    <XAxis dataKey="name" tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <YAxis tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <RechartsTooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipItemStyle} cursor={chartTooltipCursor} />
                    <Bar dataKey="value" fill={selectedKPI === 'sales' ? 'var(--blue)' : 'var(--violet)'} radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                ) : chartType === 'Line' ? (
                  <LineChart data={activeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                    <XAxis dataKey="name" tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <YAxis tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <RechartsTooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipItemStyle} cursor={chartTooltipCursor} />
                    <Line type="monotone" dataKey="value" stroke={selectedKPI === 'sales' ? 'var(--blue)' : 'var(--violet)'} strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                ) : (
                  <AreaChart data={activeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                    <XAxis dataKey="name" tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <YAxis tick={chartAxisTick} axisLine={chartAxisLine} tickLine={chartAxisLine} />
                    <RechartsTooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipItemStyle} cursor={chartTooltipCursor} />
                    <Area type="monotone" dataKey="value" fill={selectedKPI === 'sales' ? 'rgba(47,156,255,0.12)' : 'rgba(167,139,250,0.12)'} stroke={selectedKPI === 'sales' ? 'var(--blue)' : 'var(--violet)'} strokeWidth={2} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="advanced-metric-grid">
              <div>
                <span>Latest Value</span>
                <strong>{latestValue}{selectedKPI === 'sales' ? ' $' : '%'}</strong>
              </div>
              <div>
                <span>3-Month Avg</span>
                <strong>{rollingAverage}{selectedKPI === 'sales' ? ' $' : '%'}</strong>
              </div>
              <div>
                <span>MoM Change</span>
                <strong>{monthChange >= 0 ? '+' : ''}{monthChange}</strong>
              </div>
              <div>
                <span>Severity</span>
                <strong>{severity}</strong>
              </div>
            </div>

            <div className="lab-insight-panel">
              <h5>Signal interpretation</h5>
              <p>
                The latest value is {Math.abs(varianceToThreshold)} {selectedKPI === 'sales' ? '$' : 'points'} {isTriggered ? 'beyond' : 'inside'} the alert boundary. For {selectedKPI === 'sales' ? 'sales revenue' : 'customer churn'}, the recommended next step is to compare this signal against regional and product-level drivers before escalating.
              </p>
            </div>
          </div>

          {isTriggered && (
            <div style={{ animation: 'slideIn 0.2s ease-out', border: '1px solid rgba(242,140,40,0.3)', backgroundColor: 'rgba(242,140,40,0.06)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', alignItems: 'center', marginTop: '20px' }}>
              <AlertTriangle size={24} color="var(--orange)" />
              <div>
                <h5 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.85rem' }}>Early Warning System Alert</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Latest Jun value ({latestValue}) is outside of your desired bounds ({alertThreshold}). Recommended action: run analytical pivot models to identify root regional causes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
