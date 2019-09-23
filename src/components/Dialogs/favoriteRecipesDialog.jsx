import React from 'react'
import { Dialog, DialogTitle, DialogContent, Paper, CircularProgress } from '@material-ui/core';
import { getIngredient } from '../../store/actions/ingredient'
import { getRecipe } from '../../store/actions/recipe'
import { updateUser } from '../../store/actions/user'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import RecipesList from '../RecipesList/recipesList'

class FavoriteRecipesDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      recipes: []
    }
  }

  componentWillReceiveProps(props){
    if(props.open){
      this.fetchRecipes()
    }  
  }

  fetchRecipes = () => {
    let promises = []

    JSON.parse(localStorage.getItem('user')).favoriteRecipes.forEach( recipeId => 
      promises.push(this.props.getRecipe(recipeId))
    )
    Promise.all(promises).then(res => {
      this.setState({ recipes: res.map(r => r.payload[0]), loading: false})
    })
  }

  updateUser = (user) => {
    this.props.updateUser(user).then(res => {
        localStorage.setItem('user', JSON.stringify(user))
        toastr.success("Successfully updated!")
        this.forceUpdate()
    }).catch( error => {
        console.log(error)
        toastr.error(error)
    })
  }

  renderContent = () => {
    if(this.state.loading){
      return <CircularProgress size={40} style={{ marginRight: 5, marginLeft: '50%' }}/>
    }
    else if(this.state.recipes.length === 0) {
      return <p style={{ color: 'red', textAlign: 'center'}}>
                No favorite recipes added.
             </p> 
    }
    else {
      return <RecipesList updateUser={this.updateUser} 
                          recipes={this.state.recipes} 
                          getIngredient={this.props.getIngredient} />
    }
  }

  render() {
    const { open, handleClose } = this.props

    return (
      <div>
        <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}
          PaperProps={{
            style: {
              backgroundImage: "url(https://media.istockphoto.com/photos/white-natural-wood-wall-texture-and-background-seamless-picture-id518535414?k=6&m=518535414&s=170667a&w=0&h=iW5DmQgRwiJoRQUwXw9QVmhW0rJw_xcvW53841004vg=)"
            }
          }}
        >
          <Paper style={{ padding: 20, backgroundColor: 'rgb(255,255,255,0.6)' }}>
            <DialogTitle style={{ marginTop: -10, textAlign: 'center' }}>
              <b style={{ fontSize: 40 }}>My favorite recipes</b>
            </DialogTitle>
            <DialogContent>
              { this.renderContent() }
            </DialogContent>
          </Paper>
          
        </Dialog>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  getIngredient: (id) => dispatch(getIngredient(id)),
  getRecipe: (id) => dispatch(getRecipe(id)),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(null, dispatchToProps)(FavoriteRecipesDialog)

