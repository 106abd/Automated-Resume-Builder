import assert from "node:assert"
import test from "node:test"

import dotenv from 'dotenv' // Dotenv (.env) processing module
import OpenAIChatbot from '../Middleware/BusinessLogic/OpenAIChatbot.js'

dotenv.config() // Automate dotenv configurations processing

// Global variables
const systemRole = 'system' 
const systemContent = 'Respond with "yes" or "no" even if the user prompt is not a yes or no question.'

const apiKey = process.env.OPEN_AI_API_KEY
const endpointURL = process.env.ENDPOINT_URL
const modelVersion = process.env.MODEL_VERSION


test.describe("OpenAIChatbot Initialization", () => {
    test("Error thrown when no parameters are provided upon object creation", () => {
        assert.throws(() => { new OpenAIChatbot() }, 
        /All parameters.*are required/i)
    })

    test("Error thrown when missing parameters are provided upon object creation", () => {
        assert.throws(() => { new OpenAIChatbot(systemRole, systemContent, null, endpointURL, modelVersion) }, 
        /All parameters.*are required/i)
    })

    test("Object created successfully when all parameters are filled", () => {
        const chatbot = new OpenAIChatbot(systemRole, systemContent, apiKey, endpointURL, modelVersion)

        assert.strictEqual(chatbot.systemRole, systemRole)
        assert.strictEqual(chatbot.systemContent, systemContent)
        assert.strictEqual(chatbot.apiKey, apiKey)
        assert.strictEqual(chatbot.endpointURL, endpointURL)
        assert.strictEqual(chatbot.modelVersion, modelVersion)
    })
})


test.describe("OpenAIChatbot Setup", () => {
    test('Message history has 1 entry upon successful chatbot setup (valid parameters and OpenAI API connectivity)', () => {
        const chatbot = new OpenAIChatbot(systemRole, systemContent, apiKey, endpointURL, modelVersion)
        chatbot.setupChatbot()

        assert.strictEqual(chatbot.messageHistory.length, 1)
        assert.deepStrictEqual(chatbot.messageHistory[0], { role: systemRole, content: systemContent })
    })
})


test.describe("OpenAIChatbot Generating Responses", () => {
    test('String response generated from chatbot object and appended to the message history', async () => {
        const chatbot = new OpenAIChatbot(systemRole, systemContent, apiKey, endpointURL, modelVersion)
        chatbot.setupChatbot()

        const response = await chatbot.generatePromptResponse('Hi.')

        assert.ok(response) // Check that a response is returned
        assert.strictEqual(typeof response, 'string')
        assert.strictEqual(chatbot.messageHistory.length, 3)
    })


    test('String response should be the default system response during an API call error', async () => {
        const chatbot = new OpenAIChatbot(systemRole, systemContent, apiKey, endpointURL, 'invalid model version')
        chatbot.setupChatbot()

        const response = await chatbot.generatePromptResponse('Hi.')
        assert.ok(response)
        assert.strictEqual(typeof response, 'string')
        assert.match(response, /.*Chat connection error. Please try again/i)
    })


    test('Message History Maintenance', async () => {
        const chatbot = new OpenAIChatbot(systemRole, systemContent, apiKey, endpointURL, modelVersion);
        chatbot.setupChatbot()

        await chatbot.generatePromptResponse('Hi.')
        await chatbot.generatePromptResponse('Bye.')

        assert.strictEqual(chatbot.messageHistory.length, 5) // 3 system message + 2 user messages
        assert.deepStrictEqual(chatbot.messageHistory[1], { role: 'user', content: 'Hi.' })
        assert.deepStrictEqual(chatbot.messageHistory[3], { role: 'user', content: 'Bye.' })
    })
})
