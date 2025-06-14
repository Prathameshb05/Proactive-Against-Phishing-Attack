async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-sms-spam-detection",
        {
            headers: { 
                "Authorization": "Bearer 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", 
                "Content-Type": "application/json"  // Ensure the content type is set to JSON
            },
            method: "POST",
            body: JSON.stringify(data),  // Ensure data is correctly serialized as JSON
        }
    );
    
    const result = await response.json();
    return result;
}

function sendData() {
    const userInput = document.getElementById('userInput').value.trim();
    
    // Check for empty input
    if (!userInput) {
        alert("Please enter a message.");
        return;
    }
    
    query({ "inputs": userInput }).then((response) => {
        console.log("Response received:", response); // Log the full response
        
        // If the response contains an error, log and stop
        if (response.error) {
            console.error("API Error:", response.error);
            alert("Error: " + response.error);
            return;
        }
        
        let maxLabel = '';
        let maxScore = -1;

        // Assuming response[0] has the prediction data
        if (Array.isArray(response)) {
            // Iterate through each label and determine the highest score
            for (let obj of response[0]) {
                let labelName = obj.label === 'LABEL_0' ? 'ham' : 'spam';
                if (obj.score > maxScore) {
                    maxScore = obj.score;
                    maxLabel = labelName;
                }
            }
            
            // Display the result in an alert
            alert("This is a " + maxLabel + " message.");
        } else {
            console.error("Unexpected response structure:", response);
        }
    }).catch((error) => {
        console.error("Error in fetching or processing response:", error);
    });
}
