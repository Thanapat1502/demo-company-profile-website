import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

// Mock data for development
const mockWebLabels = [
  { key: "home.title", text: "Welcome to Padung Sin Group" },
  { key: "home.subtitle", text: "Leading Construction Company in Thailand" },
  {
    key: "home.description",
    text: "We provide comprehensive construction services with over 20 years of experience",
  },
  { key: "home.cta_button", text: "Learn More" },
  { key: "home.services_title", text: "Our Services" },

  { key: "about.title", text: "About Us" },
  { key: "about.mission", text: "Our Mission" },
  { key: "about.vision", text: "Our Vision" },
  { key: "about.history", text: "Company History" },
  { key: "about.team", text: "Our Team" },

  { key: "services.title", text: "Services" },
  { key: "services.construction", text: "Construction Services" },
  { key: "services.design", text: "Design & Planning" },
  { key: "services.consultation", text: "Project Consultation" },

  { key: "contact.title", text: "Contact Us" },
  { key: "contact.address", text: "Address" },
  { key: "contact.phone", text: "Phone Number" },
  { key: "contact.email", text: "Email Address" },
  { key: "contact.form_title", text: "Send us a message" },

  {
    key: "footer.copyright",
    text: "© 2024 Padung Sin Group. All rights reserved.",
  },
  { key: "footer.privacy", text: "Privacy Policy" },
  { key: "footer.terms", text: "Terms of Service" },
];

export async function GET() {
  try {
    // For now, return mock data
    // Later you can uncomment this to use real database:
    // const { data, error } = await supabase.from("web_labels").select("*");
    // return NextResponse.json({ data, error });

    return NextResponse.json({
      data: mockWebLabels,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: "Failed to fetch labels",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { key, text } = body;

    if (!key || !text) {
      return NextResponse.json(
        { error: "Missing key or text" },
        { status: 400 }
      );
    }

    // For now, simulate success with mock data
    // Later you can uncomment this to use real database:
    // const { data, error } = await supabase
    //   .from("web_labels")
    //   .update({ text })
    //   .eq("key", key)
    //   .select();
    // return NextResponse.json({ data, error });

    // Find and update the mock data
    const updatedLabel = mockWebLabels.find((label) => label.key === key);
    if (updatedLabel) {
      updatedLabel.text = text;
      return NextResponse.json({
        data: [updatedLabel],
        error: null,
      });
    } else {
      return NextResponse.json({ error: "Label not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update label" },
      { status: 500 }
    );
  }
}
