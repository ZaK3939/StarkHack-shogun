import Phaser from "phaser";
import { DojoContextType } from "../../dojo/DojoContext";
import { Account } from "starknet";

export class MainMenu extends Phaser.Scene {
    private account: Account;
    private setup: DojoContextType;
    constructor() {
        super({ key: "MainMenu" });
    }
    init() {
        this.account = this.game.registry.get("account");
        this.setup = this.game.registry.get("setup");
    }

    preload() {
        this.load.image("topBackground", "assets/background/top.png");
        this.load.image("startButton", "assets/logo.png");
    }

    create() {
        const { width, height } = this.scale;
        this.add
            .image(width / 2, height / 2, "topBackground")
            .setOrigin(0.5, 0.5);

        const startButton = this.add
            .image(width / 2, height / 2, "startButton")
            .setOrigin(0.5, 0.5);
        startButton.setInteractive();
        startButton.on("pointerdown", async () => {
            console.log("Start Button Clicked");
            try {
                await this.setup.client.actions.spawn({
                    account: this.account,
                    name: "0x616c696362", // need to change name
                });
                console.log("Spawn successful");
            } catch (error) {
                console.log("Error spawning player:", error);
            }
            await this.setup.client.actions.rerollShop({
                account: this.account,
            });
            console.log("Reroll successful");
            this.scene.start("SelectItem");
        });

        this.tweens.add({
            targets: startButton,
            alpha: 0,
            duration: 1000,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
        });
    }
}

