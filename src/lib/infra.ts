export type RepoRecord = {
  name: string;
  description: string;
  language: string;
  updated: string;
  href: string;
};

export type VercelProject = {
  name: string;
  id: string;
  note: string;
};

export const githubOrg = {
  login: "Solvex-Paradox-Box",
  href: "https://github.com/Solvex-Paradox-Box",
  publicRepos: 23,
  capturedAt: "2026-09-30T23:51:00-05:00",
} as const;

export const githubRepos: RepoRecord[] = [
  {
    name: "Autonomous-B2B-Solutions-Marketplace-",
    description: "Solvex marketplace",
    language: "TypeScript",
    updated: "2026-09-28",
    href: "https://github.com/Solvex-Paradox-Box/Autonomous-B2B-Solutions-Marketplace-",
  },
  {
    name: "Uarefake.com-storefront",
    description: "Storefront · uarefake.com",
    language: "TypeScript",
    updated: "2026-08-24",
    href: "https://github.com/Solvex-Paradox-Box/Uarefake.com-storefront",
  },
  {
    name: "Storefront",
    description: "UAREFAKE.COM",
    language: "TypeScript",
    updated: "2026-08-19",
    href: "https://github.com/Solvex-Paradox-Box/Storefront",
  },
  {
    name: "Solvex-core",
    description: "Solvex",
    language: "TypeScript",
    updated: "2026-07-20",
    href: "https://github.com/Solvex-Paradox-Box/Solvex-core",
  },
  {
    name: "Solvex-B2B-Autonomy",
    description: "Solvex marketplace",
    language: "TypeScript",
    updated: "2026-07-20",
    href: "https://github.com/Solvex-Paradox-Box/Solvex-B2B-Autonomy",
  },
  {
    name: "Monorepo",
    description: "Solvex",
    language: "TypeScript",
    updated: "2026-07-23",
    href: "https://github.com/Solvex-Paradox-Box/Monorepo",
  },
  {
    name: "Solvex-Paradox-Marketplace-B2B-Solutions",
    description: "Marketplace for B2B Solutions",
    language: "Python",
    updated: "2026-08-10",
    href: "https://github.com/Solvex-Paradox-Box/Solvex-Paradox-Marketplace-B2B-Solutions",
  },
  {
    name: "Solvex-Crystal-Clear-Black-Box",
    description: "Crystal Clear Black Box · Daisy Haminja architectural frame",
    language: "Kotlin",
    updated: "2026-07-02",
    href: "https://github.com/Solvex-Paradox-Box/Solvex-Crystal-Clear-Black-Box",
  },
  {
    name: "Daisy-Himinja-AI-UI-OS-v3",
    description: "Daisy Core",
    language: "Kotlin",
    updated: "2026-07-20",
    href: "https://github.com/Solvex-Paradox-Box/Daisy-Himinja-AI-UI-OS-v3",
  },
  {
    name: "Ai-studio-marketplace-build",
    description: "Solvex update",
    language: "TypeScript",
    updated: "2026-07-30",
    href: "https://github.com/Solvex-Paradox-Box/Ai-studio-marketplace-build",
  },
];

export const vercelAccount = {
  username: "solvex-paradox-box",
  plan: "hobby",
  teamId: "team_uReepq4IFAwtT6YDQyGPnwQB",
} as const;

export const vercelProjects: VercelProject[] = [
  {
    name: "storefront",
    id: "prj_mGMXQqVJLMetVoFYqfZSVKBMAmPY",
    note: "Public storefront deployment",
  },
  {
    name: "ai-tko",
    id: "prj_TCWHx0x0I4ZbWr4zgQfWUzzWWSpu",
    note: "Adjacent experiment. Not a Solvex payment rail.",
  },
];

export const adapters = [
  {
    name: "Neon Postgres",
    node: "DN-34",
    provider: "neon",
    status: "PREVIEW_PGLITE",
    evidence: "PARTIAL" as const,
    note: "Preview uses embedded Postgres. Deployed runtime binds DATABASE_URL.",
  },
  {
    name: "PayPal DN-35",
    node: "DN-35",
    provider: "paypal",
    status: "EXTERNAL_PROVIDER_REQUIRED",
    evidence: "PARTIAL" as const,
    note: "Orders v2 + webhook signature. Success is never simulated.",
  },
  {
    name: "GitHub org",
    node: "DN-54",
    provider: "github",
    status: "SNAPSHOT",
    evidence: "VERIFIED" as const,
    note: "Solvex-Paradox-Box captured at session attach. Live tokens stay server-side.",
  },
  {
    name: "Vercel",
    node: "DN-54",
    provider: "vercel",
    status: "SNAPSHOT",
    evidence: "VERIFIED" as const,
    note: "Hobby account solvex-paradox-box. Two projects observed.",
  },
  {
    name: "Stripe",
    node: "DN-36",
    provider: "stripe",
    status: "PROHIBITED_BLOCKED",
    evidence: "VERIFIED" as const,
    note: "Sovereign core: fiat settlement is PayPal-only.",
  },
];
