#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use starknet::testing::set_contract_address;

    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    use dojo::test_utils::{spawn_test_world, deploy_contract};

    use shogun::{
        systems::{actions::{actions, IActionsDispatcher, IActionsDispatcherTrait}},
        systems::{admin::{admin, IAdminDispatcher, IAdminDispatcherTrait}},

        models::backpack::{BackpackGrids}, 
        models::item::{Item, item, ItemsCounter},
        models::character::{Character, character}, 
        models::shop::{Shop, shop},
        utils::{test_utils::{add_items}}
    };

    use shogun::systems::actions::actions::{ITEMS_COUNTER_ID, INIT_GOLD, STORAGE_FLAG};


    #[test]
    #[available_gas(3000000000000000)]
    fn test_reroll_shop() {
        let owner = starknet::contract_address_const::<0x0>();

        let mut models = array![];

        let world = spawn_test_world(models);

        let actions_contract_address = world
        .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let admin_contract_address = world
            .deploy_contract('salt2', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };

        add_items(ref admin_system);

        actions_system.spawn('Alice');

        let shop = get!(world, owner, (Shop));
        assert(shop.item1 == 0, 'item1 should be 0');

        actions_system.reroll_shop();

        let shop = get!(world, owner, (Shop));
        assert(shop.item1 != 0, 'item1 should not be 0');
        assert(shop.item2 != 0, 'item2 should not be 0');
        assert(shop.item3 != 0, 'item3 should not be 0');
        assert(shop.item4 != 0, 'item4 should not be 0');
        assert(shop.item5 != 0, 'item5 should not be 0');
        assert(shop.item6 != 0, 'item6 should not be 0');
    }

    #[test]
    #[should_panic(expected: ('Not enough gold', 'ENTRYPOINT_FAILED'))]
    #[available_gas(3000000000000000)]
    fn test_reroll_shop_not_enouth_gold() {
        let owner = starknet::contract_address_const::<0x0>();

        let mut models = array![];

        let world = spawn_test_world(models);

        let actions_contract_address = world
        .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let admin_contract_address = world
            .deploy_contract('salt2', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };

        add_items(ref admin_system);

        actions_system.spawn('Alice');

        let mut char = get!(world, owner, (Character));
        char.gold -= INIT_GOLD + 1;
        set!(world, (char));

        let shop = get!(world, owner, (Shop));
        assert(shop.item1 == 0, 'item1 should be 0');

        actions_system.reroll_shop();
    }
}
