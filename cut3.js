class Cut3 extends Phaser.Scene {
    constructor() {
        super('cut3');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.video("ending", "ending.mp4");
    }
    create() {
        // this.add.text(300, 300, "cut 3");

        const video = this.add.video(400, 300, "ending");
        video.play();

        video.on('complete', () => {
        this.textObject8 = this.add.text(
            700, //x
            500,//y
            "End", //text
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
    });
    }
}