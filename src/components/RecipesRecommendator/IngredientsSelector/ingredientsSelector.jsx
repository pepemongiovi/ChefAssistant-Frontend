import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search'
import './ingredientsSelector.css';
import { Button, Checkbox, FormControlLabel }from '@material-ui/core'
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

const filters = ['dairyFree', 'glutenFree','ketogenic', 'lowFodmap',
  'sustainable','vegan', 'vegetarian', 'veryHealthy', 'whole30']

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

  getSelectedFilters = () => {
    let selectedFilters = []
    
    filters.forEach(filter => {
      if(this.state[filter]){
        selectedFilters.push(filter)
      }
    })
    return selectedFilters
  } 

  formatCategory = (category) => {
    category = category[0].toUpperCase() + category.substring(1,category.length)
    return category.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
  }


  renderFilters = () => {
    return filters.map(filter => 
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state[filter]}
            onChange={() => this.setState({ 
              [filter]: this.state[filter] ? false : true
            })}
            color='primary'
          />
        }
        label={this.formatCategory(filter)}
      />
    )
  }

  render() {
    return (
      <div>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          onChange={this.handleIngredientsChange}
          loadOptions={loadSuggestions}
          placeholder="Choose some ingredients (OPCIONAL)"
        />
        <br></br>
        <AsyncSelect
          cacheOptions
          defaultOptions
          onChange={this.handleMainIngredientChange}
          loadOptions={loadSuggestions}
          placeholder="Choose a main ingredient (REQUIRED)"
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

        {this.renderFilters()}
        
        <Button fullWidth variant="contained" 
              style={{ marginTop:15, backgroundColor: 'blue', color: 'white' }}
              onClick={() => this.props.getRecipes(
                this.state.ingredients, 
                this.state.mainIngredient,
                this.getSelectedFilters()
              )}>
            <SearchIcon style={{marginRight: 5}}/>
            Search for recipes
            
        </Button>
      </div>
    );
  }
}

export default IngredientsSelector;