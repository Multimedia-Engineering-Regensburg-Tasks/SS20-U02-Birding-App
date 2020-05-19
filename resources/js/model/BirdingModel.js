/* eslint-env browser */

import * as _ from "/vendors/underscore/underscore.js";

var birdList = [];

function getBirdById(id) {
    return _.findWhere(birdList, { id: parseInt(id) });
}

function getCountedBirdsOnly() {
    return _.filter(birdList, function(bird){
        return bird.wasSpotted;
    });
}

function getBirdsByName(name) {
    return _.filter(birdList, function(bird){
        return bird.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
}

function updateCounterForBirdWithID(id, value) {
    let bird = getBirdById(id);
    bird.count += value;
    if(bird.count < 0) {
        bird.count = 0;
    }
}

class BirdingModel {

    setBirdList(list) {
        birdList = [...list];
    }

    getBirdList() {
        return [...birdList];
    }

    getCountedBird() {
        let countedBirdsOnly = getCountedBirdsOnly();
        return [...countedBirdsOnly];
    }

    getBirdsByName(name) {
        let matchingBird = getBirdsByName(name);
        return [...matchingBird];
    }

    getBirdByID(id) {
        let matchingBird = getBirdById(id);
        return matchingBird.copy();
    }

    increaseCounterForBirdWithID(id) {
        updateCounterForBirdWithID(id, 1);
        return getBirdById(id);
    }

    decreaseCounterForBirdWithID(id) {
        updateCounterForBirdWithID(id, -1);
        return getBirdById(id);
    }

}

export default new BirdingModel();