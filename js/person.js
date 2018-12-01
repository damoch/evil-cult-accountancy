var ID = 0;

Profession = {
    Speaker : "Speaker",
    Henchman : "Henchman",
    Hangman : "Hangman",
    None : "None"
};

function Person(){
    return {
        id : ID++,
        name : "",
        surname : "",
        age : 0,
        dailyCost : 0,
        profession : Profession.None
    };
};

function Person(nam, surnam, ag, dailyC, prof){
    return {
        id : ID++,
        name : nam,
        surname : surnam,
        age : ag,
        dailyCost : dailyC,
        profession : prof
    };
}

