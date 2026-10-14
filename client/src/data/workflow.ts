import type { WorkflowGroup } from "@/types";

export const workflowGroups: WorkflowGroup[] = [
  {
    id: "planning",
    title: "Planning",
    tools: ["Jira", "Notion", "Trello"],
    description:
      "I use planning tools to organize tasks, monitor project progress, document development milestones, and maintain structured workflows.",
  },
  {
    id: "version-control",
    title: "Version Control",
    tools: ["Git", "GitHub"],
    description:
      "Source code management, collaboration, pull requests, version history, and deployment workflow.",
  },
  {
    id: "communication",
    title: "Communication",
    tools: ["Discord", "Google Meet", "Microsoft Teams", "Telegram", "Viber"],
    description:
      "I use communication and collaboration platforms to coordinate with teams, discuss project requirements, conduct virtual meetings, share updates, and ensure effective project communication.",
  },
  {
    id: "ai-assisted-development",
    title: "AI-Assisted Development",
    tools: ["ChatGPT", "Claude", "Claude Code", "Cursor AI", "Gemini"],
    description:
      "I use AI responsibly to speed up development, debugging, documentation, brainstorming, testing, and code optimization while ensuring software quality.",
  },
];
