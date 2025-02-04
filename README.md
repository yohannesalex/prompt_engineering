# prompt_engineering
# AI Poetry Generator

The **AI Poetry Generator** is a web application that uses **generative AI** to create poems based on user inputs. This README provides a detailed explanation of:
1. The **idea behind the app**.
2. How **prompting techniques** were applied.
3. The **parameters tweaked** and why.

---

## **1. Idea Behind the App**

The **AI Poetry Generator** is designed to demonstrate the power of **prompt engineering** and **generative AI**. The app allows users to:
- Enter a theme or keyword.
- Provide additional context (e.g., tone, audience).
- Refine the generated poem using feedback.
- Adjust AI parameters like `temperature`, `top_p`, and `max_tokens` for fine-tuning.

The goal is to create an interactive and engaging experience where users can explore the creative potential of AI while learning about the techniques used to guide its outputs.

---

## **2. How Prompting Techniques Were Applied**

The app uses the following **prompting techniques** to generate and refine poems:

### **2.1 Contextual Prompting**
Contextual prompting involves providing additional context to guide the AI's response. For example:
- **Prompt**: "Write a romantic poem about love for a wedding audience."
- **Explanation**: The context ("for a wedding audience") helps the AI generate a poem that is appropriate for the occasion.

#### **Example**
```python
prompt = "Write a romantic poem about love for a wedding audience."
response = model.generate_content(prompt)
print(response.text)