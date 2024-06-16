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
        assert(item_three_data.id == items::Item3::id, 'I3 id mismatch');
        assert(item_three_data.name == items::Item3::name, 'I3 name mismatch');
        assert(item_three_data.itemType == items::Item3::itemType, 'I3 itemType mismatch');
        assert(item_three_data.shapeType == items::Item3::shapeType, 'I3 shapeType mismatch');
        assert(item_three_data.width == items::Item3::width, 'I3 width mismatch');
        assert(item_three_data.height == items::Item3::height, 'I3 height mismatch');
        assert(item_three_data.price == items::Item3::price, 'I3 price mismatch');
        assert(item_three_data.damage == items::Item3::damage, 'I3 damage mismatch');
        assert(item_three_data.chance == items::Item3::chance, 'I3 chance mismatch');
        assert(item_three_data.coolTime == items::Item3::coolTime, 'I3 coolTime mismatch');
        assert(item_three_data.rarity == items::Item3::rarity, 'I3 rarity mismatch');
        assert(item_three_data.armor == items::Item3::armor, 'I3 armor mismatch');
        assert(
            item_three_data.armorType == items::Item3::armorType,
            'I3 armorType mismatch'
        );
        assert(item_three_data.regen == items::Item3::regen, 'I3 regen mismatch');
        assert(
            item_three_data.regenType == items::Item3::regenType,
            'I3 regenType mismatch'
        );
        assert(item_three_data.reflect == items::Item3::reflect, 'I3 reflect mismatch');
        assert(
            item_three_data.reflectType == items::Item3::reflectType,
            'I3 reflectType mismatch'
        );
        assert(item_three_data.spike == items::Item3::spike, 'I3 spike mismatch');
        assert(
            item_three_data.spikeType == items::Item3::spikeType,
            'I3 spikeType mismatch'
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
                items::Item1::id,
                items::Item1::name,
                items::Item1::itemType,
                items::Item1::shapeType,
                items::Item1::width,
                items::Item1::height,
                items::Item1::price,
                items::Item1::damage,
                items::Item1::consumeStamina,
                items::Item1::chance,
                items::Item1::coolTime,
                items::Item1::rarity,
                items::Item1::armor,
                items::Item1::armorType,
                items::Item1::regen,
                items::Item1::regenType,
                items::Item1::reflect,
                items::Item1::reflectType,
                items::Item1::spike,
                items::Item1::spikeType,
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
                items::Item1::id,
                items::Item1::name,
                items::Item1::itemType,
                items::Item1::shapeType,
                10,
                items::Item1::height,
                items::Item1::price,
                items::Item1::damage,
                items::Item1::consumeStamina,
                items::Item1::chance,
                items::Item1::coolTime,
                items::Item1::rarity,
                items::Item1::armor,
                items::Item1::armorType,
                items::Item1::regen,
                items::Item1::regenType,
                items::Item1::reflect,
                items::Item1::reflectType,
                items::Item1::spike,
                items::Item1::spikeType,
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
                items::Item1::id,
                items::Item1::name,
                items::Item1::itemType,
                items::Item1::shapeType,
                items::Item1::width,
                10,
                items::Item1::price,
                items::Item1::damage,
                items::Item1::consumeStamina,
                items::Item1::chance,
                items::Item1::coolTime,
                items::Item1::rarity,
                items::Item1::armor,
                items::Item1::armorType,
                items::Item1::regen,
                items::Item1::regenType,
                items::Item1::reflect,
                items::Item1::reflectType,
                items::Item1::spike,
                items::Item1::spikeType,
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
                items::Item1::id,
                items::Item1::name,
                items::Item1::itemType,
                items::Item1::shapeType,
                items::Item1::width,
                items::Item1::height,
                0,
                items::Item1::damage,
                items::Item1::consumeStamina,
                items::Item1::chance,
                items::Item1::coolTime,
                items::Item1::rarity,
                items::Item1::armor,
                items::Item1::armorType,
                items::Item1::regen,
                items::Item1::regenType,
                items::Item1::reflect,
                items::Item1::reflectType,
                items::Item1::spike,
                items::Item1::spikeType,
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
                items::Item1::id,
                items::Item1::name,
                items::Item1::itemType,
                items::Item1::shapeType,
                items::Item1::width,
                items::Item1::height,
                items::Item1::price,
                items::Item1::damage,
                items::Item1::consumeStamina,
                items::Item1::chance,
                items::Item1::coolTime,
                7,
                items::Item1::armor,
                items::Item1::armorType,
                items::Item1::regen,
                items::Item1::regenType,
                items::Item1::reflect,
                items::Item1::reflectType,
                items::Item1::spike,
                items::Item1::spikeType,
            );
    }
}
