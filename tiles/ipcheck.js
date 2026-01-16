/* jshint esversion: 6 */
let url = "http://ip-api.com/json/?lang=en";

$httpClient.get(url, function(error, response, data) {
    if (error) {
        $done({title: "Ошибка", content: "Не удалось получить данные"});
        return;
    }

    let jsonData = JSON.parse(data);
    let country = jsonData.country;
    let emoji = getFlagEmoji(jsonData.countryCode);
    let city = jsonData.city;
    let timezone = jsonData.timezone;
    let isp = jsonData.isp;
    let ip = jsonData.query;

    let body = {
        title: "IP info",
        // title: rootName,
		content: `${ip}\t |\t IP\n${isp}\t |\t ORG\n${emoji} ${country} - ${city}\t |\t REG\n${timezone}\t |\t TMZ`,
        icon: "globe.asia.australia.fill",
        backgroundColor: '#0C9DFA'
    };

    $done(body);
});

function getFlagEmoji(countryCode) {
    if (!countryCode) return "🏳️";
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
