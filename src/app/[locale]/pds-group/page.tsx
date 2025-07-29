"use client";

import { Button, Card, CardBody, Image } from "@heroui/react";
import { Users, Award, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/ui/HeroSection";
import Section from "@/components/ui/Section";

export default function CompanyProfilePage() {
  const t = useTranslations();

  const values = [
    {
      icon: Target,
      title: t("company.values.excellence.title"),
      description: t("company.values.excellence.description"),
    },
    {
      icon: Users,
      title: t("company.values.teamwork.title"),
      description: t("company.values.teamwork.description"),
    },
    {
      icon: Heart,
      title: t("company.values.integrity.title"),
      description: t("company.values.integrity.description"),
    },
    {
      icon: Award,
      title: t("company.values.innovation.title"),
      description: t("company.values.innovation.description"),
    },
  ];

  const milestones = [
    { year: "2000", event: t("company.milestones.founded") },
    { year: "2005", event: t("company.milestones.expansion") },
    { year: "2010", event: t("company.milestones.certification") },
    { year: "2015", event: t("company.milestones.technology") },
    { year: "2020", event: t("company.milestones.sustainability") },
    { year: "2024", event: t("company.milestones.present") },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title="กลุ่มบริษัท ผดุงศิลป์"
        subtitle="ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน"
        description="ด้วยประสบการณ์กว่า 50 ปี เราให้บริการก่อสร้าง วิศวกรรม และบำรุงรักษาสถานีบริการน้ำมันครบวงจรทั่วประเทศไทย"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        primaryAction={{
          label: "ติดต่อเรา",
          href: "/contact-us",
        }}
        secondaryAction={{
          label: "ผลงานของเรา",
          href: "/reference",
        }}
        height="lg"
      />

      {/* Mission & Vision */}
      <Section background="white" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Target size={32} className="text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("company.mission.title")}
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("company.mission.description")}
            </p>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Eye size={32} className="text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("company.vision.title")}
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("company.vision.description")}
            </p>
          </div>
        </div>
      </Section>

      {/* Company Overview */}
      <Section background="white" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              เกี่ยวกับเรา
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                กลุ่มบริษัท ผดุงศิลป์ ก่อตั้งขึ้นเมื่อปี พ.ศ. 2543
                โดยมีจุดประสงค์เพื่อให้บริการด้านการก่อสร้าง วิศวกรรม
                และบำรุงรักษาสถานีบริการน้ำมันอย่างครบวงจร
              </p>
              <p>
                ด้วยประสบการณ์กว่า 50 ปี
                เราได้พัฒนาความเชี่ยวชาญในการผลิตถังน้ำมันใต้ดินผนัง 2 ชั้น
                PERMATANK® ระบบท่อน้ำมันใต้ดิน และระบบวัดน้ำมันอัตโนมัติ (ATG)
                ที่ได้มาตรฐานสากล
              </p>
              <p>
                เราภาคภูมิใจที่ได้ร่วมงานกับพันธมิตรชั้นนำในอุตสาหกรรมน้ำมันและพลังงาน
                และได้รับความไว้วางใจจากลูกค้าทั่วประเทศไทย
              </p>
            </div>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Padungsilpa Group Office"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </Section>

      {/* Company Values */}
      <Section background="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("company.values.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("company.values.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Company History */}
      <Section background="white" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("company.history.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("company.history.description")}
            </p>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  <div className="flex-1 pt-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80"
              alt="Company building"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t("company.experience")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Certifications & Awards */}
      <Section background="gradient" padding="xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t("company.certifications.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t("company.certifications.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "ISO 9001:2015",
                description: t("company.certifications.iso9001"),
              },
              {
                name: "ISO 14001:2015",
                description: t("company.certifications.iso14001"),
              },
              {
                name: "OHSAS 18001",
                description: t("company.certifications.ohsas"),
              },
            ].map((cert, index) => (
              <Card key={index} className="p-6">
                <CardBody className="text-center">
                  <Award size={48} className="text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {cert.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>

          <Button
            color="primary"
            size="lg"
            endContent={<ArrowRight size={20} />}
            as="a"
            href="/reference">
            {t("company.viewProjects")}
          </Button>
        </div>
      </Section>
    </MainLayout>
  );
}
