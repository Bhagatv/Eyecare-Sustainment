
document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById("demo") != null){
		document.getElementById("clicker").addEventListener("click",onOrOff);
		chrome.storage.local.get(["text","minutes","seconds"],function(data){
			document.getElementById("demo").innerHTML = data.minutes + "m " + data.seconds + "s ";
			document.getElementById("bold").innerHTML = data.text;
			//document.getElementById("demo").innerHTML = data.minutes + "m " + data.seconds + "s ";
			if (data.text === "off."){
				start();
			}
			
		});

	}
});
//var countDownDate = 1200000;
var x = "lol"; //Placeholder for setInterval object
onOrOff = function() {
	if (document.getElementById("bold").innerHTML === "on.") {
		document.getElementById("bold").innerHTML = "off.";
		chrome.storage.local.set({"text" : "off.","countDownDate" : new Date().getTime() + 1201000});
		//countDownDate = new Date().getTime() + 1200000;
		start();
		
	}
	else{	
		document.getElementById("bold").innerHTML = "on.";
		chrome.storage.local.set({"text" : "on."});
		clearInterval(x);
		chrome.storage.local.set({"minutes" : 20, "seconds" : 0});
		document.getElementById("demo").innerHTML = "20m 0s";
	}
}

//var countDownDate = new Date().getTime() + 1200000;

start = function(){
 x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    //var distance = 0;
    chrome.storage.local.get(["countDownDate"],function(data){
	distance = data.countDownDate - now;
	
	
    //var distance = data.countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
    
    chrome.storage.local.set({"minutes" : minutes, "seconds" : seconds});
	
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
	
	var notification = new Notification("Time's Up! Take a 20 second break & look at something 20 feet away.");
	var audio = new Audio("notify.wav");
	
	audio.play();

    }
	});
}, 1000);

}

