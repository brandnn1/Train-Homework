var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";

var aTrain = $("#train-name");
var aTrainDestination = $("#train-destination");
var aTrainTime = $("#train-time")
var aTimeFreq = $("#time-freq")


var config = {
    apiKey: "AIzaSyBg6IyWj3curcfPuAeV8MMy07PgO1WuTjY",
    authDomain: "first-project-acab1.firebaseapp.com",
    databaseURL: "https://first-project-acab1.firebaseio.com",
    projectId: "first-project-acab1",
    storageBucket: "first-project-acab1.appspot.com",
    messagingSenderId: "1027238424289",
    appId: "1:1027238424289:web:0cc4354c688c9a31"
    };
    firebase.initializeApp(config);  
    var database = firebase.database();
    database.ref("/trains").on("child_added", function(snapshot) {


        var trainDiff = 0;
        var trainRemainder = 0;
        var minutesTillArrival = "";
        var nextTrainTime = "";
        var frequency = snapshot.val().frequency;

        trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");
        trainRemainder = trainDiff % frequency;
        minutesTillArrival = frequency - trainRemainder;
        nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");
        $("#table-data").append(
            "<tr><td>" + snapshot.val().name + "</td>" +
            "<td>" + snapshot.val().destination + "</td>" +
            "<td>" + frequency + "</td>" +
            "<td>" + minutesTillArrival + "</td>" +
            "<td>" + nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</td></tr>"
        );
        
        $("span").hide();
    
        $("tr").hover(
            function() {
                $(this).find("span").show();
            },
            function() {
                $(this).find("span").hide();
            });
    
        });

        

    var storeInputs = function(event) {

        event.preventDefault();
    
        trainName = aTrain.val().trim();
        trainDestination = aTrainDestination.val().trim();
        trainTime = moment(aTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
        trainFrequency = aTimeFreq.val().trim();
    
        database.ref("/trains").push({
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
            date_added: firebase.database.ServerValue.TIMESTAMP
        });
    
        aTrain.val("");
        aTrainDestination.val("");
        aTrainTime.val("");
        aTimeFreq.val("");
    };