
/* 
chrome.runtime.onInstalled.addListener(() => {
    const extensionId = chrome.runtime.id; // Get the extension's ID dynamically
    const url = `chrome-extension://${extensionId}/donate/donate.html`; // Path to the new page
    chrome.tabs.create({ url });
});
 */


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log("Tab updated: ", tab);
    }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
        // Realiza alguna acción si fuera posible
        console.log("Mensaje recibido para abrir el popup");

        chrome.action.setPopup({ popup: 'popup.html' });
    }
});