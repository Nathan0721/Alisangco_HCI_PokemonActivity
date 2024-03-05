// Pokemon Trainer Object
let pokemonTrainer = {
	myTrainer: {
		name: `Arnosky`,
		title: `Pokémon Trainer`,
		region: `Unova`
	},
	foeTrainer: {
		name: `Blue`,
		title: `Pokémon Trainer`,
		region: `Kanto`
	}
}

// Constructor Function For Creating Pokemon
function pokemon(name, gender, type, ability, item, level, exp, health, attack, speed) {
	this.name = name;
	this.gender = gender;
	this.type = type;
	this.ability = ability;
	this.item = item;
	this.level = level;
	this.exp = exp;
	this.health = health;
	this.attack = attack;
	this.speed = speed;
}

// Constructor Function For Pokemon Moves
function pokemonMove(name, type, damage) {
	this.name = name;
	this.type = type;
	this.damage = damage;
}

// Constructor Function For Battle Methods
function pokemonBattle(pokemonTrainer, pokemon, pokemonMove) {
	this.chantResult = function() {
		let crowdChant = [`Come on!`, `Fight!`, `Go go!`, `Whoo-woo!`, `Shriek!`];
		for (let i = 0; i < crowdChant.length; i++) {
			let randomChant = Math.floor(Math.random() * crowdChant.length);
			console.log(crowdChant[randomChant]);
		}
	}
	this.intro = function(foeTrainer) {
		console.log(`\nWhich Trainer will win the Champions Tournament?`);
		console.log(`\nThis Trainer makes the crowds go mad with excitement simply by participating in a tournament!`);
		console.log(`\n${pokemonTrainer.name} makes a dramatic appearance!\n`);
		this.chantResult();
		console.log(`\nChampions Tournament!\nThe final round!\nThe opponent is entering the arena!`);
		console.log(`\nThe strongest genes in ${foeTrainer.region}!\nProfessor Oak's grandson, ${foeTrainer.name}!\n`);
		this.chantResult();
		console.log(`\nThe final round!\n${foeTrainer.name} vs. ${pokemonTrainer.name}.`);
		console.log(`\n${foeTrainer.name}: I'll know if you are good or not by battling you right now.`);
		console.log(`\nYou are challenged by ${foeTrainer.title} ${foeTrainer.name}!`);
	}
	this.sendOut = function(foeTrainer, foePokemon) {
		if (foeTrainer != null && foePokemon != null) {
			console.log(`\n${foeTrainer.title} ${foeTrainer.name} sent out ${foePokemon.name}!`);
		}
		if (pokemon != null) {
			console.log(`\nYou sent out ${pokemon.name}!`);
		}
	}
	this.fightTurn = function(foeTrainer, foePokemon, foePokemonMove) {
		if (pokemon.speed > foePokemon.speed && (pokemon.health > 0)) {
			console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} used ${pokemonMove.name}!`);
			this.pokemonAction(foeTrainer, foePokemon, foePokemonMove, foeTrainer, foePokemon, foePokemonMove);
			if (foePokemon.health > 0) {
				console.log(`\n${foeTrainer.name}'s ${foePokemon.name} used ${foePokemonMove.name}!`);
				this.pokemonActionAlt(foeTrainer, foePokemon, foePokemonMove, foeTrainer, foePokemon, foePokemonMove);
			}
			this.gainLevel(foeTrainer, foePokemon);
		} else if (foePokemon.speed > pokemon.speed && (foePokemon.health > 0)) {
			console.log(`\n${foeTrainer.name}'s ${foePokemon.name} used ${foePokemonMove.name}!`);
			this.pokemonAction(foeTrainer, foePokemon, foePokemonMove, foeTrainer, foePokemon, foePokemonMove);
			if (pokemon.health > 0) {
				console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} used ${pokemonMove.name}!`);
				this.pokemonActionAlt(foeTrainer, foePokemon, foePokemonMove, foeTrainer, foePokemon, foePokemonMove);
			}
			this.gainLevel(foeTrainer, foePokemon);
		}
	}
	this.calculatePlayerDamage = function(foeTrainer, foePokemon, foePokemonMove) {
		if (pokemonMove.damage > 0) {
			pokemonMove.damage = (pokemon.attack * (pokemonMove.damage / 100)) / 2;
			let initialDamage = pokemonMove.damage;
			let effective = false;
			this.superEffective(foePokemon, foePokemonMove, initialDamage, effective);
			if (effective == true) {
				this.notEffective(pokemonMove, foePokemonMove, pokemon, foePokemon);
			}
			pokemonMove.damage = Math.ceil(pokemonMove.damage);
			foePokemon.health -= pokemonMove.damage;
			console.log(`\n${foeTrainer.name}'s ${foePokemon.name} took ${pokemonMove.damage} damage!`);
			if (foePokemon.ability == `Sturdy`) {
				foePokemon.health = 1;
			}
			if (foePokemon.health < 0) {
				foePokemon.health = 0;
				console.log(`\n${foeTrainer.name}'s ${foePokemon.name} fainted!`);
			} else if (foePokemon.ability == `Sturdy`) {
				console.log(`\n${foeTrainer.name}'s ${foePokemon.name} endured the hit with Sturdy!`);
			} else {
				console.log(`\n${foeTrainer.name}'s ${foePokemon.name}'s health has been reduced to ${foePokemon.health}!`)
			}
			if (pokemonMove.name == `Self-Destruct`) {
				pokemon.health -= 1;
				console.log(`\n${pokemon.name} died in a blaze of glory!`);
				console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} fainted!`);
			}
		}
	}
	this.calculateEnemyDamage = function(foeTrainer, foePokemon, foePokemonMove) {
		if (foePokemonMove.damage > 0) {
			foePokemonMove.damage = (foePokemon.attack * (foePokemonMove.damage / 100)) / 2;
			let initialDamage = foePokemonMove.damage;
			this.superEffective(foePokemon, foePokemonMove, initialDamage);
			if (effective == true) {
				this.notEffective(pokemonMove, foePokemonMove, pokemon, foePokemon);
			}
			foePokemonMove.damage = Math.ceil(foePokemonMove.damage);
			pokemon.health -= foePokemonMove.damage;
			console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} took ${foePokemonMove.damage} damage!`);
			if (pokemon.ability == `Sturdy`) {
				pokemon.health = 1;
			}
			if (pokemon.health < 0) {
				pokemon.health = 0;
				console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} fainted!`);
			} else if (pokemon.ability == `Sturdy`) {
				console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} endured the hit with Sturdy!`);
			} else {
				console.log(`\n${pokemonTrainer.name}'s ${pokemon.name}'s health has been reduced to ${pokemon.health}!`)
			}
			if (foePokemonMove.name == `Self-Destruct`) {
				foePokemon.health -= 1;
				console.log(`\n${foePokemon.name} died in a blaze of glory!`);
				console.log(`\n${foeTrainer.name}'s ${foePokemon.name} fainted!`);
			}
		}
	}
	this.calculateMoveEffect = function(foeTrainer, foePokemon, foePokemonMove) {
		if (pokemonMove.name == `Calm Mind`) {
			pokemon.attack *= 1.2;
			console.log(`\n${pokemonTrainer.name}'s' ${pokemon.name}'s attack rose!`);
		} else if (foePokemonMove.name == `Calm Mind`) {
			foePokemon.attack *= 1.2;
			console.log(`\n${foeTrainer.name}'s ${foePokemon.name}'s attack rose!`);
		}
	}
	this.pokemonAction = function(calculatePlayerDamage, calculateEnemyDamage, calculateMoveEffect, foeTrainer, foePokemon, foePokemonMove) {
		if (pokemon.speed > foePokemon.speed && (pokemon.health > 0)) {
			if (pokemonMove.damage > 0) {
				this.calculatePlayerDamage(foeTrainer, foePokemon, foePokemonMove);
			} else {
				this.calculateMoveEffect(foeTrainer, foePokemon, foePokemonMove);
			}
		} else if (foePokemon.speed > pokemon.speed && (foePokemon.health > 0)) {
			if (foePokemonMove.damage > 0) {
				this.calculateEnemyDamage(foeTrainer, foePokemon, foePokemonMove);
			} else {
				this.calculateMoveEffect(foeTrainer, foePokemon, foePokemonMove);
			}
		}
	}
	this.pokemonActionAlt = function(calculatePlayerDamage, calculateEnemyDamage, calculateMoveEffect, foeTrainer, foePokemon, foePokemonMove) {
		if (pokemon.speed > foePokemon.speed && (pokemon.health > 0)) {
			if (foePokemonMove.damage > 0) {
				this.calculateEnemyDamage(foeTrainer, foePokemon, foePokemonMove);
			} else {
				this.calculateMoveEffect(foeTrainer, foePokemon, foePokemonMove);
			}
		} else if (foePokemon.speed > pokemon.speed && (foePokemon.health > 0)) {
			if (pokemonMove.damage > 0) {
				this.calculatePlayerDamage(foeTrainer, foePokemon, foePokemonMove);
			} else {
				this.calculateMoveEffect(foeTrainer, foePokemon, foePokemonMove);
			}
		}
	}
	this.superEffective = function(foePokemon, foePokemonMove, initialDamage) {
		pokemonMove.damage = initialDamage;
		foePokemonMove.damage = initialDamage;
		if (pokemonMove.type == `Psychic` && foePokemon.type == `Fighting` && pokemonMove.name != `Calm Mind`) {
			pokemonMove.damage *= 2;
			console.log(`\nIt's super effective!`);
		} else if (foePokemonMove.type == `Psychic` && pokemon.type == `Fighting` && foePokemonMove.name != `Calm Mind`) {
			foePokemonMove.damage *= 2;
			console.log(`\nIt's super effective!`);
		}
		if (pokemonMove.type == `Fighting` && foePokemon.type == `Psychic` && pokemonMove.damage != 0) {
			pokemonMove.damage /= 2;
			console.log(`\nIt's not very effective...`);
		} else if (foePokemonMove.type == `Fighting` && pokemon.type == `Psychic` && foePokemonMove.damage != 0) {
			foePokemonMove.damage /= 2;
			console.log(`\nIt's not very effective...`);
		}
		if (pokemonMove.type == `Water` && foePokemon.type == `Rock/Ground`) {
			pokemonMove.damage *= 4;
			console.log(`\nIt's extremely effective!`);
		} else if (foePokemonMove.type == `Water` && pokemon.type == `Rock/Ground`) {
			pokemonMove.damage *= 4;
			console.log(`\nIt's extremely effective!`);
		}
		effective = true;
	}
	this.gainLevel = function(foeTrainer, foePokemon) {
		if (foePokemon.health == 0 && pokemon.health > 0) {
			pokemon.exp += 100;
			if (pokemon.exp >= 100) {
				pokemon.level++;
				pokemon.health += 5;
				pokemon.attack += 5;
				pokemon.speed += 5;
				console.log(`\n${pokemonTrainer.name}'s ${pokemon.name} is now Level ${pokemon.level}!\nYour stats have increased!`);
			}
		} else if (pokemon.health == 0 && foePokemon.health > 0) {
			foePokemon.exp += 100;
			if (foePokemon.exp >= 100) {
				foePokemon.level++;
				foePokemon.health += 5;
				foePokemon.attack += 5;
				foePokemon.speed += 5;
				console.log(`\n${foeTrainer.name}'s ${foePokemon.name} is now Level ${foePokemon.level}!\nEnemy stats have increased!`);
			}
		}
	}
	this.notEffective = function(pokemonMove, foePokemonMove, pokemon, foePokemon) {
    	if (pokemonMove.type !== 'Psychic' || foePokemon.type !== 'Fighting') {
        	pokemonMove.damage /= 2;
    	}
    	if (foePokemonMove.type !== 'Psychic' || pokemon.type !== 'Fighting') {
        	foePokemonMove.damage /= 2;
    	}
	};
	this.outro = function(foeTrainer) {
		console.log(`\n${foeTrainer.name}: How the heck did I lose to you?`);
		console.log(`\nThe winner is...\n${pokemonTrainer.name}!`);
		console.log(`\n${foeTrainer.name}: You're the real deal.\nYou're a good Trainer.\nBut I'm going to beat you someday.\nDon't you forget it!`);
		console.log(`\nThis concludes the Champions Tournament!\nSee you in the next tournament!`);
	}
}

