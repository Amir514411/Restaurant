bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = "سلام! خوش آمدید. برای شروع بازی و دیدن منو، دکمه‌ی Play را فشار دهید.";

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Play", callback_data: "start_game" }],
            ],
        },
    };

    bot.sendMessage(chatId, welcomeMessage, keyboard);
});

bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;
    if (query.data === "start_game") {
        // نمایش منو یا شروع بازی
        bot.sendMessage(chatId, "منو رستوران: پیتزا، برگر، نوشابه...");
    }
});
