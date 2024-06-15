import Phaser from 'phaser';
import { itemData } from '../data/itemData';

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

        const itemPositions: { [key: string]: { x: number, y: number, width: number, height: number } } = {};

        selectedItems.forEach((item, index) => {
            console.log(`Displaying item: ${item}`);
            const itemDataEntry = itemData[index + 1];
            const x = itemStartX + (index % 2) * itemSpacingX;
            const y = itemStartY + Math.floor(index / 2) * itemSpacingY;
            const itemImage = this.add.image(x, y, item).setOrigin(0.5, 0.5).setScale(0.5).setName(item);
            itemImage.setInteractive({ draggable: true });

            this.input.setDraggable(itemImage);

            itemPositions[item] = { x, y, width: itemDataEntry.width, height: itemDataEntry.height };

            let highlightedBlocks: Phaser.GameObjects.Image[] = [];

            itemImage.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                itemImage.x = dragX;
                itemImage.y = dragY;

                // ハイライトを更新
                highlightedBlocks.forEach(block => block.clearTint());
                highlightedBlocks = [];

                const block = blocks.find(block => Phaser.Math.Distance.Between(block.x, block.y, dragX, dragY) < blockWidth / 2);
                if (block) {
                    const { width, height } = itemDataEntry;
                    const startCol = Math.floor((block.x - startX) / blockWidth);
                    const startRow = Math.floor((block.y - startY) / blockHeight);

                    // ブロックが幅を超える場合はハイライトしない
                    if (startCol + width <= 9 && startRow + height <= 7) {
                        for (let r = 0; r < height; r++) {
                            for (let c = 0; c < width; c++) {
                                const idx = (startRow + r) * 9 + (startCol + c);
                                if (blocks[idx]) {
                                    blocks[idx].setTint(0x0000ff); // 青でハイライト
                                    highlightedBlocks.push(blocks[idx]);
                                }
                            }
                        }
                    }
                }
            });

            itemImage.on('dragend', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                console.log(`Drag ended at: (${dragX}, ${dragY})`);
                highlightedBlocks.forEach(block => block.clearTint());
                highlightedBlocks = [];
            
                const droppedBlock = blocks.find(block => Phaser.Math.Distance.Between(block.x, block.y, itemImage.x, itemImage.y) < blockWidth / 2);
                if (droppedBlock) {
                    console.log(`Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`);
            
                    const { width, height } = itemDataEntry;
                    const startCol = Math.floor((droppedBlock.x - startX) / blockWidth);
                    const startRow = Math.floor((droppedBlock.y - startY) / blockHeight);
            
                    let canPlace = true;
                    if (startCol + width > 9 || startRow + height > 7) {
                        canPlace = false;
                    } else {
                        for (let r = 0; r < height; r++) {
                            for (let c = 0; c < width; c++) {
                                const idx = (startRow + r) * 9 + (startCol + c);
                                if (!blocks[idx]) {
                                    canPlace = false;
                                    break;
                                }
                            }
                            if (!canPlace) break;
                        }
                    }

                    if (canPlace) {
                        // Check for overlapping items
                        const overlappingItems = new Set<string>();
                        for (let r = 0; r < height; r++) {
                            for (let c = 0; c < width; c++) {
                                const existingItemKey = Object.keys(itemPositions).find(key => {
                                    const pos = itemPositions[key];
                                    const itemStartCol = Math.floor((pos.x - startX) / blockWidth);
                                    const itemStartRow = Math.floor((pos.y - startY) / blockHeight);
                                    const itemEndCol = itemStartCol + pos.width - 1;
                                    const itemEndRow = itemStartRow + pos.height - 1;
                                    return itemStartCol <= startCol + c && startCol + c <= itemEndCol &&
                                        itemStartRow <= startRow + r && startRow + r <= itemEndRow;
                                });
                                if (existingItemKey) {
                                    overlappingItems.add(existingItemKey);
                                }
                            }
                        }
            
                        overlappingItems.forEach(existingItemKey => {
                            const existingItemImage = this.children.getByName(existingItemKey) as Phaser.GameObjects.Image;
                            if (existingItemImage) {
                                existingItemImage.x = boxImage.x;
                                existingItemImage.y = boxImage.y;
                                itemPositions[existingItemKey] = { x: boxImage.x, y: boxImage.y, width: itemPositions[existingItemKey].width, height: itemPositions[existingItemKey].height };
                            }
                        });
            
                        // Place the new item
                        itemImage.x = droppedBlock.x;
                        itemImage.y = droppedBlock.y;
                        itemPositions[item] = { x: droppedBlock.x, y: droppedBlock.y, width, height };
                    } else {
                        itemImage.x = itemPositions[item].x;
                        itemImage.y = itemPositions[item].y;
                    }
                } else {
                    console.log('Dropped outside any block');
                    itemImage.x = itemPositions[item].x;
                    itemImage.y = itemPositions[item].y;
                }
            });
            
        });

        console.log('SelectItem Scene Created');
    }
}
