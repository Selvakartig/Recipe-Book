import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./components/RecipeEdit";
import RecipeList from "./components/RecipeList";
import "./css/app.css";

export const RecipeContext = React.createContext();
const LOCAL_STROAGE_KEY = "CookingWithReact.Recipe";

function App() {
	const [recipes, setRecipes] = useState(sampleRecipe);

	const [selectedRecipeId, setSelectedRecipeid] = useState();

	const [searchQuery, setSearchQuery] = useState("");

	const selectedRecipe = recipes.find(
		(recipe) => recipe.id === selectedRecipeId
	);

	useEffect(() => {
		const recipeJSON = localStorage.getItem(LOCAL_STROAGE_KEY);
		if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON));
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STROAGE_KEY, JSON.stringify(recipes));
	}, [recipes]);

	const handleDelete = (id) => {
		if (selectedRecipeId !== null && selectedRecipeId === id) {
			setSelectedRecipeid(undefined);
		}
		const newRecipes = recipes.filter((recipe) => recipe.id !== id);
		setRecipes(newRecipes);
	};

	const handleRecipeEdit = (id) => {
		setSelectedRecipeid(id);
	};

	const handleChange = (id, recipe) => {
		const newRecipe = [...recipes];
		const index = recipes.findIndex((r) => r.id === id);
		newRecipe[index] = recipe;
		setRecipes(newRecipe);
	};

	const handleRecipeAdd = () => {
		const newRecipe = {
			id: uuidv4(),
			name: "",
			cookTime: "",
			servings: 1,
			instructions: "",
			ingredients: [
				{
					id: uuidv4(),
					name: "",
					amount: "",
				},
			],
		};
		setSelectedRecipeid(newRecipe.id);
		setRecipes([...recipes, newRecipe]);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const recipeContextValue = {
		handleDelete,
		handleRecipeAdd,
		handleRecipeEdit,
		handleChange,
		handleSearch,
	};

	const qRecipe = recipes.filter((r) =>
		r.name.toLowerCase().startsWith(searchQuery.toLowerCase())
	);

	const queredRecipe = searchQuery === "" ? recipes : qRecipe;

	return (
		<RecipeContext.Provider value={recipeContextValue}>
			<RecipeList recipes={queredRecipe} searchQuery={searchQuery} />
			{selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
		</RecipeContext.Provider>
	);
}

const sampleRecipe = [
	{
		id: 1,
		name: "Chicken",
		cookTime: "1:45",
		servings: 3,
		instructions:
			"1. Put the salt in Chicken.\n2. Puth Chicken in oven.\n3. Eat Chicken",
		ingredients: [
			{
				id: 1,
				name: "Chicken",
				amount: "2 Pounds",
			},
			{
				id: 2,
				name: "Salt",
				amount: "2 Tbs",
			},
		],
	},
	{
		id: 2,
		name: "Pork",
		cookTime: "0:45",
		servings: 5,
		instructions:
			"1. Put the salt in Pork.\n2. Puth Pork in oven.\n3. Eat Pork",
		ingredients: [
			{
				id: 1,
				name: "Pork",
				amount: "3 Pounds",
			},
			{
				id: 2,
				name: "Salt",
				amount: "2 Tbs",
			},
		],
	},
];

export default App;
