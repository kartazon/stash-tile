/* jshint esversion: 6 */
let url = "http://ip-api.com/json/?lang=en";
const align = (text, width = 10) => text.padEnd(width, ' ');

$httpClient.get(url, function(error, response, data) {
    if (error || !data) {
        $done({title: "Ошибка", content: "Нет ответа от сервера"});
        return;
    }

    try {
        let jsonData = JSON.parse(data);
        let country = jsonData.country || "Unknown";
        let emoji = getFlagEmoji(jsonData.countryCode);
        let city = jsonData.city || "";
        let timezone = jsonData.timezone || "";
        let isp = jsonData.isp || "";
        let ip = jsonData.query || "";

        let body = {
            title: "IP info",
            content: `${align("IP:")}${ip}\n` +
                     `${align("ORG:")}${isp}\n` +
                     `${align("REG:")}${emoji} ${country}\n` +
                     `${align("TMZ:")}${timezone}`,
            icon: "globe.asia.australia.fill",
            "icon-color": "#0C9DFA"
        };
        $done(body);
    } catch (e) {
        $done({title: "Ошибка", content: "Ошибка парсинга данных"});
    }
});

function getFlagEmoji(countryCode) {
    if (!countryCode) return "🏳️";
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
