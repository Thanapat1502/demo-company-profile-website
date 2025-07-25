"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Building2, Wrench, Users, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";

export default function ServicesSection() {
  const t = useTranslations();

  const services = [
    {
      icon: Building2,
      title: t('home.services.gasStation.title'),
      description: t('home.services.gasStation.description'),
    },
    {
      icon: Wrench,
      title: t('home.services.engineering.title'),
      description: t('home.services.engineering.description'),
    },
    {
      icon: Users,
      title: t('home.services.maintenance.title'),
      description: t('home.services.maintenance.description'),
    },
  ];

  return (
    <Section background="gray" padding="xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home.services.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('home.services.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <CardBody className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <service.icon size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.description}
              </p>
              <Button
                variant="light"
                color="primary"
                endContent={<ArrowRight size={16} />}
              >
                {t('common.learnMore')}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
