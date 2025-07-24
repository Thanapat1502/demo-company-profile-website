// lib/uploadImage.ts
import { supabase } from "./supabase";

export const uploadImage = async (
  file: File,
  bucket: string,
  folder: string
): Promise<string> => {
  // Validate type
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    upsert: true,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};
