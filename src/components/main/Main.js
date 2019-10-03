import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { Card, Button, Loader } from 'semantic-ui-react'
import './Main.css'

class Main extends Component {

  state = {
    currentPage: 1,
    load: false,
    length: 0
  }

  loadMoreCocktails = () => {
    const currentPage = this.state.currentPage + 1;
    const length = this.state.length + 12;
    this.setState({ currentPage, length });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ currentPage: 1, length: 0 })
    };
  }

  renderMainPage = () => {
    return (
      <div className='main-container'>
        <Input
          placeholder='Search in current categories...'
          size='large'
          fluid={true}
          className='inputPlace'
          onChange={this.props.changeQuerry}
        />

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
        {this.props.cocktails.length > 12 && this.state.length <= this.props.cocktails.length &&
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
