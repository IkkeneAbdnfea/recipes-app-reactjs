import React, { Component, createRef } from 'react';


export default class RecipeItem extends Component {
  constructor(props){
    super(props);
	this.state = { 
		isEdit: false,
		inputs: this.props.recipe.ingredients
	}
	
	this.refTable = [];	
	for(var i=0;i<this.state.inputs.length;i++){
		this.refTable[i] = createRef();
	}

    this.editRecipe = this.editRecipe.bind(this);
    this.editRecipeSubmit = this.editRecipeSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
	let recipes = JSON.parse(localStorage.getItem("recipes"));
	let isEdit = recipes[this.props.index].isEdit;

	this.setState({
		isEdit: isEdit
	});
  }

  deleteRecipe(){
    const {id} = this.props.recipe;
    this.props.deleteRecipe(id);
  }
  editRecipe(){
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }))
  }
  editRecipeSubmit(){
	const {id} = this.props.recipe;
	var ingredients = [];
	for(var i=0;i<this.state.inputs.length;i++){
		if(this.refTable[i].current.value.length !== 0)
			ingredients.push(this.refTable[i].current.value);
	}
	
    this.setState((prevState,props) => ({
	  isEdit : !prevState.isEdit,
	  inputs: ingredients
    }));
	
    this.props.editRecipeSubmit(
      id,
      this.titleInput.value,
      ingredients,
    );
  }

  appendInput() {
	var newInput = '';
	this.refTable[this.refTable.length] = createRef();
	this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  }

  removeInput(index){
	this.state.inputs.splice(index, 1);
	var filteredInputs = this.state.inputs;

	this.setState(()=>({
		inputs: filteredInputs
	}))
  }

  	render() {
		const {title, ingredients} = this.props.recipe;
		const inputMargin = {
			"marginBottom": "5px"
		};

    return (
      this.state.isEdit === true ? (
		<div key={this.props.index} className="col-3">
			<img className="card-img-top" src={"https://source.unsplash.com/1600x900/?recipes/?sig=" + Math.floor(Math.random() * 22)} alt=""/>
			<div className="card-body">
				<label>title: </label>
				<input style={inputMargin} className="form-control form-control-sm" ref={titleInput => this.titleInput = titleInput} defaultValue ={title}/>
				<label>ingredients: </label>
				<div  className="form-group"> 
					{this.state.inputs.map((item , index) =>
						<div className="row"> 
							<div className="col-10"><input  style={inputMargin} className="form-control form-control-sm" 
								ref={this.refTable[index]} defaultValue={item} /></div> 
							<div className="col-1"><button onClick={() => this.removeInput(index)} className="btn btn-link">x</button></div>
						</div>
					)}
				</div>
				<button  onClick={ () => this.appendInput() }  className="btn btn-link"><h3>+</h3></button>
				<div style={{textAlign: "center"}}>
					<button onClick={this.deleteRecipe} className="btn btn-link">delete</button>
					<button onClick={this.editRecipeSubmit} className="btn btn-link">save</button>
				</div>
			</div>
		</div>
      ) : (
		<div key={this.props.index} className="col-3">
			<img className="card-img-top" src={"https://source.unsplash.com/1600x900/?recipes/?sig=" + Math.floor(Math.random() * 22)} alt=""/>
			<div className="card-body shadow-lg" style={{marginBottom: "30px"}}>
				<h5 className="card-title">{title}</h5>
				<p className="card-text">
					{ingredients.map((item , index) => <div key={index}> {item} </div>)}
				</p>
				<div style={{textAlign: "center"}}>
					<button onClick={this.deleteRecipe} className="btn btn-link">delete</button>
					<button onClick={this.editRecipe} className="btn btn-link">edit</button>
				</div>
			</div>
		</div>
	  )
    );
  }
}