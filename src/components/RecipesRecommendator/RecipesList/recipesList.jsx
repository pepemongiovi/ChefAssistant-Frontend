import React from 'react';
import Grid from '@material-ui/core/Grid';
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
            <div style={{textAlign: 'center'}}>
                <p style={{fontSize: 30}}>Recommended Recipes</p>
                <br></br>
                { renderRecipeList(props) }
            </div>
    )
}