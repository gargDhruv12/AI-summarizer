document.addEventListener("DOMContentLoaded", () => {
    // Load saved API key if it exists
    chrome.storage.sync.get(["geminiApiKey"],(result)=>{
        if(result.geminiApiKey){
            document.getElementById("api-key").value = result.geminiApiKey;
        }
    })

    // save API key when button is clicked
    document.getElementById("save-button").addEventListener("click",() => {
        const apikey = document.getElementById("api-key").value.trim();

        if(apikey){
            chrome.storage.sync.set({geminiApiKey: apikey},()=>{
                const successMessage = document.getElementById("success-message");
                successMessage.style.display = "block";

                // show the tab after a short delay to show the success message
                setTimeout(() => {
                    window.close();

                    chrome.tabs.getCurrent((tab) => {
                        if(tab){
                            chrome.tabs.remove(tab.id);
                        }
                    });
                },1000);
            });
        }
    });
});


