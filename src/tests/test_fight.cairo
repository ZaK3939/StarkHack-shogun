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
        systems::{battle::{battle, IBattleDispatcher, IBattleDispatcherTrait}},

        models::backpack::{BackpackGrids}, 
        models::item::{Item, item, ItemsCounter},
        models::character::{Character, character},
        models::characterItem::{
            Position, CharacterItemStorage, CharacterItemsStorageCounter, CharacterItemInventory,
            CharacterItemsInventoryCounter
        },
        models::dummyCharacter::{DummyCharacter, DummyCharacterCounter},
        models::dummyCharacterItem::{DummyCharacterItem, DummyCharacterItemsCounter},
        models::shop::Shop, utils::{test_utils::{add_items}}
    };

    use shogun::systems::actions::actions::ITEMS_COUNTER_ID;

    #[test]
    #[available_gas(3000000000000000)]
    fn test_dummy() {
        let alice = starknet::contract_address_const::<0x0>();
        let mut models = array![];

        let world = spawn_test_world(models);

        let admin_contract_address = world
        .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_contract_address = world
        .deploy_contract('salt2', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let battle_contract_address = world
            .deploy_contract('salt3', battle::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };
        let battle_system = IBattleDispatcher { contract_address: battle_contract_address };

        add_items(ref admin_system);

        actions_system.spawn('alice');
        battle_system.create_dummy();
        battle_system.fight();

        let char = get!(world, (alice), Character);
        let dummyCharCounter = get!(world, (char.wins), DummyCharacterCounter);
        let dummyChar = get!(world, (char.wins, dummyCharCounter.count), DummyCharacter);
        let dummyCharItemsCounter = get!(
            world, (char.wins, dummyCharCounter.count), DummyCharacterItemsCounter
        );

        assert(char.dummied, 'dummied should be true');
        assert(char.wins == 0, 'wins count should be 0');
        assert(dummyCharCounter.count == 1, 'Should be 1');
        assert(dummyChar.level == char.wins, 'Should be equal');
        assert(dummyChar.id == dummyCharCounter.count, '');
        assert(dummyChar.name == 'alice', 'name should be alice');
        assert(dummyChar.health == char.health, 'health should be equal');
        assert(dummyCharItemsCounter.count == 2, 'Should be 2');
    }

    #[test]
    #[available_gas(3000000000000000)]
    fn test_sort_array() {
        let alice = starknet::contract_address_const::<0x0>();
        let mut models = array![];

        let world = spawn_test_world(models);

        let admin_contract_address = world
        .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_contract_address = world
        .deploy_contract('salt2', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let battle_contract_address = world
            .deploy_contract('salt3', battle::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };
        let battle_system = IBattleDispatcher { contract_address: battle_contract_address };

        add_items(ref admin_system);

        actions_system.spawn('alice');

        let mut shop = get!(world, alice, (Shop));
        shop.item1 = 4;
        shop.item2 = 6;
        shop.item3 = 8;
        shop.item4 = 1;
        shop.item5 = 2;
        shop.item6 = 3;
        let mut char = get!(world, alice, (Character));
        char.gold = 100;
        set!(world, (shop, char));

        actions_system.buy_item(4);
        actions_system.place_item(2, 4, 2, 0);
        actions_system.buy_item(6);
        actions_system.place_item(2, 2, 2, 0);
        actions_system.buy_item(8);
        actions_system.place_item(2, 5, 2, 0);
        // actions_system.
        battle_system.create_dummy();
        battle_system.fight();
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('dummy not created', 'ENTRYPOINT_FAILED'))]
    fn test_revert_dummy_not_created() {
        let alice = starknet::contract_address_const::<0x0>();
        let mut models = array![];

        let world = spawn_test_world(models);

        let admin_contract_address = world
        .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_contract_address = world
        .deploy_contract('salt2', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let battle_contract_address = world
            .deploy_contract('salt3', battle::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };
        let battle_system = IBattleDispatcher { contract_address: battle_contract_address };

        add_items(ref admin_system);

        set_contract_address(alice);

        actions_system.spawn('alice');
        battle_system.fight();
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('dummy already created', 'ENTRYPOINT_FAILED'))]
    fn test_revert_dummy_already_created() {
        let alice = starknet::contract_address_const::<0x0>();
        let mut models = array![];

        let world = spawn_test_world(models);

        let admin_contract_address = world
        .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_contract_address = world
        .deploy_contract('salt2', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let battle_contract_address = world
            .deploy_contract('salt3', battle::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };
        let battle_system = IBattleDispatcher { contract_address: battle_contract_address };

        add_items(ref admin_system);

        set_contract_address(alice);

        actions_system.spawn('alice');
        battle_system.create_dummy();
        battle_system.create_dummy();
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('dummy not created', 'ENTRYPOINT_FAILED'))]
    fn test_dummy_not_created() {
        starknet::contract_address_const::<0x0>();
        let mut models = array![];

        let world = spawn_test_world(models);

        let admin_contract_address = world
        .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_contract_address = world
        .deploy_contract('salt2', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let battle_contract_address = world
            .deploy_contract('salt3', battle::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };
        let battle_system = IBattleDispatcher { contract_address: battle_contract_address };

        add_items(ref admin_system);

        actions_system.spawn('alice');

        battle_system.fight();
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('max loss reached', 'ENTRYPOINT_FAILED'))]
    fn test_max_loss_reached() {
        let alice = starknet::contract_address_const::<0x0>();
        let mut models = array![];

        let world = spawn_test_world(models);
        let admin_contract_address = world
        .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let actions_contract_address = world
        .deploy_contract('salt2', actions::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let battle_contract_address = world
            .deploy_contract('salt3', battle::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        
        let mut actions_system = IActionsDispatcher { contract_address: actions_contract_address };
        let mut admin_system = IAdminDispatcher { contract_address: admin_contract_address };
        let battle_system = IBattleDispatcher { contract_address: battle_contract_address };

        add_items(ref admin_system);

        actions_system.spawn('alice');

        let mut char = get!(world, (alice), Character);
        char.loss = 5;
        set!(world, (char));

        battle_system.create_dummy();
        battle_system.fight();
    }
}
