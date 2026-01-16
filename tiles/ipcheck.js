/* jshint esversion: 6 */
let url = "http://ip-api.com/json/?lang=en";

$httpClient.get(url, function(error, response, data) {
    if (error || !data) {
        $done({title: "Ошибка", content: "Не удалось получить данные"});
        return;
    }

    try {
        let jsonData = JSON.parse(data);
        let country = jsonData.country || "Unknown";
        let emoji = getFlagEmoji(jsonData.countryCode);
        let city = jsonData.city || "N/A";
        let timezone = jsonData.timezone || "N/A";
        let isp = jsonData.isp || "N/A";
		let as = jsonData.as || "N/A";
        let ip = jsonData.query || "N/A";

        let body = {
            title: "IP info",
            content: `${ip}\n${isp}\n${as}\n${emoji} ${country} - ${city}\n${timezone}`,
            icon: "globe.asia.australia.fill",
            // "icon-color": "#0C9DFA" // В Surge/QX для цвета иконки используется этот ключ
			backgroundColor: '#0C9DFA'
        };

        $done(body);
    } catch (e) {
        $done({title: "Ошибка", content: "Ошибка обработки данных"});
    }
});

function getFlagEmoji(countryCode) {
    if (!countryCode) return "🏳️";
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
