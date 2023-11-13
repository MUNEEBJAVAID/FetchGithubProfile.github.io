const get = (customAttribute) => document.querySelector(`[${customAttribute}]`);

const changeTheme = get("data-ThemeChange");
const color = get("data-color");
const icon = get("data-icon");
const searchBtn = get("data-search-btn");
const NotFound = get("data-error-not-found");
const inputField = get("data-input-field");
const searching = get("data-search-field");

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// By default 
color.innerText = "Dark";
icon.src = "Images/moon-icon.svg";
const root = document.documentElement.style;



fetchData("Muneebjavaid");

function enableLightMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    color.innerText = "LIGHT";
    icon.src = "./Images/sun-icon.svg";
    darkMode = false;
    localStorage.setItem("dark-mode" , darkMode);
    console.log(root);
}

function enableDarkMode() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    color.innerText = "DARK";
    icon.src = "./Images/moon-icon.svg";
    darkMode = true;
    localStorage.setItem("dark-mode" , darkMode);
}
   if(localStorage.getItem("dark-mode") === null){
    enableDarkMode();
   }
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
   else if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        enableDarkMode();
    } else {
        // If the value is not "true", apply light mode properties
        enableLightMode();
    }


changeTheme.addEventListener('click', () => {
    if (darkMode) {
        enableLightMode()
    } else {
        enableDarkMode();
    }
});

function renderUserInfo(data) {
    // fetch the elements
    const userImage = get("data-user-image");
    const userName = get("data-user-name");
    const userProfileLink = get(" data-profile-link");
    const createProfileDate = get("data-join-date");
    const userBio = get("data-user-bio");
    const userRepos = get("data-repo");
    const userfollowers = get("data-Follower");
    const userFollowing = get("data-Following");
    const userlocation = get("data-location");
    const userLinkdln = get("data-website");
    const userTwitter = get("data-twitter");
    const userCompanyName = get(" data-company");

    // render on ui
    console.log(data);
    userImage.src = data?.avatar_url;
    userName.innerText = data?.login;
    userProfileLink.innerText = `@${data?.login}`;
    userProfileLink.href = data?.html_url;

    // Create Profile Date
    const dateSegment = data?.created_at.split('T').shift().split('-');
    createProfileDate.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;

    // Bio
    userBio.innerText = data?.bio == null ? "This Profile has no Bio" : data?.bio;

    // follower/repos
    userRepos.innerText = data?.public_repos;;
    userRepos.href = data?.received_events_url;

    userfollowers.innerText = data?.followers;
    userfollowers.href = data?.followers_url;

    userFollowing.innerText = data?.following;
    userFollowing.href = data?.following_url.split('{').shift();
    console.log(userFollowing);

    // footer conatiner
    userlocation.innerText = data?.location == null ? "Not Available" : data?.location;
    userLinkdln.innerHTML = data?.blog == "" ? "Not Available" : data?.blog;
    userLinkdln.href = data?.blog;
    userTwitter.innerText = data?.twitter_username == null ? "Not Available" : data?.twitter_username;
    userCompanyName.innerText = data?.company == null ? "Not Available" : data?.company;


}

async function fetchData(userName) {
    // Fetch the main user profile data
    try {
        const response = await fetch(`https://api.github.com/users/${userName}`);
        const data = await response.json();
        if (data.message == "Not Found") {
            throw new Error();
        }
        else {
            renderUserInfo(data);
        }
    } catch (e) {
        NotFound.innerText = "Search Not Found";
        NotFound.classList.add("active");

        setTimeout(() => {
            NotFound.classList.remove("active");
        }, 2000)
    }

}

searching.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = inputField.value;

    if (userName != "") fetchData(userName);

});


