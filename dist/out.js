/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 81);
/******/ })
/************************************************************************/
/******/ ({

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var playerFleet = void 0,
    cpuFleet = void 0;
var attemptedHits = [];

function Fleet(name) {
  this.name = name;
  this.shipDetails = [{ "name": "battleship", "length": 4 }, { "name": "cruiser", "length": 3 }, { "name": "cruiser", "length": 3 }, { "name": "frigate", "length": 2 }, { "name": "frigate", "length": 2 }, { "name": "frigate", "length": 2 }, { "name": "patrol-boat", "length": 1 }, { "name": "patrol-boat", "length": 1 }, { "name": "patrol-boat", "length": 1 }, { "name": "patrol-boat", "length": 1 }];
  this.numOfShips = this.shipDetails.length;
  this.ships = [];
  this.currentShipSize = 0;
  this.currentShip = 0;
  this.initShips = function () {
    for (var i = 0; i < this.numOfShips; i++) {
      this.ships[i] = new Ship(this.shipDetails[i].name);
      this.ships[i].length = this.shipDetails[i].length;
    }
  };

  this.removeShip = function (pos) {
    this.numOfShips--;
    $(".text").text(output.sunk(this.name, this.ships[pos].name));
    if (this == playerFleet) bot.sizeOfShipSunk = this.ships[pos].length;
    this.ships.splice(pos, 1);
    if (this.ships.length == 0) {
      $(".text").text(output.lost(this.name));
    }
    return true;
  };

  this.shipHit = function (ship_name) {
    $(".text").text(output.hit(this.name));
    return true;
  };

  this.checkIfHit = function (point) {
    for (var i = 0; i < this.numOfShips; i++) {
      if (this.ships[i].checkLocation(point)) {
        this.ships[i].getRidOf(this.ships[i].hitPoints.indexOf(point));
        if (this.ships[i].hitPoints == 0) return this.removeShip(i);else return this.shipHit(this.ships[i].name);
      }
    }
    return false;
  };
}

function Ship(name) {
  this.name = name;
  this.length = 0;
  this.hitPoints = [];

  this.populateHorzHits = function (start) {
    for (var i = 0; i < this.length; i++, start++) {
      this.hitPoints[i] = start;
    }
  };

  this.populateVertHits = function (start) {
    for (var i = 0; i < this.length; i++, start += 10) {
      this.hitPoints[i] = start;
    }
  };

  this.checkLocation = function (loc) {
    for (var i = 0; i < this.length; i++) {
      if (this.hitPoints[i] == loc) return true;
    }
    return false;
  };

  this.getRidOf = function (pos) {
    this.hitPoints.splice(pos, 1);
  };
}

var output = {
  "welcome": " Captain! Welcome on board. Ready to command our fleet?",
  "player1": " Commander! Place the ships of our fleet to battle!",
  "self": " Captain! Use the mouse to place our ships on the left grid.",
  "overlap": " Captain! You can not overlap ships. Please try again.",
  "start": " Captain! Give us order where we should shoot! Use the mouse to show sector on the right radar screen where we should bombard.",
  placed: function placed(name) {
    return " Captain our " + name + " been placed.";
  },
  hit: function hit(name) {
    return " " + name + " ship was hit.";
  },
  miss: function miss(name) {
    return " " + name + " missed!";
  },
  sunk: function sunk(user) {
    return " " + user + " ship was sunk!";
  },
  lost: function lost(name) {
    return " " + name + " has lost his fleet!!  Game Over.";
  }
};

/***/ })

/******/ });