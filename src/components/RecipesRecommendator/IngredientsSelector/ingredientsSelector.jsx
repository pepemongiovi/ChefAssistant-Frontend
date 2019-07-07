import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input'
import { TextField } from 'material-ui'
import SearchIcon from '@material-ui/icons/Search'
import './ingredientsSelector.css';
import Button from '@material-ui/core/Button'
import suggestions from '../../../../src/ingredientsSuggestions'
import AsyncSelect from 'react-select/async';

const filterIngredients = (inputValue) => {
  return suggestions.filter(s => 
    s.toLowerCase().includes(inputValue.toLowerCase()))
      .map(s => { return {label: s, value: s} })
}

const loadSuggestions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterIngredients(inputValue));
    }, 1000);
});

class IngredientsSelector extends Component {
  constructor() {
      super()
      this.state = {
        ingredients: [],
        mainIngredient: undefined,
        loading: false
      }
  }

  handleIngredientsChange = (newValue) => {
    if(newValue==null) {
      this.setState({ ingredients: [] });
    }
    else{
      const inputValue = newValue.map(value => value.value)
      this.setState({ ingredients: inputValue });
      return inputValue;
    }
  };

  handleMainIngredientChange = (newValue) => {
    this.setState({ mainIngredient: newValue.value });
  }

  render() {
    return (
      <div>
        <h2>Recipe Recommendator</h2>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          onChange={this.handleIngredientsChange}
          loadOptions={loadSuggestions}
          placeholder="List some ingredients"
        />
        <br></br>
        <AsyncSelect
          cacheOptions
          defaultOptions
          onChange={this.handleMainIngredientChange}
          loadOptions={loadSuggestions}
          placeholder="Main ingredient (OPCIONAL)"
        />
        <br></br>
        {/* <ChipInput
          fullWidth
          dataSource={suggestions}
          placeholder='List some ingredients'
          value={this.state.ingredients}
          onRequestAdd={(chip) => this.setState({ 
              ingredients: this.state.ingredients.concat([chip])
          })}
          onRequestDelete={(chip, index) => this.setState({ 
              ingredients: this.state.ingredients
                            .filter((obj, i) => i!=index)
          })}
        /> */}
        {/* <br></br>
        <TextField fullWidth id="main-ingredient" 
          placeholder="Main ingredient (OPCIONAL)"
          onChange={(event) => 
            this.setState({mainIngredient: event.target.value})
        }/> */}
        <Button fullWidth variant="contained" color="primary"
              onClick={() => this.props.getRecipes(
                this.state.ingredients, 
                this.state.mainIngredient
              )}>
            Search for recipes
            <SearchIcon style={{marginLeft: 5}}/>
        </Button>
      </div>
    );
  }
}

export default IngredientsSelector;