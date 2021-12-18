// PANEL OPEN AND CLOSE
const panelBtn = document.getElementById('panel-btn');
panelBtn.addEventListener('click', panelView);

function panelView () {
    toggleHeader();
    toggleMainPosition();
    togglePanel();
    spanLess();
}

function toggleHeader () {
    const header = document.getElementById('header');

    if(header.style.display === 'none') {
        header.style.display = 'flex'
    } else {
        header.style.display = 'none';
    }
}

function toggleMainPosition () {
    const main = document.getElementById('main');

    if(main.style.alignItems === 'flex-start') {
        main.style.alignItems = 'flex-end'
    } else {
        main.style.alignItems = 'flex-start';
    }
}

function togglePanel () {
    const panel = document.getElementById('panel-info');

    if(panel.style.bottom === '0vh') {
        panel.style.bottom = '-100vh'
    } else {
        panel.style.bottom = '0vh';
    }
}

function spanMore () {
    const btnSpan = document.getElementById('btn-span');
    btnSpan.innerText = 'more';
}

function spanLess () {
    const btnSpan = document.getElementById('btn-span');
    const btnCircle = document.getElementById('btn-circle');
    if(btnSpan.innerText === 'MORE') {
        btnSpan.innerText = 'LESS';
        btnCircle.style.transform = 'rotate(180deg) translateY(50%)';
    } else {
        btnSpan.innerText = 'MORE';
        btnCircle.style.transform = 'rotate(360deg) translateY(-50%)';
    }
}

// TIME FUNCTIONS HOME SCREEN

function setTime () {
    const setTimeHeading = document.getElementById('set-time-heading');
    
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    setTimeHeading.innerText = time;
}

setTime();

// city/country
function setTimeZoneName() {
    const timezonename = new Date().toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'short' }).substring(4);
    const setTimeZoneSpan = document.getElementById('set-timezone');

    setTimeZoneSpan.innerText = timezonename;
}

setTimeZoneName();

const setRegion = () => {

    const success = (position) => {

        const cityCountry = document.getElementById('set-region');

       

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                let city = data.city;
                let country = data.countryName;
                cityCountry.innerText = `In ${city}, ${country}`;
            })
    }

    const error = () => {
        alert('Location will fail to display');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}
setRegion();


// PANEL TIME ZONE


function panelTimeZone() {
    const panelTimeZone = document.getElementById('panel-timezone');
    const cityCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;

    panelTimeZone.innerText = cityCountry;
}
panelTimeZone();

function dayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    const setDayOfYear = document.getElementById('panel-doy');

    setDayOfYear.innerText = day;

}
dayOfYear();

function weekOfYear() {
    const d = new Date();
    let day = d.getDay();


    const setDayOfWeek = document.getElementById('panel-dow');

    setDayOfWeek.innerText = day;
}
weekOfYear();

function weekNumber() {

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const currentWeek = Math.floor(diff / oneWeek);

    const setWeekNumber = document.getElementById('panel-wn');

    setWeekNumber.innerText = currentWeek;
}

weekNumber();


// NIGHT SHIFT

function change() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    let time = `${hours}${minutes}`;
    
    if(time > 1830) {
        nightTime();
    } else if(time === 0000) {
        dayTime();
    }

}

change();

function nightTime() {
    const body = document.getElementsByTagName('body');
    body[0].style.background = 'url(./../assets/desktop/nightsky.jpg) no-repeat';
    body[0].style.backgroundSize = 'cover';
    body[0].style.backgroundPosition = 'center';

    const greetingText = document.getElementById('greeting-text');
    greetingText.innerText = 'good night'
}

function dayTime() {
    const body = document.getElementsByTagName('body');
    body[0].style.background = 'url(./../assets/desktop/daysky.jpg) no-repeat';
    body[0].style.backgroundSize = 'cover';
    body[0].style.backgroundPosition = 'center';

    const greetingText = document.getElementById('greeting-text');
    greetingText.innerText = 'good morning'
}