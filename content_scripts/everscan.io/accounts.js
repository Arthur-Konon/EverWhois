try {
    function everscanIOSwap(container, itemsPath, data) {
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


    function everscanIOSwapDetail(container, itemsPath) {
        console.log('Try find   :>> ', container);
        return waitForElm(container).then((elm) => {
            console.log('Element is ready', elm);
            function findItems(mutationList, observer) {
                const _itemsPath = container + itemsPath;
                let items = document.querySelectorAll(_itemsPath);
                console.log('items :>> ', items);
                for (let index = 0; index < items.length; index++) {
                    const item = items[index];
                    if (!item.classList.contains('EverWhoisPatchedLink')) {
                        const a_link = document.createElement("a");
                        a_link.setAttribute('href', `${document.URL.replace('https://everscan.io/accounts/', 'https://snipa.finance/profile/')}`);
                        a_link.setAttribute('style', "margin-left:5px;");
                        a_link.setAttribute('target', "_blank");
                        a_link.textContent = "snipa";
                        item.nextSibling.appendChild(a_link);
                        item.classList.add("EverWhoisPatchedLink");
                    }
                }
            }
            const config = { childList: true };
            console.log('targetNode :>> ', elm);
            const observer = new MutationObserver(findItems);
            observer.observe(elm, config);
            findItems();
        });
    }

    function mainDetailsTable() {
        let items = document.querySelectorAll("div.token__main a");
        console.log('mainDetailsTable items :>> ', items);
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const newValue = updateString(item.textContent, data);
            if (newValue != item.textContent) {
                item.textContent = newValue;
            }
        }
    }

    const restart = (res) => {
        if (document.URL.includes('/accounts')) {
            everscanIOSwap(".accounts-table", " div.token__main a", res)
            everscanIOSwap(".transactions-page-table", " div.token__main a", res)
            everscanIOSwap(".token-transactions-full", " div.token__main a", res)
            everscanIOSwap(".messages-token-page-table", " div.token__main a", res)
            everscanIOSwapDetail(".address", " .address__val", res)

        } else if (document.URL.includes('/transactions')) {
            everscanIOSwap(".transactions-page-table", " div.token__main a", res)
            everscanIOSwap(".trx-messages-table", " div.token__name a", res)
        } else if (document.URL.includes('/tokens-transactions')) {
            everscanIOSwap(".token-transactions-full", " div.token__main a", res)
        } else if (document.URL.includes('/messages')) {
            everscanIOSwap(".messages-token-page-table", " div.token__main a", res)
            everscanIOSwap(".token .address__val", " a", res)
        } else if (document.URL.includes('/validators')) {
            everscanIOSwap(".validators-table", " div.token__main a", res)
        } else {
            everscanIOSwap(".accounts-table", " div.token__main a", res)
            everscanIOSwap(".transactions-page-table", " div.token__main a", res)
            everscanIOSwap(".validators-table", " div.token__main a", res)
            everscanIOSwap(".messages-token-page-table", " div.token__main a", res)
            everscanIOSwap(".token-transactions-full", " div.token__main a", res)
            everscanIOSwap(".trx-messages-table", " div.token__main a", res)
            everscanIOSwap(".token .address__val", " a", res)
        }
        everscanIOSwap(".address", " .address__val", res)

        // https://everscan.io/accounts
        // https://everscan.io/accounts/0:eb9c9e8c60679d98eb84a6b09b77882cb6df09f88933404e375adccaac11709a
        // https://everscan.io/transactions
        // https://everscan.io/transactions/75a42c259d4c19a1ab57b610fd66b3bdf549355e76e3fd2077b73ca72dfa4fc1
        // https://everscan.io/tokens-transactions
        // https://everscan.io/messages
        // https://everscan.io/messages/aa0b972e466cce59067155893fb669ed08e411c38dc61af3db11c20f3ad0735f
        // https://everscan.io/validators


    }
    everwhoisData().then((res) => {
        restart(res);
        setInterval(() => {
            restart(res);
        }, 5000);
    });

} catch (error) {
    console.log('error :>> ', error);
}
