import { supabase } from "../lib/supabaseClient";

export async function getFavorites() {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function isFavorited(recipeId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("recipe_id", String(recipeId))
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function addFavorite(recipe) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be logged in to save favorites");

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    recipe_id: String(recipe.id),
    recipe_title: recipe.title,
    recipe_image: recipe.image,
  });

  if (error) throw error;
}

export async function removeFavorite(recipeId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("recipe_id", String(recipeId));

  if (error) throw error;
}