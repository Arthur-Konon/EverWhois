function main(data) {
    console.log("everpools.io start main :>> ");
    waitForElm("#root > div > main > div > div:nth-child(10) > div.swap-table.stakeholders-table").then((elm) => {
        console.log('Element is ready', elm);
        function findItems(mutationList, observer) {
            console.log('findItems :>> ', mutationList);
            let items = document.querySelectorAll("#root div.swap-table.stakeholders-table .token__name");
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const newValue = updateString(item.textContent, data);
                if (newValue != item.textContent) {
                    item.textContent = newValue;
                }
            }
        }
        // findItems()
        const config = { childList: true };
        console.log('targetNode :>> ', elm);
        const observer = new MutationObserver(findItems);
        observer.observe(elm, config);
        return observer
    });
}

everwhoisData().then((res) => {
    let sub_observer = main(res);
    waitForElm("#root main .swap").then((elm) => {
        const config = {
            childList: true,
        };
        console.log('main :>> ', elm);
        const observer = new MutationObserver((mutationList, observer) => {
            console.log('main observer:>> ', elm, mutationList, observer);
            sub_observer = main(res);
        });
        observer.observe(elm, config);
    })
});
