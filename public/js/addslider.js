var enjoyment_slider = document.getElementById("snapshot_enjoyment");
var enjoyment_output = document.getElementById("enjoyment_value");
enjoyment_output.innerHTML = enjoyment_slider.value;
enjoyment_slider.oninput = function () {
  enjoyment_output.innerHTML = this.value;
};

var sadness_slider = document.getElementById("snapshot_sadness");
var sadness_output = document.getElementById("sadness_value");
sadness_output.innerHTML = sadness_slider.value;
sadness_slider.oninput = function () {
  sadness_output.innerHTML = this.value;
};

var anger_slider = document.getElementById("snapshot_anger");
var anger_output = document.getElementById("anger_value");
anger_output.innerHTML = anger_slider.value;
anger_slider.oninput = function () {
  anger_output.innerHTML = this.value;
};

var contempt_slider = document.getElementById("snapshot_contempt");
var contempt_output = document.getElementById("contempt_value");
contempt_output.innerHTML = contempt_slider.value;
contempt_slider.oninput = function () {
  contempt_output.innerHTML = this.value;
};

var disgust_slider = document.getElementById("snapshot_disgust");
var disgust_output = document.getElementById("disgust_value");
disgust_output.innerHTML = disgust_slider.value;
disgust_slider.oninput = function () {
  disgust_output.innerHTML = this.value;
};

var fear_slider = document.getElementById("snapshot_fear");
var fear_output = document.getElementById("fear_value");
fear_output.innerHTML = fear_slider.value;
fear_slider.oninput = function () {
  fear_output.innerHTML = this.value;
};

var surprise_slider = document.getElementById("snapshot_surprise");
var surprise_output = document.getElementById("surprise_value");
surprise_output.innerHTML = surprise_slider.value;
surprise_slider.oninput = function () {
  surprise_output.innerHTML = this.value;
};
