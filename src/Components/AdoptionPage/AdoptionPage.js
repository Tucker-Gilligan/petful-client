import React from 'react';
import './AdoptionPage.css';
import ApiService from '../../ApiService';
import PetContext from '../../PetContext';

class AdoptionPage extends React.Component {
  static contextType = PetContext;
  state = {
    name: '',
    isAdding: true,
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
    this.setState({ isAdding: false });
    let people = [
      'Bubbles',
      'Mr.Lahey',
      'Randy',
      'Cyrus',
      'Ricky',
      'Julian',
      'J. Roc',
      'Barb',
    ];
    let randomPerson = people[Math.floor(Math.random() * people.length)];
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
        ApiService.addPerson(randomPerson).then(() => {
          this.context.setAllPeople([...this.context.people]);
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
        {this.context.dogs.length !== 0 ? (
          <div className="dog__container">
            {this.renderPet(this.context.dogs[0], 'Dog')}

            <button
              className="petful__button"
              onClick={this.handleAdoptDogButton}
              type="button"
              disabled={this.context.people[0] !== this.name}
            >
              ADOPT DOG!
            </button>
          </div>
        ) : (
          <p>no more dogs in the shelter</p>
        )}
        {this.context.cats.length !== 0 ? (
          <div className="cat__container">
            {this.renderPet(this.context.cats[0], 'Cat')}
            <button
              className="petful__button"
              onClick={this.handleAdoptCatButton}
              type="button"
              disabled={this.context.people[0] !== this.name}
            >
              ADOPT CAT!
            </button>
          </div>
        ) : (
          <p>no more cats in the shelter</p>
        )}
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
    this.context.setFeedback(
      `Congratulations ${this.context.people[0]}!! ${this.context.dogs[0].name} can't wait to meet you!`
    );

    this.context.adoptDog();
    setTimeout(() => {
      if (this.context.dogs.length !== 0 || this.context.cats.length !== 0) {
        this.setState({ isAdding: true });
        this.context.setFeedback('');
      } else {
        this.context.setFeedback('there are no more animals in the shelter');
      }
    }, 5000);
  };

  // Handles message and button when user clicks to adopt a cat
  handleAdoptCatButton = e => {
    e.preventDefault();
    this.context.adoptCat();

    this.context.setFeedback(
      `Congratulations ${this.context.people[0]}!! ${this.context.cats[0].name} can't wait to meet you!`
    );

    setTimeout(() => {
      if (this.context.dogs.length !== 0 || this.context.cats.length !== 0) {
        this.setState({ isAdding: true });
        this.context.setFeedback('');
      } else {
        this.context.setFeedback('there are no more animals in the shelter');
      }
    }, 5000);
  };

  render() {
    this.firstInLine();
    return (
      <div className="adoption__page">
        <fieldset className="name__field">
          {this.state.isAdding === true && (
            <>
              <h3>Add Name to List: </h3>
              <form
                onSubmit={this.handleAddPerson}
                className="people__queue__form"
              >
                <label htmlFor="user__name" className="user__name__label">
                  Name:{' '}
                </label>
                <input
                  name="user__name"
                  className="user__name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                  placeholder="Enter your name"
                  required
                />
                <button type="submit" className="submit__button">
                  Add Name
                </button>
              </form>
            </>
          )}
          <ul className="name__list">
            {this.context.people.map((person, i) => {
              return <li key={i}>{person}</li>;
            })}
          </ul>
        </fieldset>
        {this.context.feedback === '' ? (
          <div className="cats_and_dogs">{this.renderCatsAndDogs()}</div>
        ) : (
          <h3 className="congratulations">{this.context.feedback}</h3>
        )}
      </div>
    );
  }
}

export default AdoptionPage;
