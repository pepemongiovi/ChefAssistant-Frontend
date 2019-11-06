import React from 'react';
import { Grid } from '@material-ui/core';
import RecipeItem from './recipeItem/recipeItem';

export default function RecipeList({ recipes, getIngredient, updateUser }){
    if(recipes.length === 0) {
        return (
            <p style={{ color: 'red', marginTop: -20 }}>
                No recipes found. Please adjust your filters for more results.
            </p>
        )
    }
    return  (
        recipes.map(recipe => 
            <div key={recipe._id} style={{ marginLeft: '25%' }}>
                <Grid item xs={12} md={12}>
                    <RecipeItem recipe={recipe} updateUser={updateUser} 
                                getIngredient={getIngredient}/>
                </Grid>
                <br></br>
            </div> 
        )
    )
}