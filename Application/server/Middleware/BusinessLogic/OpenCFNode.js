class Node {

    constructor(nodeConfig = {}) {

        if (!nodeConfig.NodeName && !nodeConfig.TransitionTime) {
            throw new Error ('Node must have the following properties: "NodeName" and "TransitionTime".')
        }

        Object.assign(this, nodeConfig)

        this.responsePaths = null

        this.userResponse = ''
        this.parentNodes = {}
        this.nextNode = null
        this.previousNode = null

    }

    getDynamicPrompt() {
        if (typeof this.dynamicPrompt === 'function') {
            const dynamicPromptOutput = this.dynamicPrompt()
            return dynamicPromptOutput
        } else {
            return null
        }
    }

}

export default Node
