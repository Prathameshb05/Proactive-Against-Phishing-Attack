async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/h-e-l-l-o/email-spam-classification-merged",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

// function sendData() {
//     const userInput = document.getElementById('userInput').value;
//     query({ "inputs": userInput }).then((response) => {
//         // Create a string to hold the formatted output
//         let output = '';
//         // Loop through each object in the response array
//         for (let obj of response[0]) {
//             // Add the label and score to the output string
//             output += `Label: ${obj.label}, Score: ${obj.score}\n`;
//         }
//         // Update the output element with the formatted output
//         document.getElementById('output').innerText = output;
//     });
// }



function sendData() {
    const userInput = document.getElementById('userInput').value;
    query({ "inputs": userInput }).then((response) => {
        let maxLabel = '';
        let maxScore = -1;
        // Loop through each object in the response array
        for (let obj of response[0]) {
            // Check if the score of the current object is greater than maxScore
            if (obj.score > maxScore) {
                // If it is, update maxScore and maxLabel
                maxScore = obj.score;
                maxLabel = obj.label;
            }
        }
        // Show an alert with the label that has the highest score
        alert("This is a " + maxLabel + " mail.");
    });
}
