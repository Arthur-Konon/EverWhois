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
    // https://app.flatqube.io/farming
    swap("div.transactions-list.list div.panel-loader > div > div > div:nth-child(5)", " a", res)
    // https://app.flatqube.io/farming/0:39c1ba1305438e59c444267f8887d3ceb7312ab906760b8b891c865217ea8ff0
    swap("div.farming-transactions__list.list div.panel-loader > div > div > div:nth-child(4)", " a", res)
    // https://app.flatqube.io/tokens/0:a519f99bb5d6d51ef958ed24d337ad75a1c770885dcd42d51d6663f9fcdacfb2
    swap("div.list.Co1q8Nh5wCRN_TX.EWXQ8d83ZY3ZViy div.panel-loader > div > div > div:nth-child(4)", " a", res)
    // https://app.flatqube.io/pools/0:771e3d124c7a824d341484718fcf1af03dd4ba1baf280adeb0663bb030ce2bf9
    swap("div.list.R0eAiU2rvzJoB9y.HHv8J0PVLmeogN8 div.panel-loader > div > div > div:nth-child(4)", " a", res)
    // https://app.flatqube.io/gauges/0:eab26e9b6834dfbd2eff9411c7f62c217fd9c8219ee062196b4a854a702acbdb
    swap("div.list.YGPxY_Q7rC5yboE > div.ZSForM_sJytrEmR > div:nth-child(1) > div:nth-child(4)", " a", res)
}
everwhoisData().then((res) => {
    restart(res);
    setInterval(() => {
        restart(res);
    }, 5000);
});
