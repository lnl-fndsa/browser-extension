const addName = (name) => {
    let span = document.querySelector('#streamer');
    span.textContent = name;

    let img = document.querySelector('.logo');
    img.alt = `${name} logo`;
    img.title = name;
}

const saveOption = (key, value) => {
    let setting = {};
    setting[key] = value;
    chrome.storage.local.set(setting);
}

const changeOption = (id, on, off) => {
    document.querySelector(`#${id}`).addEventListener('change', function () {
        let btnValue = this.checked;
        if (btnValue) {
            on.classList.add('checked')
            off.classList.remove('checked');
            saveOption(id, btnValue);
        } else {
            off.classList.add('checked');
            on.classList.remove('checked');
            saveOption(id, btnValue);
        }
    });
}

const checkOption = (id, on, off) => {
    chrome.storage.local.get(id, value => {
        if (value[id] === undefined) {
            value[id] = true;
        }

        document.querySelector(`#${id}`).checked = value[id];

        if (value[id]) {
            on.classList.add('checked');
        } else {
            off.classList.add('checked');
        }
    });
}

const makeBtnOption = (id, selector) => {
    let option = document.querySelector(`#${selector}`);
    let btnOn = option.querySelector('.btn-on');
    let btnOff = option.querySelector('.btn-off');

    checkOption(id, btnOn, btnOff);
    changeOption(id, btnOn, btnOff);
}

makeBtnOption("twitch", "twitch-label");
makeBtnOption("mute", "mute-label");
addName(chrome.extension.getBackgroundPage().streamerData.name)