// use starknet::ContractAddress;


#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Item {
    #[key]
    id: usize,
    name: felt252,
    // 1 - Weapon, 2 - Gear, 3 - Consumable, 4 - Backpacks
    itemType: u8,
    // 1 - Square, 2 - T, 3 - Axe, 4 - Banana, 5 - Pan
    shapeType: u8,
    width: usize,
    height: usize,
    price: usize,
    // Base damage
    damage: usize,
    consumeStamina: usize,
    // Accuracy to trigger
    chance: usize,
    // item reuse time
    coolTime: u8,
    // 1 - Common, 2 - Rare
    rarity: u8,
    // Effects
    // activation 0 - passive, 1 - on start, 2 - on hit, 3 - on coolTime 4 - on almost dead
    armor: usize,
    armorType: u8,
    regen: usize,
    regenType: u8,
    reflect: usize,
    reflectType: u8,
    spike: usize,
    spikeType: u8,
}

#[derive(Model, Drop, Serde)]
#[dojo::model]
struct ItemsCounter {
    #[key]
    id: felt252,
    count: usize,
}