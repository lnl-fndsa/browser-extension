class Notification {

    constructor(statusTwitch, name, link) {
        this.statusTwitch = statusTwitch;
        this.name = name;
        this.link = link;
    }

    showNotification() {
        const localOptions = ["twitch", "mute"];
        chrome.storage.local.get(localOptions, option => {
            if (typeof option.twitch === 'undefined') { option.twitch = true; }
            if (typeof option.mute === 'undefined') { option.mute = true; }

            let bodyOptions = this.getOptions();
            let options = this.createOptions(bodyOptions, option.mute);
            let notifId = `${this.name}_${bodyOptions.id}_notification_${Date.now()}`;

            if (this.statusTwitch && option.twitch) {
                chrome.notifications.create(notifId, options);
            }
            alertNotification = true;
        });
    }

    createOptions(body, audio) {
        let type = "basic",
            iconUrl = `assets/icons/icon32.png`,
            title = `${this.name} est en live`;
        let notifOptions = {
            type: type,
            iconUrl: iconUrl,
            title: title,
            message: body.message,
            buttons: body.btn,
            silent: !audio
        };
        return notifOptions;
    }

    getOptions() {
        let body = {};

        if (this.statusTwitch) {
            body = {
                id: 1,
                message: "Stream en cours sur Twitch",
                btn: [{ title: 'Voir' }]
            }
        }
        return body;
    }

    notifLink(notifById, btnIndex) {
        let linkID = notifById.split('_')[1];

        if (linkID == 1) {
            chrome.tabs.create({ url: this.link });
        }
        chrome.notifications.clear(notifById);
    }
}

class Switcher {

    static switchIcon(statusIcon) {
        let linkIcon = "";
        switch (statusIcon) {
            case true:
                linkIcon = `assets/icons/icon16_live.png`;
                break;

            case false:
                linkIcon = `assets/icons/icon16.png`;
                break;

            default:
                linkIcon = `assets/icons/icon16.png`;
        }
        chrome.browserAction.setIcon({ path: linkIcon });
    }

    static switchBadge(statusBadge) {
        if (statusBadge) {
            chrome.browserAction.setBadgeText({ text: "ON" });
            chrome.browserAction.setBadgeBackgroundColor({ color: "#34CA49" });
        }
        else {
            chrome.browserAction.setBadgeText({ text: "" });
        }
    }

    static switchVarIsLive(statusTwitch) {
        isLiveOnTwitch = statusTwitch;
        console.log('classe :' + isLiveOnTwitch);
    }
}