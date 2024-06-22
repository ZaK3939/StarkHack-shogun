import Phaser from "phaser";
import { itemData, ItemDataType } from "../data/itemData";
import { Account } from "starknet";
import { DojoContextType } from "../../dojo/DojoContext";
import { fetchCharacterData } from "../../graphql/fetchCharacterData";
import { CharacterData } from "../../graphql/fetchCharacterData";
import { fetchCharacterItemStorage } from "../../graphql/fetchCharacterItemStorage";

export class SelectItem extends Phaser.Scene {
    private account: Account;
    private setup: DojoContextType;
    private characterData: CharacterData;
    private playerGold: number;
    private itemsOnBlock: Set<string>;
    private itemPositions: {
        [key: string]: { x: number; y: number; width: number; height: number };
    };
    private startX: number;
    private startY: number;
    private blockWidth: number;
    private blockHeight: number;
    private rows: number;
    private cols: number;
    private blocks: Phaser.GameObjects.Image[];

    constructor() {
        super({ key: "SelectItem" });
        this.playerGold = 10;
        this.itemsOnBlock = new Set<string>();
        this.itemPositions = {};
        this.startX = 50;
        this.startY = 50;
        this.blockWidth = 70;
        this.blockHeight = 70;
        this.rows = 7;
        this.cols = 7;
        this.blocks = [];
    }

    init() {
        this.account = this.game.registry.get("account");
        this.setup = this.game.registry.get("setup");
    }

    preload() {
        console.log("Loading SelectItem Background");
        this.load.image("selectItemBackground", "assets/background/select.png");
        this.load.image("player", "assets/charactor/main.png");
        this.load.image("goBattle", "assets/status/goBattle.png");
        this.load.image("box", "assets/components/box.png");
        this.load.image("shelf", "assets/components/shelf.png");
        this.load.image("block", "assets/components/block.png");
        this.load.image("reset", "assets/components/reset.png");

        // Load item images based on their ids
        Object.keys(itemData).forEach((id) => {
            this.load.image(`item${id}`, `assets/items/${id}.png`);
        });
    }

