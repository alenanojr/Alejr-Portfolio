import { motion } from "framer-motion";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import { GlassCard } from "@/components/common/GlassCard";

const DETAILS = [
  { icon: User, label: "Name", value: personalInfo.fullName },
  { icon: User, label: "Age", value: `${personalInfo.age} Years Old` },
  { icon: Phone, label: "Phone", value: personalInfo.phone },
  { icon: Mail, label: "Email", value: personalInfo.email },
  { icon: MapPin, label: "Location", value: personalInfo.location },
];

export function ProfileCard() {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-sm"
    >
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Personal Information
      </h3>
      <dl className="flex flex-col gap-5">
        {DETAILS.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex items-center gap-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <detail.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-xs text-muted-foreground">{detail.label}</dt>
              <dd className="text-sm font-medium text-foreground">{detail.value}</dd>
            </div>
          </motion.div>
        ))}
      </dl>
    </GlassCard>
  );
}
