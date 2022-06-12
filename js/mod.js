let modInfo = {
	name: "Treeception",
	id: "treeception",
	author: "Johanniklas",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "Milestones are fun",
}

let changelog = `<h1>Changelog:</h1><br>
<h2>Current Endgame: Prestige Milestone 1</h2><br>
<h3>v0.3</h3><br>
		- Added a softcap and hardcap to prestige points<br>
		- Added two prestige upgrades and a prestige milestone<br>
		- Added two Prestige Booster and two Power Plant Milestones<br>
		- Replaced a Prestige Booster and a Power Plant Upgrade with a Milestone<br><br>
<h3>v0.2</h3><br>
		- Hard reset is recommended<br>
		- Reworked the Layer 1 reset layer, it's now the prestige reset layer<br>
		- Renamed testige layer, it's now the Prestige Booster layer<br>
		- Added the Power Plant layer<br>
		- When you choose either Power Plants or Prestige Boosters, the other one will get more expensive (once you have one of each, both will behave as if you chose them first) <br>
		- Some balancing changes<br><br>
<h3>v0.1</h3><br>
		- Added some Prestige Upgrades.<br>
		- Added the testige layer, which is basically the same layer as the prestige layer just based on prestige points instead.<br>
		- This will most likely be temporarily<br><br>
	<h3>v0.0</h3><br>
		- First Version.<br>
		- Points and Prestige Points were already a thing.`

let winText = `Congratulations! You have reached the current end of the game.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "getSoftcap"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2).times(player['b'].points.divide(10).add(1))
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 32) && !hasUpgrade('c', 11)) gain = new Decimal(0)
	if (hasUpgrade('p', 32) && hasUpgrade('c', 11) && (player['b'].best > 0 || player['pp'].best > 0)) gain = gain.add(100)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.b.points.gte(25) && player.pp.points.gte(25)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}