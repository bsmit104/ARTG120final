
// tame the javashrek
'use strict';

var map;
var smap;
var player;
var groundLayer;
var sgroundLayer;
let cursors;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: true
        }
    },
    scene: [Cut1] //[Start, Intro, Title, Level1, Level2, Level3, Level4]
    //{
        // key: 'main',
        // preload: preload,
        // create: create,
        // update: update
    //}
};
var game = new Phaser.Game(config);