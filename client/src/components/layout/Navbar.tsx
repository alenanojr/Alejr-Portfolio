import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { personalInfo } from "@/data/personalInfo";

const NAV_ITEMS = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
	{ id: "education", label: "Education" },
	{ id: "experience", label: "Experience" },
	{ id: "skills", label: "Skills" },
	{ id: "workflow", label: "Workflow" },
	{ id: "projects", label: "Projects" },
	{ id: "achievements", label: "Achievements" },
	{ id: "gallery", label: "Gallery" },
	{ id: "contact", label: "Contact" },
];

function scrollToSection(id: string) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

	useEffect(() => {
		function handleScroll() {
			setScrolled(window.scrollY > 24);
		}
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-50 transition-all duration-300",
				scrolled || mobileOpen ? "bg-background/85 shadow-sm backdrop-blur-xl" : "bg-background/85 backdrop-blur-xl"
			)}
		>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
			>
				Skip to content
			</a>

			<nav className="container-px relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between py-3">
				<button
					type="button"
					onClick={() => scrollToSection("home")}
					className="text-sm font-semibold tracking-tight text-foreground"
				>
					{personalInfo.fullName.split(" ").slice(0, 2).join(" ")}
				</button>

				<ul className="hidden items-center gap-1 lg:flex">
					{NAV_ITEMS.map((item) => (
						<li key={item.id} className="relative">
							<button
								type="button"
								onClick={() => scrollToSection(item.id)}
								aria-current={activeId === item.id ? "true" : undefined}
								className={cn(
									"relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
									activeId === item.id
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								{item.label}
								{activeId === item.id && (
									<motion.span
										layoutId="nav-active-pill"
										className="absolute inset-0 -z-10 rounded-full bg-muted"
										transition={{ type: "spring", stiffness: 380, damping: 30 }}
									/>
								)}
							</button>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<button
						type="button"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileOpen}
						className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
					>
						{mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="fixed inset-x-0 top-16 z-40 border-t border-border bg-background/95 shadow-lg backdrop-blur-xl lg:hidden"
					>
						<ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
							{NAV_ITEMS.map((item) => (
								<li key={item.id}>
									<button
										type="button"
										onClick={() => {
											setMobileOpen(false);
											window.setTimeout(() => scrollToSection(item.id), 220);
										}}
										className={cn(
											"w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
											activeId === item.id
												? "bg-muted text-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										)}
									>
										{item.label}
									</button>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
