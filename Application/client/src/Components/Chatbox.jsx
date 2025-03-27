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

                sendUserPrompt()
                setUserTextInput('')
                console.log(chatHistory)
            }
        }
    }


    //  ------------------------ FUNCTIONS --------------------------
    const sendUserPrompt = async() => {
        
        const requestRoute = '/chat'
        
            try {
                console.log(userTextInput)
        
                const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_API_ADDRESS}${requestRoute}`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userPrompt: userTextInput})
                })
    
                if (serverResponse.ok) {

                    const jsonData = await serverResponse.json()
                    console.log(jsonData)
                    dispatch({type: 'ADD_CHAT_LOG', value: {id: 'system', message: jsonData.message}})

                } else {
                    console.error(`Server Error Logged Status Code: ${serverResponse.status}`)
                }
        
            } catch (error) {
                console.log(error.message)
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
