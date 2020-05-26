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

/**
 * Model to store and update the bird list
 */
class BirdingModel {

    /**
     * Overwrites the current list of birds with a copy of the given list
     * @param {Array} list Array of Bird objects
     */
    setBirdList(list) {
        birdList = [...list];
    }

    /**
     * Returns a copy of the current list of birds
     */
    getBirdList() {
        return [...birdList];
    }

    /**
     * Returns a copy of all birds already counted
     */
    getCountedBird() {
        let countedBirdsOnly = getCountedBirdsOnly();
        return [...countedBirdsOnly];
    }

    /**
     * Returns a copy of the first bird from the list matching the given name
     * @param {String} name Name of the bird to be returned
     */
    getBirdsByName(name) {
        let matchingBird = getBirdsByName(name);
        return [...matchingBird];
    }

    /**
     * Returns a copy of the first bird from the list matching the given id
     * @param {String} name Id of the bird to be returned
     */
    getBirdByID(id) {
        let matchingBird = getBirdById(id);
        return matchingBird.copy();
    }

    /**
     * Increases the counter value for the first bird matching the given id by one
     * @param {String} id Id of the bird which counter should be increased
     */
    increaseCounterForBirdWithID(id) {
        updateCounterForBirdWithID(id, 1);
        return getBirdById(id);
    }

      /**
     * DEcreases the counter value for the first bird matching the given id by one
     * @param {String} id Id of the bird which counter should be decreased
     */
    decreaseCounterForBirdWithID(id) {
        updateCounterForBirdWithID(id, -1);
        return getBirdById(id);
    }

}

export default new BirdingModel();