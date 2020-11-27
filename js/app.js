let htmlInfo, btnExpand, htmlInfoDetails;

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

const init = function() {
    console.log("Document loaded");
    htmlInfo = document.querySelector(".js-info");
    btnExpand = document.querySelector(".js-expand");

    listenToExpand();
}

document.addEventListener("DOMContentLoaded", init);