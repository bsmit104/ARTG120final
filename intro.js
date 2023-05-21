class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = "./assets/";
        //this.load.audio('logosound', 'logosound.wav');
        //this.load.image('space', 'space3.png');
        this.load.spritesheet('logonah', 'logonah.png', {
            frameWidth: 250,
            frameHeight: 250
        });
    }
    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.textObject0 = this.add.text(
            100, //x
            250,//y
            "Brought to you by Braygames,\nGarrett, and Avad", //text
            {
                font: "50px Impact",
                color: "#FFFFFF",
                align: "center"
            } //style
        );
        //this.cameras.main.setBackgroundColor('#ffffff');
        // const backgroundMusic = this.sound.add('logosound', { loop: false });
        // backgroundMusic.play();
    /////////////////animated///////////////////
        // this.imageObject2 = this.add.sprite(
        //     900,//x
        //     500,//y
        //     'logonah',//imagename
        // );
        // this.imageObject2.setDepth(1)
        // this.imageObject2.setScale(5); //resize
        // this.anims.create({
        //     key: 'logonah',
        //     frames: this.anims.generateFrameNumbers('logonah', {
        //         start: 0,
        //         end: 16
        //     }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.imageObject2.anims.play('logonah', true);
        // this.time.delayedCall(2000, () => {
        //     this.tweens.add({
        //         targets: this.imageObject2,
        //         alpha:0,
        //         duration: 2000,
        //         repeat: 0,
        //         onComplete: () => {
        //             this.textObject8 = this.add.text(
        //                 850, //x
        //                 420,//y
        //                 "tap", //text
        //                 {
        //                     font: "60px Impact",
        //                     color: "#00000",
        //                     align: "center"
        //                 } //style
        //             );
        //             this.tweens.add({
        //                 targets: this.textObject8,
        //                 alpha:0,
        //                 duration: 2000,
        //                 repeat: -1,
        //             });
        //         }
        //     });
        // }, null, this);
        this.input.on('pointerdown', () => this.scene.start('title'));

        // const space = this.add.image(200, 0, 'space');
        // //space.scale(.5);
        // space.setOrigin(0);
        // space.setDepth(0);

        // this.imageObject2.background = this.back;
    }
}