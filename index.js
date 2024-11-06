document.getElementById('companyForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('companyUrl').value;
    
    const apiKey = 'Induvidual API key here;
    const prompt = `Summarize the information available on the following website in a concise way for a sales team:
${url}`;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                const summary = data.choices[0].text.trim();
                document.getElementById('summaryText').innerText = summary;
            } else {
                document.getElementById('summaryText').innerText = 'No summary available.';
            }
        } else {
            document.getElementById('summaryText').innerText = 'Failed to generate summary. Please check your API key or try again later.';
        }
        
        document.getElementById('summaryOutput').style.display = 'block';
    } catch (error) {
        console.error('Error generating summary:', error);
        document.getElementById('summaryText').innerText = 'Error generating summary. Please try again later.';
        document.getElementById('summaryOutput').style.display = 'block';
    }
});

