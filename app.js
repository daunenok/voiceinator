var msg = new SpeechSynthesisUtterance();
var voices = [];
var select = document.querySelector("select");
var options = document.querySelectorAll("[name='text'], [name='rate'], [name='pitch']");
msg.text = document.querySelector("[name='text']").value;
msg.rate = document.querySelector("[name='rate']").value;
msg.pitch = document.querySelector("[name='pitch']").value;

speechSynthesis.addEventListener("voiceschanged", populate);
select.addEventListener("change", setVoice);
options.forEach(option => {
	option.addEventListener("change", updateOption);
});
document.querySelector("#stop").addEventListener("click", stopSpeech);
document.querySelector("#speak").addEventListener("click", speakSpeech);

function populate() {
	voices = this.getVoices();
	var str = "";
	voices.forEach(item => {
		str += "<option>";
		str += item.name;
		str += "</option>";
	});
	select.innerHTML = str;
}

function setVoice() {
	msg.voice = voices.find(item => item.name === this.value);
	toggle();
}

function toggle(say = true) {
	speechSynthesis.cancel();
	if (say) speechSynthesis.speak(msg);
}

function updateOption() {
	msg[this.name] = this.value;
	toggle();
}

function stopSpeech() {
	toggle(false);
}

function speakSpeech() {
	toggle(true);
}