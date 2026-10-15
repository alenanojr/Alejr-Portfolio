import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import type { ContactFormValues } from "@/types";
import { sendContactMessage } from "@/lib/api";
import { personalInfo } from "@/data/personalInfo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlassCard } from "@/components/common/GlassCard";
import { MagneticButton } from "@/components/common/MagneticButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await sendContactMessage(values);

    if (result.ok) {
      setStatus("success");
      reset();
      toast.success(result.message);
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <section id="contact" className="scroll-mt-12 pt-6 pb-9 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          description={`Have an opportunity or a project in mind? Send a message directly to ${personalInfo.email}.`}
        />

        <GlassCard
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-5 overflow-hidden p-5 sm:mt-8 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">Message sent!</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm">Name</Label>
                    <Input id="name" placeholder="Your name" className="h-10 text-sm sm:h-12 sm:text-sm" {...register("name")} />
                    {errors.name && (
                      <p className="text-[10px] text-destructive sm:text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-10 text-sm sm:h-12 sm:text-sm"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-destructive sm:text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <Label htmlFor="subject" className="text-xs sm:text-sm">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="h-10 text-sm sm:h-12 sm:text-sm"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-[10px] text-destructive sm:text-xs">{errors.subject.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <Label htmlFor="message" className="text-xs sm:text-sm">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about the opportunity or project..."
                    className="min-h-[110px] text-sm sm:min-h-22 sm:text-sm"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-destructive sm:text-xs">{errors.message.message}</p>
                  )}
                </div>

                <MagneticButton className="self-start">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="h-10 px-4 text-sm sm:h-11 sm:px-6 sm:text-base">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
}
