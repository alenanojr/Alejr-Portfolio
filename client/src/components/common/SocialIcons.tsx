import { FaGithub, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  mail: Mail,
  youtube: FaYoutube,
};

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
}

export function SocialIcons({ className, iconClassName }: SocialIconsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials.map((social, index) => {
        const Icon = iconMap[social.icon as keyof typeof iconMap];
        const isContactLink = social.name === "Email";

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target={social.name === "Email" ? undefined : "_blank"}
            rel={social.name === "Email" ? undefined : "noopener noreferrer"}
            onClick={(event) => {
              if (isContactLink) {
                event.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            aria-label={social.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent hover:text-accent",
              iconClassName
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}
