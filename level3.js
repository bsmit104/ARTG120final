class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }
    preload() {
        this.load.path = "./assets/";
        //this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('sewa', 'sewers.png');
        this.load.image('arc', 'arcademach.png');
        this.load.audio('ratMusic', 'Rat_Section.mp3');
        //this.load.image('fplayer', 'rat.png');
        this.load.spritesheet('fplayer', 'rat.png', {
            frameWidth: 249,
            frameHeight: 143,
        });
        this.load.spritesheet('fplayerj', 'ratjump.png', {
            frameWidth: 250,
            frameHeight: 150,
        });
        this.load.tilemapTiledJSON('sewermap', 'sewerjump.json');
        this.load.spritesheet('sewerfloor2', 'sewerfloor2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('sewaflo', 'sewerfloor.png');
    }
    create() {
        this.ratMusic = this.sound.add('ratMusic');
        this.ratMusic.play();
        this.ratMusic.loop = true;

        this.physics.world.gravity.y = 500;

        this.physics.start(); //made gravity stronger for some reason

        // debugger;
        //////////////FIXXXXXXXXXXXXXXXX MEEEEEEEEEEEEEEE////////////////////
        //this.arco = this.add.sprite(1500, 220, 'arc').setScale(.6); //*8
        this.arc = this.physics.add.sprite(
            1500 * 8 + 100,//x
            220,//y
            'arc',//imagename
        )
        this.arc.body.allowGravity = false;
        this.arc.setDepth(1);
        this.arc.setImmovable(true);
        this.arc.setVisible(true);
        this.arc.setScale(.6) //resize

        //this.arco.setDepth(1);
        // this.arco.setScale(.6)
        // load the map 
        smap = this.make.tilemap({ key: 'sewermap' });

        // tiles for the ground layer
        var sgroundTiles = smap.addTilesetImage('sewerfloor2');
        // create the ground layer
        //groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        sgroundLayer = smap.createLayer('Floor', sgroundTiles, 0, 0).setScale(8); //.setScale(.05);;
        // the player will collide with this layer
        sgroundLayer.setCollisionByExclusion([-1]);
        sgroundLayer.setDepth(1);

        this.physics.world.bounds.width = sgroundLayer.width * 8;
        this.physics.world.bounds.height = sgroundLayer.height * 8;

        // create the player sprite    
        player = this.physics.add.sprite(200 * 8, 200 * 8, 'fplayer');
        this.anims.create({
            key: 'fplayer',
            frames: this.anims.generateFrameNumbers('fplayer', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fplayerj',
            frames: this.anims.generateFrameNumbers('fplayerj', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        player.anims.play('fplayer', true);
        player.setBounce(0.2); // our player will bounce from items
        //player.setCollideWorldBounds(true); // don't go out of the map   
        player.setDepth(1); 

            const duration = 2000; // Duration in milliseconds
            const numFlashes = 4; // Number of times the sprite will flash
            // Define the tween animation
            this.tweens.add({
                targets: player,
                alpha: 0, // Make the sprite transparent
                ease: 'Linear',
                duration: duration / (2 * numFlashes), // Divide the duration evenly across the number of flashes
                repeat: numFlashes - 1, // Number of additional flashes (subtracting the initial state)
                yoyo: true, // Make the tween reverse back to its initial state
                onComplete: () => {
                    // Reset the sprite's alpha to 1 (fully opaque) after the tween is complete
                    player.alpha = 1;
                }
            });


        var objectLayer = smap.getObjectLayer('objs');
        var start = objectLayer.objects.find(obj => obj.name === 'start');
        player.setPosition(start.x * 8, start.y * 8);
        // small fix to our player images, we resize the physics body object slightly
        player.body.setSize(player.width, player.height - 8);
        player.setScale(.5);

        // player will collide with the level tiles 
        this.physics.add.collider(sgroundLayer, player);

        cursors = this.input.keyboard.createCursorKeys();
        // Output map dimensions
        console.log('Map width:', smap.widthInPixels);
        console.log('Map height:', smap.heightInPixels);
        console.log('Player position:', player.x, player.y);
        // Output camera position
        //console.log('Camera position:', this.cameras.main.scrollX, this.cameras.main.scrollY);
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, smap.widthInPixels * 8, smap.heightInPixels * 8);
        // make the camera follow the player
        this.cameras.main.startFollow(player);
        console.log('Player position:', player.x, player.y);
        console.log('Player position:', player.x, player.y);
        console.log('Player position:', player.x, player.y);
        console.log('Camera position:', this.cameras.main.scrollX, this.cameras.main.scrollY);
        // this.flo = this.add.image(100, 400, 'sewaflo');
        // this.flo.setDepth(1);
        // //FISH
        // this.slime = this.physics.add.sprite(50, 300, 'slime');
        // this.slime.setScale(.3);
        // this.anims.create({
        //     key: 'slime',
        //     frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 4 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // this.slime.anims.play('slime', true);
        // this.slime.setDepth(1);

        // cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor('#142702');
        // const sew = this.add.image(0, 0, 'sewa');
        // sew.setOrigin(0);
        // sew.setDepth(0);
        // sew.setScale(1.2);

        
        this.physics.add.collider(player, this.arc, nextsce, null, this);
        // Collision callback function
        function nextsce() {
            // Trigger the scene change here
            // For example:
            this.ratMusic.stop();
            this.scene.start('level4');
        }
    }

    update() {
        // this.physics.add.collider(player, this.arco, nextlev, null, this);
        // function nextlev() {
        //     // Trigger the scene change here
        //     // For example:
        //     this.scene.start('level4');
        // }
        if (!this.physics.world.bounds.contains(player.x, player.y)) {
            // Scene change logic
            this.ratMusic.stop();
            this.scene.start('level3');
        }

        this.cameras.main.scrollX = player.x - this.cameras.main.width / 2;
        this.cameras.main.scrollY = player.y - this.cameras.main.height / 2;

        if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        //player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(500);
        //player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        //player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-500);   
        player.anims.play('fplayerj', true);
        //player.anims.play('fplayer', true);

        player.on('animationcomplete-fplayerj', () => {
            player.anims.play('fplayer', true);
          });     
    }
        // if (cursors.right.isDown) {
        //     this.slime.body.setVelocityX(20);
        //     //player.anims.play('walk', true);
        // }
        // else {
        //     this.slime.body.setVelocityX(0);
        // }

        // ///////////////to menu/////////////////////
        // if (!this.physics.world.bounds.contains(this.slime.x, this.slime.y)) {
        //     // Scene change logic
        //     this.scene.start('level3');
        // }
    }
}