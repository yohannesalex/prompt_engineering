# AI-Powered Poem Generator

## 📌 Overview

This project is an AI-powered **Poem Generator** designed to help users easily create poetry using **optimized prompts**. Users can input a **keyword, context, and example lines** to guide the AI in generating a poem. Additionally, they can fine-tune the **AI's creativity and realism** by adjusting **temperature, top_p, and max tokens**.

---

## 🎯 The Idea Behind the App

The purpose of this app is to simplify **poetry generation** by leveraging AI and **prompt engineering techniques**. Users can enter a **keyword**, add **context** for a more personalized result, and even provide **example lines** to shape the AI's output. Additionally, the app offers **full control** over AI settings such as **temperature, top_p, and max tokens**, enabling users to customize the balance between **creativity and realism** in their generated poems.

By providing an intuitive interface, users can iteratively **refine their prompts** and adjust parameters to get a poem that closely matches their artistic vision.

---

## 🛠️ **Technology Stack**

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Flask
- **AI Integration:** Gemini API
- **Memory Retrieval:** LangChain
- **Dependency Management:** requirements.txt (backend dependencies)

---

## 🛠️ **How Prompting Techniques Were Applied**

To enhance the quality of poem generation, the app integrates several **prompt engineering techniques**:

🔹 **Direct Prompting** → Users can enter a **keyword** to generate a poem instantly.
🔹 **Contextual Prompting** → Users can add **context** to influence the poem’s theme and tone.
🔹 **Few-Shot Prompting** → Users can provide **example lines** to guide the AI towards a specific style.
🔹 **Constrained Prompting** → Users control output constraints via **max tokens** and also control the creativity and the realistic of the reponse using tempreture and top_p.
🔹 **Iterative Prompting** → Users can refine and regenerate responses to improve accuracy and creativity.

By combining these techniques, the app ensures **more personalized and meaningful poetry generation**.

---

## ⚙️ **Parameters Tweaked and Why**

The following AI model parameters were fine-tuned to provide users with **control over creativity and structure**:

✅ **Temperature** → Adjusts **creativity level**:

- **Low (0.2–0.4)** → Produces structured, predictable poems.
- **High (0.7–1.0)** → Creates more **imaginative, free-flowing** poetry.

✅ **Top-p (Nucleus Sampling)** → Controls **response diversity**:

- **Low (0.3–0.5)** → Generates **focused**, logical outputs.
- **High (0.8–1.0)** → Produces more **diverse and creative** poetry.

✅ **Max Tokens** → Controls **poem length**:

- **50 tokens** → Short poem.
- **200+ tokens** → Longer, detailed poem.

These adjustable settings allow users to customize the **level of randomness, diversity, and length** of the generated poems based on their preferences.

---

## 🚀 **Getting Started**

### 1️⃣ **Installation**

```bash
# Clone the repository
git clone https://github.com/yohannesalex/prompt_engineering



# Navigate to backend folder and install dependencies
cd backend
pip install -r requirements.txt
```

### 2️⃣ **Run the Application**

```bash
# Start the backend server
cd backend
python app.py

# Start the frontend (if applicable)
cd frontend
```

### 3️⃣ **Usage**

- Open the app in your browser.
- Enter a keyword, context, and example (optional).
- Adjust AI settings (temperature, top_p, max tokens).
- Click **"Generate Poem"** to get an AI-generated poem.
- Refine and regenerate as needed by adding a prompt in the text field and clicking **refine**.

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 **Contributing**

Feel free to **fork the repo**, create a **new branch**, and submit a **pull request**. Contributions are welcome!

---

## 💡 **Future Enhancements**

- 🎤 **Voice Input** for keyword entry.
- 🎨 **AI-generated visuals** to accompany poems.
- 📜 **Style selection** (e.g., Shakespearean, Haiku, Free Verse).
- 📢 **Social media sharing** for generated poems.

🚀 **Enjoy Creating Beautiful AI-Powered Poems!** 🎶✨

