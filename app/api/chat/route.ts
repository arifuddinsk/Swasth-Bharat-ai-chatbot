import { getResponseForQuery } from "@/lib/chatbot-logic"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    const response = await getResponseForQuery(message)

    return Response.json({ response })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
