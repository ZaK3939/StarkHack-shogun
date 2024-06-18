import Phaser from "phaser";
import { MainMenu } from "./scenes/MainMenu";
import { SelectItem } from "./scenes/SelectItem";
import { BattleScene } from "./scenes/BattleScene";
import { DojoContextType } from "../dojo/DojoContext";
import { Account } from "starknet";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: "game-container",
    scene: [MainMenu, SelectItem, BattleScene],
};

const StartGame = (
    parent: string,
    account: Account,
    setup: DojoContextType
) => {
    const game = new Phaser.Game({ ...config, parent });
    game.registry.set("account", account);
    game.registry.set("setup", setup);
    return game;
};

export default StartGame;

