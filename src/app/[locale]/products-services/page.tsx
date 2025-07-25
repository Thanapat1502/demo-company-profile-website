"use client";

import { Button, Card, CardBody, Image } from "@heroui/react";
import {
  Building2,
  Wrench,
  Users,
  Cog,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Fuel,
} from "lucide-react";
import { useTranslations } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/ui/HeroSection";
import Section from "@/components/ui/Section";

export default function ProductsServicesPage() {
  const t = useTranslations();

  const mainServices = [
    {
      icon: Building2,
      title: "ก่อสร้างสถานีบริการน้ำมัน",
      description:
        "บริการก่อสร้างสถานีบริการน้ำมันครบวงจร ตั้งแต่การออกแบบ ก่อสร้าง จนถึงการส่งมอบ",
      features: [
        "ออกแบบและวางผังสถานีบริการน้ำมัน",
        "ก่อสร้างอาคารและโครงสร้าง",
        "ติดตั้งระบบน้ำมันและอุปกรณ์",
        "ตรวจสอบมาตรฐานความปลอดภัย",
      ],
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      icon: Fuel,
      title: "บริการต่าง ๆ เกี่ยวกับถังน้ำมัน",
      description:
        "บริการครบวงจรเกี่ยวกับถังน้ำมันใต้ดิน ตั้งแต่การผลิต ติดตั้ง บำรุงรักษา จนถึงการตรวจสอบ",
      features: [
        "ผลิตถังน้ำมันใต้ดินผนัง 2 ชั้น PERMATANK®",
        "ติดตั้งและทดสอบระบบถังน้ำมัน",
        "บำรุงรักษาและซ่อมแซมถังน้ำมัน",
        "ตรวจสอบการรั่วไหลและความปลอดภัย",
        "ทำความสะอาดและล้างถังน้ำมัน",
        "รื้อถอนถังน้ำมันเก่า",
      ],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      icon: Wrench,
      title: t("services.engineering.title"),
      description: t("services.engineering.description"),
      features: [
        t("services.engineering.features.consulting"),
        t("services.engineering.features.design"),
        t("services.engineering.features.management"),
        t("services.engineering.features.supervision"),
      ],
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      icon: Users,
      title: t("services.maintenance.title"),
      description: t("services.maintenance.description"),
      features: [
        t("services.maintenance.features.inspection"),
        t("services.maintenance.features.preventive"),
        t("services.maintenance.features.emergency"),
        t("services.maintenance.features.upgrade"),
      ],
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    },
  ];

  const additionalServices = [
    {
      icon: Cog,
      title: t("services.additional.equipment.title"),
      description: t("services.additional.equipment.description"),
    },
    {
      icon: Shield,
      title: t("services.additional.safety.title"),
      description: t("services.additional.safety.description"),
    },
    {
      icon: Zap,
      title: t("services.additional.automation.title"),
      description: t("services.additional.automation.description"),
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: t("services.process.consultation.title"),
      description: t("services.process.consultation.description"),
    },
    {
      step: "02",
      title: t("services.process.design.title"),
      description: t("services.process.design.description"),
    },
    {
      step: "03",
      title: t("services.process.construction.title"),
      description: t("services.process.construction.description"),
    },
    {
      step: "04",
      title: t("services.process.delivery.title"),
      description: t("services.process.delivery.description"),
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
        description={t("services.hero.description")}
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        primaryAction={{
          label: t("common.getQuote"),
          href: "/contact-us",
        }}
        secondaryAction={{
          label: t("services.hero.viewProjects"),
          href: "/reference",
        }}
        height="lg"
      />

      {/* Main Services */}
      <Section background="white" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.main.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("services.main.description")}
          </p>
        </div>

        <div className="space-y-16">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}>
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <service.icon
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  color="primary"
                  variant="solid"
                  endContent={<ArrowRight size={20} />}
                  as="a"
                  href="/contact-us">
                  {t("services.learnMore")}
                </Button>
              </div>

              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <Image
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Services */}
      <Section background="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.additional.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("services.additional.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Products */}
      <Section background="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ผลิตภัณฑ์ของเรา
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ผลิตภัณฑ์คุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "ถังน้ำมันใต้ดิน PERMATANK®",
              description:
                "ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล",
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              available: true,
            },
            {
              name: "ท่อน้ำมันใต้ดินผนัง 2 ชั้น",
              description:
                "ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล มีระบบตรวจจับการรั่วไหล",
              image:
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              available: true,
            },
            {
              name: "ระบบวัดน้ำมันอัตโนมัติ (ATG)",
              description:
                "ระบบตรวจวัดระดับน้ำมันและการรั่วไหลแบบอัตโนมัติ เชื่อมต่อระบบคอมพิวเตอร์",
              image:
                "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              available: true,
            },
          ].map((product, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardBody className="p-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.available
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                      {product.available ? "พร้อมจำหน่าย" : "ไม่พร้อมจำหน่าย"}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {product.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process Steps */}
      <Section background="white" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.process.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("services.process.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t("services.cta.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              color="primary"
              size="lg"
              startContent={<Phone size={20} />}
              as="a"
              href="tel:+6621234567">
              {t("common.callNow")}
            </Button>
            <Button
              variant="bordered"
              size="lg"
              startContent={<Mail size={20} />}
              as="a"
              href="/contact-us">
              {t("common.getQuote")}
            </Button>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