// My Pokemon Team's Data Values
let myPokemon1 = new pokemon(`Machamp`, `Male`, `Fighting`, `Guts`, `Black Belt`, 50, 0, 197, 200, 117);
let myPokemon2 = new pokemon(`Blastoise`, `Male`, `Water`, `Torrent`, `Mystic Water`, 50, 0, 186, 155, 143);
let myPokemon3 = new pokemon(`Electivire`, `Male`, `Electric`, `Motor Drive`, `Magnet`, 50, 0, 182, 192, 161);

// Enemy Pokemon Team's Data Values
let foePokemon1 = new pokemon(`Alakazam`, `Male`, `Psychic`, `Synchronize`, `Twisted Spoon`, 50, 0, 162, 205, 189);
let foePokemon2 = new pokemon(`Golem`, `Male`, `Rock/Ground`, `Sturdy`, `Hard Stone`, 50, 0, 187, 1000, 106);
let foePokemon3 = new pokemon(`Dragonite`, `Female`, `Dragon/Flying`, `Inner Focus`, `Dragon Fang`, 50, 0, 198, 408, 145);

// My Machamp's Moveset
let pm_close_combat = new pokemonMove(`Close Combat`, `Fighting`, 120);
let pm_protect = new pokemonMove(`Protect`, `Normal`, 0);

