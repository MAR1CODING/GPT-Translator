


const ethAddress = '0x778B0920333208482E4C4B883e4A8592a1d5b036';


let copyButton = document.getElementById('copy')
copyButton.addEventListener('click', copyToClipboard)



// script.js
function copyToClipboard() {
    console.log('Button clicked'); // Debugging line
    navigator.clipboard.writeText(ethAddress).then(() => {
        console.log('Text copied'); // Debugging line
        copyButton.textContent = 'Address copied';
        setTimeout(() => {
            copyButton.textContent = 'Copy Address';
        }, 5000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}