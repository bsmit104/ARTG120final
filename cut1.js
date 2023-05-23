class Cut1 extends Phaser.Scene {
    constructor() {
        super('cut1');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('agua', 'waterBG.png');
        this.load.spritesheet('pos', 'slimepossess.png', {
            frameWidth: 50,
            frameHeight: 12,
            // frameWidth: 1158,
            // frameHeight: 420,
        }); //29
    }
    create() {
        this.posob = this.physics.add.sprite(400, 300, 'pos');
        this.posob.setScale(15);
        this.anims.create({
            key: 'pos',
            frames: this.anims.generateFrameNumbers('pos', { start: 0, end: 27 }),
            frameRate: 10,
            repeat: 0,
            // onComplete: () => {
            //     this.textObject8 = this.add.text(
            //         300, //x
            //         420,//y
            //         "tap", //text
            //         {
            //             font: "60px Impact",
            //             color: "#FFFFFF",
            //             align: "center"
            //         } //style
            //     );
                // this.tweens.add({
                //     targets: this.textObject8,
                //     alpha:0,
                //     duration: 2000,
                //     repeat: -1,
                // });
            // }

        });
        this.posob.anims.play('pos', true);
        this.textObject8 = this.add.text(
            700, //x
            500,//y
            "tap", //text
            {
                font: "30px Impact",
                color: "#FFFFFF",
                align: "center"
            } //style
        );
        this.tweens.add({
            targets: this.textObject8,
            alpha:0,
            duration: 2000,
            repeat: -1,
        });
        this.input.on('pointerdown', () => this.scene.start('level2'));
    }
}