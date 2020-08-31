if (window.top === window) {
    let parsedUrl = parse(window.location.href);
    browser.runtime.sendMessage({ type: "send-title", title: parsedUrl.title, url: parsedUrl.pageUrl });
    console.log("Url send for update");
}

