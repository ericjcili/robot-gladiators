// function to set name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, // comma!
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
};
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];
var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLowerCase();

  if (confirmSkip) {
    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
    // subtract money from playerMoney for skipping, but don't let them go into the negative
    playerInfo.money = Math.max(0, playerInfo.money - 10);

    // return true if player wants to leave
    return true;
  }
  }
var fight = function(enemy) {
  while(playerInfo.health > 0 && enemy.health > 0) {
    while (playerInfo.health > 0 && enemy.health > 0) {
      fightOrSkip(); // <-- Replace code with this function call
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.Name + " has died!");
      break;
    } else {
      window.alert(enemy.Name + " still has " + enemy.health + " health left.");
    }
  
    // remove player's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.Attack - 3, enemy.Attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.Name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
  
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
    // if player choses to skip
  } if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      console.log("playerInfo.money", playerInfo.money);
      break;
    }
    // if no (false), ask question again by running fight() again
    else {
      fight();
    }
  }
  }
};
var startGame = function() {
  playerInfo.reset();
  playerInfo.health = 100;
  playerInfo.attack = 10;
  playerInfo.money = 10;
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
          var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        
          // if yes, take them to the store() function
          if (storeConfirm) {
            shop();
          }
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  endGame();
};
var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
  // restart the game
  startGame();
} 
else {
  window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
};
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  switch (shopOptionPrompt) {
    case "REFILL":
case "refill":
  playerInfo.refillHealth();
  break;
case "UPGRADE":
case "upgrade":
  playerInfo.upgradeAttack();
  break;
    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};
startGame();