import type { ContactFormValues } from "@/types";

export interface SendContactMessageResult {
  ok: boolean;
  message: string;
}

export async function sendContactMessage(
  values: ContactFormValues
): Promise<SendContactMessageResult> {
  try {
    const response = await fetch("/api/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const responseText = await response.text();
    let data: { error?: string; message?: string } | null = null;

    if (responseText) {
      try {
        data = JSON.parse(responseText) as { error?: string; message?: string };
      } catch {
        data = { error: responseText.slice(0, 300) };
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        message:
          data?.error ??
          data?.message ??
          "Something went wrong. Please try again later.",
      };
    }

    return { ok: true, message: data?.message ?? "Message sent successfully." };
  } catch {
    return {
      ok: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
}
