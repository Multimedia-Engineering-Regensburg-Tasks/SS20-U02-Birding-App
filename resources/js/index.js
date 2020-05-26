/* eslint-env browser */

import Bird from "./model/Bird.js";
import BirdingModel from "./model/BirdingModel.js";
import BirdListView from "./view/BirdListView.js";
import SearchView from "./view/SearchView.js";
import BirdCounterView from "./view/BirdCounterView.js";


/**
 * Main module
 * 
 * - Initializes all other components
 * - Handles events from other modules and acts as a mediator between different components
 */

var birdList,
  birdSearch,
  birdCounter;

function init() {
  initModel();
  initUI();
}

/**
 * Initializes the model with data from HTML element
 */
function initModel() {
  let jsonList = document.querySelector("#bird-list").innerHTML.trim(),
    birds = Bird.fromJSONArray(jsonList);
  BirdingModel.setBirdList(birds);
}

/**
 * Queries for all relevant DOM elements and initializes the three main views:
 *  - BirdListView to show the (filtered) list of all birds
 *  - SearchView to input a query to filter the bird list
 *  - BirdCounterView to show the selected and counted birds
 */
function initUI() {
  let birdListEl = document.querySelector(".bird-gallery .bird-list"),
    searchEl = document.querySelector(".bird-search"),
    counterEl = document.querySelector(".bird-counter .bird-list");
  birdList = new BirdListView(birdListEl);
  birdList.setList(BirdingModel.getBirdList());
  // Add listener to be informed when user wants to add one bird from the result list to the counter view
  birdList.addEventListener("AddBird", onAddBirdButtonClicked);
  birdSearch = new SearchView(searchEl);
  // Add listener to be informed when user has changed the search box's input value
  birdSearch.addEventListener("QueryChanged", onQueryChanged);
  birdCounter = new BirdCounterView(counterEl);
  // Add listeners to be informed when user wants to change the nuber of counted specimens of one bird
  birdCounter.addEventListener("DecreaseBirdCount", onBirdCounterDecreased);
  birdCounter.addEventListener("IncreaseBirdCount", onBirdCounterIncreased);
}

/**
 * Retrieves a copy of the bird with the given id from the model and adds it to the counter
 * @param {Object} event Contains the id of the bird to be added to the counter view
 */
function onAddBirdButtonClicked(event) {
  let bird = BirdingModel.getBirdByID(event.data);
  birdCounter.addBird(bird);
}

/**
 * Retrieves a list of all birds from the model which match the current search term and renders them in the
 * resul list (BirdListView)
 * @param {Object} event  Contains the search box's current value
 */
function onQueryChanged(event) {
  let filteredList = event.data === "" ? BirdingModel.getBirdList() : BirdingModel.getBirdsByName(event.data);
  birdList.setList(filteredList);
}

/**
 * Asks model to update the given birds counter and passes a copy of the updated bird object to the counter view,
 * where the new object state will be rendered (refreshes the displayed counter value)
 * @param {Object} event Containts the if of the bird which speciemen counter should be increased
 */
function onBirdCounterIncreased(event) {
  let updatedBird = BirdingModel.increaseCounterForBirdWithID(event.data);
  birdCounter.addBird(updatedBird);
}

/**
 * Asks model to update the given birds counter and passes a copy of the updated bird object to the counter view,
 * where the new object state will be rendered (refreshes the displayed counter value)
 * @param {Object} event Containts the if of the bird which speciemen counter should be decreased
 */
function onBirdCounterDecreased(event) {
  let updatedBird = BirdingModel.decreaseCounterForBirdWithID(event.data);
  birdCounter.addBird(updatedBird);
}

init();