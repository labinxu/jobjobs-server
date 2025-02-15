"use client"; // This is a client component
import { useTranslation } from "next-i18next";
import Link from "next/link";
import i18nConfig from "@/next-i18next.config";

export function LocaleSwitcher() {
  const { i18n } = useTranslation();
  //  const currentLocale = i18n.language;
  /* eslint-disable @typescript-eslint/no-unused-vars*/
  function switchLocale(newLocale: string) {
    i18n.changeLanguage(newLocale);
  }

  return (
    <div>
      {i18nConfig.i18n.locales.map((locale: string) => (
        <Link key={locale} href="/" locale={locale}>
          {locale}
        </Link>
      ))}
    </div>
  );
}
