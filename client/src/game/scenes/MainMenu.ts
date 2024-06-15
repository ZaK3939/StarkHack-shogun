import Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('topBackground', 'assets/background/top.png');
        this.load.image('startButton', 'assets/logo.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'topBackground').setOrigin(0.5, 0.5);
        
        const startButton = this.add.image(width / 2, height / 2, 'startButton').setOrigin(0.5, 0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => this.scene.start('SelectItem'));

        this.tweens.add({
            targets: startButton,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
    }
}
