//============HERO SETUP===========================//
var stageProgress = 0;


var player = {
	health: 100,
	cHealth: 100,
	level: 1,
	atk: 10,
	res: 2,
	gold: 0,
	upgradeCost: 10,
	stage: 1
}

var entity;

function generateEntity(stage){
	var health = 100 + (2 * stage);
	var healthCurr = health;
	var atk = 5 + (Math.floor(1.25 * stage));
	var res = 2 + (Math.floor(0.85 * stage));
	var gold = 3 + (Math.floor(1.15 * stage));

	var entity = {
		health: health,
		healthCurr: healthCurr,
		atk: atk,
		res: res,
		gold: gold
	}

	return entity;
}

function updateScreen(){
	var pAtk = document.getElementById("hero-atk");
	var pRes = document.getElementById("hero-res");
	var pLev = document.getElementById("hero-level");
	var pBtn = document.getElementById("heroLevelUpBtn");
	var pGold = document.getElementById("hero-gold");

	pAtk.innerHTML = "Atk: " + player.atk;
	pRes.innerHTML = "Res: " + player.res;
	pLev.innerHTML = "Lv: " + player.level;
	pBtn.innerHTML = player.upgradeCost + "Gold";
	pGold.innerHTML = player.gold + " Gold";
}

function updateHealthBar(){
	var eHealth_text = document.getElementById("entity-health-text");
	var eHealth_bar = document.getElementById("entity-health-current");
	var pHealth_text = document.getElementById("hero-health-text");
	var pHealth_bar = document.getElementById("hero-health-current");

	var calc_eHealth = (entity.healthCurr / entity.health) * 100;
	var calc_pHealth = (player.cHealth / player.health) * 100;

	if(calc_eHealth <= 0){
		calc_eHealth = 0;
		stageProgress += 1;
		if(stageProgress >= 10){
			player.stage += 1;
			stageProgress = 0;
		} 
		entity = generateEntity(player.stage);
		gainSpoils(entity.gold);
		updateScreen();
		updateHealthBar();
	}
	if(calc_pHealth <= 0){calc_pHealth = 0}

	eHealth_text.innerHTML = "HP: "  + entity.healthCurr + "/" + entity.health;
	eHealth_bar.style.width = calc_eHealth + "%";

	pHealth_text.innerHTML = player.cHealth + "/" + player.health;
	pHealth_bar.style.width = calc_pHealth + "%";
}


function levelUp(){
	if(player.gold >= player.upgradeCost){
		player.level += 1;
		player.atk += 2;
		player.res += 1;
		console.log(player.health);
		player.health += 35;
		player.cHealth = player.health;
		player.gold -= player.upgradeCost;
		if(player.gold < 0){
			player.gold = 0;
		}
		player.upgradeCost = Math.floor(player.upgradeCost * 1.25);
		updateScreen();	
		updateHealthBar();
	}
}

function gainSpoils(n){
	player.gold += n;
	updateScreen();
}

function dealDamage(){
	var damage =  (player.atk + (Math.floor(Math.random() * 10) + 1)) - entity.res;
	if(damage < 0){
		damage = 0;
	}
	entity.healthCurr -= damage;

	showNumbers(damage);
	updateScreen();
	updateHealthBar();
}






//============ANIMATION FUNCTIONS=================//

function showNumbers(n){
	var getNum = document.getElementById("damageNum");
	damageNum.innerHTML = n;
	damageNum.style.display = "block";

	setTimeout(function(){
		var getNum = document.getElementById("damageNum");
		damageNum.style.display = "none";
	},1000);
}