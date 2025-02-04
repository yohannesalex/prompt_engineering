// DOM Elements
const userInput = document.getElementById("user-input");
const contextInput = document.getElementById("context-input");
const fewShotExamples = document.getElementById("few-shot-examples");
const toneSelect = document.getElementById("tone-select");
const generateBtn = document.getElementById("generate-btn");
const refineBtn = document.getElementById("refine-btn");
const editParamsBtn = document.getElementById("edit-params-btn");
const outputText = document.getElementById("output-text");

// Popup Elements
const paramsPopup = document.getElementById("params-popup");
const temperatureSlider = document.getElementById("temperature-slider");
const temperatureValue = document.getElementById("temperature-value");
const topPSlider = document.getElementById("top-p-slider");
const topPValue = document.getElementById("top-p-value");
const maxTokensInput = document.getElementById("max-tokens-input");
const cancelBtn = document.getElementById("cancel-btn");
const applyBtn = document.getElementById("apply-btn");

// Default Parameters
let temperature = 0.7;
let topP = 0.9;
let maxTokens = 100;

// Event Listeners
generateBtn.addEventListener("click", generatePoem);
refineBtn.addEventListener("click", refinePoem);
editParamsBtn.addEventListener("click", openPopup);
cancelBtn.addEventListener("click", closePopup);
applyBtn.addEventListener("click", applyParams);

// Update slider values
temperatureSlider.addEventListener("input", () => {
  temperatureValue.textContent = temperatureSlider.value;
});

topPSlider.addEventListener("input", () => {
  topPValue.textContent = topPSlider.value;
});

// Open Popup
function openPopup() {
  temperatureSlider.value = temperature;
  temperatureValue.textContent = temperature;
  topPSlider.value = topP;
  topPValue.textContent = topP;
  maxTokensInput.value = maxTokens;
  paramsPopup.style.display = "flex";
}

// Close Popup
function closePopup() {
  paramsPopup.style.display = "none";
}

// Apply Parameters
function applyParams() {
  temperature = parseFloat(temperatureSlider.value);
  topP = parseFloat(topPSlider.value);
  maxTokens = parseInt(maxTokensInput.value);
  closePopup();
}

// Generate Poem
async function generatePoem() {
  const prompt = userInput.value;
  const context = contextInput.value;
  const fewShot = fewShotExamples.value;
  const tone = toneSelect.value;

  if (!prompt) {
    alert("Please enter a theme or keyword!");
    return;
  }

  // Combine prompt, context, and few-shot examples
  const fullPrompt = `${fewShot}\n\nWrite a ${tone} poem about ${prompt}. ${context}`;

  try {
    const response = await fetch("https://prompt-engineering-1.onrender.com/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: fullPrompt,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
      }),
    });

    const data = await response.json();
    outputText.textContent = data.output;
  } catch (error) {
    console.error("Error generating poem:", error);
    outputText.textContent = "Failed to generate poem. Please try again.";
  }
}

// Refine Poem
async function refinePoem() {
  const userFeedback = document.getElementById("user-feedback").value;
  const previousOutput = outputText.textContent;

  if (!userFeedback || !previousOutput) {
    alert("Please generate a poem first and provide feedback!");
    return;
  }

  // Combine user feedback and previous output
  const fullPrompt = `${userFeedback}\n\nPrevious Poem:\n${previousOutput}`;

  try {
    const response = await fetch("https://prompt-engineering-1.onrender.com/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: fullPrompt,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
      }),
    });

    const data = await response.json();
    outputText.textContent = data.output;
  } catch (error) {
    console.error("Error refining poem:", error);
    outputText.textContent = "Failed to refine poem. Please try again.";
  }
}