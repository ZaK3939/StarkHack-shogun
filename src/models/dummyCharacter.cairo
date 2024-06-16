use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct DummyCharacter {
    #[key]
    level: usize,
    #[key]
    id: u32,
    name: felt252,
    health: usize,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct DummyCharacterCounter {
    #[key]
    level: usize,
    count: usize,
}