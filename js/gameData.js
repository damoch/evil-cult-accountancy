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

const RandomData = {
    names : ["Aarika", "Dan", "Anniyah", "Tia", "Star", "Lottie", "Carlos", "Elisha", "Scott", "Rubie", "Aston", "Esme-Rose", "Veronika", "Isaiah", "Marlie", "Marwan", "Honey",
            "Yara", "Misbah", "Elizabeth", "Dorian", "Aniya", "Dolly", "Carl", "Tony", "Kaydan", "Dilara", "Kenneth", "Aleyna", "Chelsie"],
    surnames : ["Weber", "Lara", "Graves", "Sherman", "Wilde", "Mcfarland", "Greer", "Weir", "Bernard", "Hunt", "Clements", "Gilbert", "Blankenship", "Lugo", "Yoder", "Hughes",
                "Wardle", "Jacobs", "Harrison", "Gates", "Guerrero", "Day", "Hough", "Woolley", "Thatcher", "Mcarthur", "Calderon", "Mccormack", "Fisher", "Eaton"],
}