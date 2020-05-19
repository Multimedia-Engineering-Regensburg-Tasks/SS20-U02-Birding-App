/* eslint-env browser */

import { Event } from "../utils/Observer.js";
import View from "./View.js";

function onQueryChanged(event) {
    let query = event.target.value;
    this.notifyAll(new QueryEvent(query));
}

class QueryEvent extends Event {
    
    constructor(query) {
        super("QueryChanged", query);
    }

}

class SearchView extends View {

    constructor(el) {
        super();
        this.setElement(el);
        this.el.addEventListener("input", onQueryChanged.bind(this));
    }

}

export default SearchView;