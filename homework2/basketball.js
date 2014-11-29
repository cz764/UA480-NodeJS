var heatVsSpur_data = require('./heatVsSpur.json'),
	myData 			= JSON.stringify(heatVsSpur_data),
	// players			= JSON.parse(myData),
	request 		= require('request');

function handleReq(err,data) {
	var players = JSON.parse(data);
	function getTeamNames(players) {
	var teamNames = [2];
	teamNames[0] = players[0].team;
	players.forEach(function(player){
		if (teamNames[0] !== player.team) {
			teamNames.push(player.team);
		}
	});
	return teamNames;
}
// console.log("The two teams are: " + getTeamNames(players)[0] + " and " + getTeamNames(players)[1]);

// Final Score
// ========================================================
function isInTeam(player, teamName) {
	return player.team === teamName;
}

function getTotalScore(players, teamName) {	
	var thePlayers = players.filter(function(player) {
		return isInTeam(player, teamName);
	});
	if(thePlayers.length > 0) {
		return thePlayers.reduce(function(curPoint, nextPlayer){
		return (curPoint + 3 * nextPlayer.threesMade + 2 * (nextPlayer.fieldGoalsMade - 
				nextPlayer.threesMade) + 1 * nextPlayer.freeThrowsMade);
		}, 0);
	} else {
		return "Invalid team name";
	}	
}
console.log("Final Score: " + getTeamNames(players)[0] + " " + 
			getTotalScore(players, getTeamNames(players)[0]) + ', ' + 
			getTeamNames(players)[1] + " " + getTotalScore(players, getTeamNames(players)[1]));
console.log("=====");

// Player with Highest Percentage of Points from Three Pointers
// =========================================================
function scoredTenMorePoints(player) {
	return (3 * player.threesMade + 2 * (player.fieldGoalsMade - player.threesMade) + 
			1 * player.freeThrowsMade) >= 10 ;
}
function getTotalPoints(player) {
	return (3 * player.threesMade + 2 * (player.fieldGoalsMade - player.threesMade) + 
			1 * player.freeThrowsMade);
}

function theBestThreePlayer(players) {
	var candidates = players.filter(function(player){
		return scoredTenMorePoints(player);
	});
	return candidates.reduce(function(maxPlayer, nextPlayer){		
		if (maxPlayer.threesMade * 3 / getTotalPoints(maxPlayer) < 
			nextPlayer.threesMade * 3 / getTotalPoints(nextPlayer)) { 
			maxPlayer = nextPlayer; 
		}
		return maxPlayer;
	}, players[0]);
}

console.log("* Player with highest percentage of points from three pointers: " + 
	theBestThreePlayer(players).name);

// Team With Most Rebounds
// =========================================================
function teamWithMostRebonds(players, teamNames) {
	var numOfRebonds1 = players.filter(function(player) {  // number of rebonds for team one
		return isInTeam(player, teamNames[0]);
	}).reduce(function(rebonds, nextPlayer){
		return (rebonds + nextPlayer.defensiveRebounds + nextPlayer.offensiveRebounds);
	}, 0);
	var numOfRebonds2 = players.filter(function(player) {  // number of rebonds for the other team
		return isInTeam(player, teamNames[1]);
	}).reduce(function(rebonds, nextPlayer){
		return (rebonds + nextPlayer.defensiveRebounds + nextPlayer.offensiveRebounds);
	}, 0);

	if (numOfRebonds1 >= numOfRebonds2) {
		return teamNames[0] + " with " + numOfRebonds1;
	} else {
		return teamNames[1] + " with " + numOfRebonds2;
	}
}
console.log("* Team with most rebounds: " + teamWithMostRebonds(players, getTeamNames(players)));

// Non Guard Player With Most Assists
// =========================================================
function nonGuardPlayerWithMostAssists(players) {
	var thePlayer = players.filter(function(player){
		return player.position !== 'G';
	}).reduce(function(maxPlayer, nextPlayer){
		if (maxPlayer.assists < nextPlayer.assists) maxPlayer = nextPlayer;
		return maxPlayer;
	}, players[0]);
	return thePlayer.name + " with " + thePlayer.assists;
}
console.log("* Non guard player with most assists: " + nonGuardPlayerWithMostAssists(players));

// Players With More Turnovers Than Assists
// =========================================================
function playerWithMoreTurnoverThanAssists(players) {
	var theBadPlayers = players.filter(function(player){
		return player.turnovers > player.assists;
	});
	return theBadPlayers;
}
console.log("* Players with more turnovers than assists: ");
playerWithMoreTurnoverThanAssists(players).forEach(function(player){ console.log(" " + player.name)} );

}
// part2: retrieving JSON using file
// =========================================================
handleReq(0, myData);

// part3: retrieving JSON using request module
// =========================================================
request('http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-06-15-heat-spurs.json',
	  function(err, response, body){
	 	handleReq(err, body);
	 }
);
request('http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-04-09-thunder-clippers.json',
	  function(err, response, body){
	 	handleReq(err, body);
	 }
);


