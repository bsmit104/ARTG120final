class Cut0 extends Phaser.Scene {
    constructor() {
        super('cut0');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.video("fishvid", "fish.mp4");
        this.load.audio('fishMusic', 'fishjams.mp3');
    }
    create() {
        this.fishMusic = this.sound.add('fishMusic');
        this.fishMusic.play();
        this.fishMusic.loop = true;
        //this.add.text(300, 300, "cut 0");

        const video = this.add.video(400, 300, "fishvid");
        video.play();

        video.on('complete', () => {
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
        this.fishMusic.stop();
        this.input.on('pointerdown', () => this.scene.start('level2'));
    });
    }
}