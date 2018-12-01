var ID = 0;

Profession = {
    Speaker : "Speaker",
    Henchman : "Henchman",
    None : "None"
};

function Person(){
    return {
        id : ID++,
        name : "",
        surname : "",
        age : 0,
        dailyCost : 0,
        profession : Profession.None,
        isHungry : function(){return this.daysHungry > 0;},
        daysHungry : 0, 
        worthForGods : 0
    };
};

function Person(nam, surnam, ag, dailyC, prof, worth){
    return {
        id : ID++,
        name : nam,
        surname : surnam,
        age : ag,
        dailyCost : dailyC,
        profession : prof,
        isHungry : function(){return this.daysHungry > 0;},
        daysHungry : 0,
        worthForGods : worth
    };
}

