import nodemailer from "nodemailer";
import mjml2html from "mjml";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const transporter = () => {
  const config = useRuntimeConfig().mail;

  console.log("Type de SECURE in config", typeof config.secure);

  return nodemailer.createTransport({
    host: config.host,
    port: Number(config.port),
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 5000,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

async function renderTemplate(template: string, variables: Record<string, string> = {}): Promise<{ html: string; text?: string }> {
  function interpolate(source: string): string {
    for (const [key, value] of Object.entries(variables)) {
      source = source.replaceAll(`{{${key}}}`, value);
    }
    return source;
  }

  const mjmlPath = resolve(`server/mail/templates/${template}.mjml`);
  const { html } = await mjml2html(interpolate(readFileSync(mjmlPath, "utf-8")));

  const textPath = resolve(`server/mail/templates/${template}.txt`);
  const text = existsSync(textPath)
    ? interpolate(readFileSync(textPath, "utf-8"))
    : undefined;

  return { html, text };
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  template: string;
  replyTo?: string | string[];
  variables?: Record<string, string>;
}

export async function verifyMailer() {
  return transporter().verify();
}

export async function sendMail({ to, subject, template, variables, replyTo }: SendMailOptions) {
  const { html, text } = await renderTemplate(template, variables);
  const config = useRuntimeConfig().mail;

  let reply = [config.reply.to];
  if (replyTo) reply = Array.isArray(replyTo) ? replyTo : [replyTo];

  return transporter().sendMail({
    from: `"${config.from.name}" <${config.from.address}>`,
    to,
    subject,
    html,
    text,
    replyTo: reply,
  });
}
