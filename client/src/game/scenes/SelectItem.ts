import Phaser from 'phaser';

export class SelectItem extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectItem' });
    }

    preload() {
        console.log('Loading SelectItem Background');
        this.load.image('selectItemBackground', 'assets/background/selectItem.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'selectItemBackground').setOrigin(0.5, 0.5);
        console.log('SelectItem Background Loaded');

        // TODO: Add item selection logic here.
        this.add.text(width / 2, height - 100, 'Select Item', { color: '#0f0' })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('BattleScene'));
    }
}
