import type { Project } from "@/types";

// TODO: replace placeholder descriptions, screenshots, and links with the real
// project details once available — see ASSETS.md for expected image paths.
export const projects: Project[] = [
  {
    id: "procurement-system",
    title: "Procurement Management System",
    description:
      "An enterprise system built to streamline purchase requests, supplier coordination, and approval workflows, reducing manual procurement overhead.",
    image: "/projects/procurement-system.jpg",
    techStack: ["React", "Node.js", "Express.js", "MySQL"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Maintained",
    category: "Enterprise System",
  },
  {
    id: "bidding-system",
    title: "Bidding Management System",
    description:
      "A digital bidding platform that manages supplier bid submissions, evaluation, and award tracking for company procurement processes.",
    image: "/projects/bidding-system.jpg",
    techStack: ["React", "Node.js", "Express.js", "MySQL"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Maintained",
    category: "Enterprise System",
  },
  {
    id: "fleet-ledger-system",
    title: "Fleet Ledger System",
    description:
      "A ledger system for tracking fleet-related transactions, expenses, and records to give management clear operational visibility.",
    image: "/projects/fleet-ledger-system.jpg",
    techStack: ["React", "Node.js", "Express.js", "MySQL"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Maintained",
    category: "Enterprise System",
  },
  {
    id: "truck-management-system",
    title: "Truck Management System",
    description:
      "An internal system for managing truck assignments, maintenance schedules, and logistics operations across the company fleet.",
    image: "/projects/truck-management-system.jpg",
    techStack: ["React", "Node.js", "Express.js", "MySQL"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Maintained",
    category: "Enterprise System",
  },
  {
    id: "company-website",
    title: "Company Website",
    description:
      "The official public-facing website for Producers Connections Logistics Inc., designed to represent the company's services and brand online.",
    image: "/projects/company-website.jpg",
    techStack: ["React", "Tailwind CSS", "Node.js"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Completed",
    category: "Web Application",
  },
  {
    id: "pcl-academy-automation",
    title: "PCL Academy Automation",
    description:
      "Automated employee learning and assessment workflows using Power Automate and Power Apps, including electronic certificate generation.",
    image: "/projects/pcl-academy-automation.jpg",
    techStack: ["Power Automate", "Power Apps"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Completed",
    category: "Process Automation",
  },
];
