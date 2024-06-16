use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Character {
    #[key]
    player: ContractAddress,
    // must be less than 31 ASCII characters
    name: felt252,
    gold: usize,
    health: usize,
    wins: usize,
    loss: usize,
    dummied: bool,
    rating: usize,
    totalWins: usize,
    totalLoss: usize,
    winStreak: usize,
    birthCount: u32,
    updatedAt: u64
}


#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct NameRecord {
    #[key]
    name: felt252,
    player: ContractAddress,
}