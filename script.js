      const gameContainer = document.getElementById("game");

      //Clears picks and resets the game
      let pick1 = null;
      let pick2 = null;
      let picks = 0;

      //Color array
      const COLORS = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "red",
      "blue",
      "green",
      "orange",
      "purple"
];

      // here is a helper function to shuffle an array
      // it returns the same array with values shuffled
      // it is based on an algorithm called Fisher Yates if you want ot research more
      function shuffle(array) {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
}

      return array;
}

      let shuffledColors = shuffle(COLORS);

      // this function loops over the array of colors
      // it creates a new div and gives it a class with the value of the color
      // it also adds an event listener for a click for each card
      function createDivsForColors(colorArray) {
      for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
}}
      //variable to not allow more than 2 flipped at a time
      let picking = false;

      // function to flip cards and look for pairs
      function handleCardClick(event) {

      //if 2 cards are picked will return to stop 3rd from turning
      if (picking) return;

      //looks to see if card is already turned and will return if true
      if (event.target.classList.contains("turned")) return;

      //changes the backgroundColor of the card to the class
      let currentPick = event.target;
      currentPick.style.backgroundColor = currentPick.classList[0];
      
      //sets the picked card to turned and then puts the currentpick into pick1 or pick2. This gave me headaches trying to get this figured     out. 
      if (!pick1 || !pick2) {
      currentPick.classList.add("turned");
      if (!pick1 && !pick2){
      pick1 = currentPick;
}
      else if (pick1 && !pick2){
      pick2 = currentPick;
}}
      //once both pick1 and pick2 have cards 
      if (pick1 && pick2) {
      picking = true;

      //Checks if picks are the same
      if (pick1.className === pick2.className){
      //Counts matches
      picks += 2;
      //Removes Event Listener so card can't be clicked again
      pick1.removeEventListener("click", handleCardClick);
      pick2.removeEventListener("click", handleCardClick);
      //Clears picks
      pick1 = null;
      pick2 = null;
      //Sets picking to false to indicate current pick cycle is complete
      picking = false;
}   
      //If picks are not the same
      else {
      //creates a function with timeout after 1 sec
      setTimeout(function() {
      //sets background color to default
      pick1.style.backgroundColor = "";
      pick2.style.backgroundColor = "";
      //removes turned status from picks
      pick1.classList.remove("turned");
      pick2.classList.remove("turned");
      //Clears picks
      pick1 = null;
      pick2 = null;
      //Sets picking to false
      picking = false;
}     ,1000)//time set reference
}}
      //tells if game is over
      if (picks == 10) alert("Game Over")

}
      // when the DOM loads
      createDivsForColors(shuffledColors);
