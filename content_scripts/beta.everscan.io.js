function main(data) {
    console.log("snipa.finance.js start main :>> ");
    return waitForElm("#root > div > main > section > div > div.loader-block.block.block--table > div.cust-table.accounts-table").then((elm) => {
        console.log('Element is ready', elm);
        function findItems(mutationList, observer) {
            console.log('findItems :>> ', mutationList);
            let items = document.querySelectorAll("#root > div > main > section  div.cust-table.accounts-table div.token__main > div > a");
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const newValue = updateString(item.textContent, data);
                if (newValue != item.textContent) {
                    item.textContent = newValue;
                }
            }
        }
        findItems()
        const config = { childList: true };
        console.log('targetNode :>> ', elm);
        const observer = new MutationObserver(findItems);
        observer.observe(elm, config);
        return observer
    });
}

everwhoisData().then((res) => {
    let sub_observer = main(res);
});
