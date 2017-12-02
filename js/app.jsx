import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';

import {ai} from './ai';
import {Welcome} from './welcome.jsx';

ReactDOM.render(<Welcome />, document.getElementById('app'));

//  Creating gameboard
 $(document).ready(function() {
   for (let i = 1; i <= 100; i++) {
     if (i < 11) { // top coordinates
       $(".enemy").prepend("<span class='aTops'>" + Math.abs(i - 11) + "</span>");
       $(".player").prepend("<span class='aTops'>" + Math.abs(i - 11) + "</span>");
       // first line of fields
       $(".grid").append("<li class='points offset1 " + i + "'><span></span></li>");
     } else { // all other lines of fields
       $(".grid").append("<li class='points offset2 " + i + "'><span></span></li>");
     }
     if (i == 11) { // "zero" coordinate filed
       $(".enemy").prepend("<span class='aTops hidezero'>" + Math.abs(i - 11) + "</span>");
       $(".player").prepend("<span class='aTops hidezero'>" + Math.abs(i - 11) + "</span>");
     }
     if (i > 90) { // left coordinates
       $(".enemy").append("<span class='aLeft'>" +
                 String.fromCharCode(97 + (i - 91)).toUpperCase() + "</span>");
       $(".player").append("<span class='aLeft'>" +
                 String.fromCharCode(97 + (i - 91)).toUpperCase() + "</span>");
     }
   }
   $(".text").text(massages.bridge);
 })

 let massages = {
  "bridge": " Captain! Welcome on the bridge. Ready to command our fleet?",
  "command": " Commander! Place the ships of our fleet to battle!",
  "self": " Captain! Use the mouse to place our ships on the left grid.",
  "overlap": " Captain! You can not overlap ships. Please try again.",
  "start": " Captain! Give us orders! Use the mouseclick to point out sector on the right radar screen which we should bombard.",
  placed: function(name) { return " Captain our " + name + " been placed."; },
  hit: function(name) { return " " + name + " ship was hit." },
  miss: function(name) { return " " + name + " missed!" },
  sunk: function(user) { return " " + user + " ship was sunk!" },
  lost: function(name) { return " " + name + " fleet is defeated! End of battle." },
 };

 // Start the game setup
 $(document).ready(function() {
  $(".one").on("click", function() {
    $(".text").text(massages.command);
    gameSetup(this);
  });
 });

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
                        { "name": "patrol-boat", "length": 1 }];
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
  		$(".text").text(massages.sunk(this.name, this.ships[pos].name));
  		if (this == playerFleet) ai.sizeOfShipSunk = this.ships[pos].length;
  		this.ships.splice(pos, 1);
  		if (this.ships.length == 0) {
  			$(".text").text(massages.lost(this.name));
  		}
  		return true;
  	};

  	this.shipHit = function(ship_name) {
  		$(".text").text(massages.hit(this.name));
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
  					$(".text").text(massages.miss("Sir! We "));
  					$(this).children().addClass("miss");
  				} else {
            $(this).children().addClass("hit");
    				$(".enemy").find(".points").off("mouseenter").off("mouseover").off("mouseleave").off("click");
          }
  				// Check end game
  				if (cpuFleet.ships.length == 0) {
  					$(".enemy").find(".points").off("mouseenter").off("mouseover").off("mouseleave").off("click");
  				} else setTimeout(ai.select, 800);
  			} // end of big if
  		});
  	} // end of method EnemyFleet.highlight
  }

