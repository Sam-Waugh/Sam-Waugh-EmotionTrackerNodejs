const container = "slider";
const updateVal = (divId, val) =>
  (document
    .getElementById(divId)
    .getElementsByClassName("amount")[0].innerHTML = val - 1);

const enjoyment_level = new CircularSlider({
  container,
  color: "#f532e4",
  min: 1,
  max: 6,
  step: 1,
  radius: 200,
  readonly: true,
  valueChange: (val) => updateVal("enjoyment_level", val),
});
const sadness_level = new CircularSlider({
  container,
  color: "#5d3b6d",
  min: 1,
  max: 6,
  step: 1,
  radius: 175,
  readonly: true,
  valueChange: (val) => updateVal("sadness_level", val),
});
const anger_level = new CircularSlider({
  container,
  color: "#5d3b6d",
  min: 1,
  max: 6,
  step: 1,
  radius: 150,
  readonly: true,
  valueChange: (val) => updateVal("anger_level", val),
});
const contempt_level = new CircularSlider({
  container,
  color: "#127fc3",
  min: 1,
  max: 6,
  step: 1,
  radius: 125,
  readonly: true,
  valueChange: (val) => {
    updateVal("contempt_level", val);
  },
});
const disgust_level = new CircularSlider({
  container,
  color: "#22a823",
  min: 1,
  max: 6,
  step: 1,
  radius: 100,
  readonly: true,
  valueChange: (val) => updateVal("disgust_level", val),
});
const fear_level = new CircularSlider({
  container,
  color: "#fd8123",
  min: 1,
  max: 6,
  step: 1,
  radius: 75,
  readonly: true,
  valueChange: (val) => updateVal("fear_level", val),
});
const surprise_level = new CircularSlider({
  container,
  color: "#fd3b3f",
  min: 1,
  max: 6,
  step: 1,
  radius: 50,
  readonly: true,
  valueChange: (val) => updateVal("surprise_level", val),
});

const initialiseSliderApp = (snapshot) => {
  enjoyment_level.stepNo = snapshot.enjoyment_level;
  sadness_level.stepNo = snapshot.sadness_level;
  anger_level.stepNo = snapshot.anger_level;
  contempt_level.stepNo = snapshot.contempt_level;
  disgust_level.stepNo = snapshot.disgust_level;
  fear_level.stepNo = snapshot.fear_level;
  surprise_level.stepNo = snapshot.surprise_level;
}

updateVal("enjoyment_level", enjoyment_level.currentValue);
updateVal("sadness_level", sadness_level.currentValue);
updateVal("anger_level", anger_level.currentValue);
updateVal("contempt_level", contempt_level.currentValue);
updateVal("disgust_level", disgust_level.currentValue);
updateVal("fear_level", fear_level.currentValue);
updateVal("surprise_level", surprise_level.currentValue);

export { initialiseSliderApp };