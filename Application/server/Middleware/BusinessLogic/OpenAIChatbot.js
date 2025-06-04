import dotenv from 'dotenv' // Dotenv (.env) processing module
import openAI from 'openai'

dotenv.config() // Automate dotenv configurations processing

class OpenAIChatbot { 
    constructor(systemRole, systemContent, apiKey, endpointURL, modelVersion) {
        this.systemRole = systemRole
        this.systemContent = systemContent
        
        this.apiKey = apiKey
        this.endpointURL = endpointURL
        this.modelVersion = modelVersion
        this.messageHistory = []
        this.openAIClient = null
    }

    setUpChatbot() {
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

        // console.log(promptResponseInfo.choices[0].message.content)
        return promptResponseInfo.choices[0].message.content
        
        } catch (error) { console.log(error.message) }
    }
}

export default OpenAIChatbot
