import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import RecipeItem from './RecipeItem/recipeItem';

export default function RecipeList({ recipes, getIngredient, favorite }){
    return  (
        recipes.map(recipe => 
            <div key={recipe._id} style={{ marginLeft: '25%' }}>
                <Grid item xs={12} md={12}>
                    <RecipeItem favorite={favorite} recipe={recipe} getIngredient={getIngredient}/>
                </Grid>
                <br></br>
            </div> 
        )
    )
}