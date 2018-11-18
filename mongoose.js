'use strict'

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sandbox');
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('Connection Error: ', err);
});

db.once('open', function() {
    console.log('Connection Open');

    var Schema = mongoose.Schema;
    var PrincessSchema = new Schema ({
        name: {type: String, default: 'Rapunzel'},
        prince: {type: String, default: 'Flynn Rider'},
        ability: {type: String, default: 'Magic Hair'},
        dream: String
    });

    PrincessSchema.pre('save', function(next) {
        if (this.name == 'Rapunzel' || this.name == 'Jasmine' || this.name == 'Belle') {
            this.dream = 'to see the world';
        } else if (this.name == 'Mulan' || this.name == 'Pocahontas') {
            this.dream = 'peace on land';
        } else {
            this.dream = 'to be a human'
        }
        next();
    });

    var Princess = mongoose.model("Princess", PrincessSchema);

    var Ariel = new Princess({
        name: 'Ariel',
        prince: 'Eric',
        ability: 'Her Voice'
    });

    var princess = new Princess({});

    var Jasmine = new Princess({
        name: 'Jasmine',
        prince: 'Aladdin',
        ability: 'A Magic Carpet'
    });

    var princessData = [
        { name: 'Belle', prince: 'Adam', ability: 'To Read' },
        { name: 'Mulan', prince: 'Shang', ability: 'To Fight'},
        { name: 'Pocahontas', prince: 'John Smith', ability: 'Colors of the wind'},
        Ariel, princess, Jasmine
    ];

    Princess.remove({}, function(err) {
        if (err) console.error(err);
        Princess.create(princessData, function(err, princesses) {
            if (err) console.error(err);
            Princess.find({}, function(err, princesses) {
                princesses.forEach(function(princess) {
                    console.log(`${princess.name}'s dream is ${princess.dream}`);
                });
                db.close(function() {
                    console.log('Connection Closed');
                }); 
            });
        });                   
    });   
});