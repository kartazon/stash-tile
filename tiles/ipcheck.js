/* jshint esversion: 6 */
$httpClient.get('http://ip-api.com/json', function(error, response, data) {
    if (error) {
        $done({title: "Ошибка", content: "Не удалось получить данные"});
        return;
    }

    let jsonData = JSON.parse(data);
    let country = jsonData.country;
    let emoji = getFlagEmoji(jsonData.countryCode); // Вызываем функцию получения флага
    let city = jsonData.city;
    let isp = jsonData.isp;
    let ip = jsonData.query;

    let body = {
        title: "INFO",
        content: `${ip} | IP\n${isp} | ORG\n${emoji} ${country} - ${city} | REG`,
        icon: "globe.asia.australia.fill",
        // "icon-color": "#0C9DFA"
        backgroundColor: '#0C9DFA'
    };

    $done(body);
});


function getFlagEmoji(countryCode) {
    if (!countryCode) return "🏳️";
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
