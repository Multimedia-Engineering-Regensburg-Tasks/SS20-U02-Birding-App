/* eslint-env browser */

/**
 * Prototype to represent one bird (species) 
 */
class Bird {

    constructor(id, name, latinName, imagePath, audioPath) {
        this.id = id;
        this.name = name;
        this.latinName = latinName;
        this.imagePath = imagePath;
        this.audioPath = audioPath;
        this.wasSpotted = false;
        this.count = 0;
    }

    // Helper function for JSON based shallow copies of this object
    copy() {
        return Bird.fromJSON(JSON.stringify(this));
    }


    /**
     * Creates a single bird object from the given JSON string
     * @param {String} json JSON formated string describing one single bird
     */
    static fromJSON(json) {
        let obj = JSON.parse(json);
        return new Bird(obj.id, obj.name, obj.latinName, obj.imagePath, obj.audioPath);
    } 

    /**
     * Creates an array of birds from the given JSON string
     * @param {String} json JSON formated string describing the bird list
     */
    static fromJSONArray(json) {
        let arrayFromJSON = JSON.parse(json),
        list = [];
        for(let i = 0; i < arrayFromJSON.length; i++) {
            let birdFromJSON = arrayFromJSON[i];
            list.push(new Bird(birdFromJSON.id, birdFromJSON.name, birdFromJSON.latinName, birdFromJSON.imagePath, birdFromJSON.audioPath));
        }
        return list;
    }

}

export default Bird;