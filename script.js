// প্যাকেজ সিলেক্ট করার ফাংশন
function selectPackage(selectedElement) {
    // প্রথমে সব প্যাকেজ থেকে 'active' ক্লাস সরিয়ে ফেলবে
    let allPackages = document.querySelectorAll('.package-box');
    allPackages.forEach(function(pkg) {
        pkg.classList.remove('active');
    });
    
    // এরপর যেই প্যাকেজে ক্লিক করা হয়েছে, শুধু সেটিতে 'active' ক্লাস যুক্ত করবে
    selectedElement.classList.add('active');
}
// ==========================================
// অর্ডার সাবমিট করে টেলিগ্রামে পাঠানোর লজিক
// ==========================================

document.querySelector('.submit-btn').addEventListener('click', function() {
    
    // কাস্টমারের দেওয়া তথ্যগুলো সংগ্রহ করা
    let uid = document.querySelector('input[placeholder="Enter Player UID"]').value;
    let name = document.querySelector('input[placeholder="Enter Player Name"]').value;
    let trxId = document.querySelector('input[placeholder="Enter Transaction ID"]').value;

    // কোন প্যাকেজটি সিলেক্ট করা আছে সেটি বের করা
    let activePackage = document.querySelector('.package-box.active');
    let packageDetails = "Not selected";
    
    if (activePackage) {
        let amount = activePackage.querySelector('.pkg-amount').innerText;
        let pName = activePackage.querySelector('.pkg-name').innerText;
        let price = activePackage.querySelector('.pkg-price').innerText;
        packageDetails = `${amount} ${pName} (${price})`;
    }

    // ফর্ম পূরণ না করলে ওয়ার্নিং দেওয়া
    if(!uid || !trxId) {
        alert("Please enter your Player UID and Transaction ID!");
        return;
    }

    // বাটনের টেক্সট পরিবর্তন করে 'Sending...' দেখানো
    let submitBtn = document.querySelector('.submit-btn');
    let originalText = submitBtn.innerText;
    submitBtn.innerText = "SENDING ORDER...";
    submitBtn.disabled = true;

    // =========================================================
    // নিচে আপনার টোকেন এবং চ্যাট আইডি বসান (ইনভার্টেড কমার ভেতরে)
    // =========================================================
    let botToken = "8855610877:AAFWPoSpQSCWqg7Tk2iElOr5RU2ZTF991fY"; // এখানে আপনার Bot Token দিন
    let chatId = "1832778405";     // এখানে আপনার Chat ID দিন

    // টেলিগ্রামে যে মেসেজটি যাবে তার ডিজাইন
    let message = `🆕 *NEW ORDER RECEIVED!*\n\n` +
                  `🎮 Game: Free Fire\n` +
                  `🆔 Player UID: ${uid}\n` +
                  `👤 Name: ${name || "N/A"}\n` +
                  `📦 Package: ${packageDetails}\n` +
                  `💳 Payment: bKash\n` +
                  `#️⃣ TrxID: ${trxId}`;

    // টেলিগ্রাম API লিংক
    let url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    // ডাটা পাঠানো (API Request)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                alert("✅ Order Submitted Successfully! Wait for delivery.");
                // ফর্ম খালি করে দেওয়া
                document.querySelector('input[placeholder="Enter Player UID"]').value = "";
                document.querySelector('input[placeholder="Enter Player Name"]').value = "";
                document.querySelector('input[placeholder="Enter Transaction ID"]').value = "";
            } else {
                alert("❌ Error submitting order. Please check Bot setup.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong! Check your internet connection.");
        })
        .finally(() => {
            // বাটনের টেক্সট আবার আগের মতো করে দেওয়া
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
});