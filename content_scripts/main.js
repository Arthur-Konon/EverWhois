
const pattern = '(0|-1):([A-z0-9]{64})' 
        + '|(0|-1):([A-z0-9]{3})\.\.\.[A-z0-9]{3}' 
        + '|(0|-1):([A-z0-9]{4})\.\.\.[A-z0-9]{4}' 
        + '|(0|-1):([A-z0-9]{5})\.\.\.[A-z0-9]{5}' 
        + '|(0|-1):([A-z0-9]{10})\.\.\.[A-z0-9]{10}';

const nameReg = new RegExp(pattern, 'g');

function validateData(dict) {
    console.log('everwhois loaded data :>> ', dict);
    Object.keys(dict).forEach(key => {
        const value = typeof dict[key] == 'string'?dict[key]:dict[key].value
        if (key.startsWith("0")){
            dict[key.substr(0, 2 + 3) + "..." + key.substr(key.length - 3)] = value;
            dict[key.substr(0, 2 + 4) + "..." + key.substr(key.length - 4)] = value;
            dict[key.substr(0, 2 + 5) + "..." + key.substr(key.length - 5)] = value;
            dict[key.substr(0, 2 + 10) + "..." + key.substr(key.length - 10)] = value;
        }
        if (key.startsWith('-1')){
            dict[key.substr(0, 3 + 3) + "..." + key.substr(key.length - 3)] = value;
            dict[key.substr(0, 3 + 4) + "..." + key.substr(key.length - 4)] = value;
            dict[key.substr(0, 3 + 5) + "..." + key.substr(key.length - 5)] = value;
            dict[key.substr(0, 3 + 10) + "..." + key.substr(key.length - 10)] = value;
        }
    })
    return dict
}

function everwhoisData() {
    console.log('everwhoisData :>> ');
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('everwhois', function (result) {
            console.log('Object.keys :>> ', Object.keys(result.everwhois), result.everwhois);
            if (result.everwhois === undefined) {
                reject();
            } else {
                let data = result.everwhois || {}
                resolve(validateData(Object.assign(testData, data)));
            }
        });
    });
};

function updateString(value, data) {
    let key = value.match(nameReg)
    if (key && key.length && data[key[0]]) {
        console.log('key for  :>> ', value, key, data[key[0]]);
        return value.replace(nameReg, data[key[0]]);
    } else {
        console.log('key not found for  :>> ', value, key);
        return value;
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const testData = {}
const testAccounts = [
    // "0:ac92eda56fea3abdc22dd93304081208d0b71165a69908e1783e87fdbe41fffd",
    // "0:5962afb872626f553275b23a7074774ebd58609c63a16e7addf3fc05c314c8b2",
    // "0:33da3182fc166eb7f5d86f332b766ecadc2eabb92193eb2195b05193a66b341e",
    // "0:626e94acbaca034e156aa3bba7f9e0031aaeaf56286686dc9d32cdccd132c23c",
    // "0:2e6d5fcecfcdd36c748de15d1dd7102728b528a3538582aa5a093e6088d79e28",
    // "0:6269578347d13127f8235a71aa01d55e4712aeb7582d5143f25eea8aa1f7b70d",
    // "-1:5ce67fe8dd33f7a7151e4f36ad7140538298cc30733065cfea03e14ffe682652",
    // "-1:e415b36ea77fb39bbaecfa260ebb1d91ebae7376a38fd71e0d49f23994fe0203",
    // "0:eb9c9e8c60679d98eb84a6b09b77882cb6df09f88933404e375adccaac11709a",
    // "0:5aa09496fdce333b5208125396cda8d9c83194b25ee694e5aa37fdc70aa11b61",
    // "0:5e559502c5ca7913df8e377c6511d363d7a3beee9ed63634ba102b2e92886278",
    // "0:44e173870cbf9b883464d8a9609995bc7323c153ee965bfcb88ed0f477629a42",
    // "0:5c000200fb560500930e271d583b5c33a26d98761fc78984b7b0820bef2e74be",
    // "0:8d65a78014efd4ac2c0c0b1100c4f78c2f0f08cad02bed0d2097f9ce62136c85",
    // "0:3984130b2886189f117d5476ab63e49b895d730aab1dfd43c2ca74dea89de3f5",
    // "0:b60107b56215dca1cfaaf7cfb486cc49c2655aa28a181b0e9dbab0dcb78ea1cd",
    // "0:ab91c8cec44aa6e3b2c31443202a63241394491f0e41215a30620b57ef28b69b",
    // "0:ff44d4df1cea6bb161f33b71783da1cb7fc3a169d8acf0e4e9d3b917ed334836",
    // "0:10106ac283b4fa3864de16e7488a55081f0fa2210f8a557a3868f51e17c7ebe1",
]

testAccounts.forEach((value, index) =>{
    testData[value] = "СТАС " + index
})
