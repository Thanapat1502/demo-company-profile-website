"use client";

import { Button, Image } from "@heroui/react";
import { Award, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";

export default function AboutSection() {
  const t = useTranslations();

  const features = [
    t('home.about.features.team'),
    t('home.about.features.quality'),
    t('home.about.features.support'),
    t('home.about.features.coverage'),
  ];

  return (
    <Section background="white" padding="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('home.about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t('home.about.description')}
          </p>
          
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <Button
            color="primary"
            size="lg"
            endContent={<ArrowRight size={20} />}
            as="a"
            href="/pds-group"
          >
            {t('common.learnMore')}
          </Button>
        </div>

        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Construction team"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <Award size={32} className="text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">ISO 9001</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('home.about.certification')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
