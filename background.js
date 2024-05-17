chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "getMeaning") {
        const word = message.word;
        console.log(word);
        getMeaningFromAPI(word);
    }
});

async function getMeaningFromAPI(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const meanings = data[0].meanings.map(meaning => {
                return `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}`;
            }).join('\n');
            const meaningElement = document.getElementById('meaningElement');
            meaningElement.textContent = meanings;
        } else {
            const meaningElement = document.getElementById('meaningElement');
            meaningElement.textContent = "Meaning not found";
        }
    })
    .catch(error => {
        console.error('Error fetching meaning:', error);
        const meaningElement = document.getElementById('meaningElement');
        meaningElement.textContent = "Error fetching meaning";
    });
}
