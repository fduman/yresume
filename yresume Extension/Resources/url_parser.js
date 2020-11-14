function parse(urlText) {
    let url = new URL(urlText);
    let path = url.pathname.replace('/', '');
    var matched = path.match(/^[^[0-9]*/);
    if (matched.length > 0)
    {
        let key = matched[0].trim();
        let pageUrl = url.toString();
        return {key, pageUrl};
    }
}
