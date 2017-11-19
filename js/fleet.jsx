import React from 'react';
import ReactDOM from 'react-dom';

//player fleet
const Fleet = (name) => {
	let name = name;
    let shipDetails = [
    						{"name": "Flagship", "length": 4 },
    						{"name": "Voyager", "length": 3 },
    						{"name": "Discovery", "length": 3 },
    						{"name": "Curiosity", "length": 2 },
                {"name": "Hercules", "length": 2 },
                {"name": "Lutador", "length": 2 },
                {"name": "Torro", "length": 1 },
                {"name": "Alba", "length": 1 },
                {"name": "Bravo", "length": 1 },
                {"name": "Tango", "length": 1 },],
    let numOfShips = this.shipDetails.length;
    let ships = [];
    let currentShipSize = 0;
    let currentShi = 0;

  const initShips = () => {
    for(let i = 0; i < this.numOfShips; i++) {
        ships[i] = ships.push(new Ship(shipDetails[i].name));
        ships[i].length = shipDetails[i].length;
    }
  };

  const removeShip = (pos) => {
      numOfShips--;
      ships = ships.splice(pos, 1);
    if (ships.length === 0) {
      console.log("You loose game");
    }
    return true;
  };

  const checkIfHit = (point) => {
    for(let i = 0; i < numOfShips; i++) {
      if (ships[i].checkLocation(point)) {
        ships[i].getRidOf(ships[i].hitPoints.indexOf(point));
        if (ships[i].hitPoints == 0) {
          return removeShip(i);
        }
        else {
          return shipHit(ships[i].name);
        }
      }
    }
    return false;
  };

};

// making ships
const Ship = (name) => {
	let name = name;
	let length = 0;
	let hitPoints = [];

  populateHorzHits = (start) => {
		for (let i = 0; i < length; i++, start++) {
			hitPoints[i] = start;
		}
	};

	checkLocation = (loc) => {
		for (let i = 0; i < length; i++) {
			if (hitPoints[i] == loc){
        return true;
      }
		}
		return false;
	};

	getRidOf = (pos) => {
		hitPoints.splice(pos, 1);
	}
}

export {Fleet};
export {Ship};
