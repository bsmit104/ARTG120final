class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('sewa', 'sewers.png');
        this.load.image('sewaflo', 'sewerfloor.png');
        this.load.spritesheet('slime', 'slimetransparent.png', {
            frameWidth: 250,
            frameHeight: 150,
        });
    }
    create() {
        this.flo = this.add.image(100, 400, 'sewaflo');
        this.flo.setDepth(1);
        //FISH
        this.slime = this.physics.add.sprite(100, 300, 'slime');
        this.slime.setScale(.3);
        this.anims.create({
            key: 'slime',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.slime.anims.play('slime', true);
        this.slime.setDepth(1);

        const sew = this.add.image(0, 0, 'sewa');
        sew.setOrigin(0);
        sew.setDepth(0);
        sew.setScale(1.2);
    }
}