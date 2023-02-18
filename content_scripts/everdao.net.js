function copyToClickboard(){
    let columns =  [
        "Name",
        "Voter",
        "Reason",
        "Voting",
        "Voting value",
        "Date",
    ].join('\t');

    let results = [
        columns
    ];

    document.querySelectorAll("#votes .table__body div.user-card__name a").forEach(el=>{
        let container = el.parentNode.parentNode.parentNode.parentNode
        let reason = container.childNodes[1].textContent;
        let voting_type = container.childNodes[2].querySelector('.vote-type__badge');
        let voting_count = container.childNodes[2].querySelector('.vote-type__value');
        let date = container.childNodes[3].textContent;
        results.push([
            el.text,
            el.href.replace("https://everdao.net/staking/explorer/", ""),
            reason.replace(/\n/g, " "),
            voting_type?voting_type.textContent:'-',
            voting_count?voting_count.textContent:'-',
            date,
        ].join("\t"))
    })
    navigator.clipboard.writeText(results.join('\r\n')).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
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

            let table_with_footer = document.querySelector("#votes > div.card.card--flat.card--small .pagination");
            if (table_with_footer !== null && !table_with_footer.classList.contains('EverWhoisPatched')){
                const my_div = document.createElement("div");
                my_div.classList.add("pagination-foot")
                const my_button = document.createElement("button");
                my_button.addEventListener("click", copyToClickboard);
                my_button.textContent = "Copy to clipboard";
                my_button.classList.add("btn");
                my_button.classList.add("btn--md");
                my_button.classList.add("btn--inline");
                my_button.classList.add("btn--secondary");
                my_div.appendChild(my_button);
                // my_div.innerHTML = `<div class="pagination-footer"><button onclick="copyToClickboard()">Скопировать</button></div>`
                table_with_footer.insertBefore(my_div, table_with_footer.firstChild);
                table_with_footer.classList.add("EverWhoisPatched");
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


