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
})


db.ref(root).on("child_added", function (childSnapshot) {
  var r = childSnapshot.val()
  var name = r.name;
  var dest = r.dest;
  var startTime = r.st;
  var freq = r.frequency;
  var nextArrive = null;
  var minsAway = null;
  var now = moment();

$("#tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextArrive + "</td><td>" + minsAway+ "</td></tr>");




})
