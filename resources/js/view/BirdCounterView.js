/* eslint-env browser */

import * as _ from "/vendors/underscore/underscore.js";
import { Event } from "../utils/Observer.js";
import View from "./View.js";

const CREATE_HTML_STRING_FOR_COUNTER_ENTRY = _.template(document.querySelector("#bird-counter-entry").innerHTML.trim());

/**
 * Creates and returns a HTML element which renders the given bird properties (image, name, count)
 * @param {Object} bird Bird object for which representation a HTML element should be created
 */
function getElementForBird(bird) {
    let htmlString = CREATE_HTML_STRING_FOR_COUNTER_ENTRY(bird),
        el = document.createElement("div");
    el.innerHTML = htmlString;
    return el.firstChild;
}

/**
 * Updates the counter value in the given element with data from the bird object
 * @param {Node} el HTML element to be updated
 * @param {Object} bird Bird object which state should be used for updating the element 
 */
function updateElement(el, bird) {
    el.querySelector(".bird-current-max").innerHTML = bird.count;
}

function onDecreaseButtonClicked(event) {
    let counterEvent = getCounterEvent(event.target, "decrease");
    this.notifyAll(counterEvent);
}

function onIncreaseButtonClicked(event) {
    let counterEvent = getCounterEvent(event.target, "increase");
    this.notifyAll(counterEvent);
}

/**
 * Creates a either DecreaseBirdCountEvent or IncreaseBirdCountEvent depending on the type parameter
 * 
 * @param {NOde} source Clicked Button
 * @param {String} type "decrease" or "increase" 
 */
function getCounterEvent(source, type) {
    let clickedElement = source.closest(".bird-list-entry"),
        birdID = clickedElement.getAttribute("bird-id"),
        event = type === "decrease" ? new DecreaseBirdCountEvent(birdID) : new IncreaseBirdCountEvent(birdID);
    return event;
}

/**
 * Event to be fired when user chooses to decrement a bird's counter
 */
class DecreaseBirdCountEvent extends Event {

    constructor(id) {
        super("DecreaseBirdCount", id);
    }

}

/**
 * Event to be fired when user chooses to increment a bird's counter
 */
class IncreaseBirdCountEvent extends Event {

    constructor(id) {
        super("IncreaseBirdCount", id);
    }

}


/**
 * Represents the list of already spotted and counted bird, visible in the application's main area
 */

class BirdCounterView extends View {

    constructor(el) {
        super();
        this.setElement(el);
    }

    /**
     * Adds the given bird to the counting list or, if there already is a list entry for that bird, updates the existing element
     * with data from the given bird object
     * @param {Object} bird Bird object to be added to or updated in the counter view
     */
    addBird(bird) {
        // Look for an existing bird element with the given bird's id
        let birdEl = this.el.querySelector(`[bird-id="${bird.id}"]`);
        // Add a new element if none has been found ...
        if (birdEl === null) {
            // Construction of the HTML element is handled in a seperate function
            birdEl = getElementForBird(bird);
            // Retrieves the Plus- and Minus-buttons from the new element and adds listeners for the click events
            // Using of bind presevers the current context for when the callbacks are executed later on
            birdEl.querySelector(".bird-counter-decrease").addEventListener("click", onDecreaseButtonClicked.bind(this));
            birdEl.querySelector(".bird-counter-increase").addEventListener("click", onIncreaseButtonClicked.bind(this));
            this.el.append(birdEl);
        // ... or update the existing bird element
        } else {
            updateElement(birdEl, bird);
        }
    }

}

export default BirdCounterView;