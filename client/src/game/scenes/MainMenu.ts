import Phaser from "phaser";
import { DojoContextType } from "../../dojo/DojoContext";
import { Account } from "starknet";
import { LoadingScreen } from "./LoadingScreen";
import { fetchNameRecord } from "../../graphql/fetchNameRecord";

export class MainMenu extends Phaser.Scene {
    private account: Account;
    private setup: DojoContextType;
    private loadingScreen: LoadingScreen;

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
        this.load.image("sakuraPetal", "assets/sakuraPetal.png");
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

        this.loadingScreen = new LoadingScreen(this, width, height);

        startButton.on("pointerdown", async () => {
            console.log("Start Button Clicked");
            this.loadingScreen.show();

            try {
                const name = "0x616c696362";
                const player = this.account.address;
                const existingNameRecord = await fetchNameRecord(name, player);

                if (existingNameRecord === null) {
                    // in case of not existing name record
                    await this.setup.client.actions.spawn({
                        account: this.account,
                        name: name,
                    });
                    console.log("Spawn successful");
                } else {
                    // 既に同じ名前とプレイヤーの組み合わせが存在する場合
                    console.log("Player already spawned with this name");
                }
            } catch (error) {
                console.log("Error spawning player:", error);
            }

            try {
                await this.setup.client.actions.rerollShop({
                    account: this.account,
                });
                console.log("Reroll successful");
            } catch (error) {
                console.log("rerollShop:", error);
            }

            this.time.delayedCall(3000, () => {
                this.loadingScreen.hide();
                this.scene.start("SelectItem");
            });
        });

        this.tweens.add({
            targets: startButton,
            alpha: 0,
            duration: 1000,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
        });

        // Rebirth button TODO: Only viable if the number of losses is five or more?
        this.add
            .rectangle(width - 100, height - 50, 150, 50, 0xf22f00)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on("pointerdown", async () => {
                console.log("Rebirth Button Clicked");
                try {
                    await this.setup.client.actions.rebirth({
                        account: this.account,
                        name: "0x616c696362",
                    });
                    console.log("Rebirth successful");
                } catch (error) {
                    console.log("Error rebirthing player:", error);
                }
            });

        this.add
            .text(width - 100, height - 50, "Rebirth", {
                fontSize: "20px",
                color: "#ffffff",
            })
            .setOrigin(0.5, 0.5);
    }
}

