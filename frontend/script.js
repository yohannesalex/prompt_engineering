// DOM Elements
const userInput = document.getElementById("user-input");
const contextInput = document.getElementById("context-input");
const fewShotExamples = document.getElementById("few-shot-examples");
const toneSelect = document.getElementById("tone-select");
const generateBtn = document.getElementById("generate-btn");
const refineBtn = document.getElementById("refine-btn");
const editParamsBtn = document.getElementById("edit-params-btn");
const outputText = document.getElementById("output-text");
const userFeedback = document.getElementById("user-feedback");
const conversationHistory = document.getElementById("conversation-history");

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

// Add conversation entry to the UI
function addConversationEntry(role, text) {
  const entry = document.createElement("div");
  entry.classList.add("conversation-entry");
  entry.innerHTML = `<span class="${role}">${role.toUpperCase()}:</span> ${text}`;
  conversationHistory.appendChild(entry);
  conversationHistory.scrollTop = conversationHistory.scrollHeight; // Auto-scroll to the latest entry
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
  const fullPrompt = `like this example${fewShot}\n\nWrite a ${tone} poem about ${prompt}. ${context}`;

  // Add user input to conversation history
  addConversationEntry("user", fullPrompt);

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

    // Add AI response to conversation history
    addConversationEntry("ai", data.output);
  } catch (error) {
    console.error("Error generating poem:", error);
    outputText.textContent = "Failed to generate poem. Please try again.";
  }
}

// Refine Poem
async function refinePoem() {
  const feedback = userFeedback.value;
  const previousOutput = outputText.textContent;

  if (!feedback || !previousOutput) {
    alert("Please generate a poem first and provide feedback!");
    return;
  }

  // Combine user feedback and previous output
  const fullPrompt = `${feedback}\n\nPrevious Poem:\n${previousOutput}`;

  // Add user feedback to conversation history
  addConversationEntry("user", fullPrompt);

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

    // Add AI response to conversation history
    addConversationEntry("ai", data.output);
  } catch (error) {
    console.error("Error refining poem:", error);
    outputText.textContent = "Failed to refine poem. Please try again.";
  }
}