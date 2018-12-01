var satisfactionProgressBar;
var moneyField;
var dayField;
var weekField;

var selectSacrifice;

var victimSeparationChar = ':';
var hungryText = "(hungry)";

var daysToWeek = 7;

function init(){
    selectSacrifice = document.getElementById("victimSelect");
    satisfactionProgressBar = document.getElementById("godsSatisfaction");
    moneyField = document.getElementById("moneyField");
    dayField = document.getElementById("day");
    weekField = document.getElementById("week");

    GameData.godsSacrificesDemand = Math.floor(Math.random(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK));
    GameData.money = Rules.STARTING_MONEY;

    refreshSacrifices();
    updateSatisfactionSlider();
    updateOperationStatus();
}

function updateOperationStatus(){
    moneyField.textContent = GameData.money;
    dayField.textContent = GameData.day;
    weekField.textContent = GameData.week;
}

function refreshSacrifices(){
    removeOptions(selectSacrifice);
    GameData.victims.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + victimSeparationChar + " " +  element.name + " " + element.surname + " " + (element.isHungry() ?  hungryText : "");
        selectSacrifice.add(option)
    });
}

function sacrifice(){
    var selectedID = parseInt(selectSacrifice.value.split(victimSeparationChar)[0]);
    var victim = getVictim(selectedID);
    if(victim === undefined){
        return;
    }
    GameData.godsSatisfaction += victim.isHungry() ? victim.worthForGods : victim.worthForGods / Rules.VICTIM_HUNGRY_PENALTY;
    GameData.godsSacrificesDemand--;
    removeVictim(selectedID);
    refreshSacrifices();
    updateSatisfactionSlider();
    nextDay();
}

function updateSatisfactionSlider(){
    satisfactionProgressBar.value = GameData.godsSatisfaction;
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function nextDay(){
    GameData.day++;
    if(GameData.day % daysToWeek === 0){
        GameData.week++;
        weeklyEvent();
    }
    
    GameData.godsSatisfaction -= Rules.GODS_SATISFACTION_DAILY_DROP;
    
    if(GameData.godsSatisfaction < Rules.GODS_SATISFACTION_LOWEST){
        GameData.godsSatisfaction = Rules.GODS_SATISFACTION_LOWEST;
    }

    if(GameData.godsSatisfaction < Rules.MINIMUM_GODS_SATISFACTION){
        punishPlayer();
    }

    feedVictims();
    updateOperationStatus();
    refreshSacrifices();
    updateSatisfactionSlider();
}

function weeklyEvent(){
    if(GameData.godsSacrificesDemand > 0){
        GameData.godsSatisfaction -= GameData.godsSacrificesDemand * Rules.SACRIFICES_QUOTA_NOT_MET_PENALTY;
    }
    else{
        GameData.godsSatisfaction += Rules.SACRIFICES_QUOTA_MET_PRIZE;
    }
    GameData.godsSacrificesDemand = Math.floor(Math.random(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK));
}

function feedVictims(){
    GameData.victims.forEach(victim => {
        if(victim.dailyCost <= GameData.money){
            victim.daysHungry = 0;
            GameData.money -= victim.dailyCost;
        }
        else{
            victim.daysHungry++;
        }
        if(victim.daysHungry > Rules.MAX_DAYS_HUNGRY){
            removeVictim(victim.id);
        }
    });
}

function punishPlayer(){
    alert("Gods anger will fall upon you!");
}