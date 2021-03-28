import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()

export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Creamy Sausage',
      'Creamy and Buttery Tortellini made with home-made Sausages',
      `https://therecipecritic.com/wp-content/uploads/2019/12/creamy_sausage_tortellini-368x463.jpg`,
      [
        new Ingredient('Sausage', 2),
        new Ingredient('Butter', 1),
        new Ingredient('Cream', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe{
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void{
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

}
