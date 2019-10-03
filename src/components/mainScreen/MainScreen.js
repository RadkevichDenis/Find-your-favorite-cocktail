import React, { Component } from 'react';
import './MainScreen.css';
import Header from '../header/Header.js';
import TabularMenu from '../tabularMenu/TabularMenu.js';
import Main from '../main/Main.js';
import axios from 'axios'

const baseUrl = 'https://the-cocktail-db.p.rapidapi.com'

const headers = {
  "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
  "x-rapidapi-key": "b886fb5fbbmsh8eaa5b6b513275bp1f9f6ajsncf5d2f0b18c6"
}

class MainScreen extends Component {

  state = {
    currentCategory: 'Ordinary Drink',
    currentIngridient: '',
    cocktailList: [],
    categories: [],
    ingridients: [],
    loaded: false,
    id: [],
    querry: '',
  }

  getCocktails = async () => {
    this.setState({ loaded: false })
    const getCocktailsUrl = `${baseUrl}/filter.php?c=${this.state.currentCategory}`;
    const cocktails  = await axios.get(getCocktailsUrl, { headers: headers });
    this.setState({ cocktailList: cocktails.data.drinks, loaded: true });
  }

  getCategories = async () => {
    const getCategoriesUrl = `${baseUrl}/list.php?c=list`;
    const categories = await axios.get(getCategoriesUrl, { headers: headers });
    this.setState({ categories: categories.data.drinks });
  }

  getIngridients = async () => {
    const getIngridientsUrl = `${baseUrl}/list.php?i=list`;
    const ingridients = await axios.get(getIngridientsUrl, { headers: headers });
    this.setState({ ingridients: ingridients.data.drinks });
  }

  getCurrentIngridient = async () => {
    this.setState({ loaded: false })
    const getIngridientUrl = `${baseUrl}/filter.php?i=${this.state.currentIngridient}`;
    const cocktails = await axios.get(getIngridientUrl, { headers: headers });
    this.setState({ cocktailList: cocktails.data.drinks, loaded: true });
  }

  getRandomCocktail = async () => {
    this.setState({ loaded: false })
    const getRandomCocktailUrl = `${baseUrl}/random.php`;
    const cocktails = await axios.get(getRandomCocktailUrl, { headers: headers });
    this.setState({ cocktailList: cocktails.data.drinks, loaded: true })
  }

  componentDidMount() {
    this.getCocktails()
    this.getCategories()
    this.getIngridients()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCategory !== this.state.currentCategory) {
      this.getCocktails();
      this.setState({ querry: ''})
    };
    if (prevState.currentIngridient !== this.state.currentIngridient) {
      this.getCurrentIngridient();
      this.setState({ querry: ''})
    }
  }

  handleChangeCategories = (e, { value }) => this.setState({ currentCategory: value })
  handleChangeIngridients = (e, { value }) => this.setState({ currentIngridient: value })
  handleChangeQuerry = (e, { value }) => this.setState({ querry: value })



  render () {
    const { currentCategory, cocktailList, categories, ingridients, currentIngridient, loaded, querry} = this.state;
    return (
      <div className='mainScreen-container'>
        <Header
          random={this.getRandomCocktail}
        />
        <div className='main'>
          <TabularMenu
            categories={categories}
            currentCategory={currentCategory}
            ingridients={ingridients}
            currentIngridient={currentIngridient}
            changeCategory={this.handleChangeCategories}
            changeIngridient={this.handleChangeIngridients}
          />
          <Main
            changeQuerry={this.handleChangeQuerry}
            changeIngridient={this.handleChangeIngridients}
            loaded={loaded}
            cocktails={cocktailList}
            querry={querry}
          />
        </div>
      </div>
    )
  }
}

export default MainScreen;
