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

    // waitForElm("div.farming-transactions__list.list .panel-loader").then((elm) => {
    //     console.log('elm :>> ', elm);
    //     const targetNode = document.querySelector("div.farming-transactions__list.list .panel-loader")
    //     const config = { attributes: false, childList: true, subtree: true };
    //     console.log('targetNode :>> ', targetNode);
    //     const observer = new MutationObserver(findItems);
    //     observer.observe(targetNode, config);
    //     function findItems() {
    //         let items = document.querySelectorAll("div.farming-transactions__list.list > div.panel-loader > div > div:nth-child(1) > div:nth-child(4) > a:not(.EverWhoisPatched)")
    //         for (let index = 0; index < items.length; index++) {
    //             const item = items[index];
    //             const newValue = updateString(item.textContent, data);
    //             if (newValue != item.textContent) {
    //                 item.textContent = newValue;
    //             }
    //             item.classList.add("EverWhoisPatched");
    //         }
    //     }
    // })
}


function swap(container, itemsPath, data){
    console.log('Try find   :>> ', container);
    return waitForElm(container).then((elm) => {
        console.log('Element is ready', elm);
        function findItems(mutationList, observer) {
            const _itemsPath = container + itemsPath;
            let items = document.querySelectorAll(_itemsPath);
            console.log("findItems >>> ", "document.querySelectorAll('" + _itemsPath + "')", items);
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const newValue = updateString(item.textContent, data);
                if (newValue != item.textContent) {
                    item.textContent = newValue;
                }
            }
        }
        const config = { childList: true };
        console.log('targetNode :>> ', elm);
        const observer = new MutationObserver(findItems);
        observer.observe(elm, config);
        findItems();
        return observer
    });
}



const restart = (res) => {
    swap("div.transactions-list.list div.panel-loader > div > div > div:nth-child(5)", " a", res)
    swap("div.farming-transactions__list.list div.panel-loader > div > div > div:nth-child(4)", " a", res)
    // https://app.flatqube.io/farming
    // https://app.flatqube.io/farming/0:39c1ba1305438e59c444267f8887d3ceb7312ab906760b8b891c865217ea8ff0
}

everwhoisData().then((res) => {
    restart(res);
    setInterval(() => {
        restart(res);
    }, 5000);
});


