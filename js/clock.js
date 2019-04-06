function clock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();

	currentMinutes = (currentMinutes < 10) ? '0' + currentMinutes : currentMinutes;
	currentSeconds = (currentSeconds < 10) ? '0' + currentSeconds : currentSeconds;

	var timeOfDay = (currentHours < 12) ? 'AM' : 'PM';
	currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
	currentHours = (currentHours == 0) ? 12 : currentHours;

	var currentTimeString = currentHours + ':' + currentMinutes + ':' + currentSeconds + ' ' + timeOfDay;

	document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}