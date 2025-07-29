"use client";

import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building2,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/ui/HeroSection";
import Section from "@/components/ui/Section";

export default function ContactUsPage() {
  const t = useTranslations();

  const contactMethods = [
    {
      icon: Phone,
      title: t("contact.methods.phone.title"),
      description: t("contact.methods.phone.description"),
      value: "+66 2 123 4567",
      action: "tel:+6621234567",
    },
    {
      icon: Mail,
      title: t("contact.methods.email.title"),
      description: t("contact.methods.email.description"),
      value: "info@padungsilpa.group",
      action: "mailto:info@padungsilpa.group",
    },
    {
      icon: MessageCircle,
      title: t("contact.methods.chat.title"),
      description: t("contact.methods.chat.description"),
      value: t("contact.methods.chat.value"),
      action: "#",
    },
  ];

  const offices = [
    {
      name: t("contact.offices.headquarters.name"),
      address: t("contact.offices.headquarters.address"),
      phone: "+66 2 573 3533",
      email: "bangkok@padungsilpa.group",
      hours: t("contact.offices.headquarters.hours"),
    },
    {
      name: t("contact.offices.regional.name"),
      address: t("contact.offices.regional.address"),
      phone: "+66 32 456 789",
      email: "regional@padungsilpa.group",
      hours: t("contact.offices.regional.hours"),
    },
  ];

  const inquiryTypes = [
    { key: "general", label: t("contact.form.inquiryTypes.general") },
    { key: "quote", label: t("contact.form.inquiryTypes.quote") },
    { key: "support", label: t("contact.form.inquiryTypes.support") },
    { key: "partnership", label: t("contact.form.inquiryTypes.partnership") },
    { key: "career", label: t("contact.form.inquiryTypes.career") },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        description={t("contact.hero.description")}
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        primaryAction={{
          label: t("contact.hero.getQuote"),
          href: "#contact-form",
        }}
        secondaryAction={{
          label: t("contact.hero.callNow"),
          href: "tel:+6621234567",
        }}
        height="lg"
      />

      {/* Contact Methods */}
      <Section background="white" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("contact.methods.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("contact.methods.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {method.description}
                </p>
                <Button
                  color="primary"
                  variant="light"
                  as="a"
                  href={method.action}
                  className="font-semibold">
                  {method.value}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact Form and Map */}
      <Section background="gray" padding="xl" id="contact-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t("contact.form.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("contact.form.description")}
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t("contact.form.firstName")}
                  placeholder={t("contact.form.firstNamePlaceholder")}
                  variant="bordered"
                  isRequired
                />
                <Input
                  label={t("contact.form.lastName")}
                  placeholder={t("contact.form.lastNamePlaceholder")}
                  variant="bordered"
                  isRequired
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t("contact.form.email")}
                  placeholder={t("contact.form.emailPlaceholder")}
                  type="email"
                  variant="bordered"
                  isRequired
                />
                <Input
                  label={t("contact.form.phone")}
                  placeholder={t("contact.form.phonePlaceholder")}
                  type="tel"
                  variant="bordered"
                />
              </div>

              <Input
                label={t("contact.form.company")}
                placeholder={t("contact.form.companyPlaceholder")}
                variant="bordered"
              />

              <Select
                label={t("contact.form.inquiryType")}
                placeholder={t("contact.form.inquiryTypePlaceholder")}
                variant="bordered"
                isRequired>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>

              <Textarea
                label={t("contact.form.message")}
                placeholder={t("contact.form.messagePlaceholder")}
                variant="bordered"
                minRows={4}
                isRequired
              />

              <Button
                color="primary"
                size="lg"
                startContent={<Send size={20} />}
                className="w-full">
                {t("contact.form.submit")}
              </Button>
            </form>
          </div>

          {/* Map and Office Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t("contact.offices.title")}
            </h2>

            {/* Map Placeholder */}
            <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64 mb-8 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {t("contact.map.placeholder")}
                </p>
              </div>
            </div>

            {/* Office Information */}
            <div className="space-y-6">
              {offices.map((office, index) => (
                <Card key={index}>
                  <CardBody className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {office.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin
                          size={20}
                          className="text-blue-600 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          {office.address}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone
                          size={20}
                          className="text-blue-600 flex-shrink-0"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          {office.phone}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail
                          size={20}
                          className="text-blue-600 flex-shrink-0"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          {office.email}
                        </span>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock
                          size={20}
                          className="text-blue-600 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          {office.hours}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="white" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("contact.faq.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("contact.faq.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              question: t("contact.faq.questions.services.question"),
              answer: t("contact.faq.questions.services.answer"),
            },
            {
              icon: Clock,
              question: t("contact.faq.questions.timeline.question"),
              answer: t("contact.faq.questions.timeline.answer"),
            },
            {
              icon: Users,
              question: t("contact.faq.questions.consultation.question"),
              answer: t("contact.faq.questions.consultation.answer"),
            },
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <CardBody>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <faq.icon
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
}
