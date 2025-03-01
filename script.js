let cart = []; // سبد خرید
let score = 0; // امتیاز

// تابع برای اضافه کردن آیتم به سبد خرید
function addToCart(itemNumber) {
    let item;
    let price;
    if (itemNumber === 1) {
        item = "پیتزا";
        price = 150000;
    } else if (itemNumber === 2) {
        item = "برگر";
        price = 100000;
    } else if (itemNumber === 3) {
        item = "کوکاکولا";
        price = 30000;
    }

    // اضافه کردن به سبد خرید
    cart.push({ item, price });
    updateCart(); // به‌روزرسانی سبد خرید
}

// تابع برای به‌روزرسانی سبد خرید
function updateCart() {
    let cartItemsHTML = "";
    let total = 0;
    cart.forEach((cartItem) => {
        cartItemsHTML += `<li>${cartItem.item} - ${cartItem.price} تومان</li>`;
        total += cartItem.price;
    });
    document.getElementById("cartItems").innerHTML = cartItemsHTML;
    document.getElementById("cartTotal").innerHTML = `مجموع: ${total} تومان`;
}

// تابع برای ارسال سفارش به بات تلگرام
function submitOrder() {
    if (cart.length === 0) {
        document.getElementById("orderResult").innerHTML = "سبد خرید شما خالی است!";
        return;
    }

    let orderList = cart.map(item => `${item.item} - ${item.price} تومان`).join("\n");
    document.getElementById("orderResult").innerHTML = `سفارش شما با موفقیت ارسال شد!\n${orderList}`;
    
    // ارسال سفارش به بات تلگرام (توکن خودت را اینجا بذار)
    const botToken = "7943508795:AAEA9JRA7ecjwKZT00aEGIkWNWpTLRHmuRE"; 
    const telegram = window.Telegram.WebApp;
    const chatId = telegram.initDataUnsafe.chat.id;
    
    let message = "سفارش جدید از رستوران:\n" + orderList;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            document.getElementById("orderResult").innerHTML = "سفارش شما با موفقیت ارسال شد!";
            cart = [];  // پاک کردن سبد خرید بعد از ارسال
            updateCart();  // به‌روزرسانی سبد خرید
        } else {
            document.getElementById("orderResult").innerHTML = "مشکلی در ارسال سفارش پیش آمد. لطفاً دوباره سعی کنید.";
        }
    })
    .catch(error => {
        document.getElementById("orderResult").innerHTML = "مشکلی در ارسال سفارش پیش آمد. لطفاً دوباره سعی کنید.";
    });
}
