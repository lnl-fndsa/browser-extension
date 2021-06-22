const validateHref = (selector) => {
    let link = document.querySelector(selector);
    link.addEventListener('click', function (ev) {
        ev.preventDefault();
        chrome.tabs.create({ url: this.getAttribute('href') });
    })
}

const addTwitchHref = (selector, link) => {
    let button = document.querySelector(selector);
    button.href = link;
    button.rel = 'noopener noreferrer';
    validateHref(selector);
}

const createSocialLinks = (selector, links) => {
    for (let link in links) {
        let nav = document.querySelector(selector);

        let a = document.createElement('a');
        a.className = 'social-link';
        a.id = `link-${link}`;
        a.href = links[link];
        a.rel = 'noopener noreferrer';

        let icon = document.createElement('i');
        icon.className = `fab fa-${link}`;
        a.appendChild(icon);

        let span = document.createElement('span');
        span.className = 'tooltip';
        span.textContent = link;
        a.appendChild(span);

        nav.appendChild(a);
        validateHref(`#link-${link}`)
    }
}

const switchContent = (isLive) => {
    if (isLive) {
        document.querySelector('#online').classList.add('active');
        document.querySelector('#offline').classList.remove('active');
    } else {
        document.querySelector('#offline').classList.add('active');
        document.querySelector('#online').classList.remove('active');
    }
}

const activateBtnOptions = (selector) => {
    document.querySelector(selector).addEventListener('click', function (ev) {
        ev.preventDefault();
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    })
}

addTwitchHref('#twich-btn', chrome.extension.getBackgroundPage().streamerData.links.twitch);
createSocialLinks('.social-navbar', chrome.extension.getBackgroundPage().streamerData.links);
switchContent(chrome.extension.getBackgroundPage().isLiveOnTwitch);
activateBtnOptions('#option');