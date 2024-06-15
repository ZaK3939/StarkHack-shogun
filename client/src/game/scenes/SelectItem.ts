import Phaser from 'phaser';
import { itemData } from '../data/itemData';

export class SelectItem extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectItem' });
    }

    preload() {
        console.log('Loading SelectItem Background');
        this.load.image('selectItemBackground', 'assets/background/select.png');
        this.load.image('player', 'assets/charactor/main.png');
        this.load.image('goBattle', 'assets/status/goBattle.png');
        this.load.image('box', 'assets/components/box.png');
        this.load.image('shelf', 'assets/components/shelf.png');
        this.load.image('block', 'assets/components/block.png');

        for (let i = 1; i <= 47; i++) {
            this.load.image(`item${i}`, `assets/items/${i}.png`);
        }
    }

    create() {
        const { width, height } = this.scale;
        const background = this.add.image(width / 2, height / 2, 'selectItemBackground');
        background.setOrigin(0.5, 0.5);
        console.log('SelectItem Background Loaded');

        this.add.image(400, height - 100, 'player').setOrigin(0.5, 0.5);

        // プレイヤーの情報
        const playerAddress = '0x00...000';
        let playerGold = 10;
        const playerVitality = 10;
        const playerStamina = 5;
        const playerVictories = 10;

        // Create the stats box next to the player image
        const statsBoxX = 200;
        const statsBoxY = height - 200;
        const statsBoxWidth = 150;
        const statsBoxHeight = 150; // Adjusted height to accommodate increased line spacing

        const statsBox = this.add.graphics();
        statsBox.fillStyle(0x000000, 0.5);
        statsBox.fillRect(statsBoxX, statsBoxY, statsBoxWidth, statsBoxHeight);

        const statsText = `Address: ${playerAddress}\nGold: ${playerGold}\nVitality: ${playerVitality}\nStamina: ${playerStamina}\nVictories: ${playerVictories}`;
        const statsTextStyle = {
            fontSize: '14px',
            color: '#ffffff',
            lineSpacing: 10
        };
        const statsTextObject = this.add.text(statsBoxX + 10, statsBoxY + 10, statsText, statsTextStyle);

        const updateStatsText = () => {
            statsTextObject.setText(`Address: ${playerAddress}\nGold: ${playerGold}\nVitality: ${playerVitality}\nStamina: ${playerStamina}\nVictories: ${playerVictories}`);
        };

        const goBattleButton = this.add.image(width / 2, 200, 'goBattle').setOrigin(0.5, 0.5).setScale(2 / 3);
        goBattleButton.setInteractive();

        // Add hover effect
        goBattleButton.on('pointerover', () => {
            goBattleButton.setScale(0.75); // Increase size
            goBattleButton.setTint(0x999999); // Add a tint for blur effect
        });

        goBattleButton.on('pointerout', () => {
            goBattleButton.setScale(2 / 3); // Reset size
            goBattleButton.clearTint(); // Remove the tint
        });

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
        const itemsOnBlock = new Set<string>();

        selectedItems.forEach((item, index) => {
            console.log(`Displaying item: ${item}`);
            const itemDataEntry = itemData[index + 1];
            const x = itemStartX + (index % 2) * itemSpacingX;
            const y = itemStartY + Math.floor(index / 2) * itemSpacingY;
            const itemImage = this.add.image(x, y, item).setOrigin(0.5, 0.5).setScale(0.5).setName(item);
            itemImage.setInteractive({ draggable: true });

            this.input.setDraggable(itemImage);

            // Draw cost circle with gradient and border
            const costCircle = this.add.graphics();
            const circleX = x - 75;
            const circleY = y;
            const radius = 20;

            // Draw the border
            costCircle.lineStyle(2, 0x000000, 1); // Black border
            costCircle.strokeCircle(circleX, circleY, radius);

            // Draw the gradient
            const gradient = costCircle.createGeometryMask();
            const gradientFill = this.add.graphics();
            gradientFill.fillGradientStyle(0xffff00, 0xffd700, 0xffa500, 0xff8c00, 1);
            gradientFill.fillCircle(circleX, circleY, radius);
            costCircle.setMask(gradient);

            // Add cost text
            this.add.text(circleX, circleY, `${itemDataEntry.cost}`, {
                fontSize: '14px',
                color: '#000000'
            }).setOrigin(0.5);

            itemPositions[item] = { x, y, width: itemDataEntry.width, height: itemDataEntry.height };

            let highlightedBlocks: Phaser.GameObjects.Image[] = [];

            itemImage.on('dragstart', () => {
                if (itemDataEntry.cost > playerGold) {
                    itemImage.disableInteractive();
                    this.time.delayedCall(100, () => {
                        itemImage.setInteractive({ draggable: true });
                    });
                }
            });

            itemImage.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                if (itemDataEntry.cost > playerGold) {
                    return;
                }

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
                const droppedBox = Phaser.Math.Distance.Between(itemImage.x, itemImage.y, boxImage.x, boxImage.y) < boxImage.width / 2;

                if (droppedBlock) {
                    console.log(`Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`);
            
                    const { width, height, cost } = itemDataEntry;
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
                                if (itemsOnBlock.has(existingItemKey)) {
                                    playerGold += itemDataEntry.cost; // Re-add cost to playerGold when moving to the box
                                    itemsOnBlock.delete(existingItemKey);
                                }
                            }
                        });

                        // Place the new item
                        itemImage.x = droppedBlock.x;
                        itemImage.y = droppedBlock.y;
                        itemPositions[item] = { x: droppedBlock.x, y: droppedBlock.y, width, height };

                        if (!itemsOnBlock.has(item)) {
                            playerGold -= cost; // Subtract cost from playerGold when placed on block
                            itemsOnBlock.add(item);
                        }
                    } else {
                        itemImage.x = itemPositions[item].x;
                        itemImage.y = itemPositions[item].y;
                    }
                } else if (droppedBox) {
                    console.log(`Dropped in box at: (${boxImage.x}, ${boxImage.y})`);
                    itemImage.x = boxImage.x;
                    itemImage.y = boxImage.y;
                    itemPositions[item] = { x: boxImage.x, y: boxImage.y, width: itemPositions[item].width, height: itemPositions[item].height };

                    if (itemsOnBlock.has(item)) {
                        itemsOnBlock.delete(item);
                    }
                } else {
                    console.log('Dropped outside any block or box');
                    itemImage.x = itemPositions[item].x;
                    itemImage.y = itemPositions[item].y;
                }

                updateStatsText(); // Update the stats text to reflect the new playerGold value
            });

        });

        console.log('SelectItem Scene Created');
    }
}
