/* eslint-env browser */

import * as _ from "/vendors/underscore/underscore.js";
import { Event } from "../utils/Observer.js";
import View from "./View.js";

const CREATE_HTML_STRING_FOR_LIST_ENTRY = _.template(document.querySelector("#bird-list-entry").innerHTML.trim());

/**
 * Creates and returns a HTML element which renders the given bird properties (image and name)
 * @param {Object} bird Bird object for which representation a HTML element should be created
 */
function getElementForBird(bird) {
    let htmlString = CREATE_HTML_STRING_FOR_LIST_ENTRY(bird),
        el = document.createElement("div");
    el.innerHTML = htmlString;
    return el.firstChild;
}

/**
 * Looks for the id of the clicked bird by traversing the DOM upwards to find the next "bird-list-entry"-element and retrieving
 * the bird-id attributes value. Notifies listeners with a AddBirdEvent event.
 * @param {Object} event DOM event (Click) fired when user clicks on the Plus-button in one of the currently visible bird elements
 */
function onAddBirdButtonClicked(event) {
    let clickedElement = event.target.closest(".bird-list-entry"),
        birdID = clickedElement.getAttribute("bird-id");
    this.notifyAll(new AddBirdEvent(birdID));
}

/**
 * Event to be fired when user chooses to add a bird to the counter view
 */
class AddBirdEvent extends Event {

    constructor(id) {
        super("AddBird", id);
    }

}

/**
 * Represents the visible list of available birds, influenced by the current search box input value
 */
class BirdListView extends View {

    constructor(el) {
        super();
        this.setElement(el);
    }

    /**
     * Clears all content from the view and renders each bird from the given array
     * @param {Array} list List of birds to be displayed in the view
     */
    setList(list) {
        this.clear();
        for (let i = 0; i < list.length; i++) {
            // Construction of the HTML element is handled in a seperate function
            let birdEl = getElementForBird(list[i]);
            // Retrieves the Plus-button from the new element and adds a listener for the click event
            // Using of bind presevers the current context for when the callback is executed later on
            birdEl.querySelector(".icon-plus-circled").addEventListener("click", onAddBirdButtonClicked.bind(this));
            this.el.append(birdEl);

        }
    }

}

export default BirdListView;