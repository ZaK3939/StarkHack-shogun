mod systems {
    mod admin;
    mod actions;
    mod battle;
}

mod models {
    mod backpack;
    mod item;
    mod shop;
    mod battleLog;
    mod character;
    mod characterItem;
    mod dummyCharacter;
    mod dummyCharacterItem;
}

mod tests {
    mod test_add_item;
    mod test_edit_item;
    mod test_fight;
    mod test_buy_item;
    mod test_sell_item;
    mod test_place_item;
    mod test_undo_place_item;
    mod test_reroll_shop;
    mod test_rebirth;
    mod test_spawn;
}

mod utils {
    mod random;
    mod test_utils;
}

mod items;