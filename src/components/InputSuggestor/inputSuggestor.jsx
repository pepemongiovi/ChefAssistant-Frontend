import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class InputSuggestor extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }

    getSuggestions = value => {
        if(value.length < 3) return []
        else return this.props.suggestions.filter(i =>
            i.includes(value.trim().toLowerCase())
        )
    }
    
    getSuggestionValue = suggestion => suggestion.name;
    
    renderSuggestion = suggestion => (
        <div>
            {suggestion}
        </div>
    );
    
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    
    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Type a ingredient',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            />
        );
    }
}

export default InputSuggestor;