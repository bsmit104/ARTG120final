class Cut2 extends Phaser.Scene {
    constructor() {
        super('cut2');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.audio('beat', 'heartbeat.mp3');
        this.load.spritesheet('pos', 'slimepossess.png', {
            frameWidth: 50,
            frameHeight: 12,
            // frameWidth: 1158,
            // frameHeight: 420,
        }); //29
    }
    create() {
        this.beat = this.sound.add('beat');
        this.beat.play();
        this.beat.loop = true;

        this.add.text(300, 300, "cut 2");

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
        this.beat.stop();
        this.input.on('pointerdown', () => this.scene.start('level3'));
    }
}