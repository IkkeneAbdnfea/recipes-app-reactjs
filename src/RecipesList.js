import React, { Component } from 'react';
import RecipeItem from './RecipeItem.js';
export default class RecipesList extends Component {

	
  render() {
	let recipes = this.props.recipes;
    const item = recipes.map((item,index) => (
      <RecipeItem
        key={index}
        recipe={item}
		index={index}
        editRecipeSubmit={this.props.editRecipeSubmit}      
        deleteRecipe={this.props.deleteRecipe}
      />
    ));
	return <div className="row" >
		{item}

		{/* add new recipe */}
		<div className="col-3">
			<div className="card md-6">
				<div className="card-body shadow-lg" style={{height:200 +'px', textAlign:"center",paddingTop:"65px", backgroundColor:"rgba(10,100,200,0.3)"}}>
					<button style={{textDecoration: "none"}} className="btn btn-link" onClick={this.props.addNewRecipe}><h1>+</h1></button>
				</div>
			</div>
		</div>
	</div>;
  }
}