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
        systems::{admin::{admin, IAdminDispatcher, IAdminDispatcherTrait}},
        models::{item::{Item, item, ItemsCounter}},
        utils::{test_utils::{add_items}}
    };

    use shogun::systems::admin::admin::ITEMS_COUNTER_ID;
    use shogun::{items};


    #[test]
    #[available_gas(3000000000000000)]
    fn test_add_item() {
        let mut models = array![item::TEST_CLASS_HASH];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admin_system = IAdminDispatcher { contract_address };

        add_items(ref admin_system);

        let ITEMS_COUNTER_ID: felt252 = 'ITEMS_COUNTER_ID';
        let updated_counter = get!(world, ITEMS_COUNTER_ID, (ItemsCounter));
        assert(updated_counter.count == 6, 'total item count mismatch');
        
        let item_three_data = get!(world, 3, (Item));
        assert(item_three_data.id == items::Dagger::id, 'I3 id mismatch');
        assert(item_three_data.name == items::Dagger::name, 'I3 name mismatch');
        assert(item_three_data.itemType == items::Dagger::itemType, 'I3 itemType mismatch');
        assert(item_three_data.shapeType == items::Dagger::shapeType, 'I3 shapeType mismatch');
        assert(item_three_data.width == items::Dagger::width, 'I3 width mismatch');
        assert(item_three_data.height == items::Dagger::height, 'I3 height mismatch');
        assert(item_three_data.price == items::Dagger::price, 'I3 price mismatch');
        assert(item_three_data.damage == items::Dagger::damage, 'I3 damage mismatch');
        assert(item_three_data.chance == items::Dagger::chance, 'I3 chance mismatch');
        assert(item_three_data.cooldown == items::Dagger::cooldown, 'I3 cooldown mismatch');
        assert(item_three_data.rarity == items::Dagger::rarity, 'I3 rarity mismatch');
        assert(item_three_data.armor == items::Dagger::armor, 'I3 armor mismatch');
        assert(
            item_three_data.armorActivation == items::Dagger::armorActivation,
            'I3 armorActivation mismatch'
        );
        assert(item_three_data.regen == items::Dagger::regen, 'I3 regen mismatch');
        assert(
            item_three_data.regenActivation == items::Dagger::regenActivation,
            'I3 regenActivation mismatch'
        );
        assert(item_three_data.reflect == items::Dagger::reflect, 'I3 reflect mismatch');
        assert(
            item_three_data.reflectActivation == items::Dagger::reflectActivation,
            'I3 reflectActivation mismatch'
        );
        assert(item_three_data.poison == items::Dagger::poison, 'I3 poison mismatch');
        assert(
            item_three_data.poisonActivation == items::Dagger::poisonActivation,
            'I3 poisonActivation mismatch'
        );

    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('player not world owner', 'ENTRYPOINT_FAILED'))]
    fn test_add_item_revert_not_world_owner() {
        let alice = starknet::contract_address_const::<0x1337>();

        let mut models = array![item::TEST_CLASS_HASH];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admin_system = IAdminDispatcher { contract_address };

        set_contract_address(alice);

        admin_system
            .add_item(
                items::Backpack1::id,
                items::Backpack1::name,
                items::Backpack1::itemType,
                items::Backpack1::shapeType,
                items::Backpack1::width,
                items::Backpack1::height,
                items::Backpack1::price,
                items::Backpack1::damage,
                items::Backpack1::consumeStamina,
                items::Backpack1::chance,
                items::Backpack1::cooldown,
                items::Backpack1::rarity,
                items::Backpack1::armor,
                items::Backpack1::armorActivation,
                items::Backpack1::regen,
                items::Backpack1::regenActivation,
                items::Backpack1::reflect,
                items::Backpack1::reflectActivation,
                items::Backpack1::poison,
                items::Backpack1::poisonActivation,
            );
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('width not in range', 'ENTRYPOINT_FAILED'))]
    fn test_add_item_revert_width_not_in_range() {
        let mut models = array![item::TEST_CLASS_HASH];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admin_system = IAdminDispatcher { contract_address };

        admin_system
            .add_item(
                items::Backpack1::id,
                items::Backpack1::name,
                items::Backpack1::itemType,
                items::Backpack1::shapeType,
                10,
                items::Backpack1::height,
                items::Backpack1::price,
                items::Backpack1::damage,
                items::Backpack1::consumeStamina,
                items::Backpack1::chance,
                items::Backpack1::cooldown,
                items::Backpack1::rarity,
                items::Backpack1::armor,
                items::Backpack1::armorActivation,
                items::Backpack1::regen,
                items::Backpack1::regenActivation,
                items::Backpack1::reflect,
                items::Backpack1::reflectActivation,
                items::Backpack1::poison,
                items::Backpack1::poisonActivation,
            );
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('height not in range', 'ENTRYPOINT_FAILED'))]
    fn test_add_item_revert_height_not_in_range() {
        let mut models = array![item::TEST_CLASS_HASH];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admin_system = IAdminDispatcher { contract_address };

        admin_system
            .add_item(
                items::Backpack1::id,
                items::Backpack1::name,
                items::Backpack1::itemType,
                items::Backpack1::shapeType,
                items::Backpack1::width,
                10,
                items::Backpack1::price,
                items::Backpack1::damage,
                items::Backpack1::consumeStamina,
                items::Backpack1::chance,
                items::Backpack1::cooldown,
                items::Backpack1::rarity,
                items::Backpack1::armor,
                items::Backpack1::armorActivation,
                items::Backpack1::regen,
                items::Backpack1::regenActivation,
                items::Backpack1::reflect,
                items::Backpack1::reflectActivation,
                items::Backpack1::poison,
                items::Backpack1::poisonActivation,
            );
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('price must be greater than 0', 'ENTRYPOINT_FAILED'))]
    fn test_add_item_revert_price_not_valid() {
        let mut models = array![item::TEST_CLASS_HASH];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admin_system = IAdminDispatcher { contract_address };

        admin_system
            .add_item(
                items::Backpack1::id,
                items::Backpack1::name,
                items::Backpack1::itemType,
                items::Backpack1::shapeType,
                items::Backpack1::width,
                items::Backpack1::height,
                0,
                items::Backpack1::damage,
                items::Backpack1::consumeStamina,
                items::Backpack1::chance,
                items::Backpack1::cooldown,
                items::Backpack1::rarity,
                items::Backpack1::armor,
                items::Backpack1::armorActivation,
                items::Backpack1::regen,
                items::Backpack1::regenActivation,
                items::Backpack1::reflect,
                items::Backpack1::reflectActivation,
                items::Backpack1::poison,
                items::Backpack1::poisonActivation,
            );
    }


    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('rarity not valid', 'ENTRYPOINT_FAILED'))]
    fn test_add_item_revert_invalid_rarity() {
        let mut models = array![item::TEST_CLASS_HASH];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admin_system = IAdminDispatcher { contract_address };

        admin_system
            .add_item(
                items::Backpack1::id,
                items::Backpack1::name,
                items::Backpack1::itemType,
                items::Backpack1::shapeType,
                items::Backpack1::width,
                items::Backpack1::height,
                items::Backpack1::price,
                items::Backpack1::damage,
                items::Backpack1::consumeStamina,
                items::Backpack1::chance,
                items::Backpack1::cooldown,
                7,
                items::Backpack1::armor,
                items::Backpack1::armorActivation,
                items::Backpack1::regen,
                items::Backpack1::regenActivation,
                items::Backpack1::reflect,
                items::Backpack1::reflectActivation,
                items::Backpack1::poison,
                items::Backpack1::poisonActivation,
            );
    }
}
