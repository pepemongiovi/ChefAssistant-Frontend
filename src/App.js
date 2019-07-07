import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import RecipesRecommendator from './components/RecipesRecommendator/recipesRecommendator'
import MenuToolbar from './components/common/toolbar'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <MuiThemeProvider >
          <div>
            <MenuToolbar />
            <div className="App">
              <RecipesRecommendator />
            </div>
          </div>
      </MuiThemeProvider>
      </Provider>
      
    )
  }
}

export default App;
