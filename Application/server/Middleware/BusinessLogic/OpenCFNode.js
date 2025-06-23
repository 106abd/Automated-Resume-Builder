class Node {

    constructor(nodeConfig = {}) {

        if (!nodeConfig.NodeName || !nodeConfig.TransitionTime || typeof nodeConfig.NodeName !== 'string' || typeof nodeConfig.TransitionTime !== 'number') {
            throw new Error ('Node must have the following properties: "NodeName" (string) and "TransitionTime" (number).')
        }

        Object.assign(this, nodeConfig)

        this.responsePaths = null

        this.userResponse = ''
        this.parentNodes = {}
        this.nextNode = null
        this.previousNode = null

    }
}

export default Node
