import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecommendedRecipes, getRecipe } from '../../store/actions/recipe'
import { getSimilarIngredients, getIngredient } from '../../store/actions/ingredient'
import IngredientsSelector from './IngredientsSelector/ingredientsSelector'
import RecipeList from './RecipesList/recipesList'

class RecipesRecommendator extends Component{
    
    constructor() {
        super()
        this.state = {
            recipes: [{
                cheap: false,
                dairyFree: false,
                glutenFree: true,
                image: "https://spoonacular.com/recipeImages/248115-556x370.jpg"
                ,ingredients: [
                "5d005fbef57139461753a0cf",
                "5d005fbef57139461753a0d0",
                "5d005fbef57139461753a0d1",
                "5d005fbef57139461753a0d2",
                "5d005fbef57139461753a0d3"],
                instructions: "Place a medium skillet over medium-high heat.  Add the SeaPack shrimp in a single layer and saut for 7-8 minutes, turning occasionally, until the shrimp are fully cooked.  Remove the shrimp with a slotted spoon to a cutting board and coarsely chop.Heat a griddle over medium heat.  To half of each of the tortillas, add some of the Monterey Jack cheese, some Parmesan, 1/4 of the shrimp and then a little more Monterey Jack (to act as the glue to keep everything together).  Fold the tortilla over the filling, forming a half circle.Spray the griddle with nonstick cooking spray and place the quesadillas on.  Cook until golden, then flip and cook on the second side until golden and the cheese is melted.  Cut each quesadilla into wedges to serve."
                ,ketogenic: true
                ,lowFodmap: true
                ,sustainable: true
                ,title: "BBQ Chicken with Blue Cheese Slaw Wraps"
                ,vegan: true
                ,vegetarian: true
                ,veryHealthy: false
                ,veryPopular: true
                ,whole30: false,
                _id: "5d005fbef57139461753a0ce"
            }],
            loading: false
        }
    }

    getRecommendedRecipes = async (ingredients, mainIngredient, selectedFilters) => {
        let promises = []
        
        for(let i = 0; i<ingredients.length; i++) {
            promises.push(this.props.getSimilarIngredients(ingredients[i], selectedFilters))
        }
 
        Promise.all(promises).then(res => {
            console.log(res)
            let ingredients = res.map(r => r.payload.result)
            this.props.getRecommendedRecipes(ingredients, mainIngredient, selectedFilters)
                .then(res => this.fetchRecipes(res.payload.recipes))
        })
    }

    fetchRecipes(recipes) {
        let promises = []

        recipes.forEach(recipe => {
            promises.push(this.props.getRecipe(recipe.recipeId))
        })
 
        Promise.all(promises).then(res => {
            this.setState({ recipes: res.map(r => r.payload[0])})
            console.log(this.state.recipes[0])
        })
    }

    render(){
        return (
            <div>
                <p style={{fontSize: 30}}>Recipe Recommendator</p>
                <IngredientsSelector getRecipes={this.getRecommendedRecipes}/>
                <br></br>
                { this.state.recipes.length > 0 ? (
                    <RecipeList recipes={this.state.recipes} getIngredient={this.props.getIngredient}/>
                ) : null}
            </div>
        )
    }
}

const dispatchToProps = (dispatch) => ({
    getIngredient: (id) => dispatch(getIngredient(id)),
    getRecipe: (recipeId) => dispatch(getRecipe(recipeId)),
    getSimilarIngredients: (ingredient, selectedFilters) => dispatch(getSimilarIngredients(ingredient, selectedFilters)),
    getRecommendedRecipes: (ingredients, mainIngredient, selectedFilters) => 
        dispatch(getRecommendedRecipes(ingredients, mainIngredient, selectedFilters))
})

export default connect(null, dispatchToProps)(RecipesRecommendator);