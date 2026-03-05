export type QuestStatus = "open" | "claimed" | "submitted" | "approved";

export type QuestPhase = "april" | "may" | "june-july";

export type Quest = {
  id: string;
  title: string;
  description: string;
  teamName: string;
  teamProject: string;
  task: string;
  verificationMethod: string;
  verificationCount: number;
  points: number;
  community: string;
  disasterType: "Flood" | "Heat" | "Wildfire" | "Storm" | "Drought";
  taskType: "Survey" | "Interview" | "Door-to-Door" | "Focus Group" | "Feedback Collection" | "Community Canvass";
  timeEstimate: "30 min" | "1-2 hrs" | "2-4 hrs" | "4-6 hrs";
  difficulty: "easy" | "moderate" | "hard";
  location: "In-Person";
  dueDate: string;
  impactTag: string;
  status: QuestStatus;
  phase: QuestPhase;
};

export type PhaseMilestone = {
  name: string;
  due: string;
  status: "done" | "active" | "upcoming";
  target: string;
};

export type TimelinePhase = {
  id: QuestPhase;
  label: string;
  subtitle: string;
  description: string;
  activities: string[];
  checkpoint: string;
  milestones: PhaseMilestone[];
};

export type TeamProject = {
  projectName: string;
  partnerOrg: string;
  community: string;
  disasterThreat: string;
  objectives: string[];
  timeline: TimelinePhase[];
  risks: { risk: string; mitigant: string; level: "low" | "medium" | "high" }[];
  mobilizationMetrics: { volunteersOnboarded: number; claimedQuests: number; completedQuests: number };
  cohesionMetrics: { partnerCheckIns: number; responseTimeHours: number; moduleCompletionRate: number };
  questsNeeded: string[];
};

