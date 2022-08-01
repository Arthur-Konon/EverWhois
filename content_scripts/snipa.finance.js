function main(data) {
    console.log("snipa.finance.js start main :>> ");
    return waitForElm("#root div.table-container tbody > tr > td:nth-child(1) > a").then((elm) => {
        console.log('Element is ready', elm);
        function findItems(mutationList, observer) {
            console.log('findItems :>> ', mutationList);
            let items = document.querySelectorAll("#root div.table-container tbody > tr > td:nth-child(1) > a > div > span");
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const newValue = updateString(item.textContent, data);
                if (newValue != item.textContent) {
                    item.textContent = newValue;
                }
                // item.classList.add("EverWhoisPatched");
            }
        }
        findItems()
        const config = { attributes: true, characterData: true };
        console.log('targetNode :>> ', elm);
        const observer = new MutationObserver(findItems);
        observer.observe(elm, config);
        return observer
    });
}

function main_profile(data) {
    console.log("snipa.finance.js start main_profile :>> ");
    return waitForElm("#root > div.d-flex.flex-column.min-vh-100").then((elm) => {
        console.log('Element is ready', elm);
        function findItems(mutationList, observer) {
            console.log('findItems :>> ', mutationList);
            let items = document.querySelectorAll("#root > div.d-flex.flex-column.min-vh-100 > div.bg-navbar > div > div.d-flex.justify-content-between.justify-content-start.flex-column.flex-lg-row.align-items-start.align-items-lg-center > div > div > div > div span.d-none.d-lg-block");
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const textContent = item.textContent;
                const newValue = updateString(textContent, data);
                if (newValue != item.textContent) {
                    item.textContent = newValue;
                }
                if (!item.classList.contains('EverWhoisPatched')){
                    const a_link = document.createElement("a");
                    a_link.setAttribute('href', `https://everscan.io/accounts/${textContent}`);
                    a_link.setAttribute('style', "margin-left:5px;");
                    a_link.setAttribute('target', "_blank");
                    a_link.textContent= "everscan";
                    console.log('const :>> ', a_link);
                    item.appendChild(a_link);
                }
                item.classList.add("EverWhoisPatched");
            }
        }
        findItems()
        const config = { attributes: true, characterData: true };
        console.log('targetNode :>> ', elm);
        const observer = new MutationObserver(findItems);
        observer.observe(elm, config);
        return observer
    });
}

everwhoisData().then((res) => {
    let sub_observer = main(res);
    waitForElm("#root > div.d-flex.flex-column.min-vh-100").then((elm) => {
        const config = {
            childList: true,
        };
        console.log('bg-navbar :>> ', elm);
        sub_observer_2 = main_profile(res);
        const observer = new MutationObserver((mutationList, observer) => {
            console.log('bg-navbar observer:>> ', elm, mutationList, observer);
            sub_observer = main(res);
            main_profile(res);
        });
        observer.observe(elm, config);
    })
    
});