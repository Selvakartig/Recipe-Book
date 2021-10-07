import React, { useContext } from "react";
import EditIngredient from "./EditIngredient";
import { RecipeContext } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
	const { name, cookTime, servings, instructions, ingredients } = recipe;

	const { handleChange, handleRecipeEdit } = useContext(RecipeContext);

	const helperFunc = (field, value) => {
		const newRecipe = { ...recipe };
		newRecipe[field] = value;
		handleChange(recipe.id, newRecipe);
	};

	const ingredientHelperFunction = (id, ChangedIngredient) => {
		const newIngredient = [...ingredients];
		const index = ingredients.findIndex((i) => i.id === id);
		newIngredient[index] = ChangedIngredient;
		helperFunc("ingredients", newIngredient);
	};

	const deleteIngredient = (id) => {
		const newIngredient = ingredients.filter((i) => i.id !== id);
		helperFunc("ingredients", newIngredient);
	};

	const handleAddIngredient = () => {
		const emptyIngredient = {
			id: uuidv4(),
			name: "",
			amount: "",
		};
		const newIngredient = [...ingredients, emptyIngredient];
		helperFunc("ingredients", newIngredient);
	};

	return (
		<div className="recipe-edit">
			<div className="btn-close">
				<button
					className="btn btn-danger-sm"
					onClick={() => handleRecipeEdit(undefined)}
				>
					x
				</button>
			</div>
			<div className="recipe-details-grid">
				<label className="recipe-label" htmlFor="name">
					Recipe Name
				</label>
				<input
					className="recipe-input"
					type="text"
					id="name"
					name="name"
					value={name}
					onChange={(e) => helperFunc(e.target.name, e.target.value)}
				/>
				<label className="recipe-label" htmlFor="cooktime">
					Cook Time
				</label>
				<input
					className="recipe-input"
					type="text"
					id="cooktime"
					name="cookTime"
					value={cookTime}
					onChange={(e) => helperFunc(e.target.name, e.target.value)}
				/>
				<label className="recipe-label" htmlFor="servings">
					Servings
				</label>
				<input
					className="recipe-input"
					type="number"
					id="servings"
					name="servings"
					value={servings}
					onChange={(e) =>
						helperFunc(e.target.name, parseInt(e.target.value) || "")
					}
				/>
				<label className="recipe-label" htmlFor="instructions">
					Instructions
				</label>
				<textarea
					className="recipe-input"
					id="instructions"
					name="instructions"
					value={instructions}
					onChange={(e) => helperFunc(e.target.name, e.target.value)}
				/>
			</div>
			<br />
			<div>
				<label className="recipe-label" htmlFor="ingredients">
					Ingredients
				</label>
				<div className="recipe-ingredient-grid">
					<div className="recipe-label">Item</div>
					<div className="recipe-label">Amount</div>
					<div></div>
					{ingredients.map((ingredient) => (
						<EditIngredient
							key={ingredient.id}
							ingredient={ingredient}
							ingredientHelperFunction={ingredientHelperFunction}
							deleteIngredient={deleteIngredient}
						/>
					))}
				</div>
			</div>
			<div className="ingredient-add-button">
				<button className="btn btn-primary" onClick={handleAddIngredient}>
					Add Ingredient
				</button>
			</div>
		</div>
	);
}
