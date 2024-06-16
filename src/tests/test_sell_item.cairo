#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use starknet::testing::set_contract_address;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // import test utils
    use shogun::{
        systems::{actions::{actions, IActionsDispatcher, IActionsDispatcherTrait}},
        systems::{admin::{admin, IAdminDispatcher, IAdminDispatcherTrait}},
        models::backpack::{BackpackGrids}, models::item::{Item, item, ItemsCounter},
        models::characterItem::{CharacterItemStorage, CharacterItemsStorageCounter},
        models::character::{Character, character}, models::shop::{Shop, shop},
        utils::{test_utils::{add_items}}
    };

    use shogun::systems::actions::actions::{ITEMS_COUNTER_ID, INIT_GOLD, STORAGE_FLAG};
    use shogun::items;


    #[test]
    #[available_gas(3000000000000000)]
    fn test_sell_item() {
        let alice = starknet::contract_address_const::<0x1337>();

        let mut models = array![];

        let world = spawn_test_world(models);

        let actions_contract_address = world
        .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let admin_contract_address = world
            .deploy_contract('salt2', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };

        add_items(ref admin_system);

        set_contract_address(alice);

        actions_system.spawn('Alice');
        let mut char = get!(world, alice, (Character));
        char.gold = 100;
        set!(world, (char));
        actions_system.reroll_shop();

        // mock shop for testing
        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 4;
        shop_data.item2 = 6;
        shop_data.item3 = 8;
        shop_data.item4 = 9;
        set!(world, (shop_data));

        actions_system.buy_item(4);
        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 2, 'storage count mismatch');

        let prev_char_data = get!(world, alice, (Character));

        actions_system.sell_item(2);
        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 2, 'storage count mismatch');

        let char_data = get!(world, alice, (Character));
        assert(
            char_data.gold == prev_char_data.gold + (items::Sword::price / 2),
            'sell one: gold value mismatch'
        );

        let storageItem = get!(world, (alice, 2), (CharacterItemStorage));
        assert(storageItem.itemId == 0, 'sell one: item id mismatch');

        actions_system.buy_item(6);
        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 2, 'storage count mismatch');

        let prev_char_data = get!(world, alice, (Character));

        actions_system.sell_item(2);
        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 2, 'storage count mismatch');

        let char_data = get!(world, alice, (Character));
        assert(
            char_data.gold == prev_char_data.gold + (items::Shield::price / 2),
            'sell two: gold value mismatch'
        );

        let storageItem = get!(world, (alice, 1), (CharacterItemStorage));
        assert(storageItem.itemId == 0, 'item id mismatch');

        let storageItem = get!(world, (alice, 2), (CharacterItemStorage));
        assert(storageItem.itemId == 0, 'item id mismatch');

        actions_system.buy_item(8);
        actions_system.buy_item(9);

        let mut shop_data = get!(world, alice, (Shop));
        assert(shop_data.item1 == 0, 'shop item mismatch');
        assert(shop_data.item2 == 0, 'shop item mismatch');
        assert(shop_data.item3 == 0, 'shop item mismatch');
        assert(shop_data.item4 == 0, 'shop item mismatch');

        shop_data.item1 = 3;
        shop_data.item2 = 5;
        shop_data.item3 = 7;
        shop_data.item4 = 10;
        set!(world, (shop_data));

        actions_system.buy_item(3);

        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 3, 'storage count mismatch');

        actions_system.sell_item(2);
        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 3, 'storage count mismatch');

        let storageItem = get!(world, (alice, 1), (CharacterItemStorage));
        assert(storageItem.itemId == 9, 'item id mismatch');
        let storageItem = get!(world, (alice, 2), (CharacterItemStorage));
        assert(storageItem.itemId == 0, 'item id mismatch');
        let storageItem = get!(world, (alice, 3), (CharacterItemStorage));
        assert(storageItem.itemId == 3, 'item id mismatch');

        actions_system.buy_item(5);
        let storageItemCount = get!(world, (alice), (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 3, 'storage count mismatch');

        let storageItem = get!(world, (alice, 1), (CharacterItemStorage));
        assert(storageItem.itemId == 9, 'item id mismatch');
        let storageItem = get!(world, (alice, 2), (CharacterItemStorage));
        assert(storageItem.itemId == 5, 'item id mismatch');
        let storageItem = get!(world, (alice, 3), (CharacterItemStorage));
        assert(storageItem.itemId == 3, 'item id mismatch');
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('invalid item_id', 'ENTRYPOINT_FAILED'))]
    fn test_sell_item_with_item_id_0() {
        let alice = starknet::contract_address_const::<0x1337>();

        let mut models = array![];

        let world = spawn_test_world(models);

        let actions_contract_address = world
        .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let admin_contract_address = world
            .deploy_contract('salt2', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };

        add_items(ref admin_system);

        set_contract_address(alice);

        actions_system.spawn('Alice');
        actions_system.reroll_shop();
        // mock shop for testing
        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 4;
        set!(world, (shop_data));

        actions_system.buy_item(4);
        actions_system.sell_item(0);
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('invalid item_id', 'ENTRYPOINT_FAILED'))]
    fn test_sell_item_invalid_item_id() {
        let alice = starknet::contract_address_const::<0x1337>();

        let mut models = array![];

        let world = spawn_test_world(models);
        let actions_contract_address = world
        .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let admin_contract_address = world
            .deploy_contract('salt2', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };

        add_items(ref admin_system);

        set_contract_address(alice);

        actions_system.spawn('Alice');
        actions_system.reroll_shop();
        // mock shop for testing
        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 10;
        set!(world, (shop_data));

        actions_system.buy_item(10);
        actions_system.sell_item(3);
    }
}
