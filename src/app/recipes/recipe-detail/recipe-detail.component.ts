import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipesService } from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList(): void{
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onRecipeEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.route}).then(r => console.log(r));
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']).then(r => console.log(r));
  }
}
