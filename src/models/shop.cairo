use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Shop {
    #[key]
    player: ContractAddress,
    item1: usize,
    item2: usize,
    item3: usize,
    item4: usize,
    item5: usize,
    item6: usize,
}