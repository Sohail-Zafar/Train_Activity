// Assignment: Train Activity
// File: script.js
// Programmer: Sohail Zafar

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
    console.log(dataFromDatabase.val());
    $("#trainTable > tbody").append("<tr><td>" + dataTrainName + "</td><td>" +
     dataTrainDestination + "</td><td>" + dataTrainTime + "</td><td>" + dataFrequency +"</td></tr>");
     
     // Clear form values
    $("#tName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

   });
 