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
        browser.runtime.sendNativeMessage('application.id', {type:"add-title", title: parsedUrl.title, url: parsedUrl.pageUrl}, function(response) {
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
        let ul = document.getElementById('list');
        ul.innerHTML = '';
        
        for (const [key, value] of Object.entries(response)) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            let linkText = document.createTextNode(key);
            a.appendChild(linkText);
            a.title = key;
            a.href = value;
            a.target="_blank";
            li.appendChild(a);
            ul.appendChild(li);
        }
    });
}
