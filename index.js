var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.set("view engine", "ejs");

var database = {
  ingredients: [
    {id: 1, name: "Apple Juice"},
    {id: 2, name: "Orange Juice"},
    {id: 3, name: "Kale"},
    {id: 4, name: "Spinach"},
    {id: 5, name: "Mango"},
  ],
  recipes: [
    {title: "Mighty Kale", image_url: "http://prod-jugojuice.s3.amazonaws.com/products/17/en:/original/Mighty-Kale-flat.jpg", ingredients: [1, 2, 3, 4]},
    {title: "Spinache Magic", image_url: "http://i1.wp.com/yesiamvegan.com/wp-content/uploads/2015/01/DSC_00072.jpg", ingredients: [4, 1, 5]},
  ]
}

app.get("/", (req, res) => {
  res.redirect("/recipes");
});

app.get("/recipes", (req, res) => {
  // prep data to send down to the template
  const recipeBox = database.recipes.map((recipe) => {
    const newIngredients = recipe.ingredients.map((ingredientID) => {
      return getIngredient(ingredientID).name;
    }); // ["Apple Juice", "Orange Juice", ...]
    return {title: recipe.title, image_url: recipe.image_url, ingredients: newIngredients};
  });
  res.render("recipes", {recipeBox: recipeBox});
});

function getIngredient(id) {
  return database.ingredients.find((ingredient) => {
    return ingredient.id === id;
  }); // ex: {id: 1, name: "Apple Juice"}
}


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
