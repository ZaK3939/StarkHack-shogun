import { AccountInterface } from "starknet";
import { ClientComponents } from "./createClientComponents";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { client }: { client: IWorld },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _contractComponents: ContractComponents,
    // eslint-disable-next-line no-empty-pattern
    {}: ClientComponents
) {
    const spawn = async (account: AccountInterface, name: string) => {
        try {
            const { transaction_hash } = await client.actions.spawn({
                account,
                name,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const rebirth = async (account: AccountInterface, name: string) => {
        try {
            const { transaction_hash } = await client.actions.rebirth({
                account,
                name,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const buyItem = async (account: AccountInterface, itemId: number) => {
        try {
            const { transaction_hash } = await client.actions.buyItem({
                account,
                itemId: itemId,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const sellItem = async (
        account: AccountInterface,
        storageItemId: number
    ) => {
        try {
            const { transaction_hash } = await client.actions.sellItem({
                account,
                storageItemId: storageItemId,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const rerollShop = async (account: AccountInterface) => {
        try {
            const { transaction_hash } = await client.actions.rerollShop({
                account,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const placeItem = async (
        account: AccountInterface,
        storageItemId: number,
        x: number,
        y: number,
        rotation: number
    ) => {
        try {
            const { transaction_hash } = await client.actions.placeItem({
                account,
                storageItemId: storageItemId,
                x,
                y,
                rotation,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const undoPlaceItem = async (
        account: AccountInterface,
        inventoryItemId: number
    ) => {
        try {
            const { transaction_hash } = await client.actions.undoPlaceItem({
                account,
                inventoryItemId: inventoryItemId,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const createDummy = async (account: AccountInterface) => {
        try {
            const { transaction_hash } = await client.actions.createDummy({
                account,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const fight = async (account: AccountInterface) => {
        try {
            const { transaction_hash } = await client.actions.fight({
                account,
            });
            await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
            });
            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    return {
        spawn,
        rebirth,
        buyItem,
        sellItem,
        rerollShop,
        placeItem,
        undoPlaceItem,
        createDummy,
        fight,
    };
}

