import type { ContactFormValues } from "@/types";

export interface SendContactMessageResult {
  ok: boolean;
  message: string;
}

export async function sendContactMessage(
  values: ContactFormValues
): Promise<SendContactMessageResult> {
  try {
    const response = await fetch("https://formsubmit.co/ajax/alenanojr@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        _subject: values.subject,
        _captcha: "false",
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: data?.error ?? data?.message ?? "Something went wrong. Please try again later.",
      };
    }

    return {
      ok: true,
      message: "Message sent successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Could not send the message right now. Please try again later.",
    };
  }
}