// My Blastoise's Moveset
let pm_hydro_cannon = new pokemonMove(`Hydro Cannon`, `Water`, 150);
let pm_shell_smash = new pokemonMove(`Shell Smash`, `Normal`, 0);

// My Electivire's Moveset
let pm_thunder = new pokemonMove(`Thunder`, `Electric`, 110);

// Enemy Alakazam's Moveset
let pm_calm_mind = new pokemonMove(`Calm Mind`, `Psychic`, 0);
let pm_psychic = new pokemonMove(`Psychic`, `Psychic`, 90);

// Enemy Golem's Moveset
let pm_ancient_power = new pokemonMove(`Ancient Power`, `Rock`, 60);
let pm_self_destruct = new pokemonMove(`Self-Destruct`, `Normal`, 200);

// Enemy Dragonite's Moveset
let pm_outrage = new pokemonMove(`Outrage`, `Dragon`, 120);

// Creating New Constructor Function Varibales
let battleIntro = new pokemonBattle(pokemonTrainer.myTrainer, null, null);
let throwOut1 = new pokemonBattle(null, myPokemon1, null);
let battleTurn1 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon1, pm_close_combat);
let battleTurn2 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon1, pm_protect);
let throwOut2 = new pokemonBattle(null, myPokemon2, null);
let battleTurn3 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon2, pm_hydro_cannon);
let throwOut3 = new pokemonBattle(null, null, null);
let battleTurn4 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon2, pm_hydro_cannon);
let throwOut4 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon3, null);
let battleTurn5 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon3, pm_thunder);
let battleTurn6 = new pokemonBattle(pokemonTrainer.myTrainer, myPokemon3, pm_thunder);
let battleOutro = new pokemonBattle(pokemonTrainer.myTrainer, null, null)

