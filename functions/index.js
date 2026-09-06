const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendPushNotification = functions.database.ref('/orders/{orderId}')
    .onCreate(async (snapshot, context) => {
        const orderData = snapshot.val();
        
        const tokenSnapshot = await admin.database().ref('settings/admin_fcm_token').once('value');
        const adminFcmToken = tokenSnapshot.val();

        if (!adminFcmToken) {
            console.log('No admin FCM token found!');
            return null;
        }

        const payload = {
            notification: {
                title: "🎮 নতুন গেম অর্ডার এসেছে!",
                body: `প্যাকেজ: ${orderData.packageName || 'Top Up'} - মূল্য: ৳${orderData.price || 0}`
            },
            token: adminFcmToken
        };

        try {
            await admin.messaging().send(payload);
            console.log('Notification sent successfully!');
        } catch (error) {
            console.log('Error sending notification:', error);
        }
    });
