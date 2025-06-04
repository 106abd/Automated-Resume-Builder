import Node from "./OpenCFNode.js"
import Chatbot from './OpenAIChatbot.js'

class OpenCF {

    constructor(apiKey, endpointURL, modelVersion, outputFormat, processNodeFunction) {
        this.apiKey = apiKey
        this.endpointURL = endpointURL
        this.modelVersion = modelVersion
        this.outputFormat = outputFormat
        this.processNodeFunction = processNodeFunction 

        this.chatbotOutputs = {}
        this.currentNode = null
        this.flowStart = null
        this.processNodeCounter = 2
        this.processNodeCounterRange = this.processNodeCounter + 1
        this.registeredChatbots = {}
        this.registeredNodes = {}
    }

    // Function that defines possible user responses for a given node and the corresponding nodes that should execute if their response is chosen
    appendNode(nodeName, userResponsePaths) {

        const node = this.registeredNodes[nodeName]  // Obtain the given node

        // If there isn't a current starting node in the conversational flow, assign the given node as the starting node
        if (this.flowStart === null) {
            this.flowStart = node
        }

        node.responsePaths = userResponsePaths  // Set the given node's response paths to the given response paths

        // Loop through every response path for the given node, obtain the children nodes and set their parent attribute to the given node
        for (const path in node.responsePaths) {
            
            const childNodeName = node.responsePaths[path]
            const childNode = this.registeredNodes[childNodeName]

            childNode.parentNodes[childNodeName] = path

        }
        
    }

    // Function that creates a chatbot object with the given parameters and registers it to the conversational flow chatbot registry.
    createChatbot(chatbotName, systemRole, systemContent, apiKey = this.apiKey, endpointURL = this.endpointURL, modelVersion = this.modelVersion){

        const newChatbot = new Chatbot(systemRole, systemContent, apiKey, endpointURL, modelVersion)
        newChatbot.setUpChatbot() // Initializes OpenAI API connection

        this.registeredChatbots[chatbotName] = newChatbot
    }
    
    // Function that creates a node object with the given parameters and registers it to the conversational flow node registry.
    createNode({nodeConfig = {}}) {
        const newNode = new Node({nodeConfig})
        this.registeredNodes[newNode.nodeName] = newNode
    }
    
    getUserInputOptions() {
        let inputOptions = {TextInput: this.currentNode.textResponse, ButtonsInput: []}

        if (this.currentNode.buttonResponse) {
            const buttonOptions = Object.keys(this.currentNode.responsePaths)
            inputOptions.ButtonsInput = buttonOptions
        }

        return inputOptions
    }

    // Function that is the logic of processing the current node's inputs and chatbot outputs (meant to be overwritten by developers)
    nodeProcessingFunction(systemResponseInfo) {
        return systemResponseInfo
    }

    // Function that processes the user's response with the custom process node function
    processNode(userPrompt=''){

        this.traverseFlow()

        if (this.currentNode) {

            this.currentNode.userResponse = userPrompt

            let systemResponseInfo = {... this.outputFormat}
            
            systemResponseInfo = this.nodeProcessingFunction(systemResponseInfo)

            if (!systemResponseInfo) {
                throw new Error('processNodeFunction must return outputFormat.')
            }
            
            return systemResponseInfo
        }

    }

    // Function that manually sets the current node (instead of using the traverseNode() function)
    setCurrentNode(nodeName) {
        if (nodeName in this.registeredNodes) {
            const targetNode = this.registeredNodes[nodeName]
            this.currentNode = targetNode 
        
        } else {
            console.error('Node not found in registered nodes.')
        }
    }

    // Function that sets the next node according to the response that best matches the user's response
    setNextNode() {

        if (this.currentNode.responsePaths) {
            
            // If the user's response is exactly a defined path (e.g. user response 'Hi' is exactly the same as path 'Hi') 
            if (this.currentNode.userResponse in this.currentNode.responsePaths) {

                const nextNodeName = this.currentNode.responsePaths[this.currentNode.userResponse]
                const nextNode = this.registeredNodes[nextNodeName]

                this.currentNode.nextNode = nextNode
            
            // If the user's response matches none of the paths, match the user's intent with a path closest to the user's intent.
            } else {

                const numOfPaths = Object.keys(this.currentNode.responsePaths).length  // Obtaining the number of paths (dict keys)
                
                // If there is only one path, then it is chosen by default
                if (numOfPaths === 1) {

                    const selectedPath = Object.keys(this.currentNode.responsePaths)[0]
                    this.currentNode.nextNode = this.registeredNodes[selectedPath]
                }

                // If there are multiple paths, construct an array of the responses paths (dict keys) represented as a string 
                else if (numOfPaths > 1) {

                    let pathSelectionInfo = '['

                    // Loop through the paths and add more array items (represented as a string)
                    for (const path in this.currentNode.responsePaths) {
                        pathSelectionInfo = `${pathSelectionInfo}${path}, `
                    }

                    // Cut off the last commma and space
                    pathSelectionInfo = `${pathSelectionInfo.slice(0, -2)}] , ${this.currentNode.userResponse}` 

                    const selectedPath = null
                    this.currentNode.nextNode = this.registeredNodes[this.currentNode.responsePaths[selectedPath]]
                }
            } 
        }
    }

    // Function that sets the next node as the current node
    traverseFlow() {

        // If there is no next node configured, restart the conversational flow from the start
        if (this.currentNode.nextNode === null) {
            this.currentNode = this.flowStart
        } else {
            this.currentNode = this.currentNode.nextNode
        }
    }
}
