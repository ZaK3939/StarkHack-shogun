import Phaser from 'phaser';
import { MainMenu } from './scenes/MainMenu';
import { SelectItem } from './scenes/SelectItem';
import { BattleScene } from './scenes/BattleScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    scene: [MainMenu, SelectItem, BattleScene],
};

const StartGame = (parent: string) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;
