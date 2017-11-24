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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerBoard = undefined;

var _ai = __webpack_require__(1);

//  Creating gameboard
$(document).ready(function () {
  for (var i = 1; i <= 100; i++) {
    if (i < 11) {
      // top coordinates
      $(".enemy").prepend("<span class='aTops'>" + Math.abs(i - 11) + "</span>");
      $(".player").prepend("<span class='aTops'>" + Math.abs(i - 11) + "</span>");
      // first line of fields
      $(".grid").append("<li class='points offset1 " + i + "'><span></span></li>");
    } else {
      // all other lines of fields
      $(".grid").append("<li class='points offset2 " + i + "'><span></span></li>");
    }
    if (i == 11) {
      // "zero" coordinate filed
      $(".enemy").prepend("<span class='aTops hidezero'>" + Math.abs(i - 11) + "</span>");
      $(".player").prepend("<span class='aTops hidezero'>" + Math.abs(i - 11) + "</span>");
    }
    if (i > 90) {
      // left coordinates
      $(".enemy").append("<span class='aLeft'>" + String.fromCharCode(97 + (i - 91)).toUpperCase() + "</span>");
      $(".player").append("<span class='aLeft'>" + String.fromCharCode(97 + (i - 91)).toUpperCase() + "</span>");
    }
  }
  $(".text").text(massages.bridge);
});

var massages = {
  "bridge": " Captain! Welcome on the bridge. Ready to command our fleet?",
  "command": " Commander! Place the ships of our fleet to battle!",
  "self": " Captain! Use the mouse to place our ships on the left grid.",
  "overlap": " Captain! You can not overlap ships. Please try again.",
  "start": " Captain! Give us orders! Use the mouseclick to point out sector on the right radar screen which we should bombard.",
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

// Start the game setup
$(document).ready(function () {
  $(".one").on("click", function () {
    $(".text").text(massages.command);
    gameSetup(this);
  });
});

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
    $(".text").text(massages.sunk(this.name, this.ships[pos].name));
    if (this == playerFleet) _ai.bot.sizeOfShipSunk = this.ships[pos].length;
    this.ships.splice(pos, 1);
    if (this.ships.length == 0) {
      $(".text").text(massages.lost(this.name));
    }
    return true;
  };

  this.shipHit = function (ship_name) {
    $(".text").text(massages.hit(this.name));
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

var EnemyFleet = {
  allHits: [],

  highlight: function highlight(square) {
    $(square).addClass("target").off("mouseleave").on("mouseleave", function () {
      $(this).removeClass("target");
    });

    $(square).off("click").on("click", function () {
      if (!$(this).hasClass("used")) {
        $(this).removeClass("target").addClass("used");
        var numer = parseInt($(this).attr("class").slice(15));
        var boolean = cpuFleet.checkIfHit(numer);

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
        } else setTimeout(_ai.bot.select, 800);
      } // end of big if
    });
  } // end of method EnemyFleet.highlight
};

var playerBoard = exports.playerBoard = {
  currentHits: [],

  checkAttempt: function checkAttempt(hit) {
    if (playerFleet.checkIfHit(hit)) {
      playerBoard.currentHits.push(hit); // put hit into array

      if (this.currentHits.length > 1) _ai.bot.prev_hit = true;
      $(".player").find("." + hit).children().addClass("hit"); // display hit on grid

      if (playerBoard.hasShipBeenSunk()) {
        // clear flags
        _ai.bot.hunting = _ai.bot.prev_hit = false;
        if (_ai.bot.sizeOfShipSunk == playerBoard.currentHits.length) {
          _ai.bot.num_misses = _ai.bot.back_count = _ai.bot.nextMove.length = playerBoard.currentHits.length = _ai.bot.sizeOfShipSunk = _ai.bot.currrent = 0;
        } else {
          _ai.bot.special = _ai.bot.case1 = true;
        }
        // check for special cases
        if (_ai.bot.specialHits.length > 0) _ai.bot.special = true;
        // check for end of game.
      }
      return true;
    } else {
      $(".player").find("." + hit).children().addClass("miss");
      _ai.bot.current = playerBoard.currentHits[0];
      _ai.bot.prev_hit = false;
      if (playerBoard.currentHits.length > 1) {
        _ai.bot.back = true;
        _ai.bot.num_misses++;
      }
      if (_ai.bot.case2) {
        _ai.bot.special = true;
        _ai.bot.case2 = false;
      }
      return false;
    }
  },
  // check if ship was destroyed
  hasShipBeenSunk: function hasShipBeenSunk() {
    if (_ai.bot.sizeOfShipSunk > 0) return true;else return false;
  }
};

