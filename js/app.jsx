import {bot} from './ai';

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


  let EnemyFleet = {
  	allHits: [],

  	highlight: function(square) {
  		$(square).addClass("target").off("mouseleave").on("mouseleave", function() {
  			$(this).removeClass("target");
  		});

  		$(square).off("click").on("click", function() {
  			if(!($(this).hasClass("used"))) {
  				$(this).removeClass("target").addClass("used");
  				let numer = parseInt($(this).attr("class").slice(15));
  				let boolean = cpuFleet.checkIfHit(numer);

  				if (false == boolean) {
  					$(".text").text(output.miss("Sir! We "));
  					$(this).children().addClass("miss");
  				} else {
            $(this).children().addClass("hit");
    				$(".enemy").find(".points").off("mouseenter").off("mouseover").off("mouseleave").off("click");
          }
  				// Check end game
  				if (cpuFleet.ships.length == 0) {
  					$(".enemy").find(".points").off("mouseenter").off("mouseover").off("mouseleave").off("click");
  				} else setTimeout(bot.select, 800);
  			} // end of big if
  		});
  	} // end of method EnemyFleet.highlight
  }

export let playerBoard = {
      	currentHits: [],

      	checkAttempt: function(hit) {
      		if (playerFleet.checkIfHit(hit)) {
      			playerBoard.currentHits.push(hit); // put hit into array

      			if (this.currentHits.length > 1) bot.prev_hit = true;
      			$(".player").find("." + hit).children().addClass("hit"); // display hit on grid

      			if (playerBoard.hasShipBeenSunk()) {
      				// clear flags
      				bot.hunting = bot.prev_hit = false;
      				if (bot.sizeOfShipSunk == playerBoard.currentHits.length) {
      					bot.num_misses = bot.back_count = bot.nextMove.length = playerBoard.currentHits.length = bot.sizeOfShipSunk = bot.currrent = 0;
      				} else {
      					bot.special =  bot.case1 = true;
      				}
      				// check for special cases
      				if (bot.specialHits.length > 0) bot.special = true;
      				// check for end of game.
      			}
      			return true;
      		} else {
      			$(".player").find("." + hit).children().addClass("miss");
      			bot.current = playerBoard.currentHits[0];
      			bot.prev_hit = false;
      			if (playerBoard.currentHits.length > 1) {
      				bot.back = true;
      				bot.num_misses++;
      			}
      			if (bot.case2) {
      				bot.special = true;
      				bot.case2 = false;
      			}
      			return false;
      		}
      	},
        // check if ship was destroyed
      	hasShipBeenSunk: function() {
      		if (bot.sizeOfShipSunk > 0) return true;
      		else return false;
      	}
      }
