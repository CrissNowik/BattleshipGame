import {playerBoard} from './app.jsx';
import{highlightBoard, startGame} from './app.jsx';

export  let ai = {
        num_misses: 0,
        back_count: 0,
        back: false,
        hunting: false,
        prev_hit: false,
        first_hit: false,
        special: false,
        case1: false,
        case2: false,
        randPool: [],
        nextMove: [],
        attempted: [],
        specialHits: [],
        direction: "",
        current: 0,
        numAttemptsAfterHit: 0,
        sizeOfShipSunk: 0,
        resqueArray: ["up", "right", "down", "left"], //resque mode
// random generator
        randomGen: function(size) {
          return Math.floor(Math.random() * size);
        },

        select: function() {
          if (ai.hunting) {
            ai.battleLogic();
          } else if (ai.special) {
            ai.specialCase();
          } else {
// random number from the pool and increase attempts
            ai.current = ai.randPool[ai.randomGen(ai.randPool.length)];
            ai.attempted.push(ai.current);
            ai.first_hit = true;
// remove guess from the random pool and check if hit
            ai.removeGuess(ai.randPool.indexOf(ai.current));
            ai.hunting = playerBoard.checkAttempt(ai.current);
          }
          setTimeout(highlightBoard(), 50);
        },

        removeGuess: function(index) {
          ai.randPool.splice(index, 1);
        },

        battleLogic: function() {
          if (ai.first_hit) {
            ai.createMoves();
            ai.first_hit = false;
          }

          if (ai.num_misses > 1) {
              ai.specialCase();
          } else if (ai.back) {
              ai.back = false;
              ai.backy();
              ai.deployHit(ai.current);
          } else if (ai.prev_hit) {
              ai.continueHits();
              ai.deployHit(ai.current);
              console.log("ai.prev_hit = " + ai.prev_hit);
          } else {
                console.log("TEST 1 - ai.direction ai.current = " + ai.direction + " " + ai.current);
                ai.direction = ai.nextMove.pop();
//start resque mode
                if (isNaN(ai.current) || ai.current <= 0 || ai.current === undefined) {
                  ai.current = ai.randPool[ai.randomGen(ai.randPool.length)];
                  console.log("Resque mode - current");
                }
                if (ai.direction === undefined) {
                  ai.direction = ai.resqueArray[ai.randomGen(ai.resqueArray.length)];
                  console.log("Resque mode - direction");
                }
//end resque mode
              console.log("TEST 2 - ai.direction ai.current = " + ai.direction + " " + ai.current);
              ai.getNumericalDirection(ai.direction);
              ai.prev_hit = ai.deployHit(ai.current);
              console.log("ai.prev_hit = " + ai.prev_hit);
          }
        },
        //*** basic ***
        // else {
        //     ai.direction = ai.nextMove.pop();
        //     console.log("ai.direction ai.current = " + ai.direction + " " + ai.current);
        //     ai.getNumericalDirection(ai.direction);
        //     ai.prev_hit = ai.deployHit(ai.current);
        //     console.log("ai.prev_hit = " + ai.prev_hit);
        // }
        //
        // *** Resque mode v1 ***
        //   if (isNaN(ai.current)) {
        //   ai.current = ai.randPool[ai.randomGen(ai.randPool.length)];
        //   console.log("Resque mode - current");
        // }
        // if (ai.direction === undefined) {
        //   ai.direction = ai.resqueArray[ai.randomGen(ai.resqueArray.length)];
        //   console.log("Resque mode - direction");
        // }

        deployHit: function(hit) {
          if (ai.special) {
            ai.specialCase();
          } else {
            ai.attempted.push(hit);
            ai.removeGuess(ai.randPool.indexOf(hit));
            return playerBoard.checkAttempt(hit);
          }
        },

        createMoves: function() {
          if(ai.current == 1) { // left top corner
            ai.getRandomMoves(["right", "down"]);
          }
          else if(ai.current == 10) { // right top corner
            ai.getRandomMoves(["down", "left"]);  // "left", "down"
          }
          else if(ai.current == 91) { // left bottom corner
            ai.getRandomMoves(["up", "right"]);
          }
          else if(ai.current == 100) { // right bottom corner
            ai.getRandomMoves(["left", "up"]);
          }
          else if(!(ai.current % 10)){ // right column
            ai.getRandomMoves(["up", "down", "left"]);
          }
          else if(ai.current < 10) { // 2-9 first row
            ai.getRandomMoves(["right", "down", "left"]);
          }
          else if(ai.current % 10 == 1) { // left column
            ai.getRandomMoves(["down", "right", "up"]); // "up", "right", "down"
          }
          else if(ai.current > 91) { // 92-99 last row
            ai.getRandomMoves(["left", "up", "right"]); //  "up", "right", "left"
          }
          else { // center
            ai.getRandomMoves(["up", "right", "down", "left"]);
          }
        },

        getRandomMoves: function(possibleMoves) {
          while (possibleMoves.length != 0) {
// pick a random direction
            let dir = ai.randomGen(possibleMoves.length);
// Go top
            if (possibleMoves[dir] === "up") {
              if (ai.randPool.some(function(x) { return x == ai.current - 10; })) {
                ai.nextMove.push("up");
              }
            }
// Go bottom
            if (possibleMoves[dir] === "down") {
              if (ai.randPool.some(function(x) { return x == ai.current + 10; })) {
                ai.nextMove.push("down");
              }
            }
// Go right
            if (possibleMoves[dir] === "right") {
              if (ai.randPool.some(function(x) { return x == ai.current + 1; })) {
                ai.nextMove.push("right");
              }
            }
// Go left
            if (possibleMoves[dir] === "left") {
              if (ai.randPool.some(function(x) { return x == ai.current - 1; })) {
                ai.nextMove.push("left");
              }
            }
            possibleMoves.splice(dir, 1);
          }
        },

        getNumericalDirection: function(directory) {
          if (directory === "up") ai.current -= 10;
          if (directory === "down") ai.current += 10;
          if (directory === "right") ai.current += 1;
          if (directory === "left") ai.current -= 1;
//start resque mode
          if (directory === undefined) {
            ai.current = ai.randPool[ai.randomGen(ai.randPool.length)];
            console.log("Resque mode - getNumericalDirection " + ai.current);
          }
//end resque mode
          console.log("ai.current = " + ai.current + " attempted = " + ai.attempted);
// check if used
          if (ai.attempted.some(function(x) { return x == ai.current; }) && ai.specialHits.length == 0) {
            ai.current = playerBoard.currentHits[0];
            if (ai.back_count > 1) {
              ai.special = true;
            } else {
              ai.backy();
            }
          }
          return false;
        },
// do it if hit
        continueHits: function() {
          console.log("cont = " + ai.direction);
          if (ai.direction == "up") {
            if (ai.checkLocation("up")) {
              ai.direction = "down";
              return ai.getNumericalDirection(ai.direction);
            } else return ai.getNumericalDirection(ai.direction);
          }
          if (ai.direction == "right") {
            if (ai.checkLocation("right")) {
              ai.direction = "left";
              return ai.getNumericalDirection(ai.direction);
            } else return ai.getNumericalDirection(ai.direction);
          }
          if (ai.direction == "down") {
            if (ai.checkLocation("down")) {
              ai.direction = "up";
              return ai.getNumericalDirection(ai.direction);
            } else return ai.getNumericalDirection(ai.direction);
          }
          if (ai.direction == "left") {
            if (ai.checkLocation("left")) {
              ai.direction = "right";
              return ai.getNumericalDirection(ai.direction);
            } else return ai.getNumericalDirection(ai.direction);
          }
        },
// revert hits direction
        backy: function() {
          ai.back_count++;
          if (ai.direction == "up") {
            ai.direction = "down";
            return ai.continueHits();
          }
          if (ai.direction == "right") {
            ai.direction = "left";
            return ai.continueHits();
          }
          if (ai.direction == "down") {
            ai.direction = "up";
            return ai.continueHits();
          }
          if (ai.direction == "left") {
            ai.direction = "right";
            return ai.continueHits();
          }
        },

        checkLocation: function(dir) {
          if (dir == "up") {
            if (ai.current < 11) return true
          }
          if (dir == "right") {
            if (ai.current % 10 == 0) return true
          }
          if (dir == "down") {
            if (ai.current > 90) return true
          }
          if (dir == "left") {
            if (ai.current % 10 == 1) return true
          }
          return false;
        },

        specialCase: function() {
          ai.num_misses = ai.back_count = ai.nextMove.length = 0;
          if (ai.case1) {
            ai.prev_hit = true;
            if (ai.getNewCurrent(ai.direction)) {
              playerBoard.currentHits.length = 0;
              playerBoard.currentHits.push(ai.current);
              ai.first_hit = true;
              ai.prev_hit = false;
            }
            ai.special = ai.case1 = ai.back = false;
            ai.hunting = true;
            ai.sizeOfShipSunk = 0;
            ai.battleLogic();
          } else {
            if (ai.specialHits.length === 0) {
              for(let i = 0; i < playerBoard.currentHits.length; i++) {
                ai.specialHits.push(playerBoard.currentHits[i]);
              }
              playerBoard.currentHits.length = 0;
            }
            ai.current = ai.specialHits.pop();
            playerBoard.currentHits.push(ai.current);
            ai.special = ai.back = ai.prev_hit = false;
            ai.first_hit = ai.hunting = true;
            ai.battleLogic();
          }
        },
// after ship destroy
        getNewCurrent: function(direction) {
          let difference = playerBoard.currentHits.length - ai.sizeOfShipSunk;
          if (ai.direction == "up") {
            ai.direction = "down";
            if (difference > 1) {
              ai.current += 10 * (playerBoard.currentHits.length - 1);
              let temp = ai.current + (10 * (difference - 1));
              playerBoard.currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                playerBoard.currentHits.push(temp);
                temp += 10;
              }
              ai.case2 = true;
              return false;
            }
            ai.current += 10 * ai.sizeOfShipSunk;
            return true;
          }
          if (ai.direction == "right") {
            ai.direction = "left";
            if (difference > 1) {
              ai.current -= playerBoard.currentHits.length - 1;
              let temp = ai.current + (difference - 1);
              playerBoard.currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                playerBoard.currentHits.push(temp);
                temp -= 1;
              }
              ai.case2 = true;
              return false;
            }
            ai.current -= ai.sizeOfShipSunk;
            return true;
          }
          if (ai.direction == "down") {
            ai.direction = "up";
            if (difference > 1) {
              ai.current -= 10 * (playerBoard.currentHits.length - 1);
              let temp = ai.current - (10 * (difference - 1));
              playerBoard.currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                playerBoard.currentHits.push(temp);
                temp -= 10;
              }
              ai.case2 = true;
              return false;
            }
            ai.current -= 10 * ai.sizeOfShipSunk;
            return true;
          }
          if (ai.direction == "left") {
            ai.direction = "right";
            if (difference > 1) {
              ai.current += playerBoard.currentHits.length - 1;
              let temp = ai.current - (difference - 1);
              playerBoard.currentHits.length = 0;
              for (let i = 0; i < difference; i++) {
                playerBoard.currentHits.push(temp);
                temp += 1;
              }
              ai.case2 = true;
              return false;
            }
            ai.current += ai.sizeOfShipSunk;
            return true;
          }
        }
      };
