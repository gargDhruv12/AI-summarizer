document.getElementById("summarize").addEventListener("click",  () => {
    const result = document.getElementById("result");
    result.textContent = "Summarizing...";
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        chrome.tabs.sendMessage(
            tab.id,
            {type: "GET_ARTICLE_TEXT"},
            (response) => {
                if (!response || chrome.runtime.lastError) {
                    result.textContent = "Could not read article. Try refreshing the page.";
                } else {
                    result.textContent = response.text ? response.text.slice(0,300) : "No Article text found";
                }
            }
        );
    });
});