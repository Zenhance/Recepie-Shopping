import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipesService} from '../recipes/recipes.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient,
              private recipesService: RecipesService) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(
      'https://recipe-shopping-43865-default-rtdb.firebaseio.com/recipes.json',
      recipes
    )
      .subscribe(response => {
        console.log(response);
      });
  }


  fetchRecipes(): void {
    this.http.get<Recipe[]>('https://recipe-shopping-43865-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      )
      .subscribe(recipes => {
        this.recipesService.setRecipes(recipes);
      });
  }
}
