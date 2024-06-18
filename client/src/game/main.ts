import Phaser from "phaser";
import { MainMenu } from "./scenes/MainMenu";
import { SelectItem } from "./scenes/SelectItem";
import { BattleScene } from "./scenes/BattleScene";
import { BurnerAccount } from "@dojoengine/create-burner";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: "game-container",
    scene: [MainMenu, SelectItem, BattleScene],
};

const StartGame = (parent: string, playerAddress: BurnerAccount) => {
    const game = new Phaser.Game({ ...config, parent });
    game.registry.set("playerAddress", playerAddress);
    return game;
};

export default StartGame;

