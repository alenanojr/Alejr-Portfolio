declare const process: {
  env: Record<string, string | undefined>;
};

type ApiRequest = {
  method?: string;
  body?: Record<string, string | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => unknown;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  try {
    const { name, email, subject, message } = req.body ?? {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, error: "Please complete all fields." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "Email service is not configured yet. Add RESEND_API_KEY in Vercel Environment Variables.",
      });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      return res.status(500).json({
        ok: false,
        error: "Email sender is not configured yet. Add RESEND_FROM_EMAIL in Vercel Environment Variables.",
      });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? "alenanojr@gmail.com";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `GoodNews <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `GoodNews Inquiry: ${subject}`,
        html: `
          <div style="font-family: Georgia, 'Times New Roman', Times, serif; font-size: 15px; color: #222; max-width: 600px;">
            <p style="margin:0 0 12px; font-weight:bold;">Good Day,</p>
            <p style="margin:0; line-height:1.4;">
              Ma'am/Sir: <strong>${String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</strong><br>
              &lt;<a href="mailto:${String(email).replace(/</g, "&lt;").replace(/>/g, "&gt;")}" style="color:#222;">${String(email).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</a>&gt;
            </p>
            <p style="margin:0; padding-top:20px; line-height:1.8; text-align:justify;">
              ${String(message).replace(/\n/g, "<br>").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>
          </div>
        `,
        text: `Good Day,\n\nMa'am/Sir: ${name} <${email}>\n\n${message}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        error: data?.message ?? "Could not send the message right now.",
      });
    }

    return res.status(200).json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({
      ok: false,
      error: "Could not send the message right now. Please try again later.",
    });
  }
}
