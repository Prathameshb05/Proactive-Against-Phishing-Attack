async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/alimazhar-110/website_classification",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}


/*
function sendData() {
    const userInput = document.getElementById('userInput').value;
    query({ "inputs": userInput }).then((response) => {
        // Create a string to hold the formatted output
        let output = '';
        // Loop through each object in the response array
        for (let obj of response[0]) {
            // Add the label and score to the output string
            output += `Label: ${obj.label}, Score: ${obj.score}\n`;
        }
        // Update the output element with the formatted output
        document.getElementById('output').innerText = output;
    });
}
*/

function sendData() {
    const userInput = document.getElementById('userInput').value;
    query({ "inputs": userInput }).then((response) => {
        // Sort the response array by score in descending order
        let sortedResponse = response[0].sort((a, b) => b.score - a.score);
        // Take the top 5 objects from the sorted array
        let top5 = sortedResponse.slice(0, 5);
        // Create a string to hold the formatted output
        let output = '';
        // Loop through each object in the top5 array
        for (let obj of top5) {
            // Convert the score to a percentage and round it to 2 decimal places
            let scorePercentage = (obj.score * 100).toFixed(2);
            // Add the label and score to the output string
            output += `Label: ${obj.label}, Score: ${scorePercentage}%\n`;
        }
        // Show an alert with the formatted output
        alert(output);
    });
}