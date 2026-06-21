import { supabase } from './supabase'

export async function getExcursions() {
  const { data, error } = await supabase.from('excursions').select('*')

  if (error) {
    console.log(error)
    return []
  }

  return data
}