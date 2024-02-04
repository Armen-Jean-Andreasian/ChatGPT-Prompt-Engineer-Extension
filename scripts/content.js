class ChatGPTContentScript {
    constructor() {
        chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    }

    handleMessage(request, sender, sendResponse) {
        console.log('Received message:', request);

        if (request.action === 'insertText') {
            if (window.location.href.startsWith('https://chat.openai.com/')) {
                let promptTextarea = document.getElementById('prompt-textarea');

                if (promptTextarea && promptTextarea.tagName === 'TEXTAREA') {
                    // Insert text into the textarea
                    promptTextarea.value += request.text;

                    // Trigger the 'input' event to notify of the change
                    promptTextarea.dispatchEvent(new Event('input', { bubbles: true }));

                    console.log('Text inserted successfully.');
                } else {
                    console.error('Textarea element not found on the page.');
                }
            } else {
                console.error('Extension works only on pages with https://chat.openai.com/.');
            }
        }
    }
}

const chatGPTContentScript = new ChatGPTContentScript();
