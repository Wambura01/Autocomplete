import React from "react";
import PropTypes from "prop-types";

import "./autocomplete.css";

class AutoComplete extends React.Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired, //validating options as array and mandatory
  };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
  };

  onChange = (e) => {
    const { options } = this.props; //get options from props
    const userInput = e.target.value; //gets user input from text field

    //filter options based on userInput substring
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput,
    });
  };

  //it turns the suggestions off and puts the text clicked into the input field
  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOption: [],
      showOptions: false,
      userInput: e.target.innerText,
    });
  };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    //enter/ return key
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showSuggestions: false,
        userInput: filteredOptions[activeOption],
      });
      //up arrow key
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
      //down arrow key
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    let optionList;

    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      }
    } else {
      optionList = (
        <div className="no-options">
          <em>No Option!</em>
        </div>
      );
    }

    return (
      <div className="search">
        <input
          type="text"
          className="search-box"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        <input type="submit" value="" className="search-btn" />
        {optionList}
      </div>
    );
  }
}

export default AutoComplete;
