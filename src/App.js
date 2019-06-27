import React, { Component } from 'react'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import store from './store'
import Recipes from './components/Recipe/recipes'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React/Redux Express Starter</h1>
          </header>
          <Recipes/>
        </div>
      </Provider>
    )
  }
}

export default App;
