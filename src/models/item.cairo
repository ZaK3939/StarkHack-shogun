// use starknet::ContractAddress;


#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Item {
    #[key]
    id: usize,
    name: felt252,
    // 1 - Weapon, 2 - Start Gear (Buff/Debuff initial Battle), 3 - Gear, 4 - Backpack 5 - Consumable
    itemType: u8,
    // 1 - Square, 2 - T, 3 - Axe, 4 - Banana, 5 - Pan
    shapeType: u8,
    width: usize,
    height: usize,
    price: usize,
    // Base damage
    damage: usize,
    cleansePoison: usize,
    // Accuracy to trigger
    chance: usize,
    // item reuse time
    cooldown: u8,
    rarity: u8,
    // Effects
    // activation 0 - passive, 1 - on start, 2 - on hit, 3 - on cooldown
    armor: usize,
    armorActivation: u8,
    regen: usize,
    regenActivation: u8,
    reflect: usize,
    reflectActivation: u8,
    poison: usize,
    poisonActivation: u8,
}

#[derive(Model, Drop, Serde)]
#[dojo::model]
struct ItemsCounter {
    #[key]
    id: felt252,
    count: usize,
}