/* eslint-env browser */

import * as _ from "/vendors/underscore/underscore.js";
import { Event } from "../utils/Observer.js";
import View from "./View.js";

const CREATE_HTML_STRING_FOR_COUNTER_ENTRY = _.template(document.querySelector("#bird-counter-entry").innerHTML.trim());

function getElementForBird(bird) {
    let htmlString = CREATE_HTML_STRING_FOR_COUNTER_ENTRY(bird),
        el = document.createElement("div");
    el.innerHTML = htmlString;
    return el.firstChild;
}

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

function getCounterEvent(source, type) {
    let clickedElement = source.closest(".bird-list-entry"),
        birdID = clickedElement.getAttribute("bird-id"),
        event = type === "decrease" ? new DecreaseBirdCountEvent(birdID) : new IncreaseBirdCountEvent(birdID);
    return event;
}

class DecreaseBirdCountEvent extends Event {

    constructor(id) {
        super("DecreaseBirdCount", id);
    }

}

class IncreaseBirdCountEvent extends Event {

    constructor(id) {
        super("IncreaseBirdCount", id);
    }

}

class BirdCounterView extends View {

    constructor(el) {
        super();
        this.setElement(el);
    }

    addBird(bird) {
        let birdEl = this.el.querySelector(`[bird-id="${bird.id}"]`);
        if (birdEl === null) {
            birdEl = getElementForBird(bird);
            birdEl.querySelector(".bird-counter-decrease").addEventListener("click", onDecreaseButtonClicked.bind(this));
            birdEl.querySelector(".bird-counter-increase").addEventListener("click", onIncreaseButtonClicked.bind(this));
            this.el.append(birdEl);
        } else {
            updateElement(birdEl, bird);
        }
    }

}

export default BirdCounterView;