
// DOM Elements
const userInput = document.getElementById("user-input");
const contextInput = document.getElementById("context-input");
const fewShotExamples = document.getElementById("few-shot-examples");
const refineInput = document.getElementById("refine-input");
const generateBtn = document.getElementById("generate-btn");
const refineBtn = document.getElementById("refine-btn");
const editParamsBtn = document.getElementById("edit-params-btn");
const chatMessages = document.getElementById("chat-messages");

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
let maxTokens = 300;

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

// Add message to chat
function addMessage(role, text) {
  const message = document.createElement("div");
  message.classList.add("message", role);
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
}

// Generate Poem
async function generatePoem() {
  const prompt = userInput.value;
  const context = contextInput.value;
  const fewShot = fewShotExamples.value;

  if (!prompt) {
    alert("Please enter a theme or keyword!");
    return;
  }

  // Combine prompt, context, and few-shot examples
  fullPrompt = `Write a poem about ${prompt}.`;
  // Combine prompt, context, and few-shot examples
  if(fewShot !== "" && context !== ""){
     fullPrompt = `like this example\n${fewShot}\nWrite a poem about ${prompt}. with a context of ${context}`;
  }else if(fewShot === "" && context === ""){
     fullPrompt = `Write a poem about ${prompt}.`;
  }else if(fewShot === "" && context !== ""){
     fullPrompt = `Write a poem about ${prompt}. with a context of ${context}`;
  }else if(fewShot !== "" && context === ""){
     fullPrompt = `like this example${fewShot}\n\nWrite a poem about ${prompt}.`;
  }

  // Add user message to chat
  addMessage("user", fullPrompt);

  try {
    const response = await fetch("https://poem-generator-mab0.onrender.com/api/generate", {
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

    // Add AI message to chat (line by line)
    const poemLines = data.output.split("\n").map(line => line.trim()).join("\n");
    addMessage("ai", poemLines);
  } catch (error) {
    console.error("Error generating poem:", error);
    addMessage("ai", "Failed to generate poem. Please try again.");
  }
}

// Refine Poem
async function refinePoem() {
  const feedback = refineInput.value;
  const previousOutput = chatMessages.querySelector(".message.ai:last-child")?.textContent;

  if (!feedback || !previousOutput) {
    alert("Please generate a poem first and provide feedback!");
    return;
  }

  // Add user message to chat
  addMessage("user", feedback);

  try {
    const response = await fetch("https://poem-generator-mab0.onrender.com/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: feedback,
        previous_output: previousOutput,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
      }),
    });

    const data = await response.json();

    // Add AI message to chat (line by line)
    const poemLines = data.output.split("\n").map(line => line.trim()).join("\n");
    addMessage("ai", poemLines);
  } catch (error) {
    console.error("Error refining poem:", error);
    addMessage("ai", "Failed to refine poem. Please try again.");
  }
}