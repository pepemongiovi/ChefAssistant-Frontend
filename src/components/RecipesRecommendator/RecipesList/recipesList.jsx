import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import RecipeItem from './RecipeItem/recipeItem';

const renderRecipeList = (props) => {
    return props.recipes.map(recipe => 
        <div key={recipe._id} style={{marginLeft: '25%'}}>
            <Grid item xs={12} md={12}>
                <RecipeItem recipe={recipe} getIngredient={props.getIngredient}/>
            </Grid>
            <br></br>
        </div> 
    )
}

export default function RecipeList(props){
    return  (
            <Paper style={{ padding: 20, backgroundColor: 'rgb(255,255,255,0.7)' }}>
                <p style={{fontSize: 30, marginTop: 2}}>Recommended Recipes</p>
                <br></br>
                { renderRecipeList(props) }
            </Paper>
    )
}