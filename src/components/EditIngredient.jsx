import React from "react";

export default function EditIngredient({
	ingredient,
	ingredientHelperFunction,
	deleteIngredient,
}) {
	const { id, name, amount } = ingredient;

	const HelperFunc = (field, value) => {
		const newIngredient = { ...ingredient };
		newIngredient[field] = value;
		ingredientHelperFunction(id, newIngredient);
	};

	return (
		<>
			<input
				className="recipe-input"
				type="text"
				name="name"
				value={name}
				onChange={(e) => HelperFunc(e.target.name, e.target.value)}
			/>
			<input
				className="recipe-input"
				type="text"
				name="amount"
				value={amount}
				onChange={(e) => HelperFunc(e.target.name, e.target.value)}
			/>
			<button className="btn btn-danger" onClick={() => deleteIngredient(id)}>
				x
			</button>
		</>
	);
}
