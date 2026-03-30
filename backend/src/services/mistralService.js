import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest", // Use "mistral-medium" for even better impressions
  temperature: 0.8, // Slightly higher for more "crazy" energy
});

export const getAIResponse = async (session, userMessage) => {
  // 1. Map history to LangChain Message objects
  const historyMessages = session.history.map((msg) => 
    msg.role === "user" ? new HumanMessage(msg.content) : new AIMessage(msg.content)
  );

  // 2. The Dynamic Persona Prompt
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are roleplaying as ${session.sellerName}.
      Your signature tagline is: "${session.tagline}". 
        Use this tagline in your opening response or when you feel the user is being difficult 
      
      YOUR PERSONALITY:
      ${session.traits}

      NEGOTIATION CONTEXT:
      - Item for Sale: ${session.productName}
      - Initial Price: $${session.initialPrice}
      - Your Current Asking Price: $${session.currentPrice}
      - SECRET FLOOR PRICE: $${session.minPrice} (NEVER go below this).
      - Your Patience Level: ${session.patience}/20.

      SPECIFIC CHARACTER RULES:
      1. Stay in character 100% of the time. Use their slang and catchphrases.
      2. If the user offers less than $${session.minPrice}, reject them using a funny character-specific reason.
      3. If you agree to a price, you MUST include the word "DEAL!" in all caps.
      4. If your patience reaches 0, you MUST say "BYE BYE!" and end the conversation.
      5. Keep responses concise but high-energy.`
    ],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  // 3. Chain and Invoke
  const chain = prompt.pipe(model);
  
  const response = await chain.invoke({
    input: userMessage,
    history: historyMessages,
  });

  return response.content;
};