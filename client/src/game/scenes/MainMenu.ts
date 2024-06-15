import Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('topBackground', 'assets/background/top.png');
    }

    create() {
        const { width, height } = this.scale; // 画面の幅と高さを取得
        this.add.image(width / 2, height / 2, 'topBackground').setOrigin(0.5, 0.5); // 画像を中央に配置
        // ここにトップ画面のUIやボタンを追加
        this.add.text(width / 2, height - 100, 'Start Game', { color: '#0f0' })
            .setOrigin(0.5, 0.5) // テキストを中央に配置
            .setInteractive()
            .on('pointerdown', () => this.scene.start('SelectItem'));
    }
}
