

chrome.storage.local.get('everwhois', function(result) {
    console.log('Object.keys :>> ', Object.keys(result.everwhois), result.everwhois);
    main(result.everwhois || {})
});



function main(dict){
    console.log('tonscan data :>> ', dict);
    

    Object.keys(dict).forEach(key => {
        dict[key.substr(0, 2 + 5) + "..." + key.substr(key.length - 5)] = dict[key];
        dict[key.substr(0, 2 + 3) + "..." + key.substr(key.length - 3)] = dict[key];
        dict[key.substr(0, 2 + 10) + "..." + key.substr(key.length - 10)] = dict[key];
    })

    function change_by_span(index, textContentElement, name){
        let key = name.match(nameReg)
        if (key && key.length && dict[key[0]]){
            console.log('Меняем  :>> ', key[0], " на ", dict[key[0]], textContentElement.textContent, textContentElement);
            textContentElement.textContent = textContentElement.textContent.replace(nameReg, dict[key[0]]);
        } else {
            // console.log('Ключ не найден :>> ', textContentElement, name, key);
        }
    }

    function find_items(){
        const items = document.getElementsByTagName("app-address-icon")
        console.log('interval :>> ', items);
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (window.location.pathname == "/accounts"){
                change_by_span(index, item.nextElementSibling, item.nextElementSibling.title);
            } else {
                if (item.parentElement.title) {
                    change_by_span(index, item.nextSibling, item.parentElement.title);
                } else {
                    change_by_span(index, item.nextSibling, item.nextSibling.textContent);
                }

            }
        }
        if (items.length > 0){
            clearInterval(interval);
            interval = setInterval(find_items, 5000);
        }
        return items
    }

    var interval = setInterval(find_items, 1000);

}
console.log('tonscan.js  init:>> ');

