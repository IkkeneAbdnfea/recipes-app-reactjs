import React, { Component } from "react"; //Main React.js library
import ReactDOM from "react-dom"; //we use ReactDOM to render into the DOM
import RecipesList from "./RecipesList.js";
import 'bootstrap/dist/css/bootstrap.css';


const recipes = [
	{id: 1, title: "Hamburger", ingredients: ["ground meat", " bread", "others"],isEdit:false},
	{id: 2, title: "Hot dog", ingredients: ["meat trimmings ", "meat trimmings ", "salt"],isEdit:false},
	{id: 3, title: "Pizza", ingredients: ["bread flour", "olive oil", "bread"],isEdit:false},
	{id: 4, title: "Taco", ingredients: ["ground beef", "cheese", "lettuce"],isEdit:false},
]

if(localStorage.getItem("recipes") === null){
	localStorage.setItem("recipes", JSON.stringify(recipes));
}


class RecipeApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		}

		this.editRecipeSubmit = this.editRecipeSubmit.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.addNewRecipe = this.addNewRecipe.bind(this);
	}

	componentWillMount(){
		let recipes = JSON.parse(localStorage.getItem("recipes"));
		this.setState((prevState, props) => ({
			recipes : recipes
		}));
	}

	addNewRecipe() {
		var recipes =  [...this.state.recipes, {  
			id: Math.max(...this.state.recipes.map(function(o){
			  return o.id
			})) + 1,title: "",ingredients: [], isEdit:true
		  }]
		this.setState((prevState, props) => ({
		  recipes: recipes
		}));	

		localStorage.setItem(
			'recipes',
			JSON.stringify(recipes)
		);
	}

	deleteRecipe(id) {
		let filteredRecipes = this.state.recipes.filter(
			x => x.id !== id
		);
		this.setState((prevState, props) => ({
			recipes: filteredRecipes
		}));
		localStorage.setItem(
			'recipes',
			JSON.stringify(filteredRecipes)
		);
	}

	editRecipeSubmit(id,title, ingredients) {
		let recipesCopy = this.state.recipes.map((recipe) => {
			if (recipe.id === id) {
				recipe.title = title;
				recipe.ingredients = ingredients;
				recipe.isEdit = false
			}
			return recipe;
		});

		this.setState((prevState, props) => ({
			recipes: recipesCopy
		}));

		localStorage.setItem(
			'recipes',
			JSON.stringify(recipesCopy)
		);
	}


	render(){
		return (
			<div className="container" style={{marginTop: 100 + 'px'}} >
			<h1 style={{color: "rgb(10,100,200)"}}>Recipes:</h1> <br/>
				<RecipesList
					addNewRecipe ={this.addNewRecipe}
					deleteRecipe={this.deleteRecipe}
					recipes={this.state.recipes}
					editRecipeSubmit={this.editRecipeSubmit}
				/>
			</div>
		);
	}
};

ReactDOM.render(<RecipeApp />, document.querySelector("#root"));
