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
            frames: this.anims.generateFrameNumbers('pos', { start: 0, end: 28 }),
            frameRate: 10,
            repeat: -1
        });
        this.posob.anims.play('pos', true);
    }
}