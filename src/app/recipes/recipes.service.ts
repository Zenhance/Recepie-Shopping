import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()

export class RecipesService {
  recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
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

  getRecipe(id: number): Recipe{
    return this.recipes.find(
      (r) => {
        return r.id === id;
      }
    );
  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void{
    this.shoppingListService.addIngredients(ingredients);
  }

}
