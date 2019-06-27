import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getRecipes, createRecipe, getRecommendedRecipes } from '../../store/actions/recipe'
import { getIngredients, getSimilarIngredients } from '../../store/actions/ingredient'
import './recipes.css';

class Recipes extends Component {

  static propTypes = {
    getRecipes: PropTypes.func.isRequired,
    getIngredients: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired
  }

  static defaultProps = {
    recipes: []
  }

  constructor() {
      super()
      this.state = {}
  }

  componentWillMount() {
    // for(let i = 0; i<finalRecipes.length; i++) {
    //   this.props.createRecipe(finalRecipes[i])
    // }
    this.getRecommendedRecipes()
  }

  getRecommendedRecipes = async () => {
    let ingredients = ["tomato", "cheese", "onions", "garlic", "olive oil", "salt", "salmon", "lemon"]
    let promises = []

    for(let i = 0; i<ingredients.length; i++) {
      promises.push(this.props.getSimilarIngredients(ingredients[i]))
    }

    Promise.all(promises).then(res => {
      let ids = res.map(r => r.payload.result)
      this.props.getRecommendedRecipes(ids).then(res => console.log(res))
    })
  }

  render() {

    return (
      <div>
        <h2>Recipes</h2>
        {/* <InputSuggestor suggestions={} /> */}
        {/* <ul>
          {this.props.recipes.map(recipe =>
            <li key={recipe.id}>{recipe.name}</li>
          )}
        </ul> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes,
    ingredients: state.ingredients
})

const dispatchToProps = (dispatch) => ({
   getRecipes: () => dispatch(getRecipes()),
   getIngredients: () => dispatch(getIngredients()),
   getSimilarIngredients: (ingredient) => dispatch(getSimilarIngredients(ingredient)),
   createRecipe: (recipe) => dispatch(createRecipe(recipe)),
   getRecommendedRecipes: (ids) => dispatch(getRecommendedRecipes(ids))
})

export default connect(mapStateToProps, dispatchToProps)(Recipes);