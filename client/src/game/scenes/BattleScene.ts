import Phaser from 'phaser';

export class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    preload() {
        console.log('Loading BattleScene Assets');
        this.load.image('battleBackground', 'assets/background/battle.png');
        this.load.image('charactorMain', 'assets/charactor/main.png');
        this.load.image('charactorEnemy', 'assets/charactor/enemy.png');
        this.load.image('block', 'assets/components/block.png');
        this.load.image('battleStatus', 'assets/components/battleStatus.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'battleBackground').setOrigin(0.5, 0.5);
        console.log('BattleScene Loaded');

        // charactorMain
        this.add.image(150, height - 150, 'charactorMain').setOrigin(0.5, 0.5);

        // charactorEnemy
        this.add.image(width - 150, height - 150, 'charactorEnemy').setOrigin(0.5, 0.5);

        // Your items
        const blockWidth = 70;
        const blockHeight = 70;
        const startXLeft = 50;
        const startYLeft = 50;

        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 9; col++) {
                this.add.image(startXLeft + col * blockWidth, startYLeft + row * blockHeight, 'block').setOrigin(0.5, 0.5);
            }
        }

        // Enemy's items
        const startXRight = width - (blockWidth * 9 + 50) + 50;

        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 9; col++) {
                this.add.image(startXRight + col * blockWidth, startYLeft + row * blockHeight, 'block').setOrigin(0.5, 0.5);
            }
        }

        // Your status
        this.add.image(width / 2 - 200, height - 150, 'battleStatus').setOrigin(0.5, 0.5).setScale(0.8);

        // Enemy's status
        this.add.image(width / 2 + 200, height - 150, 'battleStatus').setOrigin(0.5, 0.5).setScale(0.8);

        console.log('BattleScene Created');
    }
}
