import React, { useContext } from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "../App";

export default function Recipe(props) {
	const { id, name, cookTime, servings, instructions, ingredients } = props;

	const { handleDelete, handleRecipeEdit } = useContext(RecipeContext);

	return (
		<div className="recipe">
			<div className="recipe__heading">
				<h3>{name}</h3>
				<div>
					<button
						className="btn btn-primary mr-1"
						onClick={() => handleRecipeEdit(id)}
					>
						Edit
					</button>
					<button className="btn btn-danger" onClick={() => handleDelete(id)}>
						Delete
					</button>
				</div>
			</div>
			<div className="recipe__content">
				<span className="recipe__label">Cook Time: </span>
				<span className="recipe__value">{cookTime}</span>
			</div>
			<div className="recipe__content">
				<span className="recipe__label">Servings: </span>
				<span className="recipe__value">{servings}</span>
			</div>
			<div className="recipe__content">
				<span className="recipe__label">Instructions: </span>
				<div className="recipe__value recipe__indented recipe__instruction">
					{instructions}
				</div>
			</div>
			<div className="recipe__content">
				<span className="recipe__label">Ingredients: </span>
				<div className="recipe__value recipe__indented">
					<IngredientList ingredients={ingredients} />
				</div>
			</div>
		</div>
	);
}
