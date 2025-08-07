"use client";

import { useTranslations, useLocale } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";

/**
 * Test page to demonstrate the new Supabase-based translation system
 * This page shows how to use translations loaded from the web_labels table
 */
export default function TestTranslationsPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Translation System Test
            </h1>
            
            <div className="space-y-6">
              {/* Current locale info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                  Current Locale: {locale}
                </h2>
                <p className="text-blue-700">
                  Translations are now loaded dynamically from Supabase web_labels table
                </p>
              </div>

              {/* Navigation translations */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Navigation Translations
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Home:</span> {t("navigation.home")}
                  </div>
                  <div>
                    <span className="font-medium">Company:</span> {t("navigation.company")}
                  </div>
                  <div>
                    <span className="font-medium">Services:</span> {t("navigation.services")}
                  </div>
                  <div>
                    <span className="font-medium">References:</span> {t("navigation.references")}
                  </div>
                  <div>
                    <span className="font-medium">News:</span> {t("navigation.news")}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {t("navigation.contact")}
                  </div>
                </div>
              </div>

              {/* Common translations */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Common Translations
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Learn More:</span> {t("common.learnMore")}
                  </div>
                  <div>
                    <span className="font-medium">Read More:</span> {t("common.readMore")}
                  </div>
                  <div>
                    <span className="font-medium">View All:</span> {t("common.viewAll")}
                  </div>
                  <div>
                    <span className="font-medium">Loading:</span> {t("common.loading")}
                  </div>
                </div>
              </div>

              {/* Home page translations */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Home Page Translations
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Hero Title:</span> {t("home.hero.title")}
                  </div>
                  <div>
                    <span className="font-medium">Hero Subtitle:</span> {t("home.hero.subtitle")}
                  </div>
                </div>
              </div>

              {/* Contact page translations */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Page Translations
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Contact Title:</span> {t("contact.hero.title")}
                  </div>
                  <div>
                    <span className="font-medium">Contact Subtitle:</span> {t("contact.hero.subtitle")}
                  </div>
                </div>
              </div>

              {/* Fallback test */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                  Fallback Test
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Non-existent key:</span> {t("test.nonexistent.key")}
                  </div>
                  <p className="text-yellow-700 text-sm">
                    This should show the key itself if no translation is found
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  How to Use the New System
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Run the database schema: <code className="bg-green-100 px-2 py-1 rounded">database/web-labels-schema.sql</code></li>
                  <li>Migrate existing translations: <code className="bg-green-100 px-2 py-1 rounded">node scripts/migrate-translations.js</code></li>
                  <li>Use <code className="bg-green-100 px-2 py-1 rounded">useTranslations()</code> hook in components</li>
                  <li>Manage translations via API: <code className="bg-green-100 px-2 py-1 rounded">/api/translations</code></li>
                </ol>
              </div>

              {/* Language switcher */}
              <div className="flex justify-center space-x-4 pt-6">
                <a
                  href="/en/test-translations"
                  className={`px-4 py-2 rounded-lg ${
                    locale === 'en' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  English
                </a>
                <a
                  href="/th/test-translations"
                  className={`px-4 py-2 rounded-lg ${
                    locale === 'th' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ไทย
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
