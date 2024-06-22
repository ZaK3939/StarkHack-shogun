export class ErrorScreen {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private onRetry: () => void;

    constructor(scene: Phaser.Scene, onRetry: () => void) {
        this.scene = scene;
        this.onRetry = onRetry;
        this.createErrorScreen();
    }

    private createErrorScreen() {
        const { width, height } = this.scene.scale;
        
        const background = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.7);
        background.setOrigin(0);

        const errorTextBg = this.scene.add.rectangle(width / 2, height / 2 - 50, 400, 60, 0xffffff);
        errorTextBg.setOrigin(0.5);
        const errorText = this.scene.add.text(width / 2, height / 2 - 50, "Failed to load data", {
            fontSize: "28px",
            color: "#000000",
            align: "center"
        });
        errorText.setOrigin(0.5);

        const retryButton = this.scene.add.rectangle(width / 2, height / 2 + 50, 120, 50, 0xff0000);
        retryButton.setOrigin(0.5);
        const retryText = this.scene.add.text(width / 2, height / 2 + 50, "Retry", {
            fontSize: "24px",
            color: "#ffffff"
        });
        retryText.setOrigin(0.5);

        retryButton.setInteractive({ useHandCursor: true });
        retryButton.on('pointerdown', () => this.onRetry());
        retryButton.on('pointerover', () => retryButton.setFillStyle(0xdd0000));
        retryButton.on('pointerout', () => retryButton.setFillStyle(0xff0000));

        this.container = this.scene.add.container(0, 0, [background, errorTextBg, errorText, retryButton, retryText]);
        this.container.setDepth(1001);
        this.container.setVisible(false);
    }

    show() {
        this.container.setVisible(true);
    }

    hide() {
        this.container.setVisible(false);
    }
}
