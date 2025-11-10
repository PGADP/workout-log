import { supabase } from '@/lib/supabase-browser'

async function getUserId(){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) throw new Error('Not authenticated')
  return user.id
}

export async function listWorkouts(){
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('performed_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addWorkout(input: {title: string; notes?: string; performed_at?: string}){
  const user_id = await getUserId()
  const { data, error } = await supabase
    .from('workouts')
    .insert({ user_id, title: input.title, notes: input.notes, performed_at: input.performed_at })
    .select()
  if (error) throw error
  return data?.[0]
}

export async function updateWorkout(id: string, patch: Partial<{title: string; notes: string; performed_at: string}>){
  const { data, error } = await supabase
    .from('workouts')
    .update(patch)
    .eq('id', id)
    .select()
  if (error) throw error
  return data?.[0]
}

export async function deleteWorkout(id: string){
  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', id)
  if (error) throw error
}