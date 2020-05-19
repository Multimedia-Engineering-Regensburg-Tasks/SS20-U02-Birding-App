/* eslint-env browser */

import * as _ from "/vendors/underscore/underscore.js";
import { Event } from "../utils/Observer.js";
import View from "./View.js";

const CREATE_HTML_STRING_FOR_LIST_ENTRY = _.template(document.querySelector("#bird-list-entry").innerHTML.trim());

function getElementForBird(bird) {
    let htmlString = CREATE_HTML_STRING_FOR_LIST_ENTRY(bird),
        el = document.createElement("div");
    el.innerHTML = htmlString;
    return el.firstChild;
}

function onAddBirdButtonClicked(event) {
    let clickedElement = event.target.closest(".bird-list-entry"),
        birdID = clickedElement.getAttribute("bird-id");
    this.notifyAll(new AddBirdEvent(birdID));
}

class AddBirdEvent extends Event {

    constructor(id) {
        super("AddBird", id);
    }

}

class BirdListView extends View {

    constructor(el) {
        super();
        this.setElement(el);
    }

    setList(list) {
        this.clear();
        for (let i = 0; i < list.length; i++) {
            let birdEl = getElementForBird(list[i]);
            birdEl.querySelector(".icon-plus-circled").addEventListener("click", onAddBirdButtonClicked.bind(this));
            this.el.append(birdEl);

        }
    }

}

export default BirdListView;