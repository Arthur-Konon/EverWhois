
function reloadData() {
  return fetch(
    "https://firebasestorage.googleapis.com/v0/b/everwhois.appspot.com/o/public%2Fdata.json?alt=media&token=7cfdb98c-2648-45ff-a939-8773f52d916d",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((parsed) => {
      Object.keys(parsed).forEach(function(key, index) {
        if (parsed[key].hasOwnProperty('value')){
          parsed[key] = parsed[key].value
        }
      });
      chrome.storage.local.set({ everwhois: parsed }, function () {
        console.log("Value is set to ", parsed);
      });
      return parsed;
    });
}

chrome.action.onClicked.addListener((tab) => {
  let parsed = reloadData().then(() => {
    chrome.tabs.reload(tab.id);
  });
});

reloadData();
var compareJSON = function (obj1, obj2) {
  var ret = {};
  for (var i in obj2) {
    if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
      ret[i] = obj2[i];
    }
  }
  return ret;
};

function cronReloadData() {
  console.log('cronReloadData :>> ');
  reloadData().then(data => {
    chrome.storage.local.get('everwhois', function (result) {
      const compares = compareJSON(result.everwhois, data);
      if (Object.keys(compares).length !== 0) {
        chrome.notifications.create(
          {
            type: 'basic',
            iconUrl: '/images/icon128.png',
            title: 'Pls reloade windows',
            message: 'New accounts in database',
            priority: 2
          },
        )
      }
    });
  })
}
cronReloadData()
const cronReload = setInterval(cronReloadData, 1000*60);
