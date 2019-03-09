// Assignment: Train Activity
// File: script.js
// Programmer: Sohail Zafar
// This is the javascript file that adds train information to the Firebase database and use the moment.js to format and calculate train
// arrival times. It then updates the index.html web page with updated information.

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNUNirIT6vGgJZxbWkhz_ryQ1aVi9VxPo",
    authDomain: "mytrain-79e39.firebaseapp.com",
    databaseURL: "https://mytrain-79e39.firebaseio.com",
    projectId: "mytrain-79e39",
    storageBucket: "",
    messagingSenderId: "642041727768"
  };
  firebase.initializeApp(config);

  // Create varible to hold database object
  var dBase = firebase.database();

  // Submit button click function
  // Take data from form and push it to Firebase "MyTrain"
  $("#submitTrainInfo").on("click", function(){
      event.preventDefault();
      var $tName = $("#tName").val().trim();
      var $destination = $("#destination").val().trim();
      var $firstTrainTime = $("#firstTrainTime").val().trim();
      var $frequency = $("#frequency").val().trim();
      
      // Creat trainObject to hold information taken from the form on the index.html page
      var trainObject = {
          trainName: $tName,
          trainDestination: $destination,
          trainTime: $firstTrainTime,
          frequency: $frequency 
      };
      dBase.ref().push(trainObject);
  });

  // Listen for child added and read from Firebase then load data to <tbody>
  dBase.ref().on("child_added", function(dataFromDatabase,prevChildKey){
  
    var dataTrainName = dataFromDatabase.val().trainName;
    var dataTrainDestination = dataFromDatabase.val().trainDestination;
    var dataTrainTime = dataFromDatabase.val().trainTime;
    var dataFrequency = dataFromDatabase.val().frequency;
    
    // Convert dataTrainTime to moment time format and set up varibles
    var timeArr = dataTrainTime.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {

      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % dataFrequency;
      tMinutes = dataFrequency- tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }
    // Add train data and converted time data to the trainTable tbody of the index.html page 
    $("#trainTable > tbody").append("<tr><td>" + dataTrainName + "</td><td>" +
     dataTrainDestination + "</td><td>" + dataFrequency + "</td><td>" + tArrival +"</td><td>" + tMinutes + "</td></tr>");
     
     // Clear form  of values
    $("#tName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

   });
 