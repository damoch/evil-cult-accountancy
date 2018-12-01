GameData = {
    victims : [
        Person("Jim", "Halpert", 32, 15, Profession.None, 15),
        Person("Dwilght", "Shrute", 35, 11, Profession.None, 17),
    ],

    godsSatisfaction : Rules.STARTING_GODS_SATISFACTION,

    godsSacrificesDemand : Rules.MINIMUM_SACRIFICES_FOR_WEEK,
    money : Rules.STARTING_MONEY,
    day : 1,
    week : 1,


}

function removeVictim(id){
    GameData.victims = GameData.victims.filter(function(p){return p.id !== id});
}

function getVictim(id){
    return GameData.victims.filter(function(p){return p.id === id})[0];
}