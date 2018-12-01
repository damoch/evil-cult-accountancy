var satisfactionProgressBar;

var selectSacrifice;
var victimSeparationChar = ':';

function init(){
    selectSacrifice = document.getElementById("victimSelect");
    satisfactionProgressBar = document.getElementById("godsSatisfaction");
    refreshSacrifices();
}

function refreshSacrifices(){
    removeOptions(selectSacrifice);
    GameData.victims.forEach(element => {
        var option = document.createElement("option");
        option.text = element.id + victimSeparationChar + " " +  element.name + " " + element.surname;
        selectSacrifice.add(option)
    });
}

function sacrifice(){
    var selectedID = parseInt(selectSacrifice.value.split(victimSeparationChar)[0]);
    removeVictim(selectedID);
    

    satisfactionProgressBar.value += 30;
    refreshSacrifices();
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}