const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const { v4: uuidv4 } = require('uuid');
//console.log(uuidv4()); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });

    app.get("/routing/api/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });


    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uuidv4();
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });

    
    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
     
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}

