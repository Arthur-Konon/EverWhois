
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
    swap("#votes .table__body", " div.user-card__name a", res)
    // https://everdao.net/governance/proposals/82
    // document.querySelector("#votes > div.card.card--flat.card--small > div > div.table__body > div:nth-child(1) > div:nth-child(1) > div > div.user-card__name > a")
}

everwhoisData().then((res) => {
    restart(res);
    setInterval(() => {
        restart(res);
    }, 5000);
});


