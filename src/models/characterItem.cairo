use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, Introspect)]
struct Position {
    x: usize,
    y: usize
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct CharacterItemStorage {
    #[key]
    player: ContractAddress,
    #[key]
    id: usize,
    itemId: usize,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct CharacterItemsStorageCounter {
    #[key]
    player: ContractAddress,
    count: usize,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct CharacterItemInventory {
    #[key]
    player: ContractAddress,
    #[key]
    id: usize,
    itemId: usize,
    position: Position,
    // 0, 90, 180, 270
    rotation: usize,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct CharacterItemsInventoryCounter {
    #[key]
    player: ContractAddress,
    count: usize,
}