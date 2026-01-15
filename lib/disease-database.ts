export interface DiseaseInfo {
  name: string
  description: string
  symptoms: string[]
  prevention: string[]
  whenToSeeDcotor: string
}

const diseaseDatabase: Record<string, DiseaseInfo> = {
  covid: {
    name: "COVID-19",
    description:
      "COVID-19 is an infectious disease caused by the SARS-CoV-2 virus. It primarily affects the respiratory system but can impact multiple organs.",
    symptoms: ["fever", "cough", "fatigue", "loss of taste", "loss of smell", "difficulty breathing"],
    prevention: [
      "get vaccinated",
      "wear masks in crowded areas",
      "maintain physical distance",
      "wash hands frequently",
      "improve ventilation indoors",
    ],
    whenToSeeDcotor:
      "Seek medical care if you experience difficulty breathing, persistent chest pain, confusion, or inability to stay awake. For mild symptoms, rest at home and monitor your condition.",
  },
  diabetes: {
    name: "Diabetes",
    description:
      "Diabetes is a chronic condition that affects how your body regulates blood sugar levels. Types include Type 1, Type 2, and gestational diabetes.",
    symptoms: [
      "excessive thirst",
      "frequent urination",
      "fatigue",
      "blurred vision",
      "slow wound healing",
      "numbness in hands or feet",
    ],
    prevention: [
      "maintain healthy weight",
      "exercise regularly",
      "eat balanced diet low in sugar",
      "reduce processed foods",
      "manage stress",
      "regular health checkups",
    ],
    whenToSeeDcotor:
      "Consult a doctor if you notice persistent symptoms of high blood sugar or for routine diabetes screening, especially if you have a family history.",
  },
  hypertension: {
    name: "Hypertension (High Blood Pressure)",
    description:
      "Hypertension is elevated blood pressure that can damage your heart and blood vessels over time, increasing the risk of heart disease and stroke.",
    symptoms: ["usually no symptoms", "headache", "shortness of breath", "nosebleeds", "chest discomfort"],
    prevention: [
      "reduce sodium intake",
      "maintain healthy weight",
      "exercise regularly",
      "limit alcohol",
      "manage stress",
      "eat more potassium-rich foods",
    ],
    whenToSeeDcotor:
      "Get your blood pressure checked regularly, especially if you have risk factors. Seek immediate care for severe headache, chest pain, or vision changes.",
  },
  flu: {
    name: "Influenza (Flu)",
    description:
      "Flu is a contagious respiratory illness caused by influenza viruses. It spreads through respiratory droplets and typically occurs seasonally.",
    symptoms: ["fever", "cough", "sore throat", "body ache", "fatigue", "headache", "chills"],
    prevention: [
      "get annual flu vaccination",
      "practice good hygiene",
      "cover coughs and sneezes",
      "wash hands frequently",
      "avoid close contact with sick people",
    ],
    whenToSeeDcotor:
      "Seek medical care if you have severe symptoms, difficulty breathing, chest pain, or if you are in a high-risk group (elderly, young children, immunocompromised).",
  },
  asthma: {
    name: "Asthma",
    description:
      "Asthma is a chronic condition affecting the airways in the lungs, causing inflammation and narrowing, leading to difficulty breathing.",
    symptoms: ["shortness of breath", "chest tightness", "coughing", "wheezing", "difficulty exercising"],
    prevention: [
      "avoid triggers (allergens, pollution)",
      "take controller medications as prescribed",
      "maintain good air quality",
      "manage allergies",
      "exercise regularly with doctor approval",
    ],
    whenToSeeDcotor:
      "Seek emergency care for severe asthma attacks with difficulty breathing. Regular checkups are essential for asthma management.",
  },
}

export function getDiseasInfo(diseaseName: string): DiseaseInfo | null {
  const key = diseaseName.toLowerCase()
  return diseaseDatabase[key] || null
}

export function getDiseasesBySymptom(symptom: string): string[] {
  const symptomLower = symptom.toLowerCase()
  const matchingDiseases: string[] = []

  for (const [key, disease] of Object.entries(diseaseDatabase)) {
    if (disease.symptoms.some((s) => s.toLowerCase().includes(symptomLower))) {
      matchingDiseases.push(disease.name)
    }
  }

  return matchingDiseases
}
