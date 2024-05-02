const GIT_HUB_URL = "https://api.github.com/users"

const getUsername = document.querySelector("#user") as HTMLInputElement
const formSubmit = document.querySelector(".form") as HTMLFormElement
const main_container = document.querySelector(".main_container") as HTMLElement


// let theme = localStorage.getItem('Theame-of-TypeScript-project-by-utsav');
// if (theme === null) {
//     theme = 'light-theme'; // Default to 'light-theme' if no theme is stored
// }
// document.body.classList.toggle(theme)

interface UserData{
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}

// reuseble function
async function myCostumFetcher<T>(url:string,options?:RequestInit):Promise<T>{
    const response = await fetch(url,options);

    if(!response.ok){
        throw new Error(
            `Network response is Not Ok : status ${response.status}`
        )
    }

    const data = response.json();
    return data;
}

const createHtmlElementForUser=(currUser:UserData)=>{
    const {avatar_url,login,url,location} = currUser;
    main_container.insertAdjacentHTML(
        "beforeend",
        `<div class='card'> 
            <img src="${avatar_url}" alt="${login}"/>
            <div class="card-footer">
                <img src="${avatar_url}" alt="${login}"/>
                <a target="#" href="${url}">Github</a>
            </div>
        </div>`
    )
}

function fetchUserData(url:string){
    myCostumFetcher<UserData[]>(url,{}).then(usersInfo=>{
        for(const singleUser of usersInfo){
            createHtmlElementForUser(singleUser)
        }
    });
}

fetchUserData(GIT_HUB_URL)


formSubmit.addEventListener("submit",async (e) => {
    e.preventDefault();

    const searchData = getUsername.value.toLowerCase()

    try{
        const allUserData = await myCostumFetcher<UserData[]>(GIT_HUB_URL,{});

        const filteredData = allUserData.filter((user:UserData) => {
            return user.login.toLowerCase().includes(searchData);
        });

        main_container.innerHTML="";

        if(filteredData.length === 0){
            main_container?.insertAdjacentHTML(
                "beforeend",
                `<p class="empty-msg">No matching users found".</p>`
            );
        }else{
            for(const singleUser of filteredData){
                createHtmlElementForUser(singleUser);
            }
        }

    }catch(e){
        console.error(e)
    }
})

// change Theme

const themeToggleBtn = document.querySelector('#themeToggle') as HTMLButtonElement;
themeToggleBtn.addEventListener('click', () => {
    if(document.body.className === "light-theme"){
        document.body.classList.toggle('dark-theme');
    }else{
        document.body.classList.toggle('light-theme');
    }

});