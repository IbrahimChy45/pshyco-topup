const admin = require('firebase-admin');

// ফায়ারবেস কানেক্ট করার কোড (এর চাবি বা Token আমরা পরে Vercel-এ নিরাপদে বসাবো)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

    const { packageName, price, adminToken } = req.body;

    try {
        const payload = {
            notification: {
                title: "🎮 নতুন গেম অর্ডার এসেছে!",
                body: `প্যাকেজ: ${packageName || 'Top Up'} - মূল্য: ৳${price || 0}`
            },
            token: adminToken
        };
        
        await admin.messaging().send(payload);
        res.status(200).json({ success: true, message: "Notification sent!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to send' });
    }
}
