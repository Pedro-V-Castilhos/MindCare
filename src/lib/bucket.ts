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

export async function getPublicUrl(path: string) {
  const { data } = await supabase.storage.from(BUCKET).getPublicUrl(path)

  if (!data) throw new Error("Failed to get public URL")
  return data
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
