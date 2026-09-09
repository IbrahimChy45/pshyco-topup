export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body;
    
    // Vercel এর ড্যাশবোর্ড থেকে টোকেনগুলো নিবে
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return res.status(500).json({ error: 'Server config missing' });
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
