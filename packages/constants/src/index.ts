const ApplicationConfig = {
  appName: "DMS Connect",
  appDescription: "",
  appStatus: "Developmemt",
};

export interface INavigationConfig {
  moduleTitle: string;
  moduleDescription?: string;
  protected?: boolean;
  href: string;
  subModules?: INavigationConfig[];
}

const NavigationConfigs: INavigationConfig[] = [
  {
    moduleTitle: "Repository",
    moduleDescription: "Study Materials Repository",
    href: "/repository",
    protected: true,
    subModules: [
      {
        moduleTitle: "Curriculum & Assessments",
        moduleDescription:
          "Repository of Curriculum Details and Assessment Dates",
        href: "/curriculum",
      },
      {
        moduleTitle: "Lecture Notes",
        moduleDescription: "Repository of Lecture Notes",
        href: "/notes",
      },
      {
        moduleTitle: "Study Assistant",
        moduleDescription:
          "AI-powered Study Assistant to help students manage notes, track syllabus progress, clarify doubts through Live Q&A, and connect with peers and alumni for academic success.",
        href: "/assistant",
      },
    ],
  },
  {
    moduleTitle: "Academic Tools",
    href: "/tools",
    protected: true,
    subModules: [
      {
        moduleTitle: "CGPA Tracker",
        href: "/tracker",
      },
      {
        moduleTitle: "GPA Calculator",
        href: "/calculator",
      },
    ],
  },
  {
    moduleTitle: "Networking",
    moduleDescription:
      "Connect with peers, faculty members and alumni. Stay updated with latest job opportunities",
    href: "/networking",
    protected: true,
    subModules: [
      {
        moduleTitle: "Job Opportunities",
        moduleDescription: "Stay updated with latest job opportunities",
        href: "/jobs",
      },
      {
        moduleTitle: "Campus Connect",
        moduleDescription: "Connect with peers, faculty members and alumni.",
        href: "/connect",
      },
    ],
  },
  {
    moduleTitle: "Ask Live",
    protected: true,
    href: "/live",
  },
  {
    moduleTitle: "SMS Council",
    href: "/sms",
    subModules: [
      {
        moduleTitle: "Members",
        moduleDescription: "Get to know about SMS Council Members",
        href: "/members",
      },
      {
        moduleTitle: "DMS Clubs",
        moduleDescription: "Get to know about different clubs under DMS",
        href: "/clubs",
      },
    ],
  },
];

const protectedRoutes = [
  ...NavigationConfigs.filter((nav) => nav.protected).map((nav) => nav.href),
  "/account",
];

const protectedPattern = new RegExp(
  `(${protectedRoutes.map((route) => `\\${route}`).join("|")})(/*)?`
);

export {
  ApplicationConfig,
  NavigationConfigs,
  protectedPattern,
  protectedRoutes,
};
