let htmlInfo, btnExpand, htmlInfoDetails;
let htmlCountdown, htmlProgressBar, htmlDate, htmlName, htmlOrganisation, htmlMission, htmlRocket, htmlPad;

const listenToExpand = function() {
    btnExpand.addEventListener("click", function() {
        if (htmlInfo.classList.contains("is-expanded")) {
            htmlInfo.classList.remove("is-expanded");
        }
        else {
            htmlInfo.classList.add("is-expanded");
        }
    });
}

const showCountdown = function(launchTime) {
    date = new Date(launchTime);
    htmlDate.innerHTML = `${formatDate(date)}`;

    const MaxBarInMillis = 12 * 60 * 60 * 1000; /* 12 hours */

    var x = setInterval(function() {
        let T;
        now = new Date()
        let diff = date - now;
        let percentage;

        if (diff < 0) {
            T = "T+";
            diff = Math.abs(diff);
            percentage = 100;
        }
        else {
            T = "T-"
            
            percentage = 100 - Math.round(diff / MaxBarInMillis * 100 *10) /10;

            if (percentage < 0) {
                percentage = 0;
            }
        }

        htmlCountdown.innerHTML = `${T} ${toHHMMSS(diff)}`;
        
        htmlProgressBar.style.width = `${percentage}%`;
    }, 1000);
}

const formatDate = function(date) {
    return `${date.toLocaleDateString()} at ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`
}

const toHHMMSS = function(timediff) {
    const totalSeconds = Math.floor(timediff/1000);

    let days = addLeadingZero(Math.floor(timediff / (1000 * 60 * 60 * 24)));
    let hours = addLeadingZero(Math.floor((timediff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = addLeadingZero(Math.floor((timediff % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = addLeadingZero(Math.floor((timediff % (1000 * 60)) / 1000));
    return `${days}:${hours}:${minutes}:${seconds}`;
}

const addLeadingZero = function(number) {
    if (number <= 0) {
        return "00";
    }
    else if (number < 10) {
        return `0${number}`;
    }
    else {
        return `${number}`;
    }
}

const showLaunchInfo = function(data) {
    // console.log(data);
    showCountdown(data.window_start);
    htmlName.innerHTML = data.name;
    htmlOrganisation.innerHTML = data.launch_service_provider.name;
    htmlRocket.innerHTML = data.rocket.configuration.name;
    htmlMission.innerHTML = `<strong>${data.mission.name}:</strong> ${data.mission.description}`;
    htmlPad.innerHTML = data.pad.name;
}

const getLaunchInfo = async () => {
    const endpoint = `https://lldev.thespacedevs.com/2.1.0/launch/upcoming`;

    const launchData = await getData(endpoint);

    console.log(launchData.results);
    
    try {
        showLaunchInfo(launchData.results[0]);
    }
    catch (ex) {
        console.log("Error:",ex);
    }
}

const getData = (endpoint) => {
    return fetch(endpoint)
        .then((r) => r.json())
        .catch((error) => {
            console.log(error.response.data);
            return {error: error};
        });
}

const init = function() {
    console.log("Document loaded");
    htmlInfo = document.querySelector(".js-info");
    btnExpand = document.querySelector(".js-expand");
    htmlCountdown = document.querySelector(".js-countdown");
    htmlProgressBar = document.querySelector(".js-bar");
    htmlDate = document.querySelector(".js-date");
    htmlName = document.querySelector(".js-name");
    htmlOrganisation = document.querySelector(".js-organisation");
    htmlMission = document.querySelector(".js-mission");
    htmlRocket = document.querySelector(".js-rocket");
    htmlPad = document.querySelector(".js-pad");

    listenToExpand();
    getLaunchInfo();
}

document.addEventListener("DOMContentLoaded", init);