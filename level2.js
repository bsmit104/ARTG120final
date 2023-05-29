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
        this.rightKey = this.add.sprite(96, 64, 'arrowKey');
        this.rightKey.rotation = Math.PI / 2;
        this.rightKey.setDepth(1);

        this.flo = this.add.image(100, 400, 'sewaflo');
        this.flo.setDepth(1);
        //FISH
        this.slime = this.physics.add.sprite(50, 300, 'slime');
        this.slime.setScale(.3);
        this.anims.create({
            key: 'slime',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.slime.anims.play('slime', true);
        this.slime.setDepth(1);

        const duration = 2000; // Duration in milliseconds
            const numFlashes = 4; // Number of times the sprite will flash
            // Define the tween animation
            this.tweens.add({
                targets: this.slime,
                alpha: 0, // Make the sprite transparent
                ease: 'Linear',
                duration: duration / (2 * numFlashes), // Divide the duration evenly across the number of flashes
                repeat: numFlashes - 1, // Number of additional flashes (subtracting the initial state)
                yoyo: true, // Make the tween reverse back to its initial state
                onComplete: () => {
                    // Reset the sprite's alpha to 1 (fully opaque) after the tween is complete
                    this.slime.alpha = 1;
                }
            });


        cursors = this.input.keyboard.createCursorKeys();
        
        const sew = this.add.image(0, 0, 'sewa');
        sew.setOrigin(0);
        sew.setDepth(0);
        sew.setScale(1.2);
    }

    update() {
        if (cursors.right.isDown) {
            this.slime.body.setVelocityX(20);
            //player.anims.play('walk', true);
            this.rightKey.tint = 0xFACADE;
        }
        else if (cursors.up.isDown) {
            this.slime.body.setVelocityX(500);
            //player.anims.play('walk', true);
            this.rightKey.tint = 0xFACADE;
        }
        else {
            this.slime.body.setVelocityX(0);
        }

        ///////////////to menu/////////////////////
        if (!this.physics.world.bounds.contains(this.slime.x, this.slime.y)) {
            // Scene change logic
            this.scene.start('cut1');
        }
    }
}