function main(data) {
    console.log("app.flatqube.io.js start main :>> ");

    waitForElm("#root > div > main > div > section.section.section--large > div > div.transactions-list.list").then((elm) => {
        console.log('elm :>> ', elm);
        const targetNode = document.querySelector("#root > div > main > div > section.section.section--large > div > div.transactions-list.list")
        const config = { attributes: false, childList: true, subtree: true };
        console.log('targetNode :>> ', targetNode);
        const observer = new MutationObserver(findItems);
        observer.observe(targetNode, config);
        function findItems() {
            let items = document.querySelectorAll("#root > div > main > div > section.section.section--large > div > div.transactions-list.list > div.panel-loader > div > div > div:nth-child(5) > a:not(.EverWhoisPatched)")
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

    waitForElm("div.farming-transactions__list.list").then((elm) => {
        console.log('elm :>> ', elm);
        const targetNode = document.querySelector("div.farming-transactions__list.list")
        const config = { attributes: false, childList: true, subtree: true };
        console.log('targetNode :>> ', targetNode);
        const observer = new MutationObserver(findItems);
        observer.observe(targetNode, config);
        function findItems() {
            let items = document.querySelectorAll("div.farming-transactions__list.list > div.panel-loader > div > div:nth-child(1) > div:nth-child(4) > a:not(.EverWhoisPatched)")
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
    main(res);
});
