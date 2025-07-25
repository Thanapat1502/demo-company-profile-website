"use client";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Chip,
} from "@heroui/react";
import { ReactNode } from "react";
import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react";

interface ContentCardProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  author?: string;
  category?: string;
  href?: string;
  isExternal?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
  variant?: "default" | "bordered" | "shadow" | "flat";
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
  className?: string;
  imageClassName?: string;
  bodyClassName?: string;
  isHoverable?: boolean;
  isPressable?: boolean;
  onPress?: () => void;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export default function ContentCard({
  title,
  description,
  image,
  imageAlt,
  date,
  author,
  category,
  href,
  isExternal = false,
  children,
  footer,
  variant = "shadow",
  size = "md",
  orientation = "vertical",
  className = "",
  imageClassName = "",
  bodyClassName = "",
  isHoverable = true,
  isPressable = false,
  onPress,
}: ContentCardProps) {
  const cardContent = (
    <Card
      className={`${sizeClasses[size]} ${className} ${
        isHoverable ? "hover:scale-105 transition-transform duration-200" : ""
      } bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
      shadow={variant === "shadow" ? "md" : "none"}
      radius="lg"
      isPressable={isPressable}
      onPress={onPress}>
      {image && (
        <CardHeader className="p-0">
          <Image
            src={image}
            alt={imageAlt || title}
            className={`w-full ${
              orientation === "vertical" ? "h-48" : "h-32"
            } object-cover ${imageClassName}`}
            radius="lg"
          />
        </CardHeader>
      )}

      <CardBody className={`p-6 ${bodyClassName}`}>
        {/* Category & Date */}
        {(category || date) && (
          <div className="flex items-center justify-between mb-3">
            {category && (
              <Chip size="sm" color="primary" variant="flat">
                {category}
              </Chip>
            )}
            {date && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="mr-1" />
                {date}
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Custom Children */}
        {children}

        {/* Author */}
        {author && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            <User size={14} className="mr-1" />
            {author}
          </div>
        )}
      </CardBody>

      {/* Footer */}
      {(footer || href) && (
        <CardFooter className="pt-0 px-6 pb-6">
          {footer}
          {href && (
            <Button
              as="a"
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              variant="light"
              color="primary"
              endContent={
                isExternal ? (
                  <ExternalLink size={16} />
                ) : (
                  <ArrowRight size={16} />
                )
              }
              className="p-0 h-auto min-w-0 font-semibold">
              Read More
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );

  return cardContent;
}
