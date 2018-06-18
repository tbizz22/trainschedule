// Initialize Firebase
var config = {
  apiKey: "AIzaSyAgzljBwCGpLL--LdU6uNC4JRSVSLEsftQ",
  authDomain: "traintrackertwb.firebaseapp.com",
  databaseURL: "https://traintrackertwb.firebaseio.com",
  projectId: "traintrackertwb",
  storageBucket: "",
  messagingSenderId: "526625537639"
};
firebase.initializeApp(config);

var db = firebase.database();
var root = "/train";




$(document).ready(function () {
  $('.timepicker').timepicker();
});




function addToDB(name, dest, prettyTime, freq) {
  db.ref(root).push({
    name: name,
    dest: dest,
    st: prettyTime,
    frequency: freq,
    // timestamp: db.ServerValue.TIMESTAMP
  })
}


$(document).on("click", "#submit", function (event) {
  event.preventDefault();
  var name = $("#trainName").val().trim();
  var dest = $("#destination").val().trim();
  var startTime = $("#startTime").val();
  var freq = $("#frequency").val();
  var prettyTime = moment(startTime, ["h:mm A"]).format("HH:mm");
  console.log(prettyTime);
  console.log(startTime);

  addToDB(name, dest, prettyTime, freq);
  $("#form").trigger("reset");
})


db.ref(root).on("child_added", function (childSnapshot) {
  // var now = moment().format("HH:mm");
  var r = childSnapshot.val()
  var name = r.name;
  var dest = r.dest;
  var startTime = r.st;
  var freq = r.frequency;
  var nextArrive = null;
  var minsAway = null;

  // copied this next bit of code from the example pretty heavily. I understand all of it except for the math...

  var stConverted = moment(startTime, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(stConverted), "minutes");
  var tRemain = diffTime % freq;
  var minsAway = freq - tRemain;
  var timeToTrain = moment().add(minsAway, "minutes");
  nextArrive = moment(timeToTrain).format("hh:mm a");


  // put it on the page
  $("#tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextArrive + "</td><td>" + minsAway + "</td></tr>");
})




// $(document).ready( function () {
//   $('#table').DataTable();
// } );


var dateTime = null;
var date = null;

var update = function() {
  date = moment(new Date())
  dateTime.html(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
};

$(document).ready(function(){
  dateTime=$("#dateTime");
  update();
  setInterval(update,1000);
})

