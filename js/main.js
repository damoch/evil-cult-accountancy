var satisfactionProgressBar;
var moneyField;
var dayField;
var weekField;
var sacrificesLeftField;
var speechTextArea;
var lastSpeechText;
var logTextArea;

var selectSacrifice;
var priestSelect;
var henchmanSelect;

var idOfPersonSeparator = ':';
var hungryText = "(hungry)";
var ageText = " Age: ";
var speechSkillText = ", speech skill: ";
var henchmanSkillText = ", henchmen skill: ";
var worthForGodsText = ", potential worth for gods: ";
var logPrefix = "Day: ";
var diedLogPostfix = " died of hunger";
var dailyVictimStatus = "Total cost of feeding prisoners: ";

var daysToWeek = 7;
var logLength = 0;
var logData = [];

function init(){
    selectSacrifice = document.getElementById("victimSelect");
    satisfactionProgressBar = document.getElementById("godsSatisfaction");
    moneyField = document.getElementById("moneyField");
    dayField = document.getElementById("day");
    weekField = document.getElementById("week");
    sacrificesLeftField = document.getElementById("sacrificesLeftField");
    speechTextArea = document.getElementById("speechTextArea");
    priestSelect = document.getElementById("priestSelect");
    lastSpeechText = document.getElementById("lastSpeechStatus");
    henchmanSelect = document.getElementById("henchmanSelect");
    logTextArea = document.getElementById("logTextArea");

    GameData.godsSacrificesDemand = getRndInteger(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK);
    GameData.money = Rules.STARTING_MONEY;

    speechTextArea.onpaste = function(event){event.preventDefault()};
    speechTextArea.value = "";

    logLength = logTextArea.rows;
    logTextArea.value = "";

    generateRandomPerson();
    refreshSacrifices();
    updateSatisfactionSlider();
    updateOperationStatus();
    refreshPriests();
    refreshHenchman();
}

function updateOperationStatus(){
    moneyField.textContent = GameData.money;
    dayField.textContent = GameData.day;
    weekField.textContent = GameData.week;
    sacrificesLeftField.textContent = GameData.godsSacrificesDemand
}

function refreshPriests(){
    removeOptions(priestSelect);
    GameData.priests.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " +  element.name + " " + element.surname + ", " + ageText + element.age + speechSkillText + element.skills.speakerSkill;
        priestSelect.add(option)
    });
}

function refreshSacrifices(){
    removeOptions(selectSacrifice);
    GameData.victims.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " 
        +  element.name + " " + element.surname  + "," + 
        ageText + element.age +  " " + (element.isHungry() ?  hungryText : "")
        + worthForGodsText + element.worthForGods;
        selectSacrifice.add(option)
    });
}

function refreshHenchman(){
    removeOptions(henchmanSelect);
    GameData.henchmen.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + idOfPersonSeparator + " " +  element.name + " " + element.surname + ", " + ageText + element.age + henchmanSkillText + element.skills.henchmanSkill;
        henchmanSelect.add(option)
    });
}

function sacrifice(){
    var selectedID = parseInt(selectSacrifice.value.split(idOfPersonSeparator)[0]);
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
    GameData.godsSacrificesDemand = getRndInteger(Rules.MINIMUM_SACRIFICES_FOR_WEEK, Rules.MAXIMUM_SACRIFICES_FOR_WEEK);
}

function feedVictims(){
    var totalFeedingCost = 0;
    GameData.victims.forEach(victim => {
        if(victim.dailyCost <= GameData.money){
            victim.daysHungry = 0;
            GameData.money -= victim.dailyCost;
            totalFeedingCost += victim.dailyCost;
        }
        else{
            victim.daysHungry++;
        }
        if(victim.daysHungry > Rules.MAX_DAYS_HUNGRY){
            removeVictim(victim.id);
            printLog(victim.name + " " + victim.surname + diedLogPostfix);
        }
    });
    printLog(dailyVictimStatus + totalFeedingCost + "$");
}

function readSpeech(){
    var words =  speechTextArea.value.match(/\S+/g);
    var moneyMade = 0;
    var selectedID = parseInt(priestSelect.value.split(idOfPersonSeparator)[0]);
    var priest = getPriest(selectedID);
    var skillFactor = priest.skills.speakerSkill / Rules.MAXIMAL_SKILL_VALUE;
    words.forEach(element => {
        moneyMade += Rules.EVIL_WORDS.includes(element) ? Math.floor(Rules.MAX_MONEY_FOR_EVERY_EVIL_WORD_IN_SPEECH * skillFactor) : 0;
    });
    GameData.money += moneyMade;
    lastSpeechText.textContent = moneyMade;
    speechTextArea.value = "";
    nextDay();
}

function findNewFollower(){
    var selectedID = parseInt(henchmanSelect.value.split(idOfPersonSeparator)[0]);
    var henchmen = getHenchmen(selectedID);
    var randomNumber = getRndInteger(Rules.HENCHMEN_SUCCESS_MIN_VALUE, Rules.HENCHMEN_SUCCESS_MAX_VALUE);
    if(henchmen.skills.henchmanSkill > randomNumber){
        console.log("success");
    }
    else{
        console.log("failure");
    }
}

function punishPlayer(){
    //alert("Gods anger will fall upon you!");
}

function printLog(text){
    var dataToLog = logPrefix + GameData.day +" - " + text; 
    logTextArea.value = "";
    logData.unshift(dataToLog);
    if(logData.length > logLength){
        logData.pop();
    }
    logData.forEach(element => {
        logTextArea.value += element + "\n";
    });
}