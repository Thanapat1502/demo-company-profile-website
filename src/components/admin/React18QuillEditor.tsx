"use client";

import React, { useState, useEffect, useRef } from "react";
// import { SupabaseStorage } from "@/lib/supabase-storage";
import "quill/dist/quill.snow.css";

interface React18QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

const React18QuillEditor: React.FC<React18QuillEditorProps> = ({
  value,
  onChange,
  placeholder = "เริ่มเขียนเนื้อหา...",
  height = 500,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [quillInstance, setQuillInstance] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && editorRef.current && !quillInstance) {
      // Dynamically import Quill only on client side
      import("quill").then(({ default: Quill }) => {
        // Define image upload handler inside the effect
        const imageUploadHandler = async () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            try {
              // Show loading indicator
              const range = quill.getSelection();
              const index = range ? range.index : quill.getLength();

              // Insert temporary loading text
              quill.insertText(index, "🔄 กำลังอัปโหลดรูปภาพ...", "user");

              // Check upload permission first
              console.log("Checking upload permission...");
              const hasPermission = false;
              await SupabaseStorage.checkUploadPermission();
              if (!hasPermission) {
                // Remove loading text
                quill.deleteText(index, "🔄 กำลังอัปโหลดรูปภาพ...".length);
                throw new Error(
                  "คุณไม่มีสิทธิ์ในการอัปโหลดรูปภาพ กรุณาเข้าสู่ระบบด้วยบัญชี admin"
                );
              }

              console.log("Permission granted, uploading file...");
              // Upload to Supabase Storage
              const result = await SupabaseStorage.uploadImage(
                file,
                "blog-content"
              );

              // Remove loading text
              quill.deleteText(index, "🔄 กำลังอัปโหลดรูปภาพ...".length);

              if (!result.success) {
                let errorMessage = result.error || "เกิดข้อผิดพลาดในการอัปโหลด";

                // Provide more helpful error messages
                if (result.error?.includes("bucket")) {
                  errorMessage =
                    'ไม่พบ Storage Bucket "uploads" กรุณาสร้างใน Supabase Dashboard หรือรันการ migration';
                } else if (
                  result.error?.includes("policy") ||
                  result.error?.includes("permission")
                ) {
                  errorMessage =
                    "ไม่มีสิทธิ์อัปโหลด กรุณาตรวจสอบ RLS Policy ของ Storage หรือสิทธิ์ admin";
                } else if (result.error?.includes("size")) {
                  errorMessage = "ขนาดไฟล์เกิน 5MB กรุณาเลือกไฟล์ที่เล็กกว่า";
                } else if (result.error?.includes("type")) {
                  errorMessage =
                    "ประเภทไฟล์ไม่รองรับ กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, GIF, WebP)";
                }

                console.error("Upload failed:", result.error);
                throw new Error(errorMessage);
              }

              // Insert image into editor
              console.log("Upload successful, inserting image:", result.url);
              quill.insertEmbed(index, "image", result.url);

              // Move cursor after the image
              quill.setSelection(index + 1);

              // Show success message briefly
              console.log("Image uploaded and inserted successfully");
            } catch (error) {
              console.error("Error uploading image:", error);

              // Show detailed error message
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : "Unknown error occurred";
              alert(
                `❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:\n\n${errorMessage}\n\nกรุณาตรวจสอบ:\n1. เข้าสู่ระบบด้วยบัญชี admin\n2. Storage bucket "uploads" ถูกสร้างแล้ว\n3. RLS policies ถูกตั้งค่าแล้ว`
              );
            }
          };
        };

        // Define video handler for YouTube links
        const videoHandler = () => {
          const url = prompt(
            "กรุณาใส่ URL ของวิดีโอ YouTube:\n\n" +
              "รูปแบบที่รองรับ:\n" +
              "• https://www.youtube.com/watch?v=VIDEO_ID\n" +
              "• https://youtu.be/VIDEO_ID\n" +
              "• https://www.youtube.com/embed/VIDEO_ID"
          );

          if (url && url.trim()) {
            const trimmedUrl = url.trim();

            // Validate if it's a YouTube URL
            const isYouTubeUrl =
              /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(
                trimmedUrl
              );

            if (isYouTubeUrl) {
              // Extract YouTube video ID from various URL formats
              const getYouTubeId = (url: string) => {
                const regExp =
                  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return match && match[2].length === 11 ? match[2] : null;
              };

              const videoId = getYouTubeId(trimmedUrl);
              if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                const range = quill.getSelection();
                const index = range ? range.index : quill.getLength();

                // Insert iframe HTML directly into the editor
                const iframeHtml = `<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; width: 100%; margin: 2em 0; min-height: 400px;">
                  <iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>`;

                quill.clipboard.dangerouslyPasteHTML(index, iframeHtml);
                quill.setSelection(index + 1);
              } else {
                alert(
                  "ไม่สามารถดึง Video ID จาก URL ที่ให้มา กรุณาตรวจสอบ URL อีกครั้ง"
                );
              }
            } else {
              alert("กรุณาใส่ URL ของ YouTube ที่ถูกต้อง");
            }
          }
        };

        const quill = new Quill(editorRef.current!, {
          theme: "snow",
          placeholder: placeholder,
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["blockquote", "code-block"],
                ["link", "image", "video"],
                ["clean"],
              ],
              handlers: {
                image: imageUploadHandler,
                video: videoHandler,
              },
            },
            clipboard: {
              matchVisual: false,
            },
          },
          formats: [
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "indent",
            "link",
            "image",
            "video",
            "color",
            "background",
            "align",
            "code-block",
          ],
        });

        // Set initial content
        if (value) {
          quill.root.innerHTML = value;
        }

        // Listen for text changes
        quill.on("text-change", () => {
          const content = quill.root.innerHTML;
          onChange(content);
        });

        setQuillInstance(quill);
      });
    }
  }, [isClient, quillInstance, value, onChange, placeholder]);

  //Update content when value prop changes
  useEffect(() => {
    if (quillInstance && value !== quillInstance.root.innerHTML) {
      const selection = quillInstance.getSelection();
      quillInstance.root.innerHTML = value;
      if (selection) {
        quillInstance.setSelection(selection);
      }
    }
  }, [value, quillInstance]);

  if (!isClient) {
    return (
      <div
        className="border border-gray-600 rounded-lg p-4 min-h-[400px] bg-gray-900"
        style={{ height: `${height}px` }}>
        <div className="text-gray-400">กำลังโหลดเครื่องมือแก้ไข...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Import Quill CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
      />
      <style jsx global>{`
        .ql-editor {
          min-height: ${height - 42}px;
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
          font-size: 16px;
          line-height: 1.6;
          background-color: #1a1a1a !important;
          color: #e5e5e5 !important;
        }
        .ql-toolbar {
          border-top: 1px solid #404040;
          border-left: 1px solid #404040;
          border-right: 1px solid #404040;
          border-radius: 8px 8px 0 0;
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif;
          background-color: #2a2a2a !important;
        }
        .ql-container {
          border-bottom: 1px solid #404040;
          border-left: 1px solid #404040;
          border-right: 1px solid #404040;
          border-radius: 0 0 8px 8px;
          background-color: #1a1a1a !important;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
        }
        .ql-editor .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          max-width: 100%;
          width: 100%;
          margin: 2em 0;
          min-height: 400px; /* Minimum height for better visibility */
        }
        .ql-editor .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          // height: 100%;
          height: 700px;
          border: 0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .ql-editor .ql-video {
          display: block;
          width: 100%;
          min-height: 400px;
        }
        @media (min-width: 768px) {
          .ql-editor .video-wrapper {
            min-height: 450px;
          }
        }
        @media (min-width: 1024px) {
          .ql-editor .video-wrapper {
            min-height: 500px;
          }
        }
        /* Toolbar buttons styling */
        .ql-snow .ql-toolbar button {
          color: #e5e5e5 !important;
        }
        .ql-snow .ql-toolbar button:hover {
          background-color: #404040 !important;
        }
        .ql-snow .ql-toolbar button.ql-active {
          background-color: #3b82f6 !important;
          color: white !important;
        }
        .ql-snow .ql-stroke {
          stroke: #e5e5e5 !important;
        }
        .ql-snow .ql-fill {
          fill: #e5e5e5 !important;
        }
        .ql-snow .ql-toolbar button.ql-video {
          width: 28px;
          height: 28px;
        }
        .ql-snow .ql-toolbar button.ql-video:before {
          content: "📹";
          font-size: 16px;
          line-height: 1;
        }
        .ql-editor.ql-blank::before {
          content: attr(data-placeholder);
          color: #666 !important;
          font-style: italic;
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
        .ql-snow .ql-tooltip {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
          background-color: #2a2a2a !important;
          border: 1px solid #404040 !important;
          color: #e5e5e5 !important;
        }
        .ql-snow .ql-tooltip input {
          background-color: #1a1a1a !important;
          color: #e5e5e5 !important;
          border: 1px solid #404040 !important;
        }
        .ql-snow .ql-picker-label {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
          color: #e5e5e5 !important;
        }
        .ql-snow .ql-picker-options {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
          background-color: #2a2a2a !important;
          border: 1px solid #404040 !important;
        }
        .ql-snow .ql-picker-item {
          color: #e5e5e5 !important;
        }
        .ql-snow .ql-picker-item:hover {
          background-color: #404040 !important;
        }
        /* Dropdown styling */
        .ql-snow .ql-picker.ql-expanded .ql-picker-label {
          border-color: #3b82f6 !important;
        }
        .ql-snow .ql-picker.ql-expanded .ql-picker-options {
          border-color: #404040 !important;
        }
        /* Color picker styling */
        .ql-snow .ql-color-picker .ql-picker-options {
          background-color: #2a2a2a !important;
        }
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3,
        .ql-editor h4,
        .ql-editor h5,
        .ql-editor h6 {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
          color: #f5f5f5 !important;
        }
        .ql-editor p,
        .ql-editor div,
        .ql-editor span {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
        .ql-editor ul,
        .ql-editor ol,
        .ql-editor li {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
        .ql-editor strong,
        .ql-editor em,
        .ql-editor u {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
        .ql-editor blockquote {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
        .ql-editor a {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
        /* Override any other font declarations */
        .ql-editor * {
          font-family: "Noto Sans Thai", Helvetica, Arial, sans-serif !important;
        }
      `}</style>

      <div
        ref={editorRef}
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          fontFamily: "Noto Sans Thai, sans-serif",
        }}
      />
    </div>
  );
};

export default React18QuillEditor;
