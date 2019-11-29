var statistics = 
{
    "Democrats":
        {
            "n_reps": 0,
            "vote_w_party": 0,
        }
    ,
    "Republicans":
        {
            "n_reps": 0,
            "vote_w_party": 0,
        }
    ,
    "Independents":
        {
            "n_reps": 0,
            "vote_w_party": 0,
        }
    ,
    "Total": 
        {
            "n_reps": 0,
            "vote_w_party": 0,
        }
}

//SENATE AT A GLANCE TABLE

var members = data.results[0].members;

function senGlance(){

    for (var i=0; i<members.length; i++){
        if(members[i].party=="D"){
            statistics.Democrats.n_reps += 1;
        }
    }
    for (var i=0; i<members.length; i++){
        if(members[i].party=="R"){
            statistics.Republicans.n_reps += 1;
        }
    }
    for (var i=0; i<members.length; i++){
        if(members[i].party=="I"){
            statistics.Independents.n_reps += 1;
        }
    }

    statistics.Total.n_reps = statistics.Independents.n_reps + statistics.Republicans.n_reps +
    statistics.Democrats.n_reps;

var votesWPT = 0;

    for (var i=0; i<members.length; i++){
        votesWPT = votesWPT + members[i].votes_with_party_pct;
        statistics.Total.vote_w_party = (votesWPT / statistics.Total.n_reps).toFixed(2) + "%";
    }

var votesWPD = 0;

    for (var i=0; i<members.length; i++){
        if (members[i].party=="D"){
            votesWPD = votesWPD + members[i].votes_with_party_pct;
            statistics.Democrats.vote_w_party = (votesWPD / statistics.Democrats.n_reps).toFixed(2) + "%";
        }
    }

var votesWPR = 0;

    for (var i=0; i<members.length; i++){
        if (members[i].party=="R"){
            votesWPR = votesWPR + members[i].votes_with_party_pct;
            statistics.Republicans.vote_w_party = (votesWPR / statistics.Republicans.n_reps).toFixed(2) + "%";
        }
    }

var votesWPI =0;

    for (var i=0; i<members.length; i++){
        if (members[i].party=="I"){
            votesWPI = votesWPI + members[i].votes_with_party_pct;
            statistics.Independents.vote_w_party = (votesWPI / statistics.Independents.n_reps).toFixed(2) + "%";
        }
    }

//For with an Object to add .js to .html:

    var senGlance = document.getElementById("SenAtGla");

    for (var party in statistics){
        var row = document.createElement("tr");
        var partyCell = document.createElement("td");
        partyCell.innerHTML = party;
        var repsCell = document.createElement("td");
        repsCell.innerHTML = statistics[party].n_reps;
        var voteCell = document.createElement("td");
        voteCell.innerHTML = statistics[party].vote_w_party;
        row.append (partyCell, repsCell, voteCell);
        senGlance.appendChild(row);
    }

}

senGlance ();

//SENATE LOYALTY TABLES

//Top 10%

function senLoy (){
    var row = "";
    var names = "";
    var nvotes = "";
    var pvotes = "";
    var topMembers=[];
    var bottomMembers=[];

    var topSenLoy = document.getElementById ("topSenLoy");

    var sortMembers = Array.from(members);
    
    sortMembers.sort(function(a, b){return b.votes_with_party_pct - a.votes_with_party_pct});

    var topTen = Math.round(sortMembers.length / 10);

    for (var i=0; i<topTen; i++){
        topMembers.push(sortMembers[i]);
    }

    for (var i=topTen; i<sortMembers.length; i++){
        if (topMembers[topMembers.length-1].votes_with_party_pct == sortMembers[i].votes_with_party_pct){
            topMembers.push(sortMembers[i]);
        }
    }

    for (var i=0; i<topMembers.length; i++){
        row = document.createElement("tr");
    
        names = document.createElement("td");
        var a = document.createElement ("a");
        a.href = topMembers[i].url;
        if(topMembers[i].middle_name==null){
            a.innerHTML = topMembers[i].first_name + " " + topMembers[i].last_name;
        }else{
            a.innerHTML = topMembers[i].first_name + " " + topMembers[i].middle_name + " " + topMembers[i].last_name;
        }
        names.append(a);

        nvotes = document.createElement("td");
        nvotes.innerHTML = topMembers[i].total_votes;

        pvotes = document.createElement("td");
        pvotes.innerHTML = topMembers[i].votes_with_party_pct + "%";

        row.append(names, nvotes, pvotes);
        
        topSenLoy.appendChild(row);
    }

//Bottom 10%

    var bottSenLoy = document.getElementById ("bottSenLoy");

    var sortMembersinv = Array.from(members);
    
    sortMembersinv.sort(function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct});

    for (var i=0; i<topTen; i++){
        bottomMembers.push(sortMembersinv[i]);
    }

    for (var i=topTen; i<sortMembersinv.length; i++){
        if (bottomMembers[bottomMembers.length-1].votes_with_party_pct == sortMembersinv[i].votes_with_party_pct){
            bottomMembers.push(sortMembersinv[i]);
        }
    }

    for (var i=0; i<bottomMembers.length; i++){
        row = document.createElement("tr");
    
        names = document.createElement("td");
        var a = document.createElement ("a");
        a.href = sortMembersinv[i].url;
        if(sortMembersinv[i].middle_name==null){
            a.innerHTML = sortMembersinv[i].first_name + " " + sortMembersinv[i].last_name;
        }else{
            a.innerHTML = sortMembersinv[i].first_name + " " + sortMembersinv[i].middle_name + " " + sortMembersinv[i].last_name;
        }
        names.append(a);

        nvotes = document.createElement("td");
        nvotes.innerHTML = sortMembersinv[i].total_votes;

        pvotes = document.createElement("td");
        pvotes.innerHTML = sortMembersinv[i].votes_with_party_pct + "%";

        row.append(names, nvotes, pvotes);
        
        bottSenLoy.appendChild(row);
    }

}

senLoy ();