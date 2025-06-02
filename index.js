const {initializeDB} = require("./db/db.connect");
const Recipe = require("./models/recipe.models");
const express = require("express");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

initializeDB();

//Program 2 to create new recipe
async function createRecipe(newRecipe) {
    try {
        const recipe = new Recipe(newRecipe);
        const savedRecipe = await recipe.save();
        return savedRecipe;
    } catch (error) {
        console.log("An error occured while saving");
        throw error;
    }
}

app.post("/recipes",async(req,res) => {
    try {
        const savedRecipe = await createRecipe(req.body);
        res.status(201).json({message : "New Recipe created", newRecipeSaved : savedRecipe});
    } catch (error) {
        res.status(500).json({error : "An error occured while creating data."})
    }
});

//Program 6 function to read all recipe
async function readAllRecipe() {
    try {
        const allRecipes = await Recipe.find();
        return allRecipes; 
    } catch (error) {
        throw error;
    }
}
app.get("/recipes",async(req,res) => {
    try {
        const allRecipe = await readAllRecipe();
        if(allRecipe.length > 0){
            res.status(200).json({message : "Recipes fetched successfully", Recipes : allRecipe});
        }else{
            res.status(404).json({error : "Recipe not found."})
        }
    } catch (error) {
        res.status(400).json({error : "An error occured while fetching the recipe."});
    }
});

//Program 7 Get recipe details by title
async function getRecipeByTitle(recipeTitle) {
    try {
        const recipe = Recipe.findOne({title : recipeTitle});
        return recipe;
    } catch (error) {
        throw error;
    }
}

app.get("/recipes/title/:recipeTitle", async(req,res) => {
    try {
        const fetchedRecipe = await getRecipeByTitle(req.params.recipeTitle);
        if(fetchedRecipe){
            res.status(200).json({message : "Recipe fetched successfully.", recipe : fetchedRecipe})
        }else{
            res.status(404).json({error : "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error : "An error occured while fetching data."})
    }
});

//Program 8 Get recipe details by author
async function getRecipeByAuthor(recipeAuthor) {
    try {
        const recipe = Recipe.findOne({author : recipeAuthor});
        return recipe;
    } catch (error) {
        throw error;
    }
}

app.get("/recipes/author/:recipeAuthor", async(req,res) => {
    try {
        const fetchedRecipe = await getRecipeByAuthor(req.params.recipeAuthor);
        if(fetchedRecipe){
            res.status(200).json({message : "Recipe fetched successfully.", recipe : fetchedRecipe})
        }else{
            res.status(404).json({error : "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error : "An error occured while fetching data."})
    }
});

//Program 9
async function getRecipeByDifficulty(recipeDiff) {
    try {
        const recipes = await Recipe.find({difficulty : recipeDiff});
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.get("/recipes/difficulty/:recipeDiff", async(req,res) => {
    try {
        const fetchedRecipes = await getRecipeByDifficulty(req.params.recipeDiff);
        if(fetchedRecipes.length > 0){
            res.status(200).json({message : "Recipe fetched successfully.", recipe : fetchedRecipes})
        }else{
            res.status(404).json({error : "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error : "An error occured while fetching data."})
    }
});

//Program 10 Update difficulty level with help of id
async function updateDifficultylevelById(id, dataTobeUpdated) {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, dataTobeUpdated,{new : true});
        return updatedRecipe;
    } catch (error) {
        console.log("An error occured while updating.");
        throw error;
    }
}

//express code
app.post("/recipes/difficulty/:recipeId", async (req,res) => {
    try {
        const updatedRecipe = await updateDifficultylevelById(req.params.recipeId, req.body);
        if(updatedRecipe){
            res.status(200).json({ message : "Recipe updated Successfully.", updatedRecipe : updatedRecipe})
        }else{
            res.status(404).json({error : "No recipe found."})
        }
    } catch (error) {
       res.status(500).json({error : "An error occured."})
    }
});

//Program 11 Update preptime and cooktime 
async function updateRecipeByTitle(title, dataTobeUpdated) {
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate({title : title}, dataTobeUpdated,{new : true});
        return updatedRecipe;
    } catch (error) {
        console.log("An error occured while updating.");
        throw error;
    }
}

//express code
app.post("/recipes/title/:title", async (req,res) => {
    try {
        const updatedRecipe = await updateRecipeByTitle(req.params.title, req.body);
        if(updatedRecipe){
            res.status(200).json({ message : "Recipe updated Successfully.", updatedRecipe : updatedRecipe})
        }else{
            res.status(404).json({error : "No recipe found."})
        }
    } catch (error) {
       res.status(500).json({error : "An error occured."})
    }
});

//12 delete by Id
async function deleteRecipeById(recipeId) {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        return deletedRecipe;
    } catch (error) {
        throw error;
    } 
}
//exporess code to delete
app.delete("/recipe/:recipeId",async (req,res) => {
    try {
        const deletedRecipe = await deleteRecipeById(req.params.recipeId);
        if(deletedRecipe){
            res.status(200).json({message : "Recipe deleted Successfully.", deletedRecipe : deletedRecipe})
        }else{
            res.status(404).json({error : "Recipe not found."})
        }   
    } catch (error) {
        res.status(400).json({error : "Error occured while deleting."})
    }
})

//port to start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is ruinning on the port",PORT);
})