function gameSetup(t) {
  $(t).off() && $(".two").off();
  $(".one").addClass("self").removeClass("one").text("Place fleet");

  $(".self").off("click").on("click", function () {
    $(".text").text(massages.self);
    selfSetup(playerFleet);
  });
};

function selfSetup() {
  $(".self").addClass("horz").removeClass("self").text("Place ships");

  // create new fleet
  playerFleet = new Fleet("Our ");
  playerFleet.initShips();
  // light up ships when placing
  placeShip(playerFleet.ships[playerFleet.currentShip], playerFleet);
};

function startGame() {
  $(".layout").hide(1, function () {
    $(".console").addClass("col-xl-12");
  });
  $(".text").text(massages.start);
  // Generate all possible hits for Player 1
  for (var i = 0; i < 100; i++) {
    _ai.bot.randPool[i] = i + 1;
  }highlightBoard();
}

function createCpuFleet() {
  //random
  cpuFleet = new Fleet("Enemy");
  cpuFleet.initShips();
  randomSetup(cpuFleet);
}

function placeShip(ship, fleet) {
  $(".horz").off("click").on("click", function () {
    console.log("ship placement start");
  });
  $(".player").find(".points").off("mouseenter").on("mouseenter", function () {
    var num = $(this).attr('class').slice(15);
    displayShipHorz(parseInt(num), ship, this, fleet);
  });
};

function displayShipHorz(location, ship, point, fleet) {
  var endPoint = location + ship.length - 2;
  if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
    for (var i = location; i < location + ship.length; i++) {
      $(".player ." + i).addClass("highlight");
    }
    $(point).off("click").on("click", function () {
      setShip(location, ship, "horz", fleet, "self");
    });
  }
  $(point).off("mouseleave").on("mouseleave", function () {
    removeShipHorz(location, ship.length);
  });
};

