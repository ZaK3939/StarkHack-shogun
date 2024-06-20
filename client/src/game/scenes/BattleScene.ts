import Phaser from "phaser";
import { Account } from "starknet";
import { DojoContextType } from "../../dojo/DojoContext";
import { fetchBattleLogCounters } from "../../graphql/fetchBattleLogCounters";
import { fetchBattleLogs } from "../../graphql/fetchBattleLogs";
import { fetchBattleLogDetail } from "../../graphql/fetchBattleLogDetail";

export class BattleScene extends Phaser.Scene {
    private account: Account;
    private setup: DojoContextType;

    private playerCurrentHP: number;
    private playerMaxHP: number;
    private playerCurrentStamina: number;
    private playerMaxStamina: number;
    private enemyCurrentHP: number;
    private enemyMaxHP: number;
    private enemyCurrentStamina: number;
    private enemyMaxStamina: number;

    private playerHPText: Phaser.GameObjects.Text;
    private enemyHPText: Phaser.GameObjects.Text;
    private playerHPBar: Phaser.GameObjects.Rectangle;
    private enemyHPBar: Phaser.GameObjects.Rectangle;
    private charactorMain: Phaser.GameObjects.Image;
    private charactorEnemy: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "BattleScene" });

        this.resetHP();
    }

    init() {
        this.account = this.game.registry.get("account");
        this.setup = this.game.registry.get("setup");
    }

    preload() {
        console.log("Loading BattleScene Assets");
        this.load.image("battleBackground", "assets/background/battle.png");
        this.load.image("charactorMain", "assets/charactor/main.png");
        this.load.image("charactorEnemy", "assets/charactor/enemy.png");
        this.load.image("block", "assets/components/block.png");
        this.load.image("battleStatus", "assets/components/battleStatus.png");
        this.load.image("won", "assets/status/won.png");
        this.load.image("lose", "assets/status/lose.png");
    }

    create() {
        // Call the fight function
        this.fight();

        this.resetHP(); // Reset HP when the scene is created

        const { width, height } = this.scale;
        this.add
            .image(width / 2, height / 2, "battleBackground")
            .setOrigin(0.5, 0.5);
        console.log("BattleScene Loaded");

        // charactorMain
        this.charactorMain = this.add
            .image(150, height - 150, "charactorMain")
            .setOrigin(0.5, 0.5);

        // charactorEnemy
        this.charactorEnemy = this.add
            .image(width - 150, height - 150, "charactorEnemy")
            .setOrigin(0.5, 0.5);

        // Your items
        const blockWidth = 70;
        const blockHeight = 70;
        const startXLeft = 50;
        const startYLeft = 50;

        const rows = 7;
        const cols = 7;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.add
                    .image(
                        startXLeft + col * blockWidth,
                        startYLeft + row * blockHeight,
                        "block"
                    )
                    .setOrigin(0.5, 0.5);
            }
        }

        // Enemy's items
        const startXRight = width - (blockWidth * 9 + 50) + 200;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.add
                    .image(
                        startXRight + col * blockWidth,
                        startYLeft + row * blockHeight,
                        "block"
                    )
                    .setOrigin(0.5, 0.5);
            }
        }

        // Player's status
        this.add
            .image(width / 2 - 200, height - 140, "battleStatus")
            .setOrigin(0.5, 0.5)
            .setScale(0.8);
        const playerStatus = this.createStatusBars(
            width / 2 - 200,
            height - 200,
            this.playerCurrentHP,
            this.playerMaxHP,
            this.playerCurrentStamina,
            this.playerMaxStamina
        );
        this.playerHPBar = playerStatus.hpBar;
        this.playerHPText = playerStatus.hpText;

        // Enemy's status
        this.add
            .image(width / 2 + 200, height - 140, "battleStatus")
            .setOrigin(0.5, 0.5)
            .setScale(0.8);
        const enemyStatus = this.createStatusBars(
            width / 2 + 200,
            height - 200,
            this.enemyCurrentHP,
            this.enemyMaxHP,
            this.enemyCurrentStamina,
            this.enemyMaxStamina
        );
        this.enemyHPBar = enemyStatus.hpBar;
        this.enemyHPText = enemyStatus.hpText;

        // Set up a timer to decrease HP randomly
        this.time.addEvent({
            delay: 300, // 0.3 second
            callback: this.decreaseHP,
            callbackScope: this,
            loop: true,
        });
    }

    resetHP() {
        this.playerCurrentHP = 35;
        this.playerMaxHP = 35;
        this.playerCurrentStamina = 5;
        this.playerMaxStamina = 5;

        this.enemyCurrentHP = 30;
        this.enemyMaxHP = 30;
        this.enemyCurrentStamina = 4;
        this.enemyMaxStamina = 4;
    }

    createStatusBars(
        x: number,
        y: number,
        currentHP: number,
        maxHP: number,
        currentStamina: number,
        maxStamina: number
    ) {
        const barWidth = 160;
        const barHeight = 20;
        const offsetY = 20;
        const textX = x - 130; // Text alignment x coordinate

        // HP Bar
        this.add
            .rectangle(x - 50, y - offsetY, barWidth, barHeight, 0x000000)
            .setOrigin(0, 0.5);
        const hpBar = this.add
            .rectangle(
                x - 50,
                y - offsetY,
                barWidth * (currentHP / maxHP),
                barHeight,
                0xff0000
            )
            .setOrigin(0, 0.5);
        this.add
            .text(textX, y - offsetY, "HP", {
                fontSize: "16px",
                color: "#ffffff",
            })
            .setOrigin(0, 0.5);
        const hpText = this.add
            .text(x - 50 + barWidth, y - offsetY, `${currentHP}/${maxHP}`, {
                fontSize: "16px",
                color: "#ffffff",
            })
            .setOrigin(1, 0.5);

        // Stamina Bar
        this.add
            .rectangle(x - 50, y + offsetY, barWidth, barHeight, 0x000000)
            .setOrigin(0, 0.5);
        this.add
            .rectangle(
                x - 50,
                y + offsetY,
                barWidth * (currentStamina / maxStamina),
                barHeight,
                0x00b75f
            )
            .setOrigin(0, 0.5);
        this.add
            .text(textX, y + offsetY, "Stamina", {
                fontSize: "16px",
                color: "#ffffff",
            })
            .setOrigin(0, 0.5);
        this.add
            .text(
                x - 50 + barWidth,
                y + offsetY,
                `${currentStamina}/${maxStamina}`,
                { fontSize: "16px", color: "#ffffff" }
            )
            .setOrigin(1, 0.5);

        return { hpBar, hpText };
    }

    decreaseHP() {
        if (this.playerCurrentHP <= 0 || this.enemyCurrentHP <= 0) {
            // Stop decreasing HP if either character's HP is 0
            return;
        }

        if (Math.random() < 0.5) {
            // Decrease player's HP by 7 and animate charactorEnemy
            if (this.playerCurrentHP > 0) {
                this.playerCurrentHP -= 7;
                if (this.playerCurrentHP < 0) this.playerCurrentHP = 0;
                this.playerHPBar.width =
                    160 * (this.playerCurrentHP / this.playerMaxHP);
                this.playerHPText.setText(
                    `${this.playerCurrentHP}/${this.playerMaxHP}`
                );
                this.tweens.add({
                    targets: this.charactorEnemy,
                    angle: -30,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.charactorEnemy.setAngle(0); // Reset angle to 0
                    },
                });
            }
        } else {
            // Decrease enemy's HP by 7 and animate charactorMain
            if (this.enemyCurrentHP > 0) {
                this.enemyCurrentHP -= 7;
                if (this.enemyCurrentHP < 0) this.enemyCurrentHP = 0;
                this.enemyHPBar.width =
                    160 * (this.enemyCurrentHP / this.enemyMaxHP);
                this.enemyHPText.setText(
                    `${this.enemyCurrentHP}/${this.enemyMaxHP}`
                );
                this.tweens.add({
                    targets: this.charactorMain,
                    angle: 30,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.charactorMain.setAngle(0); // Reset angle to 0
                    },
                });
            }
        }

        if (this.playerCurrentHP <= 0) {
            this.showEndScreen("lose", "MainMenu");
        } else if (this.enemyCurrentHP <= 0) {
            this.showEndScreen("won", "SelectItem");
        }
    }

    showEndScreen(status: string, sceneToStart: string) {
        const { width, height } = this.scale;

        // Create a semi-transparent black overlay
        this.add
            .rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
            .setOrigin(0.5, 0.5);

        // Show the appropriate end screen image
        this.add.image(width / 2, height / 2, status).setOrigin(0.5, 0.5);

        // Create the button background
        const buttonBackground = this.add.graphics();
        buttonBackground.fillStyle(0xff0000, 1); // Red color
        buttonBackground.fillRoundedRect(
            width / 2 - 100,
            height / 2 + 342,
            200,
            50,
            5
        ); // Rounded rectangle

        // Add text to the button
        const buttonText = status === "won" ? "Go next stage" : "Go top";
        const button = this.add
            .text(width / 2, height / 2 + 367, buttonText, {
                fontSize: "20px",
                color: "#ffffff",
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // Add hover effect
        button.on("pointerover", () => {
            button.setStyle({ fill: "#ffcc00" }); // Change text color to yellow
        });

        button.on("pointerout", () => {
            button.setStyle({ fill: "#ffffff" }); // Change text color back to white
        });

        // Add button click event
        button.on("pointerdown", () => {
            this.resetHP();
            this.scene.start(sceneToStart);
        });
    }

    async fight() {
        try {
            await this.startFight();
        } catch (error) {
            console.error("Error during fight or creating dummy:", error);
        }
        await this.fetchBattleData();
    }

    async startFight() {
        try {
            await this.setup.client.actions.fight({ account: this.account });

            // wait for torii syncing
            await new Promise((resolve) => setTimeout(resolve, 3000));

            console.log("Fight successful");
        } catch (error) {
            console.error("Error during fight:", error);
            throw error;
        }
    }

    async fetchBattleData() {
        const battleLogCounters = await fetchBattleLogCounters(
            this.account.address
        );
        // if (battleLogCounters === 0) {
        //     error("No battle logs found");
        // }
        console.log("Battle Log Counters:", battleLogCounters);

        const latestBattleLog = await fetchBattleLogs(
            this.account.address,
            battleLogCounters
        );
        console.log("Latest Battle Log:", latestBattleLog);

        const battleLogDetails = await fetchBattleLogDetail(
            this.account.address,
            latestBattleLog.id
        );

        console.log("Battle Log Details:", battleLogDetails);

        // Process the battle data
        // this.processBattleData(latestBattleLog, battleLogDetails);
    }
}

