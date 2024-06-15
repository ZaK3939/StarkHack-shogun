import Phaser from 'phaser';

export class SelectItem extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectItem' });
    }

    preload() {
        console.log('Loading SelectItem Background');
        this.load.image('selectItemBackground', 'assets/background/select.png');
        this.load.image('charactorMain', 'assets/charactor/main.png');
        this.load.image('goBattle', 'assets/status/goBattle.png');
        this.load.image('box', 'assets/components/box.png');
        this.load.image('shelf', 'assets/components/shelf.png');
        this.load.image('block', 'assets/components/block.png');

        // TODO: 画像の数に調整
        for (let i = 1; i <= 20; i++) {
            this.load.image(`item${i}`, `assets/items/${i}.png`);
        }
    }

    create() {
        const { width, height } = this.scale;
        const background = this.add.image(width / 2, height / 2, 'selectItemBackground');
        background.setOrigin(0.5, 0.5);
        console.log('SelectItem Background Loaded');

        this.add.image(400, height - 100, 'charactorMain').setOrigin(0.5, 0.5);

        const goBattleButton = this.add.image(width / 2, 200, 'goBattle').setOrigin(0.5, 0.5).setScale(2 / 3);
        goBattleButton.setInteractive();
        goBattleButton.on('pointerdown', () => {
            console.log('Go Battle Button Clicked');
            this.scene.start('BattleScene');
        });

        this.add.image(width / 2, height - 100, 'box').setOrigin(0.5, 0.5).setScale(2 / 3);

        this.add.image(width - 320, 400, 'shelf').setOrigin(0.5, 0.5);

        const blockWidth = 70;
        const blockHeight = 70;
        const startX = 50;
        const startY = 50;

        const blocks: Phaser.GameObjects.Image[] = [];
        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 9; col++) {
                const block = this.add.image(startX + col * blockWidth, startY + row * blockHeight, 'block').setOrigin(0.5, 0.5);
                blocks.push(block);
            }
        }

        const selectedItems = Phaser.Utils.Array.Shuffle(Array.from({ length: 20 }, (_, i) => `item${i + 1}`)).slice(0, 6);

        const itemStartX = width - 300 - 150;
        const itemStartY = 320 - 150;
        const itemSpacingX = 200;
        const itemSpacingY = 180;

        selectedItems.forEach((item, index) => {
            console.log(`Displaying item: ${item}`);
            const x = itemStartX + (index % 2) * itemSpacingX;
            const y = itemStartY + Math.floor(index / 2) * itemSpacingY;
            const itemImage = this.add.image(x, y, item).setOrigin(0.5, 0.5).setScale(0.5);
            itemImage.setInteractive({ draggable: true });

            this.input.setDraggable(itemImage);

            let highlightedBlock: Phaser.GameObjects.Image | null = null;

            itemImage.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                itemImage.x = dragX;
                itemImage.y = dragY;

                // ブロックのハイライトを更新
                const block = blocks.find(block => Phaser.Math.Distance.Between(block.x, block.y, dragX, dragY) < blockWidth / 2);
                if (block) {
                    if (highlightedBlock && highlightedBlock !== block) {
                        highlightedBlock.clearTint(); // 元に戻す
                    }
                    block.setTint(0x0000ff); // 青く光らせる
                    highlightedBlock = block;
                } else if (highlightedBlock) {
                    highlightedBlock.clearTint(); // 元に戻す
                    highlightedBlock = null;
                }
            });

            itemImage.on('dragend', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                // ドロップ位置のブロックを特定する
                console.log(`Drag ended at: (${dragX}, ${dragY})`);
                const droppedBlock = blocks.find(block => Phaser.Math.Distance.Between(block.x, block.y, itemImage.x, itemImage.y) < blockWidth / 2);

                if (droppedBlock) {
                    console.log(`Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`);
                    // ドロップ位置にアイテムを配置する
                    itemImage.x = droppedBlock.x;
                    itemImage.y = droppedBlock.y;
                } else {
                    console.log('Dropped outside any block');
                    // 元の位置に戻す
                    itemImage.x = x;
                    itemImage.y = y;
                }

                // ハイライトを元に戻す
                if (highlightedBlock) {
                    highlightedBlock.clearTint();
                    highlightedBlock = null;
                }
            });
        });

        console.log('SelectItem Scene Created');
    }
}
