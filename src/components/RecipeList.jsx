import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "../App";

export default function RecipeList({ recipes, searchQuery }) {
	const { handleRecipeAdd, handleSearch } = useContext(RecipeContext);

	return (
		<div className="recipeList">
			<input
				className="search-bar"
				placeholder="Search..."
				value={searchQuery}
				onChange={(e) => handleSearch(e.target.value)}
			/>
			{recipes.map((recipe) => (
				<Recipe key={recipe.id} {...recipe} />
			))}
			<div className="recipeList__btn">
				<button className="btn btn-primary" onClick={handleRecipeAdd}>
					Add Recipe
				</button>
			</div>
		</div>
	);
}
