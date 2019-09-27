import React, { Component } from 'react';
import './TabularMenu.css';
import { Tab, Dropdown, Radio } from 'semantic-ui-react';

class TabularMenu extends Component {

  state = {}

  options = () => this.props.ingridients
    .map(item => ({ value: item.strIngredient1, text: item.strIngredient1 }));

  renderIngridient = () => {
    return (
      <Tab.Pane>
        <span className='span-location'> Choose main ingridient </span>
          <Dropdown
            placeholder='Select Ingridients'
            fluid
            search
            scrolling
            selection
            options={this.options()}
            onChange={this.props.changeIngridient}
          />
        <b className='span-location'> or </b>
        <span className='span-location'> Select from popular </span>
        <div className='radio-location'>
          {this.props.ingridients
            .filter((item, index) => index < 12)
            .map(item => (
            <Radio
              className='indent'
              label={item.strIngredient1}
              value={item.strIngredient1}
              checked={this.props.currentIngridient === item.strIngredient1}
              onChange={this.props.changeIngridient}
            />
          ))}
        </div>
      </Tab.Pane>
    )}

    renderCategory = () => (
      <Tab.Pane>
        <span className='span-location'> Choose category </span>
        <div className='radio-location'>
        {this.props.categories.map((item, index) => (
          <Radio
            key={index}
            className='indent'
            label={item.strCategory}
            value={item.strCategory}
            checked={this.props.currentCategory === item.strCategory}
            onChange={this.props.changeCategory}
          />
        ))}
        </div>
      </Tab.Pane>
  )

  panes = [
    { menuItem: 'Category', render: this.renderCategory},
    { menuItem: 'Ingridients', render: this.renderIngridient},
  ]

  render () {
    return (
      <div className='tabMenu'>
        <Tab panes={this.panes} />
      </div>
    )
  }
}


export default TabularMenu
