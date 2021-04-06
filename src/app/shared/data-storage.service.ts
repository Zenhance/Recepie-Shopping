import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipesService} from '../recipes/recipes.service';
import {map, tap} from 'rxjs/operators';
import {Ingredient} from './ingredient.model';
import {Observable} from 'rxjs';

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


  fetchRecipes(): Observable<Recipe []> {
    return this.http.get<Recipe[]>('https://recipe-shopping-43865-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
