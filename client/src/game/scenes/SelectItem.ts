import Phaser from 'phaser';
// TODO: 画像の各使用する枠をImportする

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

        const boxImage = this.add.image(width / 2, height - 100, 'box').setOrigin(0.5, 0.5).setScale(2 / 3);

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

        const itemPositions: { [key: string]: { x: number, y: number } } = {};

        selectedItems.forEach((item, index) => {
            console.log(`Displaying item: ${item}`);
            const x = itemStartX + (index % 2) * itemSpacingX;
            const y = itemStartY + Math.floor(index / 2) * itemSpacingY;
            const itemImage = this.add.image(x, y, item).setOrigin(0.5, 0.5).setScale(0.5).setName(item);
            itemImage.setInteractive({ draggable: true });

            this.input.setDraggable(itemImage);

            itemPositions[item] = { x, y };

            let highlightedBlock: Phaser.GameObjects.Image | null = null;

            itemImage.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                itemImage.x = dragX;
                itemImage.y = dragY;

                // ブロックのハイライトを更新
                const block = blocks.find(block => Phaser.Math.Distance.Between(block.x, block.y, dragX, dragY) < blockWidth / 2);
                if (block) {
                    if (highlightedBlock && highlightedBlock !== block) {
                        highlightedBlock.clearTint();
                    }
                    block.setTint(0x0000ff); // Make it glow blue.
                    highlightedBlock = block;
                } else if (highlightedBlock) {
                    highlightedBlock.clearTint();
                    highlightedBlock = null;
                }
            });

            itemImage.on('dragend', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                // ドロップ位置のブロックを特定する
                console.log(`Drag ended at: (${dragX}, ${dragY})`);
                const droppedBlock = blocks.find(block => Phaser.Math.Distance.Between(block.x, block.y, itemImage.x, itemImage.y) < blockWidth / 2);

                if (droppedBlock) {
                    console.log(`Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`);
                    
                    //  If there are already items in the block, move them to the box
                    const existingItemKey = Object.keys(itemPositions).find(key => itemPositions[key].x === droppedBlock.x && itemPositions[key].y === droppedBlock.y);
                    if (existingItemKey) {
                        const existingItemImage = this.children.getByName(existingItemKey) as Phaser.GameObjects.Image;
                        if (existingItemImage) {
                            existingItemImage.x = boxImage.x;
                            existingItemImage.y = boxImage.y;
                            // Update itemPositions to record that you have moved to the box.
                            itemPositions[existingItemKey] = { x: boxImage.x, y: boxImage.y };
                        }
                    }

                    // Placement of items in drop position.
                    itemImage.x = droppedBlock.x;
                    itemImage.y = droppedBlock.y;
                    itemPositions[item] = { x: droppedBlock.x, y: droppedBlock.y };

                } else {
                    console.log('Dropped outside any block');
                    // return something (that has been moved) to its original position
                    if (itemImage.x === boxImage.x && itemImage.y === boxImage.y) {
                        // Back in the box.
                        itemImage.x = itemPositions[item].x;
                        itemImage.y = itemPositions[item].y;
                    } else {
                        // If dropped outside the box, return to box
                        itemImage.x = boxImage.x;
                        itemImage.y = boxImage.y;
                        itemPositions[item] = { x: boxImage.x, y: boxImage.y };
                    }
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
