/* jshint esversion: 6 */
$httpClient.get('http://ip-api.com/json', function(error, response, data) {
    if (error) {
        $done({title: "Ошибка", content: "Не удалось получить данные"});
        return;
    }

    let jsonData = JSON.parse(data);
    let country = jsonData.country;
    let emoji = getFlagEmoji(jsonData.countryCode);
    let city = jsonData.city;
    let isp = jsonData.isp;
    let ip = jsonData.query;
    
    let body = {
        content: `${ip} | IP\n${isp} | ORG\n${country} - ${city} | REG`,
        icon: "globe.asia.australia.fill",
        backgroundColor: '#0C9DFA'
    };

    $done(body);
});