// Displaying Pokemon Stats
let myPokemonArray = [myPokemon1, myPokemon2, myPokemon3];
let foePokemonArray = [foePokemon1, foePokemon2, foePokemon3];

console.log(`\n\n\n`);
console.log(`YOUR POKEMON TEAM\n\n`);

for (let i = 0; i < myPokemonArray.length; i++) {
    let pokemon = myPokemonArray[i];
    console.log("Name:", pokemon.name);
    console.log("Gender:", pokemon.gender);
    console.log("Type:", pokemon.type);
    console.log("Ability:", pokemon.ability);
    console.log("Item:", pokemon.item);
    console.log("Level:", pokemon.level);
    console.log("Exp:", pokemon.exp);
    console.log("Health:", pokemon.health);
    console.log("Attack:", pokemon.attack);
    console.log("Speed:", pokemon.speed);
    console.log("\n");
}

console.log(`ENEMY'S POKEMON TEAM\n\n`)

for (let i = 0; i < foePokemonArray.length; i++) {
    let pokemon = foePokemonArray[i];
    console.log("Name:", pokemon.name);
    console.log("Gender:", pokemon.gender);
    console.log("Type:", pokemon.type);
    console.log("Ability:", pokemon.ability);
    console.log("Item:", pokemon.item);
    console.log("Level:", pokemon.level);
    console.log("Exp:", pokemon.exp);
    console.log("Health:", pokemon.health);
    console.log("Attack:", pokemon.attack);
    console.log("Speed:", pokemon.speed);
    console.log("\n");
}

// Calling Constructor Functions
battleIntro.intro(pokemonTrainer.foeTrainer);
throwOut1.sendOut(pokemonTrainer.foeTrainer, foePokemon1);
battleTurn1.fightTurn(pokemonTrainer.foeTrainer, foePokemon1, pm_calm_mind);
battleTurn2.fightTurn(pokemonTrainer.foeTrainer, foePokemon1, pm_psychic);
throwOut2.sendOut(null, null);
battleTurn3.fightTurn(pokemonTrainer.foeTrainer, foePokemon1, pm_psychic);
throwOut3.sendOut(pokemonTrainer.foeTrainer, foePokemon2);
battleTurn4.fightTurn(pokemonTrainer.foeTrainer, foePokemon2, pm_self_destruct);
throwOut4.sendOut(pokemonTrainer.foeTrainer, foePokemon3);
console.log(`\nThe Final Battle!`);
battleTurn5.fightTurn(pokemonTrainer.foeTrainer, foePokemon3, pm_outrage);
battleTurn6.fightTurn(pokemonTrainer.foeTrainer, foePokemon3, pm_outrage);
console.log(`\nThe Battle Has Concluded!`);
battleOutro.outro(pokemonTrainer.foeTrainer);
