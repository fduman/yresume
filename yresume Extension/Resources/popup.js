getTitles();

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear").addEventListener("click", clearAll);
    document.getElementById("add").addEventListener("click", addUrl);
});

function addUrl() {
    console.log("addurl clicked");
    
    browser.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
        console.log("get current tab", tabs);
        let tab = tabs[0];
        let url = tab.url;
        let parsedUrl = parse(url);
        console.log("parsed for add");
        browser.runtime.sendNativeMessage('application.id', {type:"add-title", key: parsedUrl.key, title: tab.title, url: parsedUrl.pageUrl}, function(response) {
            console.log("Url added:", url);
            getTitles();
        });
    });
}

function clearAll() {
    console.log("clearall clicked");
    browser.runtime.sendNativeMessage('application.id', {type:"clear-titles"}, function(response) {
        console.log("Urls cleared");
        getTitles();
    });
}

function getTitles() {
    console.log("get titles");
    browser.runtime.sendNativeMessage('application.id', {type:"get-titles"}, function(response) {
        console.log("Titles fetched");
        let table = document.getElementById('list');
        table.innerHTML = '';
        
        for (const [key, value] of Object.entries(response)) {
            console.log("key: ", key);
            console.log("value: ", value);
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);
    
            let a = document.createElement('a');
            let linkText = document.createTextNode(value[0]);
            a.appendChild(linkText);
            a.title = value[0];
            a.href = value[1];
            a.target="_blank";
            
            cell1.appendChild(a);
        }
    });
}
