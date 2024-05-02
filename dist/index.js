"use strict";
const GIT_HUB_URL = "https://api.github.com/users";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector(".form");
const main_container = document.querySelector(".main_container");
// reuseble function
async function myCostumFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response is Not Ok : status ${response.status}`);
    }
    const data = response.json();
    return data;
}
const createHtmlElementForUser = (currUser) => {
    const { avatar_url, login, url, location } = currUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'> 
            <img src="${avatar_url}" alt="${login}"/>
            <div class="card-footer">
                <img src="${avatar_url}" alt="${login}"/>
                <a target="#" href="${url}">Github</a>
            </div>
        </div>`);
};
function fetchUserData(url) {
    myCostumFetcher(url, {}).then(usersInfo => {
        for (const singleUser of usersInfo) {
            createHtmlElementForUser(singleUser);
        }
    });
}
fetchUserData(GIT_HUB_URL);
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchData = getUsername.value.toLowerCase();
    try {
        const allUserData = await myCostumFetcher(GIT_HUB_URL, {});
        const filteredData = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchData);
        });
        main_container.innerHTML = "";
        if (filteredData.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found".</p>`);
        }
        else {
            for (const singleUser of filteredData) {
                createHtmlElementForUser(singleUser);
            }
        }
    }
    catch (e) {
        console.error(e);
    }
});
// change Theme
const themeToggleBtn = document.querySelector('#themeToggle');
themeToggleBtn.addEventListener('click', () => {
    if (document.body.className === "light-theme") {
        document.body.classList.toggle('dark-theme');
    }
    else {
        document.body.classList.toggle('light-theme');
    }
});
