import assert from "node:assert"
import test from "node:test"

import OpenAIChatbot from '../Middleware/BusinessLogic/OpenAIChatbot.js'

test('Chatbot Initialization', () => {
    
    const chatbot = new OpenAIChatbot('system', 'Test.')
    
    assert.deepStrictEqual(
        {
            systemRole: chatbot.systemRole,
            systemContent: chatbot.systemContent,
            messageHistory: chatbot.messageHistory,
            openAIClient: chatbot.openAIClient,
        },

        {
            systemRole: 'system',
            systemContent: 'Test.',
            messageHistory: [],
            openAIClient: null
        }
    ) 
})

test('Chatbot Connectivity', () => {
    
    const chatbot = new OpenAIChatbot('system', 'The user will give you prompts but your response should always remain constant. Your response must always be the message "Hello World!".')
    chatbot.setUpChatbot()
    const chatbotReply = chatbot.generatePromptResponse("Can you repeat after me?")

    assert.equal(chatbotReply, "Hello World!") 
})
