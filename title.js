
class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image('tit', 'title2.png');
        // this.load.spritesheet('met', 'metss.png', {
        //     frameWidth: 120,
        //     frameHeight: 120
        // });
    }
    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.titl = this.add.image(
            400, //x
            250,//y
            "tit", //text
        );
        this.titl.setScale(1.3)
        //.setInteractive(this.input.makePixelPerfect());
        // this.textObject0 = this.add.text(
        //     240, //x
        //     250,//y
        //     "Morph", //text
        //     {
        //         font: "50px Impact",
        //         color: "#FFFFFF",
        //         align: "center"
        //     } //style
        // );
        // this.imageObject = this.add.sprite(
        //     1500,//x
        //     700,//y
        //     'met',//imagename
        // );
        // this.imageObject.setDepth(1);
        // this.imageObject.setScale(5); //resize
        // this.anims.create({
        //     key: 'met',
        //     frames: this.anims.generateFrameNumbers('met', {
        //         start: 0,
        //         end: 8
        //     }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // this.imageObject.anims.play('met', true);

        // //this.image.add()
        // this.titleob = this.add.text(
        //     600,//x
        //     200,//y
        //     'Sentient Meteor',//imagename
        //     {
        //         font: "100px Impact",
        //         color: "#FF0",
        //         align: "center"
        //     }
        //     )
        //     //this.title.setDepth(1)
        //     this.titleob.setDepth(1);
        //     this.titleob.setScale(1) //resize
        //     const instructions = this.add.text(200, 500, "HOW TO PLAY:\nSmash spaceships with your bod.\n'Right'/'Left' arrows rotate.\n'up' arrow is forward.\nPress 'space' to shoot fireballs\nat alien buildings.\nDon’t get hit by lasers or crash!", { fontSize: '40px', fill: '#ff0' });
        //     instructions.setDepth(1);
        const playText = this.add.text(350, 400, 'PLAY', { fontSize: '20px', fill: '#fff' });
        //playText.setDepth(1);
        playText.setInteractive();
        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#ff0' });
        });
        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#fff' });
        });
        playText.on('pointerdown', () => {
            this.scene.start('level1');
        });

        // const space = this.add.image(200, 0, 'space');
        // //space.scale(.5);
        // space.setOrigin(0);
        // space.setDepth(0);

        // this.imageObject.background = this.back;
    }
}