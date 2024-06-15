import Phaser from 'phaser';

export class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    preload() {
        this.load.image('battleBackground', 'assets/background/battle.png');
    }

    create() {
        this.add.image(400, 300, 'battleBackground'); // 位置を調整してください
        // ここにバトルシステムのロジックを追加
    }
}
