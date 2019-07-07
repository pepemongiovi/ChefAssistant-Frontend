import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecommendedRecipes, getRecipe } from '../../store/actions/recipe'
import { getSimilarIngredients } from '../../store/actions/ingredient'
import IngredientsSelector from './IngredientsSelector/ingredientsSelector'
import RecipeList from './RecipesList/recipesList'

class RecipesRecommendator extends Component{
    
    constructor() {
        super()
        this.state = {
            recipes: [],
            loading: false
        }
    }

    getRecommendedRecipes = async (ingredients, mainIngredient) => {
        let promises = []

        for(let i = 0; i<ingredients.length; i++) {
            promises.push(this.props.getSimilarIngredients(ingredients[i]))
        }
 
        Promise.all(promises).then(res => {
            let ingredients = res.map(r => r.payload.result)
            this.props.getRecommendedRecipes(ingredients, mainIngredient)
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
        })
    }

    render(){
        return (
            <div>
                <IngredientsSelector getRecipes={this.getRecommendedRecipes}/>
                <br></br>
                { this.state.recipes.length > 0 ? (
                    <RecipeList recipes={this.state.recipes}/>
                ) : null}
            </div>
        )
    }
}

const dispatchToProps = (dispatch) => ({
    getRecipe: (recipeId) => dispatch(getRecipe(recipeId)),
    getSimilarIngredients: (ingredient) => dispatch(getSimilarIngredients(ingredient)),
    getRecommendedRecipes: (ingredients, mainIngredient) => dispatch(getRecommendedRecipes(ingredients, mainIngredient))
})

export default connect(null, dispatchToProps)(RecipesRecommendator);