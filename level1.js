class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('agua', 'waterBG.png');
        this.load.image('sewergrate', 'sewergrate.png');
        this.load.spritesheet('fish', 'fish.png', {
            frameWidth: 250,
            frameHeight: 150,
        });
        this.load.tilemapTiledJSON('watlev', 'watlev.json');
        this.load.spritesheet('waterlevel', 'waterlevel.png', { frameWidth: 16, frameHeight: 16 });
    }
    create() {
        smap = this.make.tilemap({ key: 'watlev' });

        // tiles for the ground layer
        var sgroundTiles = smap.addTilesetImage('waterlevel');
        // create the ground layer
        //groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        sgroundLayer = smap.createLayer('fish', sgroundTiles, 0, 0); //.setScale(8); //.setScale(.05);;
        // the player will collide with this layer
        sgroundLayer.setCollisionByExclusion([-1]);
        sgroundLayer.setDepth(1);

        this.physics.world.bounds.width = sgroundLayer.width * 8;
        this.physics.world.bounds.height = sgroundLayer.height * 8;

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

        var objectLayer = smap.getObjectLayer('objs');
        var eatenObject = objectLayer.objects.find(obj => obj.name === 'eaten');
        //this.physics.add.overlap(this.laserGroup, this.rectangleGroup5, toexpl, null, this);
        //player.setPosition(100, 300);
        this.physics.world.enable(eatenObject);
        this.physics.add.collider(this.fish, eatenObject, handleCollision, null, this);

        function handleCollision(player, collided) {
            if (collided.name === 'eaten') {
                this.fish.setPosition(300, 100);
                // You can add any additional code or logic here if needed
            }
        }

        //this.physics.add.sprite(100, 100, 'sewergrate');
        this.grate = this.physics.add.sprite(
            1600,//x
            400,//y
            'sewergrate',//imagename
        )
        this.grate.setDepth(1)
        this.grate.setScale(4) //resize

        this.physics.add.collider(this.fish, this.grate, nextsc, null, this);
        // Collision callback function
        function nextsc() {
            // Trigger the scene change here
            // For example:
            this.scene.start('cut0');
        }

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        const aguaob = this.add.image(0, 0, 'agua');
        aguaob.setOrigin(0);
        aguaob.setDepth(0);
        aguaob.setScale(7);
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

        this.cameras.main.setBounds(0, 0, smap.widthInPixels + 200, smap.heightInPixels + 100);
        // make the camera follow the player
        this.cameras.main.startFollow(this.fish);

        // Set the world bounds to match the game's width and height
        //this.physics.world.setBounds(0, 0, game.config.width * 8, game.config.height * 8);
        // Set the world bounds to match the ground layer's dimensions
        this.physics.world.setBounds(0, 0, sgroundLayer.width + 200, sgroundLayer.height + 100);

        // Enable collisions between the sprite and world bounds
        this.fish.setCollideWorldBounds(true);
    }
}