    create() {
        this.loadCharacterData();
        const { width, height } = this.scale;
        const background = this.add.image(
            width / 2,
            height / 2,
            "selectItemBackground"
        );
        background.setOrigin(0.5, 0.5);
        console.log("SelectItem Background Loaded");

        this.add.image(400, height - 100, "player").setOrigin(0.5, 0.5);

        // PlayerInfo
        const playerAddress = "0x00...000";
        const playerVitality = 10;
        const playerStamina = 5;
        const playerVictories = 10;

        // Create the stats box next to the player image
        const statsBoxX = 200;
        const statsBoxY = height - 200;
        const statsBoxWidth = 150;
        const statsBoxHeight = 150;

        const statsBox = this.add.graphics();
        statsBox.fillStyle(0x000000, 0.5);
        statsBox.fillRect(statsBoxX, statsBoxY, statsBoxWidth, statsBoxHeight);

        const statsText = `Address: ${playerAddress}\nGold: ${this.playerGold}\nVitality: ${playerVitality}\nStamina: ${playerStamina}\nVictories: ${playerVictories}`;
        const statsTextStyle = {
            fontSize: "14px",
            color: "#ffffff",
            lineSpacing: 10,
        };
        const statsTextObject = this.add.text(
            statsBoxX + 10,
            statsBoxY + 10,
            statsText,
            statsTextStyle
        );

        const updateStatsText = () => {
            statsTextObject.setText(
                `Address: ${playerAddress}\nGold: ${this.playerGold}\nVitality: ${playerVitality}\nStamina: ${playerStamina}\nVictories: ${playerVictories}`
            );
        };

        const goBattleButton = this.add
            .image(width / 2, 200, "goBattle")
            .setOrigin(0.5, 0.5)
            .setScale(2 / 3);
        goBattleButton.setInteractive();

        // Add hover effect
        goBattleButton.on("pointerover", () => {
            goBattleButton.setScale(0.75); // Increase size
            goBattleButton.setTint(0x999999); // Add a tint for blur effect
        });

        goBattleButton.on("pointerout", () => {
            goBattleButton.setScale(2 / 3); // Reset size
            goBattleButton.clearTint(); // Remove the tint
        });

        goBattleButton.on("pointerdown", async () => {
            console.log("Go Battle Button Clicked");
            try {
                if (this.characterData && !this.characterData.dummied) {
                    await this.createDummy();
                    console.log("Create dummy successful");
                }

                this.scene.start("BattleScene");
            } catch (error) {
                console.error("Error creating dummy:", error);
            }
        });

        const boxImage = this.add
            .image(width / 2, height - 100, "box")
            .setOrigin(0.5, 0.5)
            .setScale(2 / 3);

        this.add.image(width - 320, 400, "shelf").setOrigin(0.5, 0.5);

        const blocks: Phaser.GameObjects.Image[] = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const block = this.add
                    .image(
                        this.startX + col * this.blockWidth,
                        this.startY + (this.rows - row - 1) * this.blockHeight,
                        "block"
                    )
                    .setOrigin(0.5, 0.5);
                blocks.push(block);
            }
        }
        this.blocks = blocks;

        const itemStartX = width - 300 - 150;
        const itemStartY = 320 - 150;
        const itemSpacingX = 200;
        const itemSpacingY = 180;

        const hoverTextStyle = {
            fontSize: "18px",
            color: "#000000",
            backgroundColor: "#ffffff",
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            wordWrap: { width: 240 },
        };
        const hoverText = this.add
            .text(width / 2, height / 2, "", hoverTextStyle)
            .setOrigin(0.5)
            .setVisible(false);

        let selectedItems: string[] = [];

        const displayItems = () => {
            // Clear previous items
            this.children.each((child) => {
                if (child.name && child.name.startsWith("item")) {
                    child.destroy();
                }
            });
            selectedItems = Phaser.Utils.Array.Shuffle(
                Object.keys(itemData)
            ).slice(0, 6);

            selectedItems.forEach((id, index) => {
                const item = itemData[id];
                console.log(`Displaying item: ${item.name}`);
                const x = itemStartX + (index % 2) * itemSpacingX;
                const y = itemStartY + Math.floor(index / 2) * itemSpacingY;
                const itemImage = this.add
                    .image(x, y, `item${id}`)
                    .setOrigin(0.5, 0.5)
                    .setScale(0.5)
                    .setName(`item${id}`);
                itemImage.setInteractive({ draggable: true });

                this.input.setDraggable(itemImage);

                // Draw cost circle with gradient and border
                const costCircle = this.add.graphics();
                const circleX = x - 75;
                const circleY = y;
                const radius = 20;

                costCircle.lineStyle(2, 0x000000, 1);
                costCircle.strokeCircle(circleX, circleY, radius);

                const gradient = costCircle.createGeometryMask();
                const gradientFill = this.add.graphics();
                gradientFill.fillGradientStyle(
                    0xffff00,
                    0xffd700,
                    0xffa500,
                    0xff8c00,
                    1
                );
                gradientFill.fillCircle(circleX, circleY, radius);
                costCircle.setMask(gradient);

                this.add
                    .text(circleX, circleY, `${item.cost}`, {
                        fontSize: "14px",
                        color: "#000000",
                    })
                    .setOrigin(0.5);

                this.itemPositions[`item${id}`] = {
                    x,
                    y,
                    width: item.width,
                    height: item.height,
                };

                let highlightedBlocks: Phaser.GameObjects.Image[] = [];

                itemImage.on("pointerover", () => {
                    hoverText
                        .setText(`${item.name}\n${item.effect}`)
                        .setVisible(true);
                });

                itemImage.on("pointerout", () => {
                    hoverText.setVisible(false);
                });

                itemImage.on("dragstart", () => {
                    if (item.cost > this.playerGold) {
                        itemImage.disableInteractive();
                        this.time.delayedCall(100, () => {
                            itemImage.setInteractive({ draggable: true });
                        });
                    }
                });

                itemImage.on("drag", (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                    if (item.cost > this.playerGold) {
                        return;
                    }
                
                    itemImage.x = dragX;
                    itemImage.y = dragY;
                
                    highlightedBlocks.forEach((block) => block.clearTint());
                    highlightedBlocks = [];
                
                    console.log(`Drag position: (${dragX}, ${dragY})`);
                
                    const block = blocks.find((block) => {
                        const distance = Phaser.Math.Distance.Between(block.x, block.y, dragX, dragY);
                        console.log(`Block at (${block.x}, ${block.y}), Distance: ${distance}`);
                        return distance < this.blockWidth; // Extend the distance threshold.
                    });
                
                    console.log("Found block:", block);
                
                    if (block) {
                        const { width, height } = item;
                        const startCol = Math.floor((block.x - this.startX) / this.blockWidth);
                        const startRow = this.rows - Math.floor((block.y - this.startY) / this.blockHeight) - 1;
                
                        console.log(`StartCol: ${startCol}, StartRow: ${startRow}`);
                
                        if (startCol + width <= this.cols && startRow - height + 1 >= 0) {
                            for (let r = 0; r < height; r++) {
                                for (let c = 0; c < width; c++) {
                                    const idx = (startRow - r) * this.cols + (startCol + c);
                                    if (blocks[idx]) {
                                        blocks[idx].setTint(0x0000ff);
                                        highlightedBlocks.push(blocks[idx]);
                                    }
                                }
                            }
                        }
                    }
                });

                itemImage.on(
                    "dragend",
                    async (dragX: number, dragY: number) => {
                        console.log(`Drag ended at: (${dragX}, ${dragY})`);
                        highlightedBlocks.forEach((block) => block.clearTint());
                        highlightedBlocks = [];

                        const droppedBlock = findDroppedBlock(
                            itemImage,
                            blocks,
                            this.blockWidth
                        );
                        const droppedBox = isDroppedInBox(itemImage, boxImage);

                        if (droppedBlock) {
                            await this.handleDropOnBlock(
                                droppedBlock,
                                item,
                                itemImage,
                                boxImage
                            );
                        } else if (droppedBox) {
                            this.handleDropInBox(itemImage, boxImage);
                        } else {
                            this.handleDropOutside(itemImage);
                        }

                        updateStatsText();
                    }
                );

                const findDroppedBlock = (
                    itemImage: Phaser.GameObjects.Image,
                    blocks: Phaser.GameObjects.Image[],
                    blockWidth: number
                ): Phaser.GameObjects.Image | undefined => {
                    return blocks.find((block) => {
                        const distanceX = Math.abs(block.x - itemImage.x);
                        const distanceY = Math.abs(block.y - itemImage.y);
                        return distanceX < blockWidth * 0.75 && distanceY < blockWidth * 0.75;
                    });
                };

                const isDroppedInBox = (
                    itemImage: Phaser.GameObjects.Image,
                    boxImage: Phaser.GameObjects.Image
                ): boolean => {
                    return (
                        Phaser.Math.Distance.Between(
                            itemImage.x,
                            itemImage.y,
                            boxImage.x,
                            boxImage.y
                        ) <
                        boxImage.width / 2
                    );
                };
            });
        };

        displayItems();

        // Add Reset button
        const resetButton = this.add
            .image(width - 150, height - 150, "reset")
            .setOrigin(0.5, 0.5)
            .setScale(0.5);
        resetButton.setInteractive();

        const updateResetButtonState = () => {
            if (this.playerGold > 0) {
                resetButton.setInteractive();
                resetButton.clearTint();
            } else {
                resetButton.disableInteractive();
                resetButton.setTint(0x999999);
            }
        };

        resetButton.on("pointerdown", async () => {
            console.log("Reset Button Clicked");
            await this.setup.client.actions.rerollShop({
                account: this.account,
            });
            console.log("Reroll successful");
            if (this.playerGold > 0) {
                this.playerGold -= 1;
                displayItems();
                updateStatsText();
                updateResetButtonState();
            }
        });

        updateResetButtonState();

        console.log("SelectItem Scene Created");
    }

    async loadCharacterData() {
        try {
            const characterData = await fetchCharacterData(this.account);
            if (characterData !== null) {
                this.characterData = characterData;
                console.log("Character Data:", this.characterData);

                const characterItemStorage = await fetchCharacterItemStorage(
                    this.account.address
                );
                console.log("Character Item Storage:", characterItemStorage);
            } else {
                console.error("Character data is null");
            }
        } catch (error) {
            console.error("Error fetching character data:", error);
        }
    }

    async createDummy() {
        try {
            await this.setup.client.actions.createDummy({
                account: this.account,
            });
            console.log("Create dummy successful");

            // Refresh character data after creating dummy
            await this.loadCharacterData();
        } catch (error) {
            console.error("Error during creating dummy:", error);
        }
    }

    async handleDropOnBlock(
        droppedBlock: Phaser.GameObjects.Image,
        item: ItemDataType,
        itemImage: Phaser.GameObjects.Image,
        boxImage: Phaser.GameObjects.Image
    ) {
        console.log(`Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`);
        const { width, height, cost } = item;
        const startCol = Math.round((droppedBlock.x - this.startX) / this.blockWidth);
        const startRow = Math.round((droppedBlock.y - this.startY) / this.blockHeight);
    
        console.log(`Calculated position: col=${startCol}, row=${startRow}`);
    
        if (this.canPlaceItem(startCol, startRow, width, height)) {
            const overlappingItems = this.findOverlappingItems(startCol, startRow, width, height);
            this.moveOverlappingItemsToBox(overlappingItems, boxImage);
            await this.placeItem(itemImage, startCol, startRow, width, height, cost);
        } else {
            console.log("Cannot place item at this position");
            this.resetItemPosition(itemImage);
        }
    }

    async placeItem(
        itemImage: Phaser.GameObjects.Image,
        startCol: number,
        startRow: number,
        width: number,
        height: number,
        cost: number
    ) {
        // try {
        //     await this.setup.client.actions.placeItem({ 
        //         account: this.account,
        //         storageItemId: 1,
        //         x: 0,
        //         y: 0,
        //         rotation: 0 
        //     });

        //     // wait for torii syncing
        //     await new Promise((resolve) => setTimeout(resolve, 3000));

        //     console.log("@@@PlaceItem successful");
        // } catch (error) {
        //     console.error("@@@Error during PlaceItem:", error);
        //     throw error;
        // }
        const centerX =
            this.startX +
            (startCol + width / 2) * this.blockWidth -
            this.blockWidth / 2;
        const centerY =
            this.startY +
            (startRow + height / 2) * this.blockHeight -
            this.blockHeight / 2;
        itemImage.x = centerX;
        itemImage.y = centerY;
        this.itemPositions[`item${itemImage.name}`] = {
            x: centerX,
            y: centerY,
            width,
            height,
        };

        if (!this.itemsOnBlock.has(`item${itemImage.name}`)) {
            this.playerGold -= cost;
            this.itemsOnBlock.add(`item${itemImage.name}`);
        }
    }

    canPlaceItem(
        startCol: number,
        startRow: number,
        width: number,
        height: number
    ): boolean {
        if (startCol + width > this.cols || startRow + height > this.rows)
            return false;
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const idx = (startRow + r) * this.cols + (startCol + c);
                if (!this.blocks[idx]) return false;
            }
        }
        return true;
    }

    findOverlappingItems(
        startCol: number,
        startRow: number,
        width: number,
        height: number
    ): Set<string> {
        const overlappingItems = new Set<string>();
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const existingItemKey = Object.keys(this.itemPositions).find(
                    (key) => {
                        const pos = this.itemPositions[key];
                        const itemStartCol = Math.floor(
                            (pos.x - this.startX) / this.blockWidth
                        );
                        const itemStartRow = Math.floor(
                            (pos.y - this.startY) / this.blockHeight
                        );
                        const itemEndCol = itemStartCol + pos.width - 1;
                        const itemEndRow = itemStartRow + pos.height - 1;
                        return (
                            itemStartCol <= startCol + c &&
                            startCol + c <= itemEndCol &&
                            itemStartRow <= startRow + r &&
                            startRow + r <= itemEndRow
                        );
                    }
                );
                if (existingItemKey) overlappingItems.add(existingItemKey);
            }
        }
        return overlappingItems;
    }

    moveOverlappingItemsToBox(
        overlappingItems: Set<string>,
        boxImage: Phaser.GameObjects.Image
    ) {
        overlappingItems.forEach((existingItemKey) => {
            const existingItemImage = this.children.getByName(
                existingItemKey
            ) as Phaser.GameObjects.Image;
            if (existingItemImage) {
                existingItemImage.x = boxImage.x;
                existingItemImage.y = boxImage.y;
                this.itemPositions[existingItemKey] = {
                    x: boxImage.x,
                    y: boxImage.y,
                    width: this.itemPositions[existingItemKey].width,
                    height: this.itemPositions[existingItemKey].height,
                };
                if (this.itemsOnBlock.has(existingItemKey)) {
                    this.playerGold +=
                        itemData[existingItemKey.replace("item", "")].cost;
                    this.itemsOnBlock.delete(existingItemKey);
                }
            }
        });
    }

    resetItemPosition(itemImage: Phaser.GameObjects.Image) {
        itemImage.x = this.itemPositions[`item${itemImage.name}`].x;
        itemImage.y = this.itemPositions[`item${itemImage.name}`].y;
    }

    handleDropInBox(
        itemImage: Phaser.GameObjects.Image,
        boxImage: Phaser.GameObjects.Image
    ) {
        console.log(`Dropped in box at: (${boxImage.x}, ${boxImage.y})`);
        itemImage.x = boxImage.x;
        itemImage.y = boxImage.y;
        this.itemPositions[`item${itemImage.name}`] = {
            x: boxImage.x,
            y: boxImage.y,
            width: this.itemPositions[`item${itemImage.name}`].width,
            height: this.itemPositions[`item${itemImage.name}`].height,
        };

        if (this.itemsOnBlock.has(`item${itemImage.name}`)) {
            this.itemsOnBlock.delete(`item${itemImage.name}`);
        }
    }

    handleDropOutside(itemImage: Phaser.GameObjects.Image) {
        console.log("Dropped outside any block or box");
        const itemKey = `${itemImage.name}`;
        if (this.itemPositions[itemKey]) {
            itemImage.x = this.itemPositions[itemKey].x;
            itemImage.y = this.itemPositions[itemKey].y;
        } else {
            console.error(`No position found for item: ${itemKey}`);
        }
    }
}

