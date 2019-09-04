import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecommendedRecipes, getRecipe } from '../../store/actions/recipe'
import { getSimilarIngredients, getIngredient } from '../../store/actions/ingredient'
import IngredientsSelector from './IngredientsSelector/ingredientsSelector'
import RecipeList from '../RecipesList/recipesList'
import { Paper } from '@material-ui/core'

class RecipesRecommendator extends Component{
    
    constructor() {
        super()
        this.state = {
            recipes: [],
            loading: false
        }
    }

    getRecommendedRecipes = (ingredients, mainIngredient, selectedFilters, setLoading) => {
        this.props.getSimilarIngredients(mainIngredient, ingredients, selectedFilters).then(res => {
            const { ingredientsIds, mainIngredientIds } = res.payload.result

            this.props.getRecommendedRecipes(mainIngredientIds, ingredientsIds).then(res => 
                this.fetchRecipes(res, setLoading)
            )
        })
    }

    fetchRecipes(recipes, setLoading) {
        recipes = recipes.payload.recipes
        let promises = []

        recipes.forEach(recipe => {
            promises.push(this.props.getRecipe(recipe.recipeId))
        })
 
        Promise.all(promises).then(res => {
            this.setState({ recipes: res.map(r => r.payload[0])})
            setLoading()
        })
    }

    render(){
        return (
            <div>
                <Paper style={{ padding: 20, backgroundColor: 'rgb(255,255,255,0.7)'}}>
                    <p style={{fontSize: 30, marginTop: 2}}>Recipe Recommendator</p>
                    <IngredientsSelector getRecipes={this.getRecommendedRecipes}/>
                </Paper>
                
                <br></br>
                { this.state.recipes.length > 0 ? (
                    <Paper style={{ padding: 20, backgroundColor: 'rgb(255,255,255,0.7)' }}>
                        <p style={{fontSize: 30, marginTop: 2}}>Recommended Recipes</p><br></br>
                        <RecipeList recipes={this.state.recipes} getIngredient={this.props.getIngredient}/>
                    </Paper>
                ) : null }
            </div>
        )
    }
}

const dispatchToProps = (dispatch) => ({
    getIngredient: (id) => dispatch(getIngredient(id)),
    getRecipe: (recipeId) => dispatch(getRecipe(recipeId)),
    getSimilarIngredients: (mainIngredient, ingredients, selectedFilters) => dispatch(getSimilarIngredients(mainIngredient, ingredients, selectedFilters)),
    getRecommendedRecipes: (ingredients, mainIngredient) => dispatch(getRecommendedRecipes(ingredients, mainIngredient))
})

export default connect(null, dispatchToProps)(RecipesRecommendator);