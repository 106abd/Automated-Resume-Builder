import React, {useState} from 'react'

function Viewport() {

    const [htmlResumeCode, setHtmlResumeCode] = useState(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Test Page</title>
                <style>
                    body { font-family: Arial, sans-serif; background: #f4f4f4; }
                    header { background: #333; color: white; padding: 10px; }
                </style>
            </head>
            <body>
                <header>
                </header>
                <p>This is a full HTML document rendered in an iframe.</p>
                <h1>For Real?</h1>
            </body>
        </html>
    `)

    return (
        <div className='boxContainer' id='viewportContainer'>
            <iframe className='viewportRender' srcDoc={htmlResumeCode} />
        </div>
    )
}

export default Viewport
