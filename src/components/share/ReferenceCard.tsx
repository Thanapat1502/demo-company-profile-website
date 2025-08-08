"use client";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import { Reference } from "@/store/zustand/referenceStore";
import { getBilingualName, getBilingualContent } from "@/utils/bilingual";

interface Props {
  reference: Reference;
  handleReferenceClick: () => void;
  locale?: string; // Optional prop, will use useLocale if not provided
}

export const ReferenceCard: React.FC<Props> = ({
  reference,
  handleReferenceClick,
  locale: propLocale,
}) => {
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;

  // Helper function to format date with validation
  // const openDate = (() => {
  //   try {
  //     const date = new Date(reference.open_at);
  //     if (isNaN(date.getTime())) {
  //       return locale === "th" ? "ไม่ระบุวันที่" : "Date not specified";
  //     }
  //     return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     });
  //   } catch {
  //     return locale === "th" ? "ไม่ระบุวันที่" : "Date not specified";
  //   }
  // })();

  // Get bilingual content
  const referenceName = getBilingualName(reference, locale);
  const referenceLocation = getBilingualContent(reference, "location", locale);

  return (
    <div
      className={`relative aspect-square overflow-hidden bg-gray-100 shadow-lg transition-all duration-500 cursor-pointer group`}
      onClick={handleReferenceClick}>
      {/* Reference Image */}
      <Image
        src={reference.thumbnail || "/images/placeholder-project.jpg"}
        alt={referenceName}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* Reference content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-6">
        {/* Content container that moves up on hover to make room for learn more link */}
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-0 md:group-hover:-translate-y-12 ">
          <div className="md:space-y-3">
            {/* Reference Title - Moves up on hover */}
            <h3 className="text-white font-bold text-sm md:text-lg lg:text-xl leading-tight tracking-wide">
              {referenceName}
            </h3>

            {/* Reference Location */}
            <p className="text-white/80 text-xs md:text-sm leading-relaxed line-clamp-2">
              {referenceLocation}
            </p>

            {/* Opening Date */}
            {/* <p className="text-white/60 text-xs">{openDate}</p> */}
          </div>
        </div>

        {/* Learn More Link - Slides up on hover */}
        <div className="transform translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 mt-4">
          <div className="flex items-center text-white text-sm font-medium">
            <span className="mr-2">
              {locale === "th" ? "ดูรายละเอียด" : "View Details"}
            </span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceCard;