function removeShipHorz(location, length) {
  for (var i = location; i < location + length; i++) {
    $(".player ." + i).removeClass("highlight");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bot", function() { return bot; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_jsx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_jsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_jsx__);



let bot = {
        back: false,
        hunting: false,
        prev_hit: false,
        first_hit: false,
        special: false,
        case1: false,
        case2: false,
        num_misses: 0,
        back_count: 0,
        randPool: [],
        nextMove: [],
        attempted: [],
        specialHits: [],
        direction: "",
        current: 0,
        numAttemptsAfterHit: 0,
        sizeOfShipSunk: 0,

        randomGen: function(size) {
          return Math.floor(Math.random() * size);
        },

        select: function() {
          if (bot.hunting) {
            bot.battleLogic();
          } else if (bot.special) {
            bot.specialCase();
          } else {
            // grab a random number from the pool and increase attempts
            bot.current = bot.randPool[bot.randomGen(bot.randPool.length)];
            bot.attempted.push(bot.current);
            bot.first_hit = true;
            // remove current guess from the random pool and check if hit
            bot.removeGuess(bot.randPool.indexOf(bot.current));
            bot.hunting = __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].checkAttempt(bot.current);
          }
          setTimeout(Object(__WEBPACK_IMPORTED_MODULE_0__app_jsx__["highlightBoard"])(), 50);
        },

        removeGuess: function(index) {
          bot.randPool.splice(index, 1);
        },

        battleLogic: function() {
          if (bot.first_hit) {
            bot.createMoves();
            bot.first_hit = false;
          }

          if (bot.num_misses > 1) {
            bot.specialCase();
          } else if (bot.back) {
            bot.back = false;
            bot.backy();
            bot.deployHit(bot.current);
          } else if (bot.prev_hit) {
            bot.continueHits();
            bot.deployHit(bot.current);
            console.log(bot.prev_hit);
          } else {
            bot.direction = bot.nextMove.pop();
            console.log(bot.direction + " " + bot.current);
            bot.getNumericalDirection(bot.direction);
            bot.prev_hit = bot.deployHit(bot.current);
            console.log(bot.prev_hit);
          }
        },

        deployHit: function(hit) {
          if (bot.special) {
            bot.specialCase();
          } else {
            bot.attempted.push(hit);
            bot.removeGuess(bot.randPool.indexOf(hit));
            return __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].checkAttempt(hit);
          }
        },

        createMoves: function() {
          if(bot.current == 1) {
            bot.getRandomMoves(["right", "down"]);
          }
          else if(bot.current == 10) {
            bot.getRandomMoves(["left", "down"]);
          }
          else if(bot.current == 91) {
            bot.getRandomMoves(["up", "right"]);
          }
          else if(bot.current == 100) {
            bot.getRandomMoves(["left", "up"]);
          }
          else if(!(bot.current % 10)){
            bot.getRandomMoves(["up", "down", "left"]);
          }
          else if(bot.current < 10) {
            bot.getRandomMoves(["right", "down", "left"]);
          }
          else if(bot.current % 10 == 1) {
            bot.getRandomMoves(["up", "right", "down"]);
          }
          else if(bot.current > 91) {
            bot.getRandomMoves(["up", "right", "left"]);
          }
          else {
            bot.getRandomMoves(["up", "right", "down", "left"]);
          }
        },

        getRandomMoves: function(possibleMoves) {
          while (possibleMoves.length != 0) {
            // pick a random direction
            let dir = bot.randomGen(possibleMoves.length);
            // Go Up
            if (possibleMoves[dir] == "up") {
              if (bot.randPool.some(function(x) { return x == bot.current - 10; })) {
                bot.nextMove.push("up");
              }
            }
            // Go right
            if (possibleMoves[dir] == "right") {
              if (bot.randPool.some(function(x) { return x == bot.current + 1; })) {
                bot.nextMove.push("right");
              }
            }
            // Go down
            if (possibleMoves[dir] == "down") {
              if (bot.randPool.some(function(x) { return x == bot.current + 10; })) {
                bot.nextMove.push("down");
              }
            }
            // Go left
            if (possibleMoves[dir] == "left") {
              if (bot.randPool.some(function(x) { return x == bot.current - 1; })) {
                bot.nextMove.push("left");
              }
            }
            possibleMoves.splice(dir, 1);
          }
        },

        getNumericalDirection: function(dir) {
          if (dir == "up") bot.current -= 10;
          if (dir == "right") bot.current += 1;
          if (dir == "down") bot.current += 10;
          if (dir == "left") bot.current -= 1;
          console.log(bot.current + " attempted " + bot.attempted);
          // check if already used
          if (bot.attempted.some(function(x) { return x == bot.current; }) && bot.specialHits.length == 0) {
            bot.current = __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits[0];
            if (bot.back_count > 1) bot.special = true;
            else bot.backy();
          }
          return false;
        },

        continueHits: function() {
          console.log("cont " + bot.direction);
          if (bot.direction == "up") {
            if (bot.checkLocation("up")) {
              bot.direction = "down";
              return bot.getNumericalDirection(bot.direction);
            } else return bot.getNumericalDirection(bot.direction);
          }
          if (bot.direction == "right") {
            if (bot.checkLocation("right")) {
              bot.direction = "left";
              return bot.getNumericalDirection(bot.direction);
            } else return bot.getNumericalDirection(bot.direction);
          }
          if (bot.direction == "down") {
            if (bot.checkLocation("down")) {
              bot.direction = "up";
              return bot.getNumericalDirection(bot.direction);
            } else return bot.getNumericalDirection(bot.direction);
          }
          if (bot.direction == "left") {
            if (bot.checkLocation("left")) {
              bot.direction = "right";
              return bot.getNumericalDirection(bot.direction);
            } else return bot.getNumericalDirection(bot.direction);
          }
        },

        backy: function() {
          bot.back_count++;
          if (bot.direction == "up") {
            bot.direction = "down";
            return bot.continueHits();
          }
          if (bot.direction == "right") {
            bot.direction = "left";
            return bot.continueHits();
          }
          if (bot.direction == "down") {
            bot.direction = "up";
            return bot.continueHits();
          }
          if (bot.direction == "left") {
            bot.direction = "right";
            return bot.continueHits();
          }
        },

        checkLocation: function(dir) {
          if (dir == "up") {
            if (bot.current < 11) return true
          }
          if (dir == "right") {
            if (bot.current % 10 == 0) return true
          }
          if (dir == "down") {
            if (bot.current > 90) return true
          }
          if (dir == "left") {
            if (bot.current % 10 == 1) return true
          }
          return false;
        },

        specialCase: function() {
          bot.num_misses = bot.back_count = bot.nextMove.length = 0;
          if (bot.case1) {
            bot.prev_hit = true;
            if (bot.getNewCurrent(bot.direction)) {
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length = 0;
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.push(bot.current);
              bot.first_hit = true;
              bot.prev_hit = false;
            }
            bot.special = bot.case1 = bot.back = false;
            bot.hunting = true;
            bot.sizeOfShipSunk = 0;
            bot.battleLogic();
          } else {
            if (bot.specialHits.length == 0) {
              for(let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length; i++) {
                bot.specialHits.push(__WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits[i]);
              }
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length = 0;
            }
            bot.current = bot.specialHits.pop();
            __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.push(bot.current);
            bot.special = bot.back = bot.prev_hit = false;
            bot.first_hit = bot.hunting = true;
            bot.battleLogic();
          }
        },

        getNewCurrent: function(direction) {
          let difference = __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length - bot.sizeOfShipSunk;
          if (bot.direction == "up") {
            bot.direction = "down";
            if (difference > 1) {
              bot.current += 10 * (__WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length - 1);
              let temp = bot.current + (10 * (difference - 1));
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.push(temp);
                temp += 10;
              }
              bot.case2 = true;
              return false;
            }
            bot.current += 10 * bot.sizeOfShipSunk;
            return true;
          }
          if (bot.direction == "right") {
            bot.direction = "left";
            if (difference > 1) {
              bot.current -= __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length - 1;
              let temp = bot.current + (difference - 1);
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.push(temp);
                temp -= 1;
              }
              bot.case2 = true;
              return false;
            }
            bot.current -= bot.sizeOfShipSunk;
            return true;
          }
          if (bot.direction == "down") {
            bot.direction = "up";
            if (difference > 1) {
              bot.current -= 10 * (__WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length - 1);
              let temp = bot.current - (10 * (difference - 1));
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.push(temp);
                temp -= 10;
              }
              bot.case2 = true;
              return false;
            }
            bot.current -= 10 * bot.sizeOfShipSunk;
            return true;
          }
          if (bot.direction == "left") {
            bot.direction = "right";
            if (difference > 1) {
              bot.current += __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length - 1;
              let temp = bot.current - (difference - 1);
              __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                __WEBPACK_IMPORTED_MODULE_0__app_jsx__["playerBoard"].currentHits.push(temp);
                temp += 1;
              }
              bot.case2 = true;
              return false;
            }
            bot.current += bot.sizeOfShipSunk;
            return true;
          }
        }
      };


/***/ })
/******/ ]);