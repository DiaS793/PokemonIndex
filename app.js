//DOM Objects

//FOR MAIN-SCREEN: This is a class that is apart of 
//main-screen hide. The div and those in side that div hide
//what is there. This also is a way to change the background.
//take note that main-screen and hide are not connect via -.
//this means that even though they are apart of one class they 
//can affect or be affected differently.
//REMEMBER: One way I have learned do create a grid is by
//name a div .box a. Even though they are apart of one class 
//because they are speared by a space, I can call one or the other
//in css and manipulate them. This is the same here. 

const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');

// constants and variables
const TYPES =[
  'normal', 'fighting', 'flying', 'poison', 'ground',
  'rock', 'bug','ghost','steel','fire','water','grass',
  'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];


//Functions

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen =()=> {
  mainScreen.classList.remove('hide');
  for (const type of TYPES) {
    console.log(type)
    mainScreen.classList.remove(type);
  }
};

fetch('https://pokeapi.co/api/v2/pokemon/1')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    resetScreen();

    const dataTypes = data['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
    if (dataSecondType) {
      pokeTypeTwo.classList.remove('hide');
      pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
    } else {
      pokeTypeTwo.classList.add('hide');
      pokeTypeTwo.textContent = '';
    }

    //Explained! So this works like this:
    //in the api there is a type. Under that type there are
    //two arrays for type: grass and poison.
    //the mainScreen.classList.add looks for the FIRST type
    //and matches that will the class that is in css and that 
    //is what gives it the background color.

    mainScreen.classList.add(dataFirstType['type']['name']);
    

    //gives this where the physical properties are brought in 
    //for the pokemon.
    pokeName.textContent = capitalize(data['name']);
    pokeId.textContent = data['id'];
    pokeWeight.textContent = data['weight'];
    pokeHeight.textContent = data['height'];

    
    //this is where the front and back images are brought in 
    //for the pokemon
    pokeFrontImage.src = data['sprites']['front_default'] || '';
    pokeBackImage.src = data['sprites']['back_default'] || '';
  });
