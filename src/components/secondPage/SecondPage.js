import React, { Component } from 'react'
import { Header, Table, Item, Button } from 'semantic-ui-react'
import './SecondPage.css'
import { Link } from "react-router-dom";
import axios from 'axios'

const baseUrl = 'https://the-cocktail-db.p.rapidapi.com'

const headers = {
  "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
  "x-rapidapi-key": "b886fb5fbbmsh8eaa5b6b513275bp1f9f6ajsncf5d2f0b18c6"
}

class SecondPage extends Component {

  state = {
    cocktailDetails: {},
    randCocktail: [],
    ingridients: [],
    items: []
  }

  getRandomCocktail = async () => {
    const getRandomCocktailUrl = `${baseUrl}/random.php`;
    const cocktailDetails = await axios.get(getRandomCocktailUrl, { headers: headers });
    this.setState({ cocktailDetails: cocktailDetails.data.drinks[0], items: [{
        childKey: cocktailDetails.data.drinks[0].idDrink,
        image: cocktailDetails.data.drinks[0].strDrinkThumb,
        header: cocktailDetails.data.drinks[0].strDrink,
        description: cocktailDetails.data.drinks[0].strInstructions,
        meta: `Category: ${cocktailDetails.data.drinks[0].strCategory}`,
    }] })
    this.mapIngridients()
  }

  getDetailsById = async () => {
    const getCocktailDetailsUrl = `${baseUrl}/lookup.php?i=${this.props.match.params.id}`;
    const cocktailDetails  = await axios.get(getCocktailDetailsUrl, { headers: headers });
    this.setState({ cocktailDetails: cocktailDetails.data.drinks[0], items: [{
        childKey: cocktailDetails.data.drinks[0].idDrink,
        image: cocktailDetails.data.drinks[0].strDrinkThumb,
        header: cocktailDetails.data.drinks[0].strDrink,
        description: cocktailDetails.data.drinks[0].strInstructions,
        meta: `Category: ${cocktailDetails.data.drinks[0].strCategory}`,
    }] });
  }

  mapIngridients = () => {
    const { cocktailDetails } = this.state;
    let isContinue = true;
    let i = 1;
    const ingridients = [];

    while (isContinue) {
      if (cocktailDetails[`strIngredient${i}`]) {
        ingridients.push({name: cocktailDetails[`strIngredient${i}`], measure: cocktailDetails[`strMeasure${i}`] });
        i++;
      } else {
        isContinue = false;
      }
    }
    this.setState({ ingridients });
  }

  async componentDidMount () {
    await this.getDetailsById();
    this.mapIngridients()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.cocktailDetails !== this.state.cocktailDetails) {
  //     this.getRandomCocktail()
  //   };
  // }

  renderIngridient = () => {
    console.log(this.state.ingridients);
    return (
      <Table definition>
        <Table.Body>
        {this.state.ingridients.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell> {item.name} </Table.Cell>
            <Table.Cell> {item.measure} </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>
    )
  }

  render () {
    console.log(this.state.cocktailDetails);
    return (
      <div className='bigCard'>
        <Header as='h3' floated='left' block>
          <Item.Group
            items={this.state.items}
          />
          <span> INGRIDIENTS </span>
          {this.renderIngridient()}
        </Header>
        <div className='header-container'>
          <span className='header-text'> Didn't like this cocktail? </span>
          <Button
            color='violet'
            onClick={this.getRandomCocktail}
          > Get random </Button>
        </div>
        <span> Or go back to
          <Link to="/"> main page </Link>
        </span>
      </div>
    )
  }
}

export default SecondPage
