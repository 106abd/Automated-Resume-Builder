import React, {useReducer, useState} from 'react'

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_CHAT_LOG':
            return [...state, action.value]
        case 'POP_CHAT_LOG':
            return [...state].slice(0, -1)
        case 'RESET_CHAT_LOG':
            return []
        default:
            return state
    }
}


function Chatbox() {

    const [chatHistory, dispatch] = useReducer(reducer, [{id: 'user', message: 'debug'}, {id: 'system', message: 'debug'}])
    const chatLogs = chatHistory.map((chatLog, logIndex) => <div className='chatLog' id={chatLog.id} key={logIndex}>{chatLog.message}</div>) 
    const [userTextInput, setUserTextInput] = useState('')


    const submissionHandler = (event) => {
        if (event.key == "Enter" && !event.shiftKet) {
            event.preventDefault()

            if (userTextInput.trim()) {
                dispatch({type: 'ADD_CHAT_LOG', value: {id: 'user', message: userTextInput}})
                setUserTextInput('')
                console.log(chatHistory)
            }
        }
    }

    
    return (
        <div className='boxContainer' id='chatContainer'>
            
            <div className='chatBox'>
                {chatLogs}
            </div>

            <textarea value={userTextInput} onChange={(event) => setUserTextInput(event.target.value)} onKeyDown={submissionHandler} className='userInput'></textarea>
        </div>
    )
}

export default Chatbox
