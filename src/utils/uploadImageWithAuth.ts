import { supabase } from "@/lib/supabase-client";

export interface UploadImageResult {
  url: string;
  path: string;
  success: boolean;
  error?: string;
}

export interface UploadImageOptions {
  bucket?: string;
  folder?: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

/**
 * Upload image with authentication to Supabase Storage
 * This is a reusable utility for authenticated image uploads
 */
export async function uploadImageWithAuth(
  file: File,
  path: string,
  options: UploadImageOptions = {}
): Promise<UploadImageResult> {
  const {
    bucket = "images",
    folder = "content",
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  } = options;

  try {
    console.log("🔐 uploadImageWithAuth - Starting authenticated upload:");
    console.log("- File:", { name: file.name, size: file.size, type: file.type });
    console.log("- Path:", path);
    console.log("- Bucket:", bucket);
    console.log("- Folder:", folder);

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      console.error("❌ Invalid file type:", file.type);
      return {
        url: "",
        path: "",
        success: false,
        error: `Invalid file type. Only ${allowedTypes.join(", ")} are allowed.`
      };
    }

    // Validate file size
    if (file.size > maxSize) {
      console.error("❌ File too large:", file.size);
      return {
        url: "",
        path: "",
        success: false,
        error: `File size too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`
      };
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `${path}_${timestamp}_${randomString}.${fileExt}`;
    const fullPath = `${folder}/${fileName}`;

    console.log("- Generated filename:", fileName);
    console.log("- Full path:", fullPath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.error("❌ Supabase upload error:", error);
      return {
        url: "",
        path: "",
        success: false,
        error: `Upload failed: ${error.message}`
      };
    }

    console.log("✅ Upload successful:", data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);

    if (!urlData?.publicUrl) {
      console.error("❌ Failed to get public URL");
      return {
        url: "",
        path: "",
        success: false,
        error: "Failed to get public URL"
      };
    }

    console.log("✅ Public URL generated:", urlData.publicUrl);

    return {
      url: urlData.publicUrl,
      path: fullPath,
      success: true
    };

  } catch (error) {
    console.error("❌ uploadImageWithAuth error:", error);
    return {
      url: "",
      path: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown upload error"
    };
  }
}

/**
 * Upload multiple images with authentication
 */
export async function uploadMultipleImagesWithAuth(
  files: File[],
  basePath: string,
  options: UploadImageOptions = {}
): Promise<UploadImageResult[]> {
  console.log(`🔐 uploadMultipleImagesWithAuth - Uploading ${files.length} files`);
  
  const results: UploadImageResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = `${basePath}_${i + 1}`;
    
    console.log(`📤 Uploading file ${i + 1}/${files.length}: ${file.name}`);
    
    const result = await uploadImageWithAuth(file, path, options);
    results.push(result);
    
    if (!result.success) {
      console.error(`❌ Failed to upload file ${i + 1}: ${result.error}`);
    } else {
      console.log(`✅ Successfully uploaded file ${i + 1}`);
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  console.log(`📊 Upload summary: ${successCount}/${files.length} files uploaded successfully`);
  
  return results;
}

/**
 * Delete image from Supabase Storage with authentication
 */
export async function deleteImageWithAuth(
  path: string,
  bucket: string = "images"
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("🗑️ deleteImageWithAuth - Deleting:", path);

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error("❌ Delete error:", error);
      return {
        success: false,
        error: `Delete failed: ${error.message}`
      };
    }

    console.log("✅ Image deleted successfully");
    return { success: true };

  } catch (error) {
    console.error("❌ deleteImageWithAuth error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown delete error"
    };
  }
}

/**
 * Batch delete multiple images
 */
export async function deleteMultipleImagesWithAuth(
  paths: string[],
  bucket: string = "images"
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`🗑️ deleteMultipleImagesWithAuth - Deleting ${paths.length} images`);

    const { error } = await supabase.storage
      .from(bucket)
      .remove(paths);

    if (error) {
      console.error("❌ Batch delete error:", error);
      return {
        success: false,
        error: `Batch delete failed: ${error.message}`
      };
    }

    console.log("✅ All images deleted successfully");
    return { success: true };

  } catch (error) {
    console.error("❌ deleteMultipleImagesWithAuth error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown delete error"
    };
  }
}
