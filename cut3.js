class Cut3 extends Phaser.Scene {
    constructor() {
        super('cut3');
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
        this.add.text(300, 300, "cut 3");

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
        this.input.on('pointerdown', () => this.scene.start('start'));
    }
}