class Meal {
  constructor(id,
    categoryIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingridients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree) {
      this.categoryIds = categoryIds,
      this.title = title,
      this.affordability = affordability,
      this.complexity = complexity,
      this.imageUrl = imageUrl,
      this.duration = duration,
      this.ingridients = ingridients,
      this.steps = steps,
      this.isGlutenFree = isGlutenFree,
      this.isVegan = isVegan,
      this.isVegetarian = isVegetarian,
      this.isLactoseFree = isLactoseFree
    }
}

export default Meal;