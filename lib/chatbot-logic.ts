import { detectIntent } from "./intent-detection"
import { getDiseasInfo, getDiseasesBySymptom } from "./disease-database"

export async function getResponseForQuery(userMessage: string): Promise<string> {
  const intent = detectIntent(userMessage)

  switch (intent.type) {
    case "greeting":
      return "Hello! I'm here to help you learn about health topics. You can ask me about specific diseases, prevention methods, symptoms, or general health advice. What would you like to know?"

    case "disease_info":
      if (intent.disease) {
        const info = getDiseasInfo(intent.disease)
        if (info) {
          return `**${info.name}**\n\n**Description:** ${info.description}\n\n**Symptoms:** ${info.symptoms.join(", ")}\n\n**Prevention:** ${info.prevention.join(", ")}\n\n**When to see a doctor:** ${info.whenToSeeDcotor}`
        }
      }
      return "I'm not sure which disease you're asking about. Could you please specify? I can provide information about common diseases like COVID-19, Diabetes, Hypertension, Flu, and more."

    case "symptoms":
      if (intent.symptoms && intent.symptoms.length > 0) {
        const relevantDiseases = getDiseasesBySymptom(intent.symptoms[0])
        if (relevantDiseases.length > 0) {
          const diseaseList = relevantDiseases.map((d) => `• ${d}`).join("\n")
          return `Based on the symptom "${intent.symptoms[0]}", these conditions might be related:\n\n${diseaseList}\n\nPlease note: This is not a diagnosis. Consult a healthcare professional for proper evaluation.`
        }
      }
      return "I can help you identify potential health conditions based on symptoms. Please describe the symptoms you're experiencing, and I'll provide relevant information."

    case "prevention":
      return "Here are some general health prevention tips:\n\n• Maintain a balanced diet with fruits, vegetables, and whole grains\n• Exercise regularly (at least 150 minutes per week)\n• Stay hydrated by drinking plenty of water\n• Get adequate sleep (7-9 hours per night)\n• Practice good hygiene (hand washing, dental care)\n• Manage stress through relaxation techniques\n• Avoid smoking and limit alcohol consumption\n• Get regular health check-ups\n• Stay updated with recommended vaccinations\n• Maintain a healthy weight\n\nWould you like more specific prevention tips for a particular disease?"

    case "general_health":
      return "I'm happy to discuss general health topics. Here are some common areas I can help with:\n\n• Healthy lifestyle habits\n• Nutrition and diet\n• Exercise and fitness\n• Sleep and rest\n• Mental health and stress management\n• Disease prevention\n• Common health conditions\n\nWhat specific aspect of health would you like to explore?"

    case "emergency":
      return "If this is a medical emergency, please call emergency services immediately (911 in the US or your local emergency number). I am not able to provide emergency medical care. For urgent health concerns, please seek immediate professional medical attention."

    default:
      return "I'm here to provide general health information and disease awareness. Could you rephrase your question? You can ask about specific diseases, symptoms, prevention methods, or general health advice."
  }
}
