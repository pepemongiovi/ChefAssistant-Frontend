import React from 'react'
import { Dialog, DialogTitle, DialogContent, Paper } from '@material-ui/core';
import { getIngredient } from '../../store/actions/ingredient'
import { getRecipe } from '../../store/actions/recipe'
import { connect } from 'react-redux'
import RecipesList from '../RecipesList/recipesList'

class FavoriteRecipesDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      recipes: [],
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  componentWillReceiveProps(props){
    if(props.open){
      this.fetchRecipes()
    }  
  }

  fetchRecipes = () => {
    let promises = []
    console.log("fetchedRecipes")
    this.state.user.favoriteRecipes.forEach( recipeId => 
      promises.push(this.props.getRecipe(recipeId))
    )
    Promise.all(promises).then(res => {
      this.setState({ recipes: res.map(r => r.payload[0])})
    })
  }

  render() {
    const { open, handleClose } = this.props

    return (
      <div>
        <Dialog fullWidth maxWidth="sl" open={open} onClose={handleClose}
          PaperProps={{
            style: {
              backgroundImage: "url(https://media.istockphoto.com/photos/white-natural-wood-wall-texture-and-background-seamless-picture-id518535414?k=6&m=518535414&s=170667a&w=0&h=iW5DmQgRwiJoRQUwXw9QVmhW0rJw_xcvW53841004vg=)"
            }
          }}
        >
          <Paper style={{ padding: 20, backgroundColor: 'rgb(255,255,255,0.6)' }}>
            <DialogTitle style={{ marginTop: -10, textAlign: 'center' }}>
              <b style={{ fontSize: 30 }}>My favorite recipes</b>
            </DialogTitle>
            <DialogContent>
              <RecipesList recipes={this.state.recipes} getIngredient={this.props.getIngredient} />
            </DialogContent>
          </Paper>
          
        </Dialog>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  getIngredient: (id) => dispatch(getIngredient(id)),
  getRecipe: (id) => dispatch(getRecipe(id))
})

export default connect(null, dispatchToProps)(FavoriteRecipesDialog)

