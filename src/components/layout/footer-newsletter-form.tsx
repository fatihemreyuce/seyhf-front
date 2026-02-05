"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Send,
  User,
  Building2,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { createNotificationsSubscriber } from "@/services/client/notificationbs-subscribers-service";
import type { NotificationsSubscribersRequest } from "@/types/notifications.subscribers.types";

const initialForm: NotificationsSubscribersRequest = {
  email: "",
  name: "",
  surname: "",
  companyName: "",
  title: "",
};

type NewsletterFormVariant = "light" | "dark";

export function FooterNewsletterForm({
  variant = "dark",
}: {
  variant?: NewsletterFormVariant;
}) {
  const [form, setForm] =
    useState<NotificationsSubscribersRequest>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email?.trim()) {
      setMessage("E-posta adresi gerekli.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      await createNotificationsSubscriber({
        email: form.email.trim(),
        name: form.name?.trim() ?? "",
        surname: form.surname?.trim() ?? "",
        companyName: form.companyName?.trim() ?? "",
        title: form.title?.trim() ?? "",
      });
      setStatus("success");
      setMessage("Bültene başarıyla abone oldunuz.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isLight = variant === "light";
  const inputClass = isLight
    ? "h-10 rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-(--brand-red) focus:ring-(--brand-red)/20"
    : "h-10 rounded-lg border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-(--brand-red) focus:ring-(--brand-red)/20";

  const labelMutedClass = isLight ? "text-gray-600" : "text-gray-400";
  const labelAccentClass = isLight ? "text-gray-700" : "text-gray-300";
  const descriptionClass = isLight ? "text-gray-600" : "text-gray-400";

  const successMessageClass = isLight
    ? "bg-emerald-100 text-emerald-800"
    : "bg-emerald-500/20 text-emerald-300";
  const errorMessageClass = isLight
    ? "bg-red-100 text-red-800"
    : "bg-red-500/20 text-red-300";

  return (
    <div className="space-y-4">
      {!isLight && (
        <p className={`text-sm ${descriptionClass}`}>
          Güncel haberler ve kampanyalardan haberdar olun.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="footer-email"
            className={`flex items-center gap-2 ${labelAccentClass}`}
          >
            <Mail className="h-4 w-4 text-(--brand-red)" aria-hidden />
            E-posta <span className="text-(--brand-red)">*</span>
          </Label>
          <Input
            id="footer-email"
            name="email"
            type="email"
            placeholder="ornek@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label
              htmlFor="footer-name"
              className={`flex items-center gap-1.5 ${labelMutedClass}`}
            >
              <User className="h-3.5 w-3.5 text-(--brand-red)" aria-hidden />
              Ad
            </Label>
            <Input
              id="footer-name"
              name="name"
              placeholder="Adınız"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              disabled={status === "loading"}
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="footer-surname"
              className={`flex items-center gap-1.5 ${labelMutedClass}`}
            >
              <User className="h-3.5 w-3.5 text-(--brand-red)" aria-hidden />
              Soyad
            </Label>
            <Input
              id="footer-surname"
              name="surname"
              placeholder="Soyadınız"
              value={form.surname}
              onChange={handleChange}
              className={inputClass}
              disabled={status === "loading"}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="footer-company"
            className={`flex items-center gap-1.5 ${labelMutedClass}`}
          >
            <Building2 className="h-3.5 w-3.5 text-(--brand-red)" aria-hidden />
            Şirket
          </Label>
          <Input
            id="footer-company"
            name="companyName"
            placeholder="Şirket adı (isteğe bağlı)"
            value={form.companyName}
            onChange={handleChange}
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="footer-title"
            className={`flex items-center gap-1.5 ${labelMutedClass}`}
          >
            <Briefcase className="h-3.5 w-3.5 text-(--brand-red)" aria-hidden />
            Ünvan
          </Label>
          <Input
            id="footer-title"
            name="title"
            placeholder="Ünvanınız (isteğe bağlı)"
            value={form.title}
            onChange={handleChange}
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
        {message && (
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              status === "success" ? successMessageClass : errorMessageClass
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            )}
            <span>{message}</span>
          </div>
        )}
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-10 w-full gap-2 rounded-lg"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Bültene abone ol
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
