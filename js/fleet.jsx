import React from 'react';
import ReactDOM from 'react-dom';


let playerFleet, cpuFleet;
let attemptedHits = [];

//fleet store data about group of ships

class Fleet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			name: this.props.name,
			shipDetails: [{ "name": "alfa", "length": 4 },
								{ "name": "bravo", "length": 3 },
								{ "name": "charlie", "length": 3 },
								{ "name": "delta", "length": 2 },
								{ "name": "echo", "length": 2 },
								{ "name": "foxtrot", "length": 2 },
								{ "name": "golf", "length": 1 },
								{ "name": "hotel", "length": 1 },
								{ "name": "india", "length": 1 },
								{ "name": "juliet", "length": 1 }],
			numOfShips: this.shipDetails.length,
			ships: [],
			currentShipSize: 0,
			currentShip: 0,
    }
  };

	initShips = () => {
		for(let i = 0; i < numOfShips; i++) {
			ships[i] = new Ship(shipDetails[i].name);
			ships[i].length = shipDetails[i].length;
		}
	};

	removeShip = (pos) => {
		numOfShips--;
		// $(".text").text(output.sunk(this.name, this.ships[pos].name));
		if (this == playerFleet) bot.sizeOfShipSunk = ships[pos].length;
		ships.splice(pos, 1);
		if (ships.length == 0) {
			console.log("statek zatopiony");;
		}
		return true;
	};

	shipHit = (ship_name) => {
		// $(".text").text(output.hit(this.name));
		console.log(name);
		return true;
	}

	checkIfHit = (point) => {
		for(let i = 0; i < numOfShips; i++) {
			if (ships[i].checkLocation(point)) {
				ships[i].getRidOf(ships[i].hitPoints.indexOf(point));
				if (ships[i].hitPoints == 0){
					return this.removeShip(i);
				} else {
					return this.shipHit(ships[i].name);
				}
			}
		}
		return false;
	};
};

//ship object

class Ship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			name: this.props.name,
			length: 0,
			hitPoints: [],
    }
  };

	populateHorzHits = (start) => {
		for (let i = 0; i < length; i++, start++) {
			hitPoints[i] = start;
			console.log("HORIZhitPointsTEST: ", hitPoints[i]);
		}
	};

	populateVertHits = (start) => {
		for (let i = 0; i < length; i++, start += 10) {
			hitPoints[i] = start;
			console.log("VERThitPointsTEST: ", hitPoints[i]);
		}
	};
	checkLocation = (loc) => {
		for (let i = 0; i < length; i++) {
			if (hitPoints[i] == loc){
				// return true;
				console.log("checkLocationTest");
			}
		}
		return false;
	};

	getRidOf = (pos) => {
		hitPoints.splice(pos, 1);
	}

};

export {Fleet};
export {Ship};
