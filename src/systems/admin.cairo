use starknet::ContractAddress;

#[dojo::interface]
trait IAdmin {
    fn add_item(
        id: u32,
        name: felt252,
        itemType: u8,
        shapeType: u8,
        width: usize,
        height: usize,
        price: usize,
        damage: usize,
        consumeStamina: usize,
        chance: usize,
        cooldown: u8,
        rarity: u8,
        armor: u32,
        armorActivation: u8,
        regen: u32,
        regenActivation: u8,
        reflect: u32,
        reflectActivation: u8,
        poison: u32,
        poisonActivation: u8,
    );
    fn edit_item(item_id: u32, item_key: felt252, item_value: felt252);
    fn is_world_owner(player: ContractAddress) -> bool;
}


#[dojo::contract]
mod admin {
    use super::IAdmin;
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use shogun::models::{item::{Item, ItemsCounter}};
    use shogun::utils::random::{pseudo_seed, random};

    const GRID_X: usize = 7;
    const GRID_Y: usize = 7;
    const INIT_GOLD: usize = 8;
    const INIT_HEALTH: usize = 25;

    const ITEMS_COUNTER_ID: felt252 = 'ITEMS_COUNTER_ID';

    const STORAGE_FLAG: usize = 999;

    #[abi(embed_v0)]
    impl AdminImpl of IAdmin<ContractState> {
        
        fn add_item(
            world: IWorldDispatcher,
            id: u32,
            name: felt252,
            itemType: u8,
            shapeType: u8,
            width: usize,
            height: usize,
            price: usize,
            damage: usize,
            consumeStamina: usize,
            chance: usize,
            cooldown: u8,
            rarity: u8,
            armor: u32,
            armorActivation: u8,
            regen: u32,
            regenActivation: u8,
            reflect: u32,
            reflectActivation: u8,
            poison: u32,
            poisonActivation: u8,
        ) {
            let player = get_caller_address();

            assert(self.is_world_owner(player), 'player not world owner');

            assert(width > 0 && width <= GRID_X, 'width not in range');
            assert(height > 0 && height <= GRID_Y, 'height not in range');

            assert(price > 0, 'price must be greater than 0');

            assert(
                rarity == 1 || rarity == 2 || rarity == 3 || (rarity == 0 && itemType == 4),
                'rarity not valid'
            );

            // let mut counter = get!(world, ITEMS_COUNTER_ID, ItemsCounter);
           
            set!(world, ItemsCounter { id: ITEMS_COUNTER_ID, count: id });
    

            let item = Item {
                id,
                name,
                itemType,
                shapeType,
                width,
                height,
                price,
                damage,
                consumeStamina,
                chance,
                cooldown,
                rarity,
                armor,
                armorActivation,
                regen,
                regenActivation,
                reflect,
                reflectActivation,
                poison,
                poisonActivation,
            };

            set!(world, (item));
        }
        
        fn edit_item(
            world: IWorldDispatcher, item_id: u32, item_key: felt252, item_value: felt252
        ) {
            let player = get_caller_address();

            assert(self.is_world_owner(player), 'player not world owner');

            let mut item_data = get!(world, item_id, (Item));

            match item_key {
                // name
                0 => {
                    item_data.name = item_value;
                    set!(world, (item_data,));
                },
                // itemType
                1 => {
                    let new_itemType: u8 = item_value.try_into().unwrap();

                    item_data.itemType = new_itemType;
                    set!(world, (item_data,));
                },
                // shapeType
                2 => {
                    let new_shapeType: u8 = item_value.try_into().unwrap();

                    item_data.shapeType = new_shapeType;
                    set!(world, (item_data,));
                },
                // width
                3 => {
                    let new_width: usize = item_value.try_into().unwrap();
                    assert(new_width > 0 && new_width <= GRID_X, 'new_width not in range');

                    item_data.width = new_width;
                    set!(world, (item_data,));
                },
                // height
                4 => {
                    let new_height: usize = item_value.try_into().unwrap();
                    assert(new_height > 0 && new_height <= GRID_Y, 'new_height not in range');

                    item_data.height = new_height;
                    set!(world, (item_data,));
                },
                // price
                5 => {
                    let new_price: usize = item_value.try_into().unwrap();
                    assert(new_price > 0, 'new_price must be > 0');

                    item_data.price = new_price;
                    set!(world, (item_data,));
                },
                // damage
                6 => {
                    let new_damage: usize = item_value.try_into().unwrap();

                    item_data.damage = new_damage;
                    set!(world, (item_data,));
                },
                // consumeStamina
                7 => {
                    let new_consumeStamina: usize = item_value.try_into().unwrap();

                    item_data.consumeStamina = new_consumeStamina;
                    set!(world, (item_data,));
                },
                // chance
                8 => {
                    let new_chance: usize = item_value.try_into().unwrap();

                    item_data.chance = new_chance;
                    set!(world, (item_data,));
                },
                // cooldown
                9 => {
                    let new_cooldown: u8 = item_value.try_into().unwrap();

                    item_data.cooldown = new_cooldown;
                    set!(world, (item_data,));
                },
                // rarity
                10 => {
                    let new_rarity: u8 = item_value.try_into().unwrap();
                    assert(
                        new_rarity == 1 || new_rarity == 2 || new_rarity == 3,
                        'new_rarity not valid'
                    );

                    item_data.rarity = new_rarity;
                    set!(world, (item_data,));
                },
                // armor
                11 => {
                    let new_armor: usize = item_value.try_into().unwrap();

                    item_data.armor = new_armor;
                    set!(world, (item_data,));
                },
                // armorActivation
                12 => {
                    let new_armorActivation: u8 = item_value.try_into().unwrap();

                    item_data.armorActivation = new_armorActivation;
                    set!(world, (item_data,));
                },
                // regen
                13 => {
                    let new_regen: usize = item_value.try_into().unwrap();

                    item_data.regen = new_regen;
                    set!(world, (item_data,));
                },
                // regenActivation
                14 => {
                    let new_regenActivation: u8 = item_value.try_into().unwrap();

                    item_data.regenActivation = new_regenActivation;
                    set!(world, (item_data,));
                },
                // reflect
                15 => {
                    let new_reflect: usize = item_value.try_into().unwrap();

                    item_data.reflect = new_reflect;
                    set!(world, (item_data,));
                },
                // reflectActivation
                16 => {
                    let new_reflectActivation: u8 = item_value.try_into().unwrap();

                    item_data.reflectActivation = new_reflectActivation;
                    set!(world, (item_data,));
                },
                // poison
                17 => {
                    let new_poison: usize = item_value.try_into().unwrap();

                    item_data.poison = new_poison;
                    set!(world, (item_data,));
                },
                // poisonActivation
                18 => {
                    let new_poisonActivation: u8 = item_value.try_into().unwrap();

                    item_data.poisonActivation = new_poisonActivation;
                    set!(world, (item_data,));
                },
                _ => { panic!("Invalid item_key: {}", item_key); }
            }
        }

        fn is_world_owner(world: IWorldDispatcher, player: ContractAddress) -> bool {
            // resource id of world is 0
            let is_owner = world.is_owner(player, 0);

            is_owner
        }
    }
}