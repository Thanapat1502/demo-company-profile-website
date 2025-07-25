"use client";

import { Button, Card, CardBody, Image, Chip } from "@heroui/react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useTranslations } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/ui/HeroSection";
import Section from "@/components/ui/Section";

export default function ReferencePage() {
  const t = useTranslations();

  const featuredProjects = [
    {
      title: t("references.projects.ptt.title"),
      client: "PTT Public Company Limited",
      location: "Bangkok, Thailand",
      completionDate: "December 2023",
      projectValue: "15,000,000",
      category: t("references.categories.gasStation"),
      description: t("references.projects.ptt.description"),
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        t("references.projects.ptt.features.dispensers"),
        t("references.projects.ptt.features.store"),
        t("references.projects.ptt.features.carwash"),
        t("references.projects.ptt.features.solar"),
      ],
    },
    {
      title: t("references.projects.shell.title"),
      client: "Shell Thailand",
      location: "Pattaya, Chonburi",
      completionDate: "August 2023",
      projectValue: "12,000,000",
      category: t("references.categories.gasStation"),
      description: t("references.projects.shell.description"),
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        t("references.projects.shell.features.eco"),
        t("references.projects.shell.features.modern"),
        t("references.projects.shell.features.rainwater"),
        t("references.projects.shell.features.led"),
      ],
    },
    {
      title: t("references.projects.bangchak.title"),
      client: "Bangchak Corporation",
      location: "Chiangmai, Thailand",
      completionDate: "June 2023",
      projectValue: "8,000,000",
      category: t("references.categories.renovation"),
      description: t("references.projects.bangchak.description"),
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      features: [
        t("references.projects.bangchak.features.upgrade"),
        t("references.projects.bangchak.features.safety"),
        t("references.projects.bangchak.features.efficiency"),
        t("references.projects.bangchak.features.compliance"),
      ],
    },
  ];

  const projectStats = [
    { number: "100+", label: t("references.stats.completed") },
    { number: "50+", label: t("references.stats.clients") },
    { number: "20+", label: t("references.stats.provinces") },
    { number: "99%", label: t("references.stats.satisfaction") },
  ];

  const projectTypes = [
    {
      icon: Building2,
      title: t("references.types.newConstruction.title"),
      description: t("references.types.newConstruction.description"),
      count: "75+",
    },
    {
      icon: Users,
      title: t("references.types.renovation.title"),
      description: t("references.types.renovation.description"),
      count: "25+",
    },
    {
      icon: Award,
      title: t("references.types.consulting.title"),
      description: t("references.types.consulting.description"),
      count: "40+",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title={t("references.hero.title")}
        subtitle={t("references.hero.subtitle")}
        description={t("references.hero.description")}
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        primaryAction={{
          label: t("common.contactUs"),
          href: "/contact-us",
        }}
        secondaryAction={{
          label: t("references.hero.viewServices"),
          href: "/products-services",
        }}
        height="lg"
      />

      {/* Project Stats */}
      <Section background="white" padding="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {projectStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section background="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("references.featured.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("references.featured.description")}
          </p>
        </div>

        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Chip color="primary" variant="solid">
                      {project.category}
                    </Chip>
                  </div>
                </div>

                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {project.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Building2 size={16} className="mr-2" />
                      {project.client}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar size={16} className="mr-2" />
                      {project.completionDate}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <DollarSign size={16} className="mr-2" />฿
                      {parseInt(project.projectValue).toLocaleString()}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {t("references.keyFeatures")}:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    color="primary"
                    variant="light"
                    endContent={<ExternalLink size={16} />}>
                    {t("references.viewDetails")}
                  </Button>
                </CardBody>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Project Types */}
      <Section background="white" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("references.types.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("references.types.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectTypes.map((type, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <type.icon
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {type.count}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {type.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t("references.cta.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("references.cta.description")}
          </p>

          <Button
            color="primary"
            size="lg"
            endContent={<ArrowRight size={20} />}
            as="a"
            href="/contact-us">
            {t("references.cta.startProject")}
          </Button>
        </div>
      </Section>
    </MainLayout>
  );
}
