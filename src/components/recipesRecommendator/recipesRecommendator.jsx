import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecommendedRecipes, getRecipe } from '../../store/actions/recipe'
import { getSimilarIngredients, getIngredient } from '../../store/actions/ingredient'
import { updateUser } from '../../store/actions/user'
import IngredientsSelector from '../ingredientsSelector/ingredientsSelector'
import RecipeList from '../recipesList/recipesList'
import { Paper } from '@material-ui/core'
import { toastr } from 'react-redux-toastr'

class RecipesRecommendator extends Component{
    
    constructor() {
        super()
        this.state = {
            recipes: [],
            fetched: false,
            loading: false
        }
    }

    getRecommendedRecipes = (ingredients, mainIngredient, selectedFilters, setLoading) => {
        let user = JSON.parse(localStorage.getItem('user'))
        let ignoredRecipes = user ? user.ignoredRecipes : []

        this.props.getSimilarIngredients(mainIngredient, ingredients, selectedFilters, ignoredRecipes).then(res => {
            const { ingredientsIds, mainIngredientIds } = res.payload

            this.props.getRecommendedRecipes(mainIngredientIds, ingredientsIds).then(res =>  {
                this.fetchRecipes(res.payload, setLoading)
            }).catch(err => console.log(err))
        })
    }

    fetchRecipes = (recipes, setLoading) => {
        let promises = []

        recipes.forEach(recipe => {
            promises.push(this.props.getRecipe(recipe.recipeId))
        })
 
        Promise.all(promises).then(res => {
            this.setState({ 
                recipes: res.map(r => r.payload),
                fetched: true
            })
            setLoading()
        })
    }

    updateUser = (user) => {
        return this.props.updateUser(user).then(res => {
                    localStorage.setItem('user', JSON.stringify(user))
                    toastr.success("Successfully updated!")
                    this.forceUpdate()
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
                { this.state.fetched ? (
                    <Paper style={{ padding: 20, backgroundColor: 'rgb(255,255,255,0.7)' }}>
                        <p style={{fontSize: 30, marginTop: 2}}>Recommended Recipes</p><br></br>
                        <RecipeList recipes={this.state.recipes} getIngredient={this.props.getIngredient} updateUser={this.updateUser}/>
                    </Paper>
                ) : null }
            </div>
        )
    }
}

const dispatchToProps = (dispatch) => ({
    getIngredient: (id) => dispatch(getIngredient(id)),
    getRecipe: (recipeId) => dispatch(getRecipe(recipeId)),
    getSimilarIngredients: (mainIngredient, ingredients, selectedFilters, ignoredRecipes) => dispatch(getSimilarIngredients(mainIngredient, ingredients, selectedFilters, ignoredRecipes)),
    getRecommendedRecipes: (ingredients, mainIngredient) => dispatch(getRecommendedRecipes(ingredients, mainIngredient)),
    updateUser: (user) => dispatch(updateUser(user))
})

export default connect(null, dispatchToProps)(RecipesRecommendator);