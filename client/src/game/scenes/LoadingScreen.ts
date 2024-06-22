import Phaser from "phaser";

export class LoadingScreen extends Phaser.GameObjects.Container {
    private loadingText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, width: number, height: number) {
        super(scene);

        this.setSize(width, height);

        this.loadingText = scene.add.text(width / 2, height / 2, "Please wait a moment before starting...", {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }).setOrigin(0.5, 0.5);

        this.add(this.loadingText);

        for (let i = 0; i < 20; i++) {
            const petal = scene.add.image(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(-50, height),
                "sakuraPetal"
            );
            this.add(petal);
            scene.tweens.add({
                targets: petal,
                y: height + 50,
                x: petal.x + Phaser.Math.Between(-100, 100),
                duration: Phaser.Math.Between(3000, 5000),
                ease: "Linear",
                repeat: -1,
                yoyo: false,
                delay: Phaser.Math.Between(0, 2000),
                onComplete: () => {
                    petal.y = -50;
                    petal.x = Phaser.Math.Between(0, width);
                }
            });
        }

        scene.add.existing(this);
        this.setVisible(false);
    }

    show() {
        this.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }
}
