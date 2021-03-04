import React, { Component } from 'react';
import ApiService from './ApiService';
const PetContext = React.createContext({
  cats: [],
  dogs: [],
  people: [],
  name: '',
  feedback: '',
  setFirstCat: () => {},
  setFirstDog: () => {},
  adoptCat: () => {},
  adoptDog: () => {},
  setFeedback: () => {},
  setAllPeople: () => {},
});
export default PetContext;

export class PetProvider extends Component {
  state = {
    cats: [],
    dogs: [],
    people: [],
    // name: '',
    feedback: '',
  };

  setFirstCat = () => {
    ApiService.getCat()
      .then(res => {
        this.setState({
          cats: res,
        });
      })
      .catch({ error: 'An error occurred.' });
  };

  setFirstDog = () => {
    ApiService.getDog()
      .then(res => {
        this.setState({
          dogs: res,
        });
      })
      .catch({ error: 'An error occurred.' });
  };

  adoptCat = () => {
    ApiService.adoptCat().then(() => {
      this.setState({
        cats: this.state.cats.splice(1),
        people: this.state.people.splice(1),
      });
    });
  };

  adoptDog = () => {
    ApiService.adoptDog().then(() => {
      this.setState({
        dogs: this.state.dogs.splice(1),
        people: this.state.people.splice(1),
      });
    });
  };

  setFeedback = feedback => {
    this.setState({ feedback });
  };

  setAllPeople = () => {
    ApiService.getPeople()
      .then(res => {
        this.setState({
          people: res,
        });
      })
      .catch({ error: 'An error occurred.' });
  };

  // handleOnChange = e => {
  //   e.preventDefault();
  //   this.setState({
  //     name: e.target.value,
  //   });
  // };

  render() {
    const value = {
      cats: this.state.cats,
      dogs: this.state.dogs,
      people: this.state.people,
      // name: this.state.name,
      feedback: this.state.feedback,
      setFirstCat: this.setFirstCat,
      setFirstDog: this.setFirstDog,
      adoptCat: this.adoptCat,
      adoptDog: this.adoptDog,
      setFeedback: this.setFeedback,
      setAllPeople: this.setAllPeople,
    };
    return (
      <PetContext.Provider value={value}>
        {this.props.children}
      </PetContext.Provider>
    );
  }
}
