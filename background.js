
function reloadData() {
  return fetch(
    "https://firebasestorage.googleapis.com/v0/b/everwhois.appspot.com/o/public%2Fdata.json?alt=media&token=7cfdb98c-2648-45ff-a939-8773f52d916d",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((parsed) => {
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
