let htmlInfo, btnExpand, htmlInfoDetails;
let htmlCountdown, htmlDate, htmlName, htmlOrganisation, htmlMission, htmlRocket, htmlPad;

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
    now = new Date()
    htmlCountdown.innerHTML = "T- 00:00:00";
    htmlDate.innerHTML = date;
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