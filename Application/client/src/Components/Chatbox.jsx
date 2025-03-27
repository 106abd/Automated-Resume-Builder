import React, {useEffect, useReducer, useRef, useState} from 'react'

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
    const [userTextInput, setUserTextInput] = useState('')
    const focusInput = useRef(null)
    const focusMessage = useRef(null)

    const chatLogs = chatHistory.map((chatLog, logIndex) => <div className='chatLog' id={chatLog.id} key={logIndex}>{chatLog.message}</div>)

    useEffect(() => {
        // Focuses the currently referenced InputField
        if (focusInput.current) {
            focusInput.current.focus()
        }
    }, [])

    useEffect(() => {
        // Focuses the currently referenced InputField
        if (focusMessage.current) {
            focusMessage.current.scrollTo({top: focusMessage.current.scrollHeight, behavior: 'smooth'})
        }
    }, [chatHistory])


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
            
            <div className='chatBox' ref={focusMessage}>
                {chatLogs}
            </div>

            <textarea 
                value={userTextInput} 
                onChange={(event) => setUserTextInput(event.target.value)} 
                onKeyDown={submissionHandler} 
                ref={focusInput} 
                className='userInput' 
            />
            
        </div>
    )
}

export default Chatbox
