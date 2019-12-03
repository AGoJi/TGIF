//House Data table

var members;

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

method: "GET",
headers: {
        "X-API-KEY": "aklwowxCPxdIhQtbYKU9CtttKlvUrWgbERU6Gbdd"
    }
}).then(function (response) {

    if(response.ok) {

        return response.json();
    }

    throw new Error (response.statusText);
}).then (function (json) {

    members = json.results[0].members;

    loader();
    table(members);
    fillDropDown();

}).catch(function (error) {
    
    console.log("Request failed: " + error.message);
});

function table(membersArray){

    var row = "";
    var names = "";
    var party = "";
    var state = "";
    var seniority = "";
    var votes = "";

    var houseData = document.getElementById("house-data");

    houseData.innerHTML = "";

    if(membersArray.length==0){
        var message = document.createElement("td");
        message.innerHTML = "SORRY, WE COULDN'T FIND ANY RESULTS MATCHING.";
        houseData.append(message);

    }else{
        for(var i=0; i<membersArray.length; i++){
            row = document.createElement("tr");

            names = document.createElement("td");
            var a = document.createElement ("a");
            a.href = membersArray[i].url;
            if(membersArray[i].middle_name==null){
                a.innerHTML = membersArray[i].first_name + " " + membersArray[i].last_name;
            }else{
                a.innerHTML = membersArray[i].first_name + " " + membersArray[i].middle_name + " " + membersArray[i].last_name;
            }
            
            names.append(a);

            party = document.createElement("td");
            party.innerHTML = membersArray[i].party;

            state = document.createElement("td");
            state.innerHTML = membersArray[i].state;

            seniority = document.createElement("td");
            seniority.innerHTML = membersArray[i].seniority;

            votes = document.createElement("td");
            votes.innerHTML = membersArray[i].votes_with_party_pct + "%";

            row.append(names, party, state, seniority, votes);
            houseData.appendChild(row);
        }
    }
}

//Filtres

var dCheckbox = document.getElementById("demFilt");
dCheckbox.addEventListener("click", bothFilters);

var rCheckbox = document.getElementById("repFilt");
rCheckbox.addEventListener("click", bothFilters);

var iCheckbox = document.getElementById("indFilt");
iCheckbox.addEventListener("click", bothFilters);

var option = "";

var dropDownList = document.getElementById("stateFilt");
dropDownList.addEventListener("change", bothFilters);

//Funció (How to determine if object is in array)

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

//Drop-Down list amb els States

var stateArray = [];

function fillDropDown (){

    for (var i=0; i<members.length; i++){
        if(!containsObject(members[i].state, stateArray)){
            stateArray.push(members[i].state);
        }
    }

    stateArray.sort();

    for (var i=0; i<stateArray.length; i++){
        option = document.createElement("option");
        option.innerHTML = stateArray[i];
        option.setAttribute("value", stateArray[i]);
        dropDownList.append(option);
    }

}

//Funció que unifica els dos filtres (Party+State)

function bothFilters(){

    var filter = [];

    for (var i=0; i<members.length; i++){
        if(members[i].state==dropDownList.value || dropDownList.value=="all"){
            if(members[i].party=="D" && dCheckbox.checked){
                filter.push(members[i]);
            }
            if(members[i].party=="R" && rCheckbox.checked){
                filter.push(members[i]);
            }
            if(members[i].party=="I" && iCheckbox.checked){
                filter.push(members[i]);
            }
            if(!dCheckbox.checked && !rCheckbox.checked && !iCheckbox.checked){
                filter.push(members[i]);
            }
        }
    }
    table(filter);
}

//Loader

function loader() {
    document.getElementById("loader").style.display = "none";
}