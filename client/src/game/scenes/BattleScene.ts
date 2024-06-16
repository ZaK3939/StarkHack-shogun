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

        // Player's status
        const playerCurrentHP = 35;
        const playerMaxHP = 35;
        const playerCurrentStamina = 5;
        const playerMaxStamina = 5;
        this.add.image(width / 2 - 200, height - 140, 'battleStatus').setOrigin(0.5, 0.5).setScale(0.8);
        this.createStatusBars(width / 2 - 200, height - 200, playerCurrentHP, playerMaxHP, playerCurrentStamina, playerMaxStamina);

        // Enemy's status
        const enemyCurrentHP = 30;
        const enemyMaxHP = 30;
        const enemyCurrentStamina = 4;
        const enemyMaxStamina = 4;
        this.add.image(width / 2 + 200, height - 140, 'battleStatus').setOrigin(0.5, 0.5).setScale(0.8);
        this.createStatusBars(width / 2 + 200, height - 200, enemyCurrentHP, enemyMaxHP, enemyCurrentStamina, enemyMaxStamina);

        console.log('BattleScene Created');
    }

    createStatusBars(x: number, y: number, currentHP: number, maxHP: number, currentStamina: number, maxStamina: number) {
        const barWidth = 160;
        const barHeight = 20;
        const offsetY = 20;
        const textX = x - 130;  // Text alignment x coordinate

        // HP Bar
        this.add.rectangle(x - 50, y - offsetY, barWidth, barHeight, 0x000000).setOrigin(0, 0.5);
        this.add.rectangle(x - 50, y - offsetY, barWidth * (currentHP / maxHP), barHeight, 0xff0000).setOrigin(0, 0.5);
        this.add.text(textX, y - offsetY, 'HP', { fontSize: '16px', color: '#ffffff' }).setOrigin(0, 0.5);
        this.add.text(x - 50 + barWidth, y - offsetY, `${currentHP}/${maxHP}`, { fontSize: '16px', color: '#ffffff' }).setOrigin(1, 0.5);

        // Stamina Bar
        this.add.rectangle(x - 50, y + offsetY, barWidth, barHeight, 0x000000).setOrigin(0, 0.5);
        this.add.rectangle(x - 50, y + offsetY, barWidth * (currentStamina / maxStamina), barHeight, 0x00B75F).setOrigin(0, 0.5);
        this.add.text(textX, y + offsetY, 'Stamina', { fontSize: '16px', color: '#ffffff' }).setOrigin(0, 0.5);
        this.add.text(x - 50 + barWidth, y + offsetY, `${currentStamina}/${maxStamina}`, { fontSize: '16px', color: '#ffffff' }).setOrigin(1, 0.5);
    }
}
