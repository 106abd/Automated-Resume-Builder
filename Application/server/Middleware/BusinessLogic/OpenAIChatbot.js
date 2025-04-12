const dotenv = require('dotenv') // Dotenv (.env) processing module
const openAI = require('openai')

dotenv.config() // Automate dotenv configurations processing

class OpenAIChatbot { 
    constructor(systemRole, systemContent) {
        this.systemRole = systemRole
        this.systemContent = systemContent
        
        this.messageHistory = []
        this.openAIClient = null
    }

    setUpChatbot() {
        this.messageHistory = []

        if (this.systemRole && this.systemContent) {
            
            const configInfo = {baseURL: process.env.ENDPOINT_URL, apiKey: process.env.OPEN_AI_API_KEY}
            const systemInfo = {role: this.systemRole, content: this.systemContent}

            this.openAIClient = new openAI(configInfo)
            this.messageHistory.push(systemInfo)
        }
    }

    async generatePromptResponse(messagePrompt) {
        const promptInfo = {role: 'user', content: messagePrompt}
        this.messageHistory.push(promptInfo)

        try {
        const promptResponseInfo = await this.openAIClient.chat.completions.create({
            messages: this.messageHistory,
            temperature: 1.0,
            top_p: 1.0,
            max_tokens: 1000,
            model: process.env.MODEL_VERSION
        })

        console.log(promptResponseInfo.choices[0].message.content)
        return promptResponseInfo.choices[0].message.content
        
    
    } catch (error) {
        console.log(error.message)
    }
    }
}

const chatbot = new OpenAIChatbot('system', 'The user will give you prompts but your response should always remain constant. Your response must always be the message "Hello World!".')
chatbot.setUpChatbot()
const chatbotReply = chatbot.generatePromptResponse("Can you repeat after me?")
console.log(chatbotReply)

module.exports = OpenAIChatbot
