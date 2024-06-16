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

        models::backpack::{BackpackGrids},
        models::item::{Item, item, ItemsCounter},
        models::characterItem::{CharacterItemStorage, CharacterItemsStorageCounter},
        models::character::{Character, character}, models::shop::{Shop, shop},
        utils::{test_utils::{add_items}}
    };

    use shogun::systems::actions::actions::{ITEMS_COUNTER_ID, INIT_GOLD, STORAGE_FLAG};
    use shogun::items;


    #[test]
    #[available_gas(3000000000000000)]
    fn test_buy_item() {
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

        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 5;
        set!(world, (shop_data));

        actions_system.buy_item(5);

        let char_data = get!(world, alice, (Character));
        assert(char_data.gold == INIT_GOLD - items::Item5::price, 'gold value mismatch');

        let storageItemCount = get!(world, alice, (CharacterItemsStorageCounter));
        assert(storageItemCount.count == 2, 'total item count mismatch');

        let storageItem = get!(world, (alice, 2), (CharacterItemStorage));
        assert(storageItem.id == 2, 'id mismatch');
        assert(storageItem.itemId == 5, 'item id mismatch');
    }


    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('Not enough gold', 'ENTRYPOINT_FAILED'))]
    fn test_buy_item_revert_not_enough_gold() {
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

        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 1;
        set!(world, (shop_data));

        let mut player_data = get!(world, alice, (Character));
        player_data.gold = 0;
        set!(world, (player_data));

        actions_system.buy_item(1);
    }


    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('item not on sale', 'ENTRYPOINT_FAILED'))]
    fn test_buy_item_revert_not_on_sale() {
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

        actions_system.buy_item(1);
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('item not on sale', 'ENTRYPOINT_FAILED'))]
    fn test_buy_item_revert_cannot_buy_multiple() {
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

        let mut player_data = get!(world, alice, (Character));
        player_data.gold = 100;
        set!(world, (player_data));

        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 1;
        shop_data.item2 = 2;
        shop_data.item3 = 3;
        shop_data.item4 = 3;
        set!(world, (shop_data));

        actions_system.buy_item(1);
        actions_system.buy_item(1);
    }


    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('invalid item_id', 'ENTRYPOINT_FAILED'))]
    fn test_buy_item_revert_invalid_item_id() {
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

        let mut player_data = get!(world, alice, (Character));
        player_data.gold = 100;
        set!(world, (player_data));

        let mut shop_data = get!(world, alice, (Shop));
        shop_data.item1 = 1;
        shop_data.item2 = 2;
        shop_data.item3 = 3;
        shop_data.item4 = 3;
        set!(world, (shop_data));

        actions_system.buy_item(1);
        actions_system.buy_item(0);
    }
}
