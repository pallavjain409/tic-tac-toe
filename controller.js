function initializeGame() {
  initializeSeries();
  startGame();
}
initializeGame();

function startGame() {
  addClickListenersToCells();
  displayScores(getScoreForPlayerP1(), getScoreForPlayerP2());
}

function cellTapped(event) {
  const gridNumber = event.target.id;
  const player = whoseTurnNext();
  event.target.classList.add(player == players.player1 ? "zero" : "cross");
  aMoveMade(player, gridNumber);
  const gameStatus = getGameResultStatus(player);
  if (gameStatus != GameStatus.notEnded) {
    endGame(gameStatus);
  } else {
    $("#" + gridNumber).off('click', cellTapped);
  }
}

function endGame(gameStatus) {
  displayWinningMoves(getWinningArray());
  displayGameResult(gameStatus);
  makeScreenUnTappable();
  updatePlayerScore(gameStatus);
  displayScores(getScoreForPlayerP1(), getScoreForPlayerP2());
  }
  function displayWinningMoves(winningArray){
    for(let gridNumber of winningArray){
      console.log(gridNumber);
      $('#' + gridNumber).addClass('winning-moves');
    }
  }

function makeScreenUnTappable() {
  $(".square").off('click', cellTapped);
}

function askUserForNextGame() {
  if (confirm("Do you want to play 1 more game?")) {
    resetGame();

  }
}
function resetGame(){
  initializeView();
  initializeGame();
}
function addClickListenersToCells() {
  $(".square").on('click', cellTapped);
}

function displayScores(player1Score, player2Score) {
  $("#player1score").text(player1Score);
  $("#player2score").text(player2Score);
}

function displayGameResult(gameResult) {
  console.log(getGameResultString(gameResult))
  $('.gameResult h1').text(getGameResultString(gameResult));

}
function initializeView(){
  clearBoard();
  resetResults();
}
function clearBoard(){
  $('.square').removeClass('zero cross winning-moves');
}
function resetResults(){
  $('.gameResult h1').text("");
}
