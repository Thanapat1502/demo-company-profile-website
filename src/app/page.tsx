"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Switch,
  Chip,
  Avatar,
  Divider,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Next.js + HeroUI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            A modern web application with TypeScript, Tailwind CSS 3.4.5, and
            full SEO support
          </p>
          <div className="flex items-center justify-center gap-4">
            <Chip color="primary" variant="flat">
              Next.js 15
            </Chip>
            <Chip color="secondary" variant="flat">
              TypeScript
            </Chip>
            <Chip color="success" variant="flat">
              Tailwind CSS 3.4.5
            </Chip>
            <Chip color="warning" variant="flat">
              HeroUI
            </Chip>
          </div>
        </div>

        {/* Theme Toggle */}
        <Card className="mb-8">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar src="https://i.pravatar.cc/150?u=theme" size="sm" />
                <div>
                  <p className="font-semibold">Theme Settings</p>
                  <p className="text-small text-gray-500">
                    Toggle between light and dark mode
                  </p>
                </div>
              </div>
              <Switch
                isSelected={theme === "dark"}
                onValueChange={(isSelected) =>
                  setTheme(isSelected ? "dark" : "light")
                }
                size="lg"
                color="primary"
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (
                    <span className={className}>🌙</span>
                  ) : (
                    <span className={className}>☀️</span>
                  )
                }>
                Dark Mode
              </Switch>
            </div>
          </CardBody>
        </Card>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Buttons</h3>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-3">
              <Button color="primary" variant="solid">
                Primary Button
              </Button>
              <Button color="secondary" variant="bordered">
                Secondary Button
              </Button>
              <Button color="success" variant="light">
                Success Button
              </Button>
              <Button color="danger" variant="flat">
                Danger Button
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Form Elements</h3>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-3">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                variant="bordered"
              />
              <Button color="primary" className="w-full">
                Sign In
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Features</h3>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-3">
              <div className="flex items-center gap-2">
                <Chip size="sm" color="success" variant="dot">
                  SEO Optimized
                </Chip>
              </div>
              <div className="flex items-center gap-2">
                <Chip size="sm" color="primary" variant="dot">
                  TypeScript
                </Chip>
              </div>
              <div className="flex items-center gap-2">
                <Chip size="sm" color="secondary" variant="dot">
                  Responsive
                </Chip>
              </div>
              <div className="flex items-center gap-2">
                <Chip size="sm" color="warning" variant="dot">
                  Dark Mode
                </Chip>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Footer */}
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and
                HeroUI
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  as="a"
                  href="https://nextjs.org"
                  target="_blank"
                  variant="light"
                  size="sm">
                  Next.js Docs
                </Button>
                <Button
                  as="a"
                  href="https://heroui.com"
                  target="_blank"
                  variant="light"
                  size="sm">
                  HeroUI Docs
                </Button>
                <Button
                  as="a"
                  href="https://tailwindcss.com"
                  target="_blank"
                  variant="light"
                  size="sm">
                  Tailwind CSS
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
