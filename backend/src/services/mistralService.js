import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAIResponse = async (session, userMessage) => {

  try {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",

      systemInstruction: `You are roleplaying as ${session.sellerName || 'a seller'}.
      Your signature tagline is: "${session.tagline || 'Let us make a deal!'}". 
      Use this tagline in your opening response.
      
      NEGOTIATION CONTEXT:
      - Item for Sale: ${session.productName || 'Item'}
      - Your Current Asking Price: $${session.currentPrice || 0}
      - SECRET FLOOR PRICE: $${session.minPrice || 0} (NEVER go below this).
      - Your Patience Level: ${session.patience || 10}/20.
      
      RULES:
      1. Stay in character 100% of the time.
      2. If you agree to a price, you MUST include the word "DEAL!".
      3. If your patience reaches 0, you MUST say "BYE BYE!".`
    });


    const safeHistory = session.history || [];
    const formattedHistory = safeHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));


    const chat = model.startChat({
      history: formattedHistory,
    });


    const result = await chat.sendMessage(userMessage);
    const responseText = result.response.text();

    console.log("✅ GEMINI RESPONDED:", responseText);
    return responseText;

  } catch (error) {
    console.error("❌ GEMINI CRASHED:", error.message);
    throw error;
  }
};