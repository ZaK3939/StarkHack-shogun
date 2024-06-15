import Phaser from 'phaser';

export class SelectItem extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectItem' });
    }

    preload() {
        console.log('Loading SelectItem Background');
        this.load.image('selectItemBackground', 'assets/background/select.png');
        this.load.image('charactorMain', 'assets/charactor/main.png');
        this.load.image('goBattle', 'assets/status/goBattle.png');
        this.load.image('box', 'assets/components/box.png');
        this.load.image('shelf', 'assets/components/shelf.png');
        this.load.image('block', 'assets/components/block.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'selectItemBackground').setOrigin(0.5, 0.5);
        console.log('SelectItem Background Loaded');

        this.add.image(400, height - 100, 'charactorMain').setOrigin(0.5, 0.5);

        
        const goBattleButton = this.add.image(width / 2, 200, 'goBattle').setOrigin(0.5, 0.5).setScale(2/3);
        goBattleButton.setInteractive();
        goBattleButton.on('pointerdown', () => this.scene.start('BattleScene'));

        
        this.add.image(width / 2, height - 100, 'box').setOrigin(0.5, 0.5).setScale(2/3);

        
        this.add.image(width - 320, 400, 'shelf').setOrigin(0.5, 0.5);

        const blockWidth = 70
        const blockHeight = 70;
        const startX = 50;
        const startY = 50;

        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 9; col++) {
                this.add.image(startX + col * blockWidth, startY + row * blockHeight, 'block').setOrigin(0.5, 0.5);
            }
        }

        console.log('SelectItem Scene Created');
    }
}
