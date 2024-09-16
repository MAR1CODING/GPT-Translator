


const ethAddress = '0x70d01Fa89134BB4A285788103fc448b21e74bf7D';
const solAddress = '6968VpU1hyW6bwzPxyD3gV2YDWFzRsFyTyY3tpbeqLr3';

let copyButtonEth = document.getElementById('copy-eth');
copyButtonEth.addEventListener('click', () => copyToClipboard(ethAddress));

let copyButtonSol = document.getElementById('copy-sol');
copyButtonSol.addEventListener('click', () => copyToClipboard(solAddress));

// script.js
function copyToClipboard(address) {
    console.log('Button clicked'); // Debugging line
    navigator.clipboard.writeText(address).then(() => {
        alert("Address copied")
    })
}