export const initialQuests: Quest[] = [
  {
    id: "Q-101",
    title: "Survey Residents on Heat Safety Awareness",
    description:
      "Team Ember needs to understand how aware South Side residents are of heat safety resources — cooling centers, hydration stations, and the ARC heat hotline. This data will directly shape their proposal to expand cooling infrastructure in underserved blocks.",
    teamName: "Team Ember",
    teamProject: "South Side Heat Resilience Initiative",
    task: "Go to public spaces in South Side (parks, bus stops, community centers) and survey at least 5 residents using the provided questionnaire about their knowledge of local heat safety resources, personal heat preparedness, and barriers to accessing cooling centers.",
    verificationMethod: "Submit the phone numbers of the 5 residents you surveyed. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 20,
    community: "South Side",
    disasterType: "Heat",
    taskType: "Survey",
    timeEstimate: "1-2 hrs",
    difficulty: "easy",
    location: "In-Person",
    dueDate: "2026-04-25",
    impactTag: "Heat preparedness data",
    status: "open",
    phase: "april",
  },
  {
    id: "Q-102",
    title: "Collect Resident Input on Flood Evacuation Routes",
    description:
      "Team Watershed is proposing better flood evacuation signage and accessible routes in Riverbend. They need to hear directly from residents about which routes they currently use, what barriers they face, and whether they know where to go during a flash flood.",
    teamName: "Team Watershed",
    teamProject: "Riverbend Flood Evacuation Access Plan",
    task: "Go door-to-door in the Riverbend neighborhood and survey at least 5 residents about their flood evacuation awareness. Use the provided survey form to capture which routes they know, barriers they face (mobility, transport, language), and how they currently receive flood warnings.",
    verificationMethod: "Submit the phone numbers of the 5 residents you surveyed. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 30,
    community: "Riverbend",
    disasterType: "Flood",
    taskType: "Door-to-Door",
    timeEstimate: "2-4 hrs",
    difficulty: "moderate",
    location: "In-Person",
    dueDate: "2026-04-28",
    impactTag: "Evacuation route feedback",
    status: "open",
    phase: "april",
  },
  {
    id: "Q-103",
    title: "Interview Residents About Storm Shelter Needs",
    description:
      "Team Harborguard is working to make the Harbor District community center a more effective storm shelter. They need detailed feedback from residents about what would make them actually use it — location concerns, accessibility, supplies, communication, trust.",
    teamName: "Team Harborguard",
    teamProject: "Harbor District Storm Shelter Improvement",
    task: "Conduct short (10-minute) structured interviews with at least 5 Harbor District residents using the provided interview guide. Ask about their storm shelter experience, what would make them use the community center as shelter, and what barriers prevent them from preparing for storms.",
    verificationMethod: "Submit the phone numbers of the 5 residents you interviewed. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 30,
    community: "Harbor District",
    disasterType: "Storm",
    taskType: "Interview",
    timeEstimate: "2-4 hrs",
    difficulty: "moderate",
    location: "In-Person",
    dueDate: "2026-05-15",
    impactTag: "Shelter improvement input",
    status: "open",
    phase: "may",
  },
  {
    id: "Q-104",
    title: "Survey Non-English Speakers on Emergency Alert Access",
    description:
      "Team Harborguard discovered that many Harbor District residents don't receive storm warnings because alerts are only in English. They need data on which languages residents speak, how they currently get emergency info, and what communication channels would actually reach them.",
    teamName: "Team Harborguard",
    teamProject: "Harbor District Storm Shelter Improvement",
    task: "Visit areas of Harbor District with high non-English-speaking populations and survey at least 5 residents (bilingual community members can help translate). Capture their primary language, how they currently receive emergency info, and their preferred communication channels (text, call, app, radio).",
    verificationMethod: "Submit the phone numbers of the 5 residents you surveyed. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 30,
    community: "Harbor District",
    disasterType: "Storm",
    taskType: "Survey",
    timeEstimate: "2-4 hrs",
    difficulty: "moderate",
    location: "In-Person",
    dueDate: "2026-05-10",
    impactTag: "Language accessibility data",
    status: "claimed",
    phase: "may",
  },
  {
    id: "Q-105",
    title: "Gather Elderly Resident Feedback on Wildfire Readiness",
    description:
      "Team Ridgeline is focused on wildfire preparedness for elderly and mobility-limited residents in Pine Ridge. They need first-hand accounts of what these residents would need to evacuate safely — transportation, early warning, help with defensible space — to build a targeted support plan.",
    teamName: "Team Ridgeline",
    teamProject: "Pine Ridge Wildfire Preparedness for Vulnerable Populations",
    task: "Visit senior centers, assisted living facilities, or go door-to-door in hillside zones to interview at least 5 elderly residents about their wildfire preparedness. Focus on evacuation ability, access to alerts, whether they have help clearing defensible space, and what support they'd need during an evacuation.",
    verificationMethod: "Submit the phone numbers of the 5 residents you interviewed. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 40,
    community: "Pine Ridge",
    disasterType: "Wildfire",
    taskType: "Interview",
    timeEstimate: "2-4 hrs",
    difficulty: "moderate",
    location: "In-Person",
    dueDate: "2026-05-20",
    impactTag: "Vulnerable population needs",
    status: "submitted",
    phase: "may",
  },
  {
    id: "Q-106",
    title: "Survey Residents on Flood Shelter Supply Priorities",
    description:
      "Team Watershed is finalizing their proposal and needs to know what supplies residents consider most critical at flood shelters. Past shelters have run out of key items, and they want resident input to drive a smarter supply-stocking plan for North County.",
    teamName: "Team Watershed",
    teamProject: "Riverbend Flood Evacuation Access Plan",
    task: "Survey at least 5 North County residents about their flood shelter experiences and supply priorities. Ask what they've needed most at shelters (water, blankets, medications, phone chargers, baby supplies, pet supplies), what was missing, and what would make them more likely to use a shelter.",
    verificationMethod: "Submit the phone numbers of the 5 residents you surveyed. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 30,
    community: "North County",
    disasterType: "Flood",
    taskType: "Survey",
    timeEstimate: "1-2 hrs",
    difficulty: "easy",
    location: "In-Person",
    dueDate: "2026-06-15",
    impactTag: "Shelter supply priorities",
    status: "open",
    phase: "june-july",
  },
  {
    id: "Q-107",
    title: "Canvass Residents on Cooling Center Locations",
    description:
      "Team Ember is validating whether their proposed cooling center locations are actually convenient for the residents who need them most. They need direct feedback from people who live and work nearby to determine if the locations are accessible or if alternatives would work better.",
    teamName: "Team Ember",
    teamProject: "South Side Heat Resilience Initiative",
    task: "Walk the proposed cooling center locations in South Side and talk to at least 5 nearby residents or workers. Ask if they would use a cooling center at that location, how far they'd be willing to travel, whether public transit gets them there, and what hours would be most useful.",
    verificationMethod: "Submit the phone numbers of the 5 residents you spoke with. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 20,
    community: "South Side",
    disasterType: "Heat",
    taskType: "Community Canvass",
    timeEstimate: "1-2 hrs",
    difficulty: "easy",
    location: "In-Person",
    dueDate: "2026-04-20",
    impactTag: "Cooling center accessibility",
    status: "open",
    phase: "april",
  },
  {
    id: "Q-108",
    title: "Collect Feedback on Draft Community Emergency Plan",
    description:
      "Team Watershed has drafted a community emergency response plan for Riverbend and needs to validate it with the people it's designed to protect. They want to know if residents feel the plan actually addresses their needs — especially those with limited mobility, non-English speakers, and people without cars.",
    teamName: "Team Watershed",
    teamProject: "Riverbend Flood Evacuation Access Plan",
    task: "Share the one-page emergency plan summary with at least 5 Riverbend residents and collect their structured feedback. Ask if they understand the steps, whether the plan addresses their situation, what's missing, and if they'd feel prepared to follow it during an actual flood.",
    verificationMethod: "Submit the phone numbers of the 5 residents you collected feedback from. Our platform will text each person a few hours later asking them to reply \"YES\" to confirm they participated.",
    verificationCount: 5,
    points: 20,
    community: "Riverbend",
    disasterType: "Flood",
    taskType: "Feedback Collection",
    timeEstimate: "1-2 hrs",
    difficulty: "easy",
    location: "In-Person",
    dueDate: "2026-06-01",
    impactTag: "Emergency plan validation",
    status: "open",
    phase: "june-july",
  },
];

