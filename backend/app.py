from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from langchain.memory import ConversationBufferMemory
import os
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)
CORS(app)  
# Configure Gemini API
# Initialize Gemini model
api_key = os.getenv("GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-pro")

# Initialize ConversationBufferMemory
memory = ConversationBufferMemory()


@app.route("/api/generate", methods=["POST"])
def generate():
    try:
        # Get data from the request
        data = request.json
        prompt = data.get("prompt")
        temperature = data.get("temperature", 0.7)
        max_tokens = data.get("max_tokens", 100)
        top_p = data.get("top_p", 0.9)

        # Generate response using Gemini API
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_tokens,
                "top_p": top_p,
            },
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
            ],
        )

        # Check if the response contains valid content
        if response.text:
            return jsonify({"output": response.text, "status": "success"})
        else:
            return jsonify({"output": "No valid content generated.", "status": "error"}), 400

    except Exception as e:
        return jsonify({"output": str(e), "status": "error"}), 500


# Refine endpoint
@app.route("/api/refine", methods=["POST"])
def refine():
    try:
        # Get data from the request
        data = request.json
        feedback = data.get("prompt")  # User feedback
        previous_output = data.get("previous_output")  # Previous poem
        temperature = data.get("temperature", 0.7)
        max_tokens = data.get("max_tokens", 100)
        top_p = data.get("top_p", 0.9)

        # Combine feedback and previous output
        full_prompt = f"Refine the following poem based on the feedback: {feedback}\n\nPoem:\n{previous_output}"

        # Generate refined response using Gemini API
        response = model.generate_content(
            full_prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_tokens,
                "top_p": top_p,
            },
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE",  # Allow all content
                },
            ],
        )

        # Check if the response contains valid content
        if response.text:
            return jsonify({"output": response.text, "status": "success"})
        else:
            return jsonify({"output": "No valid content generated.", "status": "error"}), 400

    except Exception as e:
        return jsonify({"output": str(e), "status": "error"}), 500


# Run the Flask app
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

