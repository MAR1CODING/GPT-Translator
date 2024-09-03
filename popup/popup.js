// scripts/popup.js

// Get the button element
document.getElementById('actionButton').addEventListener('click', function() {
    // URL to navigate to
    const url = 'https://www.youtube.com'; // Replace with your desired URL
    
    // Open the URL in a new tab
    chrome.tabs.create({ url: url });
});