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
        dream: String,
        favColor: {type: String, default: 'Purple'}
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

    PrincessSchema.statics.findDream = function(dream, callback) {
        return this.find({dream: dream}, callback)
    };

    PrincessSchema.methods.findPrince = function(prince, callback) {
        return this.model("Princess").find({prince: prince}, callback)
    };

    var Princess = mongoose.model("Princess", PrincessSchema);

    var Ariel = new Princess({
        name: 'Ariel',
        prince: 'Eric',
        ability: 'Her Voice',
        favColor: 'Green'
    });

    var princess = new Princess({});

    var Jasmine = new Princess({
        name: 'Jasmine',
        prince: 'Aladdin',
        ability: 'A Magic Carpet',
        favColor: 'Blue'
    });

    var princessData = [
        { name: 'Belle', prince: 'Adam', ability: 'To Read', favColor: 'Yellow'},
        { name: 'Mulan', prince: 'Shang', ability: 'To Fight', favColor: 'Green'},
        { name: 'Pocahontas', prince: 'John Smith', ability: 'Colors of the wind', favColor: 'Yellow'},
        Ariel, princess, Jasmine
    ];

    Princess.remove({}, function(err) {
        if (err) console.error(err);
        Princess.create(princessData, function(err, princesses) {
            if (err) console.error(err);
            Princess.findOne({name: 'Ariel'}, function(err, Ariel) {
                Ariel.findPrince('Eric', function(err, princesses) {
                    if (err) console.log(err);
                    princesses.forEach(function(princess) {
                        console.log(`${princess.name}'s prince is ${princess.prince}`);
                    });
                    db.close(function() {
                        console.log('Connection Closed');
                    }); 
                });
                
            });
        });                   
    });   
});