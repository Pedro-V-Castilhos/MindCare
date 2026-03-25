import { supabase } from "./supabase"

const BUCKET = "MindCare_Documents"

export async function uploadFile(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw error
  return data
}

export function getPublicUrl(path: string) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function downloadFile(path: string) {
  const { data, error } = await supabase.storage.from(BUCKET).download(path)
  if (error) throw error
  return data
}

export async function deleteFile(path: string) {
  const { data, error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
  return data
}
