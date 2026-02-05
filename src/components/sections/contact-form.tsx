"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  UserCircle2,
  FileText,
  Phone,
  MessageSquare,
} from "lucide-react";
import { sendContact } from "@/services/client/contact-service";
import type { ContactRequest } from "@/types/contact.types";

function getOrCreateId(key: string): string {
  if (typeof window === "undefined") return "";
  try {
    let value = sessionStorage.getItem(key);
    if (!value) {
      value =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `id-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      sessionStorage.setItem(key, value);
    }
    return value;
  } catch {
    return "";
  }
}

const inputBase =
  "h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/15";
const textareaBase =
  "min-h-[120px] resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/15";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<ContactRequest>({
    name: "",
    surname: "",
    subject: "",
    description: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const visitorId = getOrCreateId("contact_visitor_id");
    const sessionId = getOrCreateId("contact_session_id");
    try {
      await sendContact(visitorId, sessionId, form);
      setStatus("success");
      setMessage("Mesajınız alındı. En kısa sürede size dönüş yapacağız.");
      setForm({
        name: "",
        surname: "",
        subject: "",
        description: "",
        phone: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Gönderim sırasında bir hata oluştu."
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Mesaj gönderin</h2>
        <p className="mt-1 text-sm text-gray-500">
          Formu doldurun, en kısa sürede size dönüş yapalım.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <User className="h-4 w-4 text-brand-red" aria-hidden />
              Ad
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Adınız"
              value={form.name}
              onChange={handleChange}
              required
              className={inputBase}
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="surname"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <UserCircle2 className="h-4 w-4 text-brand-red" aria-hidden />
              Soyad
            </Label>
            <Input
              id="surname"
              name="surname"
              placeholder="Soyadınız"
              value={form.surname}
              onChange={handleChange}
              required
              className={inputBase}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="subject"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <FileText className="h-4 w-4 text-brand-red" aria-hidden />
            Konu
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Konu başlığı"
            value={form.subject}
            onChange={handleChange}
            required
            className={inputBase}
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="phone"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Phone className="h-4 w-4 text-brand-red" aria-hidden />
            Telefon
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+90 (5XX) XXX XX XX"
            value={form.phone}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <MessageSquare className="h-4 w-4 text-brand-red" aria-hidden />
            Mesajınız
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Mesajınızı yazın..."
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className={textareaBase}
          />
        </div>

        {message && (
          <div
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
              status === "success"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
            )}
            <span>{message}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-full gap-2 rounded-xl py-3 text-base font-semibold transition-all duration-200 hover:opacity-95 disabled:opacity-70"
        >
          {status === "loading" ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
              Gönderiliyor...
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-2">
              Gönder
              <Send className="h-5 w-5 shrink-0" aria-hidden />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
