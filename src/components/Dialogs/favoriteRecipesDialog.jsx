import React from 'react'
import { Dialog, DialogTitle, DialogContent, Paper } from '@material-ui/core';
import { getIngredient } from '../../store/actions/ingredient'
import { connect } from 'react-redux'
import RecipesList from '../RecipesList/recipesList'

class FavoriteRecipesDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      recipes: [
        {
          cheap: false,
          dairyFree: false,
          glutenFree: true,
          image: "https://spoonacular.com/recipeImages/248115-556x370.jpg"
          ,ingredients: [
          "5d005fbef57139461753a0cf",
          "5d005fbef57139461753a0d0",
          "5d005fbef57139461753a0d1",
          "5d005fbef57139461753a0d2",
          "5d005fbef57139461753a0d3"],
          instructions: "Place a medium skillet over medium-high heat.  Add the SeaPack shrimp in a single layer and saut for 7-8 minutes, turning occasionally, until the shrimp are fully cooked.  Remove the shrimp with a slotted spoon to a cutting board and coarsely chop.Heat a griddle over medium heat.  To half of each of the tortillas, add some of the Monterey Jack cheese, some Parmesan, 1/4 of the shrimp and then a little more Monterey Jack (to act as the glue to keep everything together).  Fold the tortilla over the filling, forming a half circle.Spray the griddle with nonstick cooking spray and place the quesadillas on.  Cook until golden, then flip and cook on the second side until golden and the cheese is melted.  Cut each quesadilla into wedges to serve."
          ,ketogenic: true
          ,lowFodmap: true
          ,sustainable: true
          ,title: "BBQ Chicken with Blue Cheese Slaw Wraps"
          ,vegan: true
          ,vegetarian: true
          ,veryHealthy: false
          ,veryPopular: true
          ,whole30: false,
          _id: "5d005fbef57139461753a0ce"
      }
      ]
    }
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
              <RecipesList favorite recipes={this.state.recipes} getIngredient={this.props.getIngredient} />
            </DialogContent>
          </Paper>
          
        </Dialog>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  getIngredient: (id) => dispatch(getIngredient(id))
})

export default connect(null, dispatchToProps)(FavoriteRecipesDialog)

