export interface DetectedIntent {
  type: "greeting" | "disease_info" | "symptoms" | "prevention" | "general_health" | "emergency" | "unknown"
  disease?: string
  symptoms?: string[]
}

const emergencyKeywords = [
  "emergency",
  "urgent",
  "call ambulance",
  "call 911",
  "critical",
  "severe pain",
  "dying",
  "unconscious",
]

const greetingKeywords = ["hello", "hi", "hey", "greetings", "how are you", "what can you do"]

const diseaseNames = [
  "covid",
  "covid-19",
  "coronavirus",
  "diabetes",
  "hypertension",
  "high blood pressure",
  "flu",
  "influenza",
  "asthma",
  "heart disease",
  "cardiac",
  "cancer",
  "arthritis",
  "thyroid",
  "hyperthyroidism",
  "malaria",
  "dengue",
  "tuberculosis",
  "tb",
  "pneumonia",
  "obesity",
  "cholesterol",
  "migraine",
  "depression",
  "anxiety",
]

const symptomsKeywords = [
  "symptom",
  "symptoms",
  "pain",
  "ache",
  "feeling",
  "experience",
  "having",
  "suffer",
  "hurt",
  "itch",
  "cough",
  "fever",
  "headache",
  "nausea",
]

const preventionKeywords = ["prevent", "prevention", "avoid", "how to stay healthy", "reduce risk", "healthy habits"]

const commonSymptoms = [
  "fever",
  "cough",
  "headache",
  "fatigue",
  "nausea",
  "vomiting",
  "diarrhea",
  "sore throat",
  "chest pain",
  "difficulty breathing",
  "muscle pain",
  "body ache",
  "shortness of breath",
]

export function detectIntent(userMessage: string): DetectedIntent {
  const messageLower = userMessage.toLowerCase()

  // Check for emergency
  if (emergencyKeywords.some((keyword) => messageLower.includes(keyword))) {
    return { type: "emergency" }
  }

  // Check for greeting
  if (greetingKeywords.some((keyword) => messageLower.includes(keyword))) {
    return { type: "greeting" }
  }

  // Check for disease information
  for (const disease of diseaseNames) {
    if (messageLower.includes(disease)) {
      return { type: "disease_info", disease }
    }
  }

  // Check for symptoms
  if (symptomsKeywords.some((keyword) => messageLower.includes(keyword))) {
    const detectedSymptoms = commonSymptoms.filter((symptom) => messageLower.includes(symptom))
    return { type: "symptoms", symptoms: detectedSymptoms.length > 0 ? detectedSymptoms : ["general"] }
  }

  // Check for prevention
  if (preventionKeywords.some((keyword) => messageLower.includes(keyword))) {
    return { type: "prevention" }
  }

  // Check for general health queries
  if (messageLower.includes("health") || messageLower.includes("wellness") || messageLower.includes("fitness")) {
    return { type: "general_health" }
  }

  return { type: "unknown" }
}
