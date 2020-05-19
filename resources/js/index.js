/* eslint-env browser */

import Bird from "./model/Bird.js";
import BirdingModel from "./model/BirdingModel.js";
import BirdListView from "./view/BirdListView.js";
import SearchView from "./view/SearchView.js";
import BirdCounterView from "./view/BirdCounterView.js";

var birdList,
  birdSearch,
  birdCounter;

function init() {
  initModel();
  initUI();
}

function initModel() {
  let jsonList = document.querySelector("#bird-list").innerHTML.trim(),
    birds = Bird.fromJSONArray(jsonList);
  BirdingModel.setBirdList(birds);
}

function initUI() {
  let birdListEl = document.querySelector(".bird-gallery .bird-list"),
    searchEl = document.querySelector(".bird-search"),
    counterEl = document.querySelector(".bird-counter .bird-list");
  birdList = new BirdListView(birdListEl);
  birdList.setList(BirdingModel.getBirdList());
  birdList.addEventListener("AddBird", onAddBirdButtonClicked);
  birdSearch = new SearchView(searchEl);
  birdSearch.addEventListener("QueryChanged", onQueryChanged);
  birdCounter = new BirdCounterView(counterEl);
  birdCounter.addEventListener("DecreaseBirdCount", onBirdCounterDecreased);
  birdCounter.addEventListener("IncreaseBirdCount", onBirdCounterIncreased);
}

function onAddBirdButtonClicked(event) {
  let bird = BirdingModel.getBirdByID(event.data);
  birdCounter.addBird(bird);
}

function onQueryChanged(event) {
  let filteredList = event.data === "" ? BirdingModel.getBirdList() : BirdingModel.getBirdsByName(event.data);
  birdList.setList(filteredList);
}

function onBirdCounterIncreased(event) {
  let updatedBird = BirdingModel.increaseCounterForBirdWithID(event.data);
  birdCounter.addBird(updatedBird);
}

function onBirdCounterDecreased(event) {
  let updatedBird = BirdingModel.decreaseCounterForBirdWithID(event.data);
  birdCounter.addBird(updatedBird);
}

init();