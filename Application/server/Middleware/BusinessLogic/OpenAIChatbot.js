import dotenv from 'dotenv' // Dotenv (.env) processing module
import openAI from 'openai'

dotenv.config() // Automate dotenv configurations processing

class OpenAIChatbot { 
    constructor(systemRole, systemContent, apiKey, endpointURL, modelVersion) {
        
        if (!systemRole || !systemContent || !apiKey || !endpointURL || !modelVersion) {
            throw new Error('All parameters (systemRole, systemContent, apiKey, endpointURL, modelVersion) are required for chatbot initialization.');
        }

        this.systemRole = systemRole
        this.systemContent = systemContent
        
        this.apiKey = apiKey
        this.endpointURL = endpointURL
        this.modelVersion = modelVersion
        this.messageHistory = []
        this.openAIClient = null
    }

    setupChatbot() {
        this.messageHistory = []

        if (this.systemRole && this.systemContent) {
            
            const configInfo = {apiKey: this.apiKey, baseURL: this.endpointURL}
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
                model: this.modelVersion
            })

            const promptResponse = promptResponseInfo.choices[0].message
            this.messageHistory.push(promptResponse)

            return promptResponse.content
        
        } catch (error) { 
            console.log(error.message)
            return 'I am currently facing a chat connection error. Please try again another time.' 
        }
    }
}

export default OpenAIChatbot
