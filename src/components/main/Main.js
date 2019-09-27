import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { Card, Button, Loader } from 'semantic-ui-react'
import './Main.css'

class Main extends Component {

  state = {
    currentPage: 1,
    load: false,
  }

  loadMoreCocktails = () => {
    const currentPage = this.state.currentPage + 1;
    this.setState({ currentPage })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ currentPage: 1 })
    };
  }

  renderMainPage = () => {
    return (
      <div className='main-container'>
        <Input
          placeholder='Search in current categories...'
          size='large'
          fluid={true}
          list='cocktailsName'
          className='inputPlace'
          onChange={this.props.changeQuerry}
        />
        <datalist id='cocktailsName'>
          {this.props.cocktails
            .filter(item => item.strDrink.toLowerCase().includes(this.props.querry))
            .map((item,index) => (
            <option
              key={index}
              value={item.strDrink}
            />)
          )}
        </datalist>

        <Card.Group className='card-location' itemsPerRow={4}>
          {this.props.cocktails
            .filter((item, index) => index < (12 * this.state.currentPage))
            .filter(item => item.strDrink.includes(this.props.querry))
            .map((item, index) => (
            <Card
              key={index}
              href={`/cocktail/${item.idDrink}`}
              raised
              header={item.strDrink}
              image={item.strDrinkThumb}
            />
            ))
          }
        </Card.Group>
        {this.props.cocktails.length > 12 &&
          <div className='loadMore'>
            <Button
              color='violet'
              onClick={this.loadMoreCocktails}
            > Load more cocktails </Button>
          </div>
        }
      </div>
    )
  }

  renderSpinner = () => {
    return <Loader active/>
  }

  render () {
    console.log(this.props.querry);
    return (
      <div>
        {this.props.loaded ? this.renderMainPage() : this.renderSpinner()}
      </div>
    )
  }
}

export default Main
