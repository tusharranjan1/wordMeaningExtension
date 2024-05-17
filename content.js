
document.addEventListener("mouseup", function(event) {
    var selectedText = window.getSelection().toString().trim();
    console.log(selectedText);
    chrome.runtime.sendMessage({ action: "getMeaning", word: selectedText });
});