export let playerBoard = {
      	currentHits: [],

      	checkAttempt: function(hit) {
      		if (playerFleet.checkIfHit(hit)) {
      			playerBoard.currentHits.push(hit); // put hit into array

      			if (this.currentHits.length > 1) ai.prev_hit = true;
      			$(".player").find("." + hit).children().addClass("hit"); // display hit on grid

      			if (playerBoard.hasShipBeenSunk()) {
      				// clear flags
      				ai.hunting = ai.prev_hit = false;
      				if (ai.sizeOfShipSunk == playerBoard.currentHits.length) {
      					ai.num_misses = ai.back_count = ai.nextMove.length = playerBoard.currentHits.length = ai.sizeOfShipSunk = ai.current = 0;
      				} else {
      					ai.special =  ai.case1 = true;
      				}
      				// check for special cases
      				if (ai.specialHits.length > 0) ai.special = true;
      				// check for end of game.
      			}
      			return true;
      		} else {
      			$(".player").find("." + hit).children().addClass("miss");
      			ai.current = playerBoard.currentHits[0];
      			ai.prev_hit = false;
      			if (playerBoard.currentHits.length > 1) {
      				ai.back = true;
      				ai.num_misses++;
      			}
      			if (ai.case2) {
      				ai.special = true;
      				ai.case2 = false;
      			}
      			return false;
      		}
      	},
        // check if ship was destroyed
      	hasShipBeenSunk: function() {
      		if (ai.sizeOfShipSunk > 0) return true;
      		else return false;
      	}
      };

  function gameSetup(t) {
  	$(t).off() && $(".two").off();
  	$(".one").addClass("self").removeClass("one").text("Place fleet");

  	$(".self").off("click").on("click", function() {
  		$(".text").text(massages.self);
  		selfSetup(playerFleet);
  	});
  };

  function selfSetup() {
  	$(".self").addClass("horz").removeClass("self").text("Place ships");

  	// create new fleet
  	playerFleet = new Fleet("Captain your ");
  	playerFleet.initShips();
  	// light up ships when placing
  	placeShip(playerFleet.ships[playerFleet.currentShip], playerFleet);
  };

  function startGame() {
                 $(".layout").hide(1, function() {
                  $(".console").addClass("col-xl-12");
                 });
                 $(".text").text(massages.start);
                 // Generate all possible hits for Player 1
                 for (let i = 0; i < 100; i++) ai.randPool[i] = i + 1;
                 highlightBoard();
                }

  function createCpuFleet() { //random
  	cpuFleet = new Fleet("Enemy");
  	cpuFleet.initShips();
  	randomSetup(cpuFleet);
  }

  function placeShip(ship, fleet) {
  	$(".horz").off("click").on("click", function() {
  		console.log("ship placement start");
  	});
  	$(".player").find(".points").off("mouseenter").on("mouseenter", function() {
  		let num = $(this).attr('class').slice(15);
        displayShipHorz(parseInt(num), ship, this, fleet)
  	});
  };

  function displayShipHorz(location, ship, point, fleet) {
  	let endPoint = location + ship.length - 2;
  	if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
  		for (let i = location; i < (location + ship.length); i++) {
  			$(".player ." + i).addClass("highlight");
  		}
  		$(point).off("click").on("click", function() {
  			setShip(location, ship, "horz", fleet, "self");
  		});
  	}
  	$(point).off("mouseleave").on("mouseleave", function() {
  		removeShipHorz(location, ship.length);
  	});
  };


  function removeShipHorz(location, length) {
  	for (let i = location; i < location + length; i++) {
  		$(".player ." + i).removeClass("highlight");
  	}
  };

  function setShip(location, ship, orientation, thatFleet, type) {
  	if (!(checkLay(location, ship.length, orientation, thatFleet))) {
  		if (orientation == "horz") {
  			thatFleet.ships[thatFleet.currentShip].populateHorzHits(location);
  			$(".text").text(massages.placed(thatFleet.ships[thatFleet.currentShip].name + " has"));
        //ship deployment
        for (let i = location; i < (location + ship.length); i++) {
  				$(".player ." + i).addClass(thatFleet.ships[thatFleet.currentShip].name);
  			}
        // ship deployment end
  			if (++thatFleet.currentShip == thatFleet.numOfShips) {
  				$(".text").text(massages.placed("ships have"));
  				$(".player").find(".points").off("mouseenter");
  				setTimeout(createCpuFleet, 100);
  			} else {
  				if (type == "random") randomSetup(thatFleet);
  				else placeShip(thatFleet.ships[thatFleet.currentShip], thatFleet);
  			}
  		}
  	} else {
  		if (type == "random") randomSetup(thatFleet);
  		else $(".text").text(massages.overlap);
  	}
   } // end of setShip

   function checkLay(location, length, orientation, genFleet) {
  	let loc = location;

  	if (orientation == "horz") {
  		let end = location + length;
  		for (; location < end; location++) {
  			for (let i = 0; i < genFleet.currentShip; i++) {
  				if (genFleet.ships[i].checkLocation(location)) {
  					if (genFleet == cpuFleet) {
              randomSetup(genFleet);
            } else {
              return true;
            }
  				}
  			} // end for
  		} // end for
  	 } else {
  		let end = location + (10 * length);
  		for (; location < end; location += 10) {
  			for (let i = 0; i < genFleet.currentShip; i++) {
  				if (genFleet.ships[i].checkLocation(location)) {
  					if (genFleet == cpuFleet) randomSetup(genFleet);
  					else return true;
  				}
  			}
  		}
    } // if/else end

  	if (genFleet == cpuFleet && genFleet.currentShip < genFleet.numOfShips) {
  		if (orientation == "horz") {
        genFleet.ships[genFleet.currentShip++].populateHorzHits(loc);
      } else {
        genFleet.ships[genFleet.currentShip++].populateVertHits(loc);
      }

  		if (genFleet.currentShip == genFleet.numOfShips) {
  			// clear the call stack
  			setTimeout(startGame, 500);
  		} else {
      randomSetup(genFleet);
      }
  	 }
  	return false;
   } // end of checkLay

   function randomSetup(fleet) {
  	// 0 horz, 1 vert
  	if (fleet.currentShip >= fleet.numOfShips) return; // regard against undefined length

  	let orien = Math.floor((Math.random() * 10) + 1);
  	let length = fleet.ships[fleet.currentShip].length;

  	if (orien < 6) {
  		// random 1-6
  		let shipOffset = 11 - fleet.ships[fleet.currentShip].length;
  		let horiz = Math.floor((Math.random() * shipOffset) + 1);
  		let vert = Math.floor(Math.random() * 9);
  		let randNum = parseInt(String(vert) + String(horiz));

  		if (fleet == cpuFleet) {
        checkLay(randNum, length, "horz", fleet);
      } else {
        setShip(randNum, fleet.ships[fleet.currentShip], "horz", fleet, "random");
      }
  	} else { // random 7-10
  		let shipOffset = 110 - (fleet.ships[fleet.currentShip].length * 10);
  		let randNum = Math.floor((Math.random() * shipOffset) + 1);

  		if (fleet == cpuFleet) {
        checkLay(randNum, length, "vert", fleet);
      } else {
        setShip(randNum, fleet.ships[fleet.currentShip], "vert", fleet, "random");
      }
  	}
  };

  function highlightBoard() {
			if (playerFleet.ships.length == 0) {
				$(".enemy").find(".points").off("mouseenter").off("mouseleave").off("click");
			} else {
				$(".enemy").find(".points").off("mouseenter mouseover").on("mouseenter mouseover", function() {
					// only allow target highlight on none attempts
					if(!($(this).hasClass("used"))) {
            EnemyFleet.highlight(this);
          }
				});
			 }
		 };

  export {highlightBoard, startGame};
