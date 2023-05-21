
class Start extends Phaser.Scene {
    constructor() {
        super('start');
    }
    create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.textObject0 = this.add.text(
            240, //x
            250,//y
            "tap to progress", //text
            {
                font: "50px Impact",
                color: "#FFFFFF",
                align: "center"
            } //style
        );
    //textObject0.setAlpha(1);
    this.tweens.add({
        targets: this.textObject0,
        alpha:0,
        duration: 2000,
        repeat: -1,
    });
    //textObject0.setAlpha(1);
    this.tweens.add({
        targets: this.textObject8,
        alpha:0,
        duration: 2000,
        repeat: -1,
    });

    this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}