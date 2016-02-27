var actions = require("./actions");

var API = module.exports = {

    fetchChirps: function(){
        get("/api/chirps").then(function(chirps){
            actions.gotChirps(chirps);
        });
    }

};

function get(url){
    return fetch(url, {
        credentials: "same-origin"
    }).then(function(res){
        return res.json();
    });
}