const createNotification = (status) => {
    if (status && !alertNotification) {
        let notification = new Notification(status, streamerData.name, streamerData.links.twitch);
        notification.showNotification();
        chrome.notifications.onButtonClicked.addListener(function (notifById, btnIndex) {
            notification.notifLink(notifById, btnIndex);
        });
    } else if (status && alertNotification) {
        alertNotification = true;
        return;
    } else {
        alertNotification = false;
    }
}

const refreshExtension = (status) => {
    Switcher.switchIcon(status);
    Switcher.switchBadge(status);
    Switcher.switchVarIsLive(status);
    createNotification(status);
}

const fetchData = async (url) => {
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                return null;
            }
        })
        .then((responseAsJson) => {
            return responseAsJson;
        })
        .catch((e) => {
            return null;
        });
}

const checkLive = async (url) => {
    let request = new Request(url, {
        method: 'GET'
    });

    let response = await fetchData(request);

    // Si response avec erreur
    let twitch = (response !== null) ? response.data[0] : undefined;

    // Si le tableau est vide -> undefined offline
    let live = (twitch !== undefined) ? true : false;

    refreshExtension(live);
}

const init = () => {
    const url = 'testOn.json';
    checkLive(url);
};

var streamerData = {
    name: "Name",
    links: {
        "twitter": "https://twitter.com",
        "youtube": "https://www.youtube.com",
        "twitch": "https://www.twitch.tv",
        "discord": "https://discord.com/",
        "instagram": "https://www.instagram.com"
    }
}

let alertNotification = false;
var isLiveOnTwitch = "";
init();