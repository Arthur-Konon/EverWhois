function main(data) {
    console.log("app.octusbridge.io start main :>> ");
    waitForElm("div.table__body").then((elm) => {
    const targetNode = elm;
    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver(findItems);
    observer.observe(targetNode, config);
    function findItems() {
        let items = document.querySelectorAll(
            "div.transfers-table-data > span.explorer-link > a:not(.EverWhoisPatched)"
        );
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const newValue = updateString(item.textContent, data);
            if (newValue != item.textContent) {
                item.textContent = newValue;
            }
            item.classList.add("EverWhoisPatched");
        }
    }
})

}

function main_staking(data) {
    console.log("app.octusbridge.io start main_staking :>> ");
    waitForElm("div.table__body").then((elm) => {
    const targetNode = elm
    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver(findItems);
    observer.observe(targetNode, config);
    function findItems() {
        let items = document.querySelectorAll(
            "#root > div > div > div > div:nth-child(2) > div.card.card--flat.card--small > div > div.table__body div.user-card__name > a:not(.EverWhoisPatched)"
        );
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const newValue = updateString(item.textContent, data);
            if (newValue != item.textContent) {
                item.textContent = newValue;
            }
            item.classList.add("EverWhoisPatched");
        }
    }
    })
}

everwhoisData().then((res) => {
    main_staking(res);
    main(res);
});