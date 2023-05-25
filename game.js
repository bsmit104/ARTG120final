/////////cheat codes/////////////
// slime level : 
// - press up increases speed right
// arcade level : 
// - press down causes gravity to disappear
// - pressing space will resume gravity

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
            debug: false
        }
    },
    scene: [Start, Intro, Title, Level1, Cut0, Level2, Cut1, Level3, Cut2, Level4, Cut3]
    //{
        // key: 'main',
        // preload: preload,
        // create: create,
        // update: update
    //}
};
var game = new Phaser.Game(config);