class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

var has_key = false;

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Rooms[key];

        // interact with bedroom drawer if player has keys
        if (has_key && key == "Master Bedroom") {
            locationData.Choices.push({"Text":"Try the keys", "Target":"End"});
        }

        // show default buttons and text
        this.engine.show(locationData.Body);
        if(locationData.Choices) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        // pick up key
        if (choice == this.engine.storyData.Rooms["Bathroom"].Choices[0]){
            has_key = true;
        }
        // spin globe
        if (choice == this.engine.storyData.Rooms["Mechanism"].Choices[0]){
            let continents = ["North America", "South America", "Asia", "Africa", "Europe", "Antarctica", "Australia"];
            let randIndex = Math.floor(Math.random()*7)
            this.engine.storyData.Rooms["Mechanism"].Body = "On the arm of the globe is a pointer, landing on " + continents[randIndex];
        }

        if (choice) {
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}


class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');