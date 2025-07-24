// lib/saveImageMeta.ts
import { uploadImage } from "./uploadImage";
import { createRow } from "./generalCRUD";

interface Record {}

export const saveImageMeta = async ({
  file,
  bucket,
  folder,
  table,
  extraData = {},
}: {
  file: File;
  bucket: string;
  folder: string;
  table: string;
  extraData?: Record;
}) => {
  const imageUrl = await uploadImage(file, bucket, folder);
  const dataToSave = {
    image_url: imageUrl,
    ...extraData,
  };
  const result = await createRow(table, dataToSave);
  return result;
};