export const initialProject: TeamProject = {
  projectName: "Community Heat & Flood Preparedness Sprint",
  partnerOrg: "American Red Cross Regional Collaborative",
  community: "South Side and Riverbend",
  disasterThreat: "Compounded heat waves and flash flooding",
  objectives: [
    "Strengthen social cohesion by connecting students with neighborhood-level preparedness initiatives.",
    "Improve community mobilization capacity through student-led outreach and logistics support.",
    "Build a replicable model where youth serve as community mobilizers rather than passive volunteers.",
  ],
  timeline: [
    {
      id: "april",
      label: "April",
      subtitle: "Foundation & Discovery",
      description:
        "Teams establish contact with local organizations, begin initial research into community resilience gaps, and start posting quests to gather data from residents.",
      activities: [
        "Teams and local organizations establish contact with ARC help",
        "Teams begin initial research on community vulnerabilities and existing resources",
        "Teams start posting Community Quests to gather resident data and feedback",
        "Teams complete onboarding training modules on the project dashboard",
      ],
      checkpoint: "Initial 1-page proposals submitted — NYIM staff reviews for feasible scope",
      milestones: [
        {
          name: "Team-organization partnerships finalized",
          due: "2026-04-07",
          status: "done",
          target: "3 partnerships per community confirmed with signed alignment agreements",
        },
        {
          name: "Dashboard onboarding and training completed",
          due: "2026-04-14",
          status: "done",
          target: "All team members certified on quest platform and data visualization tools",
        },
        {
          name: "First Community Quests posted and live",
          due: "2026-04-18",
          status: "active",
          target: "At least 2 quests per Impact Team published on the platform",
        },
        {
          name: "Initial 1-page proposals submitted",
          due: "2026-04-28",
          status: "upcoming",
          target: "Identifying the specific disaster readiness gap and proposed approach",
        },
        {
          name: "NYIM staff scope review completed",
          due: "2026-04-30",
          status: "upcoming",
          target: "Feedback returned within 10 business days on feasibility and scope",
        },
      ],
    },
    {
      id: "may",
      label: "May",
      subtitle: "Research & Refinement",
      description:
        "Teams revise project ideas based on NYIM feedback, continue research with deeper community input, and begin to finalize their project idea with a concrete plan for implementation.",
      activities: [
        "Teams revise project ideas based on feedback from NYIM staff review",
        "Continued research: collecting targeted feedback from affected residents",
        "Teams begin to finalize project idea and consider plan for implementation",
        "Resource and asset mapping to identify existing community strengths to leverage",
      ],
      checkpoint: "5-page project drafts submitted — NYIM staff reviews for viability",
      milestones: [
        {
          name: "Community feedback integration documented",
          due: "2026-05-05",
          status: "upcoming",
          target: "Teams demonstrate how resident input shaped revisions to their initial proposals",
        },
        {
          name: "Partnership roles and resources formalized",
          due: "2026-05-12",
          status: "upcoming",
          target: "Responsibilities, resource commitments, and timelines confirmed with local orgs",
        },
        {
          name: "5-page project drafts submitted",
          due: "2026-05-22",
          status: "upcoming",
          target: "Including problem analysis, proposed solution, evidence base, and implementation plan",
        },
        {
          name: "NYIM staff viability review completed",
          due: "2026-05-28",
          status: "upcoming",
          target: "Assessment of technical feasibility, community alignment, and resource requirements",
        },
        {
          name: "Quest engagement targets met",
          due: "2026-05-31",
          status: "upcoming",
          target: "At least 15 quest completions per community contributing data to projects",
        },
      ],
    },
    {
      id: "june-july",
      label: "June – July",
      subtitle: "Finalization & Implementation",
      description:
        "Teams revise projects based on final feedback, finalize proposals with the strongest evidence, and begin overall implementation. Selected projects move to ARC-backed execution with local chapter support.",
      activities: [
        "Teams revise projects based on feedback from viability review",
        "Teams finalize comprehensive proposals with budgets and risk analysis",
        "Start the overall implementation of selected projects with ARC chapter support",
        "Social Capital Index baseline surveys administered in pilot communities",
      ],
      checkpoint: "Final projects submitted — NYIM staff selects projects for further evaluation by local ARC chapter ADs",
      milestones: [
        {
          name: "Final community validation completed",
          due: "2026-06-09",
          status: "upcoming",
          target: "Near-final proposals validated with resident feedback sessions in each community",
        },
        {
          name: "Final projects submitted to NYIM",
          due: "2026-06-20",
          status: "upcoming",
          target: "Complete proposals with budget, timeline, risk analysis, and measurable outcomes",
        },
        {
          name: "NYIM selection and AD evaluation completed",
          due: "2026-06-30",
          status: "upcoming",
          target: "Top proposals forwarded to and evaluated by local ARC chapter Administrative Directors",
        },
        {
          name: "Implementation launched for selected projects",
          due: "2026-07-07",
          status: "upcoming",
          target: "~14 projects begin on-the-ground execution across pilot communities",
        },
        {
          name: "Social Capital Index baseline captured",
          due: "2026-07-14",
          status: "upcoming",
          target: "Pre-implementation surveys completed in all 10 pilot communities",
        },
        {
          name: "NYIM Summit invitations issued",
          due: "2026-07-21",
          status: "upcoming",
          target: "Implementing teams invited to present at the virtual National Youth Involvement Month Summit",
        },
      ],
    },
  ],
  risks: [
    { risk: "Volunteer drop-off after week 1", mitigant: "Issue shorter, well-scoped quests (30 min options)", level: "medium" },
    { risk: "Data lag from partner systems", mitigant: "Twice-weekly reconciliation checkpoint", level: "high" },
    { risk: "Low multilingual outreach coverage", mitigant: "Prioritize bilingual content owners and social media quests", level: "medium" },
    { risk: "Low interest students not engaging", mitigant: "Emphasize ARC-certified service awards and resume value", level: "low" },
  ],
  mobilizationMetrics: {
    volunteersOnboarded: 64,
    claimedQuests: 23,
    completedQuests: 14,
  },
  cohesionMetrics: {
    partnerCheckIns: 7,
    responseTimeHours: 10,
    moduleCompletionRate: 72,
  },
  questsNeeded: [
    "Resident surveys on preparedness gaps",
    "Door-to-door feedback collection",
    "Interviews with vulnerable populations",
    "Community canvassing for plan validation",
    "Focus groups on shelter needs",
  ],
};
