  let playerFleet, cpuFleet;
  let attemptedHits = [];

  function Fleet(name) {
  	this.name = name;
  	this.shipDetails = [{ "name": "battleship", "length": 4 },
  						          { "name": "cruiser", "length": 3 },
          						  { "name": "cruiser", "length": 3 },
          						  { "name": "frigate", "length": 2 },
          						  { "name": "frigate", "length": 2 },
                        { "name": "frigate", "length": 2 },
                        { "name": "patrol-boat", "length": 1 },
                        { "name": "patrol-boat", "length": 1 },
                        { "name": "patrol-boat", "length": 1 },
                        { "name": "patrol-boat", "length": 1 },];
  	this.numOfShips = this.shipDetails.length;
  	this.ships = [];
  	this.currentShipSize = 0;
  	this.currentShip = 0;
  	this.initShips = function() {
  		for(let i = 0; i < this.numOfShips; i++) {
  			this.ships[i] = new Ship(this.shipDetails[i].name);
  			this.ships[i].length = this.shipDetails[i].length;
  		}
  	};

  	this.removeShip = function(pos) {
  		this.numOfShips--;
  		$(".text").text(output.sunk(this.name, this.ships[pos].name));
  		if (this == playerFleet) bot.sizeOfShipSunk = this.ships[pos].length;
  		this.ships.splice(pos, 1);
  		if (this.ships.length == 0) {
  			$(".text").text(output.lost(this.name));
  		}
  		return true;
  	};

  	this.shipHit = function(ship_name) {
  		$(".text").text(output.hit(this.name));
  		return true;
  	}

  	this.checkIfHit = function(point) {
  		for(let i = 0; i < this.numOfShips; i++) {
  			if (this.ships[i].checkLocation(point)) {
  				this.ships[i].getRidOf(this.ships[i].hitPoints.indexOf(point));
  				if (this.ships[i].hitPoints == 0)return this.removeShip(i);
  				else return this.shipHit(this.ships[i].name);
  			}
  		}
  		return false;
  	};
  }

  function Ship(name){
  	this.name = name;
  	this.length = 0;
  	this.hitPoints = [];

  	this.populateHorzHits = function(start) {
  		for (let i = 0; i < this.length; i++, start++) {
  			this.hitPoints[i] = start;
  		}
  	};

  	this.populateVertHits = function(start) {
  		for (let i = 0; i < this.length; i++, start += 10) {
  			this.hitPoints[i] = start;
  		}
  	};

  	this.checkLocation = function(loc) {
  		for (let i = 0; i < this.length; i++) {
  			if (this.hitPoints[i] == loc) return true;
  		}
  		return false;
  	};

  	this.getRidOf = function(pos) {
  		this.hitPoints.splice(pos, 1);
  	}
  }

  let output = {
  	"welcome": " Captain! Welcome on board. Ready to command our fleet?",
  	"player1": " Commander! Place the ships of our fleet to battle!",
  	"self": " Captain! Use the mouse to place our ships on the left grid.",
  	"overlap": " Captain! You can not overlap ships. Please try again.",
  	"start": " Captain! Give us order where we should shoot! Use the mouse to show sector on the right radar screen where we should bombard.",
  	placed: function(name) { return " Captain our " + name + " been placed."; },
  	hit: function(name) { return " " + name + " ship was hit." },
  	miss: function(name) { return " " + name + " missed!" },
  	sunk: function(user) { return " " + user + " ship was sunk!" },
  	lost: function(name) { return " " + name + " has lost his fleet!!  Game Over." },
  };
