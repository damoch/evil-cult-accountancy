GameData = {
    victims : [
        Person("Jim", "Halpert", 32, 15, Profession.None),
        Person("Dwilght", "Shrute", 35, 11, Profession.None),
    ],

}

function removeVictim(id){
    GameData.victims = GameData.victims.filter(function(p){return p.id !== id});
}