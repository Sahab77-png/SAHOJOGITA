export const checkModeration = async (text) => {
    try {
        const res = await
        fetch('https://localhost:5000/moderate', {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({ input:text}),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Moderation Error:', err);
        return {flagged: false};
    }
};