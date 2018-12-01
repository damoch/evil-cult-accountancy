GameData = {
    victims : [
        Person("Jim", "Halpert", 32, 15, Profession.None, 15),
        Person("Dwilght", "Shrute", 35, 11, Profession.None, 17),
    ],

    godsSatisfaction : 50,

}

function removeVictim(id){
    GameData.victims = GameData.victims.filter(function(p){return p.id !== id});
}

function getVictim(id){
    return GameData.victims.filter(function(p){return p.id === id})[0];
}