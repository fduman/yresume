function parse(urlText) {
    let url = new URL(urlText);
    let path = url.pathname.replace('/', '');
    var matched = path.match(/^[^[0-9]*/);
    if (matched.length > 0)
    {
        let splitted = matched[0].split('-');
        for (var i = 0; i < splitted.length; i++) {
            splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
        }
        
        let title = splitted.join(' ').trim();
        let pageUrl = url.toString();
        return {title, pageUrl};
    }
}
