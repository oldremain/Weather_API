document.addEventListener('DOMContentLoaded', () => {
  const API = {
    url: 'https://api.openweathermap.org/data/2.5/',
    apiKey: '48f4f7f8e4c0041f4ac154ea9b27e13a',
  };

  const $input = document.querySelector('#input');

  $input.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      getData(e.target.value).then(setData);
      clearData.call($input);
    }
  });

  async function getData(value) {
    const response = await fetch(
      `${API.url}weather?q=${value}&units=metric=&APPID=${API.apiKey}`
    );
    const data = await response.json();
    console.log(data);

    return data;
  }

  function setData({ name, main, wind }) {
    const $temp = document.querySelector('.box__temp'),
      $humidity = document.querySelector('.h-value'),
      $wind = document.querySelector('.w-value'),
      $pressure = document.querySelector('.p-value'),
      $city = document.querySelector('.box__city'),
      $date = document.querySelector('.box__date');

    let currentDate = new Date();

    $city.textContent = name;
    $date.textContent = dateBuilder(currentDate);
    $temp.innerHTML = `${Math.floor(main.temp - 275.15)} &#8451`;
    $humidity.textContent = main.humidity + ` %`;
    $wind.textContent = wind.speed + ' m/s';
    $pressure.textContent = main.pressure + ' hPa';
  }

  function dateBuilder(date) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let dateMonth = date.getDate(),
      day = days[date.getDay()],
      month = months[date.getMonth()],
      year = date.getFullYear();

    return `${day}, ${dateMonth} ${month} ${year}`;
  }

  function clearData() {
    this.value = '';
  }
});
