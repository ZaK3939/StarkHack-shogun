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
        models::backpack::{BackpackGrids}, models::item::{Item, item, ItemsCounter},
        models::characterItem::{Position}, utils::{test_utils::{add_items}}
    };

    use shogun::systems::admin::admin::ITEMS_COUNTER_ID;


    #[test]
    #[available_gas(3000000000000000)]
    fn test_edit_item() {
        let mut models = array![];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admins_system = IAdminDispatcher { contract_address };

        add_items(ref admins_system);

        let item_one_new_name: felt252 = 'New Dagger';
        let item_one_new_itemType: felt252 = 2;
        let item_one_new_shapeType: felt252 = 2;
        let item_one_new_width: felt252 = 2;
        let item_one_new_height: felt252 = 1;
        let item_one_new_price: felt252 = 4;
        let item_one_new_damage: felt252 = 2;
        let item_one_new_consumeStamina: felt252 = 2;
        let item_one_new_chance: felt252 = 100;
        let item_one_new_coolTime: felt252 = 5;
        let item_one_new_rarity: felt252 = 2;
        let item_one_new_armor: felt252 = 1;
        let item_one_new_armorType: felt252 = 1;
        let item_one_new_regen: felt252 = 1;
        let item_one_new_regenType: felt252 = 1;
        let item_one_new_reflect: felt252 = 2;
        let item_one_new_reflectType: felt252 = 2;
        let item_one_new_spike: felt252 = 3;
        let item_one_new_spikeType: felt252 = 3;

        admins_system.edit_item(1, 0, item_one_new_name);
        admins_system.edit_item(1, 1, item_one_new_itemType);
        admins_system.edit_item(1, 2, item_one_new_shapeType);
        admins_system.edit_item(1, 3, item_one_new_width);
        admins_system.edit_item(1, 4, item_one_new_height);
        admins_system.edit_item(1, 5, item_one_new_price);
        admins_system.edit_item(1, 6, item_one_new_damage);
        admins_system.edit_item(1, 7, item_one_new_consumeStamina);
        admins_system.edit_item(1, 8, item_one_new_chance);
        admins_system.edit_item(1, 9, item_one_new_coolTime);
        admins_system.edit_item(1, 10, item_one_new_rarity);
        admins_system.edit_item(1, 11, item_one_new_armor);
        admins_system.edit_item(1, 12, item_one_new_armorType);
        admins_system.edit_item(1, 13, item_one_new_regen);
        admins_system.edit_item(1, 14, item_one_new_regenType);
        admins_system.edit_item(1, 15, item_one_new_reflect);
        admins_system.edit_item(1, 16, item_one_new_reflectType);
        admins_system.edit_item(1, 17, item_one_new_spike);
        admins_system.edit_item(1, 18, item_one_new_spikeType);

        let item_one_data = get!(world, 1, (Item));
        assert(item_one_data.name == item_one_new_name, 'I1 name mismatch');
        assert(item_one_data.itemType.into() == item_one_new_itemType, 'I1 itemType mismatch');
        assert(item_one_data.shapeType.into() == item_one_new_shapeType, 'I1 shapeType mismatch');
        assert(item_one_data.width.into() == item_one_new_width, 'I1 width mismatch');
        assert(item_one_data.height.into() == item_one_new_height, 'I1 height mismatch');
        assert(item_one_data.price.into() == item_one_new_price, 'I1 price mismatch');
        assert(item_one_data.damage.into() == item_one_new_damage, 'I1 damage mismatch');
        assert(
            item_one_data.consumeStamina.into() == item_one_new_consumeStamina,
            'I1 consumeStamina mismatch'
        );
        assert(item_one_data.chance.into() == item_one_new_chance, 'I1 chance mismatch');
        assert(item_one_data.coolTime.into() == item_one_new_coolTime, 'I1 coolTime mismatch');
        assert(item_one_data.rarity.into() == item_one_new_rarity, 'I1 rarity mismatch');
        assert(item_one_data.armor.into() == item_one_new_armor, 'I1 armor mismatch');
        assert(
            item_one_data.armorType.into() == item_one_new_armorType,
            'I1 armorType mismatch'
        );
        assert(item_one_data.regen.into() == item_one_new_regen, 'I1 regen mismatch');
        assert(
            item_one_data.regenType.into() == item_one_new_regenType,
            'I1 regenType mismatch'
        );
        assert(item_one_data.reflect.into() == item_one_new_reflect, 'I1 reflect mismatch');
        assert(
            item_one_data.reflectType.into() == item_one_new_reflectType,
            'I1 reflectType mismatch'
        );
        assert(item_one_data.spike.into() == item_one_new_spike, 'I1 spike mismatch');
        assert(
            item_one_data.spikeType.into() == item_one_new_spikeType,
            'I1 spikeType mismatch'
        );
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('player not world owner', 'ENTRYPOINT_FAILED'))]
    fn test_edit_item_revert_not_world_owner() {
        let alice = starknet::contract_address_const::<0x1337>();

        let mut models = array![];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admins_system = IAdminDispatcher { contract_address };

        add_items(ref admins_system);

        set_contract_address(alice);

        admins_system.edit_item(1, 1, 4);
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('new_width not in range', 'ENTRYPOINT_FAILED'))]
    fn test_edit_item_revert_width_not_in_range() {
        let mut models = array![];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admins_system = IAdminDispatcher { contract_address };

        add_items(ref admins_system);

        admins_system.edit_item(1, 3, 10);
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('new_height not in range', 'ENTRYPOINT_FAILED'))]
    fn test_edit_item_revert_height_not_in_range() {
        let mut models = array![];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admins_system = IAdminDispatcher { contract_address };

        add_items(ref admins_system);

        admins_system.edit_item(1, 4, 10);
    }

    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('new_price must be > 0', 'ENTRYPOINT_FAILED'))]
    fn test_edit_item_revert_price_not_valid() {
        let mut models = array![];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admins_system = IAdminDispatcher { contract_address };

        add_items(ref admins_system);

        admins_system.edit_item(1, 5, 0);
    }


    #[test]
    #[available_gas(3000000000000000)]
    #[should_panic(expected: ('new_rarity not valid', 'ENTRYPOINT_FAILED'))]
    fn test_edit_item_revert_invalid_rarity() {
        let mut models = array![];

        let world = spawn_test_world(models);

        let contract_address = world
            .deploy_contract('salt', admin::TEST_CLASS_HASH.try_into().unwrap(), array![].span());
        let mut admins_system = IAdminDispatcher { contract_address };

        add_items(ref admins_system);

        admins_system.edit_item(1, 10, 9);
    }
}
