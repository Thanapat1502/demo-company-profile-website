import { supabase } from "@/lib/supabase";
import type { FileUpload } from "@/types/database";

export interface UploadOptions {
  bucket?: string;
  folder?: string;
  altTextEn?: string;
  altTextTh?: string;
  captionEn?: string;
  captionTh?: string;
}

export interface UploadResult {
  file: FileUpload;
  publicUrl: string;
}

export const fileUploadService = {
  // Upload file to Supabase Storage
  async uploadFile(
    file: File,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      const {
        bucket = "images",
        folder = "public",
        altTextEn,
        altTextTh,
        captionEn,
        captionTh,
      } = options;

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // Save file metadata to database
      const { data: fileData, error: dbError } = await supabase
        .from("file_uploads")
        .insert({
          filename: fileName,
          original_filename: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          alt_text_en: altTextEn,
          alt_text_th: altTextTh,
          caption_en: captionEn,
          caption_th: captionTh,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      return {
        file: fileData as unknown as FileUpload,
        publicUrl: urlData.publicUrl,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  },

  // Upload multiple files
  async uploadMultipleFiles(
    files: File[],
    options: UploadOptions = {}
  ): Promise<UploadResult[]> {
    try {
      const uploadPromises = files.map((file) =>
        this.uploadFile(file, options)
      );
      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Failed to upload multiple files: ${error}`);
    }
  },

  // Delete file from storage and database
  async deleteFile(fileId: string): Promise<void> {
    try {
      // Get file info from database
      const { data: fileData, error: fetchError } = await supabase
        .from("file_uploads")
        .select("file_path")
        .eq("id", fileId)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([(fileData as any).file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("file_uploads")
        .delete()
        .eq("id", fileId);

      if (dbError) throw dbError;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error}`);
    }
  },

  // Get file by ID
  async getFile(fileId: string): Promise<FileUpload | null> {
    try {
      const { data, error } = await supabase
        .from("file_uploads")
        .select("*")
        .eq("id", fileId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }

      return data as unknown as FileUpload;
    } catch (error) {
      throw new Error(`Failed to fetch file: ${error}`);
    }
  },

  // Get all files with pagination
  async getFiles(
    page: number = 1,
    limit: number = 20,
    mimeType?: string
  ): Promise<{ files: FileUpload[]; total: number }> {
    try {
      const offset = (page - 1) * limit;

      let query = supabase
        .from("file_uploads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (mimeType) {
        query = query.like("mime_type", `${mimeType}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        files: (data || []) as unknown as FileUpload[],
        total: count || 0,
      };
    } catch (error) {
      throw new Error(`Failed to fetch files: ${error}`);
    }
  },

  // Update file metadata
  async updateFileMetadata(
    fileId: string,
    updates: {
      altTextEn?: string;
      altTextTh?: string;
      captionEn?: string;
      captionTh?: string;
    }
  ): Promise<FileUpload> {
    try {
      const { data, error } = await supabase
        .from("file_uploads")
        .update({
          alt_text_en: updates.altTextEn,
          alt_text_th: updates.altTextTh,
          caption_en: updates.captionEn,
          caption_th: updates.captionTh,
        })
        .eq("id", fileId)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as FileUpload;
    } catch (error) {
      throw new Error(`Failed to update file metadata: ${error}`);
    }
  },

  // Get public URL for a file
  getPublicUrl(filePath: string, bucket: string = "images"): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  },

  // Generate signed URL for private files
  async getSignedUrl(
    filePath: string,
    expiresIn: number = 3600,
    bucket: string = "images"
  ): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, expiresIn);

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      throw new Error(`Failed to generate signed URL: ${error}`);
    }
  },

  // Validate file type and size
  validateFile(
    file: File,
    options: {
      maxSize?: number; // in bytes
      allowedTypes?: string[];
    } = {}
  ): { isValid: boolean; error?: string } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = ["image/*"] } = options; // 10MB default

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File size must be less than ${Math.round(
          maxSize / 1024 / 1024
        )}MB`,
      };
    }

    const isTypeAllowed = allowedTypes.some((type) => {
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isTypeAllowed) {
      return {
        isValid: false,
        error: `File type ${file.type} is not allowed`,
      };
    }

    return { isValid: true };
  },
};
