/* eslint-env browser */

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

    copy() {
        return Bird.fromJSON(JSON.stringify(this));
    }

    static fromJSON(json) {
        let obj = JSON.parse(json);
        return new Bird(obj.id, obj.name, obj.latinName, obj.imagePath, obj.audioPath);
    } 

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