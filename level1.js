class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('agua', 'waterBG.png');
        this.load.spritesheet('fish', 'fish.png', {
            frameWidth: 250,
            frameHeight: 150,
        });
    }
    create() {
        // define variables
        this.ANG_VELOCITY = 180;    // degrees/second
        this.MAX_VELOCITY = 500;    // pixels/second
        this.DRAG = 0.99;
        // add arrow key graphics as UI
        this.upKey = this.add.sprite(64, 32, 'arrowKey');
        this.leftKey = this.add.sprite(32, 64, 'arrowKey');
        this.downKey = this.add.sprite(64, 64, 'arrowKey');
        this.rightKey = this.add.sprite(96, 64, 'arrowKey');
        this.leftKey.rotation = Math.PI / 2 * 3;
        this.downKey.rotation = Math.PI;
        this.rightKey.rotation = Math.PI / 2;
        this.downKey.tint = 0x333333;
        this.upKey.setDepth(1);
        this.leftKey.setDepth(1);
        this.downKey.setDepth(1);
        this.rightKey.setDepth(1);
        //FISH
        this.fish = this.physics.add.sprite(100, 300, 'fish');
        this.fish.setScale(.5);
        this.anims.create({
            key: 'fish',
            frames: this.anims.generateFrameNumbers('fish', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.fish.anims.play('fish', true);

        this.fish.setMaxVelocity(this.MAX_VELOCITY);
        this.fish.setDamping(true);
        this.fish.setDrag(this.DRAG);
        this.fish.setDepth(1);
        //this.fish.body.setAllowGravity(false);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        const aguaob = this.add.image(0, 0, 'agua');
        aguaob.setOrigin(0);
        aguaob.setDepth(0);
        aguaob.setScale(1.2);
    }
    update() {
        if (cursors.up.isDown) {
            this.physics.velocityFromRotation(this.fish.rotation - Math.PI / 2 * 3, 200, this.fish.body.acceleration);
            this.upKey.tint = 0xFACADE;     // tint keyboard key
        } else {
            this.fish.setAcceleration(0);
            this.upKey.tint = 0xFFFFFF;     // un-tint key
        }

        if (cursors.left.isDown) {
            this.fish.setAngularVelocity(-this.ANG_VELOCITY);
            this.leftKey.tint = 0xFACADE;   // tint keyboard key
        } else if (cursors.right.isDown) {
            this.fish.setAngularVelocity(this.ANG_VELOCITY);
            this.rightKey.tint = 0xFACADE;   // tint keyboard key
        } else {
            this.fish.setAngularVelocity(0);
            this.leftKey.tint = 0xFFFFFF;   // un-tint keys
            this.rightKey.tint = 0xFFFFFF;
        }

        // Set the world bounds to match the game's width and height
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        // Enable collisions between the sprite and world bounds
        this.fish.setCollideWorldBounds(true);
    }
}