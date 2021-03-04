import React from 'react';
import './AdoptionPage.css';
import ApiService from '../../ApiService';
import PetContext from '../../PetContext';

class AdoptionPage extends React.Component {
  static contextType = PetContext;
  state = {
    name: '',
  };

  componentDidMount() {
    this.context.setFirstCat();
    this.context.setFirstDog();
    this.context.setAllPeople();
  }

  firstInLine = () => {
    if (this.context.people[0] === this.name) {
      clearInterval(this.adoptInterval); //tell js to stop running interval
    }
  };

  // This function calls addPerson function (post request) and adds name to list of people array
  handleAddPerson = e => {
    e.preventDefault();
    ApiService.addPerson(this.state.name).then(() => {
      this.name = this.state.name;
      this.context.setAllPeople([...this.context.people, this.state.name]);

      this.setState({
        name: '',
      });
      this.adoptInterval = setInterval(() => {
        if (new Date().getTime() % 2 === 0) {
          this.context.adoptCat();
        } else {
          this.context.adoptDog();
        }
        ApiService.addPerson('Bobby').then(() => {
          this.context.setAllPeople([...this.context.people, 'Bubbles']);
        });
      }, 5000);
    });
  };

  // Handles user input by setting state of name
  handleOnChange = e => {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  };

  // makes a call to renderPet to populate pet's information, renders both cats and dogs along with adopt button
  renderCatsAndDogs() {
    return (
      <div className="cat__dog">
        <div className="dog__container">
          {this.renderPet(this.context.dogs[0], 'Dog')}

          <button
            className="adopt-button"
            onClick={this.handleAdoptDogButton}
            type="button"
            disabled={this.context.people[0] !== this.name}
          >
            ADOPT DOG!
          </button>
        </div>
        <div className="cat__container">
          {this.renderPet(this.context.cats[0], 'Cat')}
          <button
            className="adopt-button"
            onClick={this.handleAdoptCatButton}
            type="button"
            disabled={this.context.people[0] !== this.name}
          >
            ADOPT CAT!
          </button>
        </div>
        <br />
        <br />
      </div>
    );
  }

  // Renders the cat or dogs information along with picture
  renderPet(petObj, petType) {
    if (petObj === undefined) {
      return <></>;
    }
    let petName = petObj.name;
    let petPic = petObj.imageURL;
    let petDescription = petObj.description;
    let petGender = petObj.gender;
    let petAge = petObj.age;
    let petBreed = petObj.breed;
    let petStory = petObj.story;

    return (
      <div className="adoption-image">
        <img className="bg-img" src={petPic} alt={petType} width="400px"></img>
        <h3>{petName}</h3>
        <p>Description: {petDescription}</p>
        <p>Name: {petName}</p>
        <p>Age: {petAge}</p>
        <p>Gender: {petGender}</p>
        <p>Breed: {petBreed}</p>
        <p>Story: {petStory}</p>
      </div>
    );
  }

  // Handles message and button when user clicks to adopt a dog
  handleAdoptDogButton = e => {
    e.preventDefault();
    console.log(this.context.dogs[0]);
    console.log(this.context.dogs[0].name);
    this.context.setFeedback(
      `Congratulations ${this.context.people[0]}!! ${this.context.dogs[0].name}{' '}
        can't wait to meet you!`
    );

    this.context.adoptDog();
    setTimeout(() => {
      this.context.setFeedback('');
    }, 5000);
  };

  // Handles message and button when user clicks to adopt a cat
  handleAdoptCatButton = e => {
    e.preventDefault();
    this.context.adoptCat();

    this.context.setFeedback(
      `Congratulations ${this.context.people[0]}!! ${this.context.cats[0].name}
          can't wait to meet you!`
    );

    setTimeout(() => {
      this.context.cats && this.context.dogs !== []
        ? this.context.setFeedback('')
        : this.context.setFeedback(
            'looks like there are no more pets to adopt'
          );
    }, 5000);
  };

  render() {
    this.firstInLine();
    return (
      <div>
        {this.context.feedback === '' ? (
          <div className="cats_and_dogs">{this.renderCatsAndDogs()}</div>
        ) : (
          <h3>{this.context.feedback}</h3>
        )}

        <fieldset className="name-list-style">
          <h3>Add Name to List: </h3>
          <form onSubmit={this.handleAddPerson}>
            <label htmlFor="fullName">Name: </label>
            <input
              name="fullName"
              value={this.state.name}
              onChange={this.handleOnChange}
              placeholder="Enter your name"
              required
            ></input>
            <button type="submit">Add Name</button>
          </form>
          <ul>
            {this.context.people.map((person, i) => {
              return <li key={i}>{person}</li>;
            })}
          </ul>
        </fieldset>
      </div>
    );
  }
}

export default AdoptionPage;
