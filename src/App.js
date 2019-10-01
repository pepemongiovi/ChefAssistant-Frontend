import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import store from './store'
import RecipesRecommendator from './components/RecipesRecommendator/recipesRecommendator'
import MenuToolbar from './components/common/toolbar'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './App.css'
import "core-js";
import "regenerator-runtime/runtime";

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
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position='bottom-left'
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              closeOnToastrClick/>
          </div>
      </MuiThemeProvider>
      </Provider>
      
    )
  }
}

export default App;
