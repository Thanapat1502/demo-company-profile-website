"use client";

import { Button } from "@heroui/react";
import { Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";

export default function CTASection() {
  const t = useTranslations();

  return (
    <Section background="gradient" padding="xl">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {t('home.cta.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('home.cta.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            color="primary"
            size="lg"
            startContent={<Phone size={20} />}
            as="a"
            href="tel:+6621234567"
          >
            {t('common.callNow')}
          </Button>
          <Button
            variant="bordered"
            size="lg"
            startContent={<Mail size={20} />}
            as="a"
            href="/contact-us"
          >
            {t('common.getQuote')}
          </Button>
        </div>
      </div>
    </Section>
  );
}
