import Phaser from "phaser";
import { itemData, ItemDataType } from "../data/itemData";
import { Account } from "starknet";
import { DojoContextType } from "../../dojo/DojoContext";
import {
    fetchCharacterData,
    CharacterData,
} from "../../graphql/fetchCharacterData";
import { fetchItemShop, ShopItemData } from "../../graphql/fetchItemShop";
import { fetchCharacterItemStorage } from "../../graphql/fetchCharacterItemStorage";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";
import { fetchCharacterItemInventory } from "../../graphql/fetchCharacterItemInventory";

interface Position {
    x: number;
    y: number;
}
interface Item {
    id: number;
    itemId: number;
    position: Position;
    rotation: number;
}

interface Storage {
    player: string;
    id: number;
    itemId: number;
}

export class SelectItem extends Phaser.Scene {
    private account: Account;
    private setup: DojoContextType;
    private characterData: CharacterData;
    private shopItemData: ShopItemData;
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
    private loadingScreen: LoadingScreen;
    private errorScreen: ErrorScreen;

    private goBattleButton: Phaser.GameObjects.Image;
    private storageItems: Storage[] = [];

    private returnToMainMenu() {
        this.scene.start("MainMenu");
    }

    constructor() {
        super({ key: "SelectItem" });
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

    async create() {
        const { width, height } = this.scale;
        this.loadingScreen = new LoadingScreen(this, width, height);
        this.errorScreen = new ErrorScreen(
            this,
            this.returnToMainMenu.bind(this)
        );
        this.loadingScreen.show();
        try {
            await this.loadCharacterData();
            await this.loadShopData();

            // Fetch inventory items
            const inventoryItemsData = await fetchCharacterItemInventory(
                this.account.address
            );
            const inventoryItems: Item[] = inventoryItemsData.map((item) => ({
                id: item.id,
                itemId: item.itemId,
                position: item.position,
                rotation: item.rotation,
                player: item.player,
            }));
            console.log("Inventory Items:", inventoryItems);
            const storageItemsData = await fetchCharacterItemStorage(
                this.account.address
            );
            this.storageItems = storageItemsData.map((item) => ({
                id: item.id,
                itemId: item.itemId,
                player: item.player,
            }));

            const background = this.add.image(
                width / 2,
                height / 2,
                "selectItemBackground"
            );
            background.setOrigin(0.5, 0.5);
            console.log("SelectItem Background Loaded");

            this.add.image(400, height - 100, "player").setOrigin(0.5, 0.5);

            this.add.image(400, height - 100, "player").setOrigin(0.5, 0.5);

            // PlayerInfo
            const playerAddress = `${this.characterData.player.substring(
                0,
                4
            )}...${this.characterData.player.substring(
                this.characterData.player.length - 4
            )}`;
            const playerGold = this.characterData.gold;
            const playerVitality = this.characterData.health;
            const playerBirthCount = this.characterData.birthCount;
            const playerVictories = this.characterData.wins;
            const playerTotalLoss = this.characterData.loss;

            // Create the stats box next to the player image
            const statsBoxX = 200;
            const statsBoxY = height - 200;
            const statsBoxWidth = 150;
            const statsBoxHeight = 150;

            const statsBox = this.add.graphics();
            statsBox.fillStyle(0x000000, 0.5);
            statsBox.fillRect(
                statsBoxX,
                statsBoxY,
                statsBoxWidth,
                statsBoxHeight
            );

            const statsText = `Address: ${playerAddress}\nGold: ${playerGold}\nVitality: ${playerVitality}\nBirthCount: ${playerBirthCount}\nVictories: ${playerVictories}\nLoss: ${playerTotalLoss}`;
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
                    `Address: ${playerAddress}\nGold: ${playerGold}\nVitality: ${playerVitality}\nBirthCount: ${playerBirthCount}\nVictories: ${playerVictories}`
                );
            };

            this.goBattleButton = this.add
                .image(width / 2, 200, "goBattle")
                .setOrigin(0.5, 0.5)
                .setScale(2 / 3);
            this.goBattleButton.setInteractive();

            // Add hover effect
            this.goBattleButton.on("pointerover", () => {
                this.goBattleButton.setScale(0.75); // Increase size
                this.goBattleButton.setTint(0x999999); // Add a tint for blur effect
            });

            this.goBattleButton.on("pointerout", () => {
                this.goBattleButton.setScale(2 / 3); // Reset size
                this.goBattleButton.clearTint(); // Remove the tint
            });

            this.goBattleButton.on("pointerdown", async () => {
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
            this.displayBoxItems(boxImage);

            const blocks: Phaser.GameObjects.Image[] = [];
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    const block = this.add
                        .image(
                            this.startX + col * this.blockWidth,
                            this.startY + row * this.blockHeight,
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

            await Promise.all([this.loadCharacterData(), this.loadShopData()]);

            const displayItems = () => {
                // Clear previous items
                this.children.each((child) => {
                    if (child.name && child.name.startsWith("item")) {
                        child.destroy();
                    }
                });
                if (!this.shopItemData) {
                    console.error("Shop data is not loaded");
                    return;
                }

                const shopItems = [
                    this.shopItemData.item1,
                    this.shopItemData.item2,
                    this.shopItemData.item3,
                    this.shopItemData.item4,
                    this.shopItemData.item5,
                    this.shopItemData.item6,
                ];

                shopItems.forEach((id, index) => {
                    const item = itemData[id.toString()];
                    if (!item) {
                        console.error(
                            `Item with id ${id} not found in itemData`
                        );
                        return;
                    }

                    console.log(`Displaying item: ${item.name}`);
                    const x = itemStartX + (index % 2) * itemSpacingX;
                    const y = itemStartY + Math.floor(index / 2) * itemSpacingY;
                    const itemImage = this.add
                        .image(x, y, `item${id}`)
                        .setOrigin(0.5, 0.5)
                        .setScale(0.5)
                        .setName(`item${id}`);

                    // Check if the item can be bought
                    const canBuy = item.cost <= this.characterData.gold;

                    if (canBuy) {
                        itemImage.setInteractive({ draggable: true });
                        this.input.setDraggable(itemImage);
                    } else {
                        // Darken the item if it can't be bought
                        itemImage.setTint(0x888888);
                    }

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
                            color: canBuy ? "#000000" : "#888888",
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
                        console.log("Pointer Over");
                        let hoverTextContent = `${item.name}\n${item.effect}`;
                        if (!canBuy) {
                            hoverTextContent += `\n\nNot enough gold to buy (Cost: ${item.cost})`;
                        }
                        hoverText.setText(hoverTextContent).setVisible(true);
                    });

                    itemImage.on("pointerout", () => {
                        hoverText.setVisible(false);
                    });

                    if (canBuy) {
                        itemImage.on("dragstart", () => {
                            if (item.cost > this.playerGold) {
                                itemImage.disableInteractive();
                                this.time.delayedCall(100, () => {
                                    itemImage.setInteractive({
                                        draggable: true,
                                    });
                                });
                            }
                        });

                        itemImage.on(
                            "drag",
                            (
                                pointer: Phaser.Input.Pointer,
                                dragX: number,
                                dragY: number
                            ) => {
                                console.log(pointer);
                                if (item.cost > this.playerGold) {
                                    return;
                                }

                                itemImage.x = dragX;
                                itemImage.y = dragY;

                                highlightedBlocks.forEach((block) =>
                                    block.clearTint()
                                );
                                highlightedBlocks = [];

                                const block = blocks.find((block) => {
                                    const distance =
                                        Phaser.Math.Distance.Between(
                                            block.x,
                                            block.y,
                                            dragX,
                                            dragY
                                        );
                                    return distance < this.blockWidth;
                                });

                                if (block) {
                                    const { width, height } = item;
                                    const startCol = Math.floor(
                                        (block.x - this.startX) /
                                            this.blockWidth
                                    );
                                    const startRow = Math.floor(
                                        (block.y +
                                            this.blockHeight / 2 -
                                            this.startY) /
                                            this.blockHeight
                                    );

                                    if (
                                        this.canPlaceItem(
                                            startCol,
                                            startRow,
                                            width,
                                            height
                                        )
                                    ) {
                                        for (let r = 0; r < height; r++) {
                                            for (let c = 0; c < width; c++) {
                                                const idx =
                                                    (startRow + r) * this.cols +
                                                    (startCol + c);
                                                if (blocks[idx]) {
                                                    blocks[idx].setTint(
                                                        0x0000ff
                                                    );
                                                    highlightedBlocks.push(
                                                        blocks[idx]
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        );

                        itemImage.on(
                            "dragend",
                            async (dragX: number, dragY: number) => {
                                console.log("dragX=", dragX, "dragY=", dragY);
                                highlightedBlocks.forEach((block) =>
                                    block.clearTint()
                                );
                                highlightedBlocks = [];

                                const droppedBlock = findDroppedBlock(
                                    itemImage,
                                    blocks,
                                    this.blockWidth
                                );
                                const droppedBox = isDroppedInBox(
                                    itemImage,
                                    boxImage
                                );

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
                    }
                    const findDroppedBlock = (
                        itemImage: Phaser.GameObjects.Image,
                        blocks: Phaser.GameObjects.Image[],
                        blockWidth: number
                    ): Phaser.GameObjects.Image | undefined => {
                        return blocks.find((block) => {
                            const distanceX = Math.abs(block.x - itemImage.x);
                            const distanceY = Math.abs(block.y - itemImage.y);
                            return (
                                distanceX < blockWidth * 0.75 &&
                                distanceY < blockWidth * 0.75
                            );
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
        } catch (error) {
            console.error("Failed to load necessary data:", error);
            this.errorScreen.show();
        } finally {
            this.loadingScreen.hide();
        }
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
                throw new Error("Character data is null");
            }
        } catch (error) {
            console.error("Error fetching character data:", error);
            throw error;
        }
    }

    async loadShopData() {
        try {
            const shopData = await fetchItemShop(this.account);
            if (shopData !== null) {
                this.shopItemData = shopData;
                console.log("Shop Data:", this.shopItemData);
            } else {
                throw new Error("Shop data is null");
            }
        } catch (error) {
            console.error("Error fetching shop data:", error);
            throw error;
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
            await this.loadShopData();
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
        console.log(
            `Dropped on block at: (${droppedBlock.x}, ${droppedBlock.y})`
        );
        this.goBattleButton.disableInteractive();
        this.goBattleButton.setAlpha(0.5);
        this.loadingScreen.show();
        const { width, height, cost } = item;
        const startCol = Math.round(
            (droppedBlock.x - this.startX) / this.blockWidth
        );

        const bottomEdge = droppedBlock.y + this.blockHeight / 2;
        const startRow =
            this.rows -
            Math.floor(
                (bottomEdge - this.startY + height * 70) / this.blockHeight
            ); // To be fixed

        console.log(
            `Calculated position: col=${startCol}, row=${startRow}, height=${height}`
        );

        if (this.canPlaceItem(startCol, startRow, width, height)) {
            const overlappingItems = this.findOverlappingItems(
                startCol,
                startRow,
                width,
                height
            );
            this.moveOverlappingItemsToBox(overlappingItems, boxImage);
            await this.buyAndPlaceItem(
                itemImage,
                startCol,
                startRow,
                width,
                height,
                cost
            );
            await this.loadCharacterData();
        } else {
            console.log("Cannot place item at this position");
            this.resetItemPosition(itemImage);
        }
        this.goBattleButton.setInteractive();
        this.goBattleButton.setAlpha(1);
        this.loadingScreen.hide();
    }

    async buyAndPlaceItem(
        itemImage: Phaser.GameObjects.Image,
        startCol: number,
        startRow: number,
        width: number,
        height: number,
        cost: number
    ) {
        this.goBattleButton.disableInteractive();
        this.goBattleButton.setAlpha(0.5);
        this.loadingScreen.show();
        try {
            console.log(`Buying item: ${itemImage.name}`);
            await this.setup.client.actions.buyItem({
                account: this.account,
                itemId: parseInt(itemImage.name.replace("item", "")),
            });

            // wait for buyItem to complete and torii syncing
            await new Promise((resolve) => setTimeout(resolve, 5000));

            console.log("@@@BuyItem successful");

            // Fetch the updated character item storage
            const characterItemStorage = await fetchCharacterItemStorage(
                this.account.address
            );
            console.log(
                "Updated Character Item Storage:",
                characterItemStorage
            );

            // Find the newly bought item
            const boughtItemId = parseInt(itemImage.name.replace("item", ""));
            const boughtItem = characterItemStorage.find(
                (item) => item.itemId === boughtItemId
            );

            if (!boughtItem) {
                throw new Error(
                    "Newly bought item not found in character item storage"
                );
            }

            console.log("Bought Item:", boughtItem);

            try {
                console.log(
                    "itemId:",
                    parseInt(itemImage.name.replace("item", "")),
                    "startCol:",
                    startCol,
                    "startRow:",
                    startRow
                );
                await this.setup.client.actions.placeItem({
                    account: this.account,
                    storageItemId: boughtItem.id,
                    x: startCol,
                    y: startRow,
                    rotation: 0,
                });

                // wait for placeItem to complete and torii syncing
                await new Promise((resolve) => setTimeout(resolve, 3000));

                console.log("@@@PlaceItem successful");
            } catch (error) {
                console.error("@@@Error during PlaceItem:", error);
                this.resetItemPosition(itemImage);
                throw error;
            }
        } catch (error) {
            console.error("@@@Error during BuyItem:", error);
            this.resetItemPosition(itemImage);
            throw error;
        } finally {
            this.goBattleButton.setInteractive();
            this.goBattleButton.setAlpha(1);
            this.loadingScreen.hide();
        }

        const centerX =
            this.startX +
            (startCol + width / 2) * this.blockWidth -
            this.blockWidth / 2;
        const centerY =
            this.startY +
            (this.rows - startRow - height / 2) * this.blockHeight -
            this.blockHeight / 2;
        itemImage.x = centerX;
        itemImage.y = centerY;
        this.itemPositions[itemImage.name] = {
            x: centerX,
            y: centerY,
            width,
            height,
        };

        if (!this.itemsOnBlock.has(itemImage.name)) {
            this.playerGold -= cost;
            this.itemsOnBlock.add(itemImage.name);
        }
    }

    async loadDataWithLoading() {
        this.loadingScreen.show();
        this.errorScreen.hide();
        try {
            await this.loadCharacterData();
            await this.loadShopData();
        } catch (error) {
            console.error("Failed to load necessary data:", error);
            this.errorScreen.show();
        } finally {
            this.loadingScreen.hide();
        }
    }

    canPlaceItem(
        startCol: number,
        startRow: number,
        width: number,
        height: number
    ): boolean {
        if (
            startCol < 0 ||
            startRow < 0 ||
            startCol + width > this.cols ||
            startRow + height > this.rows
        ) {
            return false;
        }
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const idx =
                    (this.rows - 1 - (startRow + r)) * this.cols +
                    (startCol + c);
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
                        const itemStartRow =
                            this.rows -
                            Math.floor(
                                (pos.y - this.startY) / this.blockHeight
                            ) -
                            pos.height;
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

    async handleDropInBox(
        itemImage: Phaser.GameObjects.Image,
        boxImage: Phaser.GameObjects.Image
    ) {
        console.log(`Dropped in box at: (${boxImage.x}, ${boxImage.y})`);

        this.goBattleButton.disableInteractive();
        this.goBattleButton.setAlpha(0.5);
        this.loadingScreen.show();
        try {
            await this.setup.client.actions.undoPlaceItem({
                account: this.account,
                inventoryItemId: parseInt(itemImage.name.replace("item", "")),
            });

            // wait for placeItem to complete and torii syncing
            await new Promise((resolve) => setTimeout(resolve, 3000));

            console.log("@@@UnplaceItem successful");

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
        } catch (error) {
            console.error("@@@Error during UnplaceItem:", error);
            this.resetItemPosition(itemImage);
            throw error;
        } finally {
            this.goBattleButton.setInteractive();
            this.goBattleButton.setAlpha(1);
            this.loadingScreen.hide();
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
    displayBoxItems(boxImage: Phaser.GameObjects.Image) {
        const boxItems = this.storageItems.filter(
            (item) => !this.itemsOnBlock.has(`item${item.itemId}`)
        );
        boxItems.forEach((item, index) => {
            this.add
                .image(
                    boxImage.x + (index - boxItems.length / 2 + 0.5) * 40,
                    boxImage.y,
                    `item${item.itemId}`
                )
                .setOrigin(0.5, 0.5)
                .setScale(0.3)
                .setName(`boxItem${item.itemId}`);
        });
    }
}

