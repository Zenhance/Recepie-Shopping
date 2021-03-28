import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];


  constructor(private recipeService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }


  onNewRecipeClicked(): void {
    this.router.navigate(['new'], {relativeTo: this.route}).then(r => console.log(r));
  }
}
