var satisfactionProgressBar;
var moneyField;
var dayField;
var weekField;

var selectSacrifice;

var victimSeparationChar = ':';
var hungryText = "(hungry)";

var day = 1;
var week = 1;
var daysToWeek = 7;
var sacrificesForWeekLeft = 0;

function init(){
    selectSacrifice = document.getElementById("victimSelect");
    satisfactionProgressBar = document.getElementById("godsSatisfaction");
    moneyField = document.getElementById("moneyField");
    dayField = document.getElementById("day");
    weekField = document.getElementById("week");

    sacrificesForWeekLeft = Math.floor(Math.random(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK));
    money = 100;

    refreshSacrifices();
    updateSatisfactionSlider();
    updateOperationStatus();
}

function updateOperationStatus(){
    moneyField.textContent = money;
    dayField.textContent = day;
    weekField.textContent = week;
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
    GameData.godsSatisfaction += victim.isHungry() ? victim.worthForGods : victim.worthForGods / Rules.VICTIM_HUNGRY_PENALTY;
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
    day++;
    if(day % daysToWeek === 0){
        week++;
        weeklyEvent();
    }
    
    GameData.godsSatisfaction -= Rules.GODS_SATISFACTION_DAILY_DROP;
    feedVictims();
    updateOperationStatus();
    refreshSacrifices();
    updateSatisfactionSlider();
}

function weeklyEvent(){

}

function feedVictims(){
    GameData.victims.forEach(victim => {
        if(victim.dailyCost <= money){
            victim.daysHungry = 0;
            money -= victim.dailyCost;
        }
        else{
            victim.daysHungry++;
        }
        if(victim.daysHungry > Rules.MAX_DAY_HUNGRY){
            removeVictim(victim.id);
        }
    });
}