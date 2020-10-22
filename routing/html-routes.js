const path = require("path");

module.exports = function(app) {
    //localhost:8080/
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });
    //localhost:8080/notes
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/notes.html"));
    });

    


}