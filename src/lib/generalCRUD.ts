// lib/api.ts
import { supabase } from "./supabase";

export const createRow = async (table: string, data: string) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  if (error) throw error;
  return result;
};

export const updateRow = async (table: string, id: string, data: string) => {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id)
    .select();
  if (error) throw error;
  return result;
};

export const deleteRow = async (table: string, id: string) => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
  return { success: true };
};

export const getRows = async (table: string, filters = {}) => {
  const query = supabase.from(table).select("*");
  //   for (const key in filters) {
  //     query = query.eq(key, filters[key]);
  //   }
  console.log(query, filters);
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
