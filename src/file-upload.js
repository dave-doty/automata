
// below is taken from https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17
app.ports.fileSelected.subscribe(function (id) {
    var node = document.getElementById(id);
    if (node === null) {
        return;
    }

    // If your file upload field allows multiple files, you might
    // want to consider turning this into a `for` loop.
    var file = node.files[0];
    var reader = new FileReader();

    // FileReader API is event based. Once a file is selected
    // it fires events. We hook into the `onload` event for our reader.
    reader.onload = (function(event) {
        // The event carries the `target`. The `target` is the file
        // that was selected. The result is base64 encoded contents of the file.
        var base64encoded = event.target.result;
        console.log(base64encoded);
        // We build up the `ImagePortData` object here that will be passed to our Elm
        // runtime through the `fileContentRead` subscription.
        var portData = {
            contents: base64encoded,
            filename: file.name
        };

        // We call the `fileContentRead` port with the file data
        // which will be sent to our Elm runtime via Subscriptions.
        app.ports.fileContentRead.send(portData);
    });

    // Connect our FileReader with the file that was selected in our `input` node.
    // reader.readAsDataURL(file);
    if (typeof file !== 'undefined') {
        reader.readAsText(file);
    }
});
