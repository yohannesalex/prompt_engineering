// DOM Elements
const userInput = document.getElementById("user-input");
const toneSelect = document.getElementById("tone-select");
const generateBtn = document.getElementById("generate-btn");
const refineBtn = document.getElementById("refine-btn");
const outputText = document.getElementById("output-text");

// Event Listeners
generateBtn.addEventListener("click", generatePoem);
refineBtn.addEventListener("click", refinePoem);

// Generate Poem
async function generatePoem() {
  const prompt = userInput.value;
  const tone = toneSelect.value;

  if (!prompt) {
    alert("Please enter a theme or keyword!");
    return;
  }

  const fullPrompt = `Write a ${tone} poem about ${prompt}.`;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: fullPrompt,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 0.9,
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
  const refinementPrompt = userInput.value;
  const previousOutput = outputText.textContent;

  if (!refinementPrompt || !previousOutput) {
    alert("Please generate a poem first and provide refinement instructions!");
    return;
  }

  const fullPrompt = `${refinementPrompt}\n\nPrevious Poem:\n${previousOutput}`;

  try {
    const response = await fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: fullPrompt,
        previous_output: previousOutput,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 0.9,
      }),
    });

    const data = await response.json();
    outputText.textContent = data.output;
  } catch (error) {
    console.error("Error refining poem:", error);
    outputText.textContent = "Failed to refine poem. Please try again.";
  }
}