use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct BattleLog {
    #[key]
    player: ContractAddress,
    #[key]
    id: usize,
    dummyCharLevel: usize,
    dummyCharId: usize,
    // dummy or player
    winner: felt252,
}


#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct BattleLogCounter {
    #[key]
    player: ContractAddress,
    count: usize,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct BattleLogDetail {
    #[key]
    player: ContractAddress,
    #[key]
    battleLogId: usize,
    #[key]
    id: usize,
    whoTriggered: felt252,
    whichItem: usize,
    damageCaused: usize,
    isDodged: bool,
    cleansePoison: usize,
    buffType: felt252,
    regenHP: usize,
    player_armor_stacks: usize,
    player_regen_stacks: usize,
    player_reflect_stacks: usize,
    player_poison_stacks: usize,
    dummy_armor_stacks: usize,
    dummy_regen_stacks: usize,
    dummy_reflect_stacks: usize,
    dummy_poison_stacks: usize,
    }

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct BattleLogDetailCounter {
    #[key]
    player: ContractAddress,
    #[key]
    battleLogId: usize,
    count: usize,
}