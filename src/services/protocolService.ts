import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function fetchProtocolDetails(protocolName: string, fullName: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Fournissez une description technique détaillée pour le protocole réseau "${protocolName}" (${fullName}). 
      Répondez obligatoirement en FRANÇAIS.
      Incluez la fonction principale, le(s) numéro(s) de port par défaut, les cas d'utilisation courants et mentionnez si le protocole est considéré comme sécurisé ou non selon les normes modernes.
      Renoyez la réponse au format JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING, description: "Une description technique d'environ deux paragraphes en français." },
            port: { type: Type.STRING, description: "Le ou les numéros de port par défaut associés à ce protocole." },
            usage: { type: Type.STRING, description: "Cas d'utilisation le plus courant ou application industrielle, en français." },
            isSecure: { type: Type.BOOLEAN, description: "Vrai si le protocole utilise le chiffrement par défaut, faux sinon." }
          },
          required: ["description", "port", "usage", "isSecure"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching protocol details:", error);
    return null;
  }
}
