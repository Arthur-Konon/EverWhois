const nameReg = /0:([A-z0-9]{64})|0:([A-z0-9]{5})\.\.\.[A-z0-9]{5}|0:([A-z0-9]{3})\.\.\.[A-z0-9]{3}/g

const dict = {
    "0:fee1a3bd261619f036d83aafd8b34f47d794bbb58185379877291003f3a3526d":"Привет артур",
    "0:0f08d1a5f0827aac4198751d259d3c3eff93871c5579c3bd1271c35a9a5bb72c":"Привет артур",
    "0:e43667fd822e6636bc4b9761ff98de2c7dc4a70e70d0e76fdd0b5674dc8a8916":"СТАСЯО"
}

Object.keys(dict).forEach(key => {
    dict[key.substr(0, 2 + 5) + "..." + key.substr(key.length - 5)] = dict[key];
    dict[key.substr(0, 2 + 3) + "..." + key.substr(key.length - 3)] = dict[key];
})

function change_by_span(index, textContentElement, name){
    let key = name.match(nameReg)
    if (key.length && dict[key[0]]){
        console.log('Меняем  :>> ', key[0], " на ", dict[key[0]], textContentElement.textContent);
        textContentElement.textContent = textContentElement.textContent.replace(nameReg, dict[key[0]]);
    } else {
        console.log('Ключ не найден :>> ', textContentElement, name, key);
    }
}

function find_items(){
    const items = document.getElementsByTagName("app-address-icon")
    console.log('interval :>> ', items);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.parentElement.title) {
            change_by_span(index, item.nextSibling, item.parentElement.title);
        } else {
            change_by_span(index, item.nextSibling, item.nextSibling.textContent);
        }
    }
    if (items.length > 0){
        clearInterval(interval);
    }
    return items
}

const interval = setInterval(find_items, 1000);