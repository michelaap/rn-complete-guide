export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggeFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, mealId: id }
}