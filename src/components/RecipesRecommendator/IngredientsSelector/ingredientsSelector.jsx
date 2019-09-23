import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search'
import './ingredientsSelector.css';
import { Button, Tooltip, Checkbox, FormControlLabel, CircularProgress }from '@material-ui/core'
import suggestions from '../../../../src/ingredientsSuggestions'
import AsyncCreatableSelect from 'react-select/async-creatable';

const filterIngredients = (inputValue) => {
  if(inputValue.length < 3) return []
  return suggestions.filter(s => 
    s.toLowerCase().includes(inputValue.toLowerCase()))
      .map(s => { return {label: s, value: s} })
}

const loadSuggestions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterIngredients(inputValue));
    }, 0);
});

const filters = ['dairyFree', 'glutenFree','ketogenic', 'lowFodmap',
  'sustainable','vegan', 'vegetarian', 'veryHealthy', 'whole30', 'veryPopular']

class IngredientsSelector extends Component {
  constructor() {
      super()
      this.state = {
        ingredients: [],
        mainIngredient: null,
        loading: false
      }
  }

  handleIngredientsChange = (newValue) => {
    if(!newValue) {
      this.setState({ ingredients: [] });
    }
    else{
      const inputValue = newValue.map(value => value.value)
      this.setState({ ingredients: inputValue });
      return inputValue;
    }
  };

  handleMainIngredientChange = (newValue) => {
    this.setState({ mainIngredient: !newValue ? null : newValue.value });
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
        key={filter}
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

  toggleLoading() {
    this.setState({ loading: !this.state.loading})
  }

  search() {
    this.toggleLoading()
    this.props.getRecipes(
      this.state.ingredients, 
      this.state.mainIngredient,
      this.getSelectedFilters(),
      this.toggleLoading.bind(this)
    )
  }

  render() {
    return (
      <div>
        <AsyncCreatableSelect
          isClearable
          defaultOptions
          onChange={this.handleMainIngredientChange}
          loadOptions={loadSuggestions}
          placeholder="Choose a main ingredient (REQUIRED)"
        /><br></br>

        <AsyncCreatableSelect
          isMulti
          isClearable
          defaultOptions
          onChange={this.handleIngredientsChange}
          loadOptions={loadSuggestions}
          placeholder="Choose some ingredients"
        /><br></br>

        { this.renderFilters() }

        <Tooltip title="Main ingredient required!"><div>
          <Button fullWidth variant="contained" onClick={() => this.search()}
                style={{ marginTop: 15 }} color="primary" placeholder="wow"
                disabled={!this.state.mainIngredient || this.state.loading}>
            { this.state.loading ? 
              <CircularProgress style={{ marginRight: 5 }} size={20}/>
              : <SearchIcon style={{ marginRight: 5 }}/>
            }
            Search for recipes
          </Button>
        </div></Tooltip>
      </div>
    );
  }
}

export default IngredientsSelector;