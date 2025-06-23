import assert from "node:assert"
import test from "node:test"
import Node from "../Middleware/BusinessLogic/OpenCFNode.js"

test.describe("OpenCFNode Initialization", () => {
    
    test('Error thrown when no parameters are provided upon object creation', () => {
        assert.throws(() => { new Node() },
        /.*must have.*properties/i)
    })

    test('Error thrown when nodeName parameter is provided with incorrect data type (non-string) upon object creation', () => {
        assert.throws(() => { new Node(15, 15) },
        /.*must have.*properties/i)
    })

    
    test('Error thrown when transitionTime parameter is provided with incorrect data type (non-number) upon object creation', () => {
        assert.throws(() => { new Node('Node1', 15) },
        /.*must have.*properties/i)
    })

    test('No error thrown upon object creation when all required parameters (node name and transition time) are provided with correct data types (string and number)', () => {
        
        const node = new Node({ NodeName: 'StartNode', TransitionTime: 5 })
        
        assert.strictEqual(node.NodeName, 'StartNode')
        assert.strictEqual(node.TransitionTime, 5)
    })

    test('Node object should have custom attributes when custom parameters are passed as arguments upon object creation.', () => {
        
        const node = new Node({ NodeDefaultMessage: 'Hi.', NodeName: 'StartNode', TransitionTime: 5 })
        
        assert.strictEqual(node.NodeName, 'StartNode')
        assert.strictEqual(node.TransitionTime, 5)
        assert.strictEqual(node.NodeDefaultMessage, 'Hi.')
    })
})
