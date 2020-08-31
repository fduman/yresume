browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == 'send-title') {
        browser.runtime.sendNativeMessage(request);
    }
});
