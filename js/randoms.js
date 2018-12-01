const RandomData = {
    names : ["Aarika", "Dan", "Anniyah", "Tia", "Star", "Lottie", "Carlos", "Elisha", "Scott", "Rubie", "Aston", "Esme-Rose", "Veronika", "Isaiah", "Marlie", "Marwan", "Honey",
            "Yara", "Misbah", "Elizabeth", "Dorian", "Aniya", "Dolly", "Carl", "Tony", "Kaydan", "Dilara", "Kenneth", "Aleyna", "Chelsie"],
    surnames : ["Weber", "Lara", "Graves", "Sherman", "Wilde", "Mcfarland", "Greer", "Weir", "Bernard", "Hunt", "Clements", "Gilbert", "Blankenship", "Lugo", "Yoder", "Hughes",
                "Wardle", "Jacobs", "Harrison", "Gates", "Guerrero", "Day", "Hough", "Woolley", "Thatcher", "Mcarthur", "Calderon", "Mccormack", "Fisher", "Eaton"],
}

function randomName(){
    return RandomData.names[getRndInteger(0, RandomData.names.length)];
}

function randomSurname(){
    return RandomData.surnames[getRndInteger(0, RandomData.surnames.length)];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}