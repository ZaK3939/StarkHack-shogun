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
    constructor() {
        super({ key: "SelectItem" });
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
        let playerGold = 10;
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

        const statsText = `Address: ${playerAddress}\nGold: ${playerGold}\nVitality: ${playerVitality}\nStamina: ${playerStamina}\nVictories: ${playerVictories}`;
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
                `Address: ${playerAddress}\nGold: ${playerGold}\nVitality: ${playerVitality}\nStamina: ${playerStamina}\nVictories: ${playerVictories}`
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

        const blockWidth = 70;
        const blockHeight = 70;
        const startX = 50;
        const startY = 50;
        const rows = 7;
        const cols = 7;

        const blocks: Phaser.GameObjects.Image[] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const block = this.add
                    .image(
                        startX + col * blockWidth,
                        startY + (rows - row - 1) * blockHeight,
                        "block"
                    )
                    .setOrigin(0.5, 0.5);
                blocks.push(block);
            }
        }

        const itemStartX = width - 300 - 150;
        const itemStartY = 320 - 150;
        const itemSpacingX = 200;
        const itemSpacingY = 180;

        const itemPositions: {
            [key: string]: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
        } = {};
        const itemsOnBlock = new Set<string>();

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

                itemPositions[`item${id}`] = {
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
                    if (item.cost > playerGold) {
                        itemImage.disableInteractive();
                        this.time.delayedCall(100, () => {
                            itemImage.setInteractive({ draggable: true });
                        });
                    }
                });

                itemImage.on("drag", (dragX: number, dragY: number) => {
                    if (item.cost > playerGold) {
                        return;
                    }

                    itemImage.x = dragX;
                    itemImage.y = dragY;

                    highlightedBlocks.forEach((block) => block.clearTint());
                    highlightedBlocks = [];

                    const block = blocks.find(
                        (block) =>
                            Phaser.Math.Distance.Between(
                                block.x,
                                block.y,
                                dragX,
                                dragY
                            ) <
                            blockWidth / 2
                    );
                    if (block) {
                        const { width, height } = item;
                        const startCol = Math.floor(
                            (block.x - startX) / blockWidth
                        );
                        const startRow =
                            rows -
                            Math.floor((block.y - startY) / blockHeight) -
                            1;

                        if (
                            startCol + width <= cols &&
                            startRow - height + 1 >= 0
                        ) {
                            for (let r = 0; r < height; r++) {
                                for (let c = 0; c < width; c++) {
                                    const idx =
                                        (startRow - r) * cols + (startCol + c);
                                    if (blocks[idx]) {
                                        blocks[idx].setTint(0x0000ff);
                                        highlightedBlocks.push(blocks[idx]);
                                    }
                                }
                            }
                        }
                    }
                });

                itemImage.on("dragend", (dragX: number, dragY: number) => {
                    console.log(`Drag ended at: (${dragX}, ${dragY})`);
                    highlightedBlocks.forEach((block) => block.clearTint());
                    highlightedBlocks = [];

                    const droppedBlock = findDroppedBlock(
                        itemImage,
                        blocks,
                        blockWidth
                    );
                    const droppedBox = isDroppedInBox(itemImage, boxImage);

                    if (droppedBlock) {
                        handleDropOnBlock(droppedBlock, item, itemImage, this);
                    } else if (droppedBox) {
                        handleDropInBox(itemImage, boxImage);
                    } else {
                        handleDropOutside(itemImage);
                    }

                    updateStatsText();
                });

                function findDroppedBlock(
                    itemImage: Phaser.GameObjects.Image,
                    blocks: Phaser.GameObjects.Image[],
                    blockWidth: number
                ): Phaser.GameObjects.Image | undefined {
                    return blocks.find(
                        (block) =>
                            Phaser.Math.Distance.Between(
                                block.x,
                                block.y,
                                itemImage.x,
                                itemImage.y
                            ) <
                            blockWidth / 2
                    );
                }

                function isDroppedInBox(
                    itemImage: Phaser.GameObjects.Image,
                    boxImage: Phaser.GameObjects.Image
                ): boolean {
                    return (
                        Phaser.Math.Distance.Between(
                            itemImage.x,
                            itemImage.y,
                            boxImage.x,
                            boxImage.y
                        ) <
                        boxImage.width / 2
                    );
                }

                function handleDropOnBlock(
                    droppedBlock: Phaser.GameObjects.Image,
                    item: ItemDataType,
                    itemImage: Phaser.GameObjects.Image,
                    scene: Phaser.Scene
                ) {
                    console.log(
                        `Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`
                    );
                    const { width, height, cost } = item;
                    const startCol = Math.floor(
                        (droppedBlock.x - startX) / blockWidth
                    );
                    const startRow =
                        rows -
                        Math.floor((droppedBlock.y - startY) / blockHeight) -
                        1;

                    if (
                        canPlaceItem(startCol, startRow, width, height, blocks)
                    ) {
                        const overlappingItems = findOverlappingItems(
                            startCol,
                            startRow,
                            width,
                            height,
                            itemPositions
                        );
                        moveOverlappingItemsToBox(
                            overlappingItems,
                            boxImage,
                            itemPositions,
                            scene
                        );
                        placeItem(
                            itemImage,
                            startCol,
                            startRow,
                            width,
                            height,
                            cost
                        );
                    } else {
                        resetItemPosition(itemImage);
                    }
                }

                function canPlaceItem(
                    startCol: number,
                    startRow: number,
                    width: number,
                    height: number,
                    blocks: Phaser.GameObjects.Image[]
                ): boolean {
                    if (startCol + width > cols || startRow + height > rows)
                        return false;
                    for (let r = 0; r < height; r++) {
                        for (let c = 0; c < width; c++) {
                            const idx = (startRow + r) * cols + (startCol + c);
                            if (!blocks[idx]) return false;
                        }
                    }
                    return true;
                }

                function findOverlappingItems(
                    startCol: number,
                    startRow: number,
                    width: number,
                    height: number,
                    itemPositions: {
                        [key: string]: {
                            x: number;
                            y: number;
                            width: number;
                            height: number;
                        };
                    }
                ): Set<string> {
                    const overlappingItems = new Set<string>();
                    for (let r = 0; r < height; r++) {
                        for (let c = 0; c < width; c++) {
                            const existingItemKey = Object.keys(
                                itemPositions
                            ).find((key) => {
                                const pos = itemPositions[key];
                                const itemStartCol = Math.floor(
                                    (pos.x - startX) / blockWidth
                                );
                                const itemStartRow = Math.floor(
                                    (pos.y - startY) / blockHeight
                                );
                                const itemEndCol = itemStartCol + pos.width - 1;
                                const itemEndRow =
                                    itemStartRow + pos.height - 1;
                                return (
                                    itemStartCol <= startCol + c &&
                                    startCol + c <= itemEndCol &&
                                    itemStartRow <= startRow + r &&
                                    startRow + r <= itemEndRow
                                );
                            });
                            if (existingItemKey)
                                overlappingItems.add(existingItemKey);
                        }
                    }
                    return overlappingItems;
                }

                function moveOverlappingItemsToBox(
                    overlappingItems: Set<string>,
                    boxImage: Phaser.GameObjects.Image,
                    itemPositions: {
                        [key: string]: {
                            x: number;
                            y: number;
                            width: number;
                            height: number;
                        };
                    },
                    scene: Phaser.Scene
                ) {
                    overlappingItems.forEach((existingItemKey) => {
                        const existingItemImage = scene.children.getByName(
                            existingItemKey
                        ) as Phaser.GameObjects.Image;
                        if (existingItemImage) {
                            existingItemImage.x = boxImage.x;
                            existingItemImage.y = boxImage.y;
                            itemPositions[existingItemKey] = {
                                x: boxImage.x,
                                y: boxImage.y,
                                width: itemPositions[existingItemKey].width,
                                height: itemPositions[existingItemKey].height,
                            };
                            if (itemsOnBlock.has(existingItemKey)) {
                                playerGold += item.cost;
                                itemsOnBlock.delete(existingItemKey);
                            }
                        }
                    });
                }

                function placeItem(
                    itemImage: Phaser.GameObjects.Image,
                    startCol: number,
                    startRow: number,
                    width: number,
                    height: number,
                    cost: number
                ) {
                    const centerX =
                        startX +
                        (startCol + width / 2) * blockWidth -
                        blockWidth / 2;
                    const centerY =
                        startY +
                        (startRow + height / 2) * blockHeight -
                        blockHeight / 2;
                    itemImage.x = centerX;
                    itemImage.y = centerY;
                    itemPositions[`item${id}`] = {
                        x: centerX,
                        y: centerY,
                        width,
                        height,
                    };

                    if (!itemsOnBlock.has(`item${id}`)) {
                        playerGold -= cost;
                        itemsOnBlock.add(`item${id}`);
                    }
                }

                function resetItemPosition(
                    itemImage: Phaser.GameObjects.Image
                ) {
                    itemImage.x = itemPositions[`item${id}`].x;
                    itemImage.y = itemPositions[`item${id}`].y;
                }

                function handleDropInBox(
                    itemImage: Phaser.GameObjects.Image,
                    boxImage: Phaser.GameObjects.Image
                ) {
                    console.log(
                        `Dropped in box at: (${boxImage.x}, ${boxImage.y})`
                    );
                    itemImage.x = boxImage.x;
                    itemImage.y = boxImage.y;
                    itemPositions[`item${id}`] = {
                        x: boxImage.x,
                        y: boxImage.y,
                        width: itemPositions[`item${id}`].width,
                        height: itemPositions[`item${id}`].height,
                    };

                    if (itemsOnBlock.has(`item${id}`)) {
                        itemsOnBlock.delete(`item${id}`);
                    }
                }

                function handleDropOutside(
                    itemImage: Phaser.GameObjects.Image
                ) {
                    console.log("Dropped outside any block or box");
                    itemImage.x = itemPositions[`item${id}`].x;
                    itemImage.y = itemPositions[`item${id}`].y;
                }
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
            if (playerGold > 0) {
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
            if (playerGold > 0) {
                playerGold -= 1;
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
}

