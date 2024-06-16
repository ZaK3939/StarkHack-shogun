use starknet::ContractAddress;


#[dojo::interface]
trait IBattle {
    fn fight();
    fn create_dummy();
}


#[dojo::contract]
mod battle {
    use super::IBattle;

    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};

    use shogun::models::{
        character::{Character}, 
        battleLog::{BattleLog, BattleLogCounter, BattleLogDetail},
        characterItem::{Position, CharacterItemInventory,CharacterItemsInventoryCounter},
        item::{Item},
        dummyCharacter::{DummyCharacter, DummyCharacterCounter},
        dummyCharacterItem::{DummyCharacterItem, DummyCharacterItemsCounter}
    };

    use shogun::utils::random::{pseudo_seed, random};

    const EFFECT_ARMOR: felt252 = 'armor';
    const EFFECT_REGEN: felt252 = 'regen';
    const EFFECT_REFLECT: felt252 = 'reflect';
    const EFFECT_POISON: felt252 = 'poison';
    const EFFECT_CLEANSE_POISON: felt252 = 'cleanse_poison';

    #[abi(embed_v0)]
    impl BattleImpl of IBattle<ContractState> {
             
        fn fight(world: IWorldDispatcher) {
            let player = get_caller_address();

            let mut char = get!(world, player, (Character));

            assert(char.dummied == true, 'dummy not created');
            assert(char.loss < 5, 'max loss reached');

            let (seed1, seed2, _, _, _, _) = pseudo_seed();
            let dummyCharCounter = get!(world, char.wins, (DummyCharacterCounter));
            let mut random_index = random(seed1, dummyCharCounter.count) + 1;

            let dummyChar = get!(world, (char.wins, random_index), DummyCharacter);

            // start the battle
            let mut char_health: usize = char.health;
            let char_health_flag: usize = char.health;
            let mut dummy_health: usize = dummyChar.health;
            let dummy_health_flag: usize = dummyChar.health;

            let mut char_items_len: usize = 0;
            let mut dummy_items_len: usize = 0;

            // // =========  buffs/debuffs stacks ========= 
            let mut char_armor: usize = 0;
            let mut dummy_armor: usize = 0;

            let mut char_regen: usize = 0;
            let mut dummy_regen: usize = 0;

            let mut char_reflect: usize = 0;
            let mut dummy_reflect: usize = 0;

            let mut char_poison: usize = 0;
            let mut dummy_poison: usize = 0;

            let mut char_on_hit_items: Array<(felt252, usize, usize)> = ArrayTrait::new();
            let mut dummy_on_hit_items: Array<(felt252, usize, usize)> = ArrayTrait::new();
            // =========  end =========

            // sort items
            let mut items: Felt252Dict<u32> = Default::default();
            let mut item_belongs: Felt252Dict<felt252> = Default::default();
            let mut items_length: usize = 0;

            let inventoryItemsCounter = get!(world, player, (CharacterItemsInventoryCounter));
            let mut inventoryItemCount = inventoryItemsCounter.count;

            loop {
                if inventoryItemCount == 0 {
                    break;
                }
                let charItem = get!(world, (player, inventoryItemCount), (CharacterItemInventory));
                let item = get!(world, charItem.itemId, (Item));
                if item.itemType == 4 {
                    inventoryItemCount -= 1;
                    continue;
                }
                let cooldown = item.cooldown;
                if cooldown > 0 {
                    items.insert(items_length.into(), charItem.itemId);
                    item_belongs.insert(items_length.into(), 'player');

                    items_length += 1;
                    // char_items_len += 1;
                } else if cooldown == 0 {
                    // ====== on start to plus stacks, 100% chance ======
                    // buff
                    if item.armorActivation == 1 {
                        char_armor += item.armor;
                    }
                    if item.regenActivation == 1 {
                        char_regen += item.regen;
                    }
                    if item.reflectActivation == 1 {
                        char_reflect += item.reflect;
                    }
                    // debuff
                    if item.poisonActivation == 1 {
                        dummy_poison += item.poison;
                    }
                // ====== end ======
                }

                // ====== on hit to plus stacks ======
                if item.armorActivation == 2 {
                    char_on_hit_items.append((EFFECT_ARMOR, item.chance, item.armor));
                }
                if item.regenActivation == 2 {
                    char_on_hit_items.append((EFFECT_REGEN, item.chance, item.regen));
                }
                if item.reflectActivation == 2 {
                    char_on_hit_items.append((EFFECT_REFLECT, item.chance, item.reflect));
                }
                if item.poisonActivation == 2 {
                    char_on_hit_items.append((EFFECT_POISON, item.chance, item.poison));
                }
                // ====== end ======

                inventoryItemCount -= 1;
            };
            let char_on_hit_items_span = char_on_hit_items.span();

            let dummyCharItemsCounter = get!(
                world, (char.wins, random_index), (DummyCharacterItemsCounter)
            );
            let mut dummy_item_count = dummyCharItemsCounter.count;
            loop {
                if dummy_item_count == 0 {
                    break;
                }

                let dummy_item = get!(
                    world, (char.wins, random_index, dummy_item_count), (DummyCharacterItem)
                );
                let item = get!(world, dummy_item.itemId, (Item));
                if item.itemType == 4 {
                    dummy_item_count -= 1;
                    continue;
                }
                if item.cooldown > 0 {
                    items.insert(items_length.into(), dummy_item.itemId);
                    item_belongs.insert(items_length.into(), 'dummy');

                    items_length += 1;
                    dummy_items_len += 1;
                } else if item.cooldown == 0 {
                    // ====== on start to plus stacks, 100% chance ======
                    // buff
                    if item.armorActivation == 1 {
                        dummy_armor += item.armor;
                    }
                    if item.regenActivation == 1 {
                        dummy_regen += item.regen;
                    }
                    if item.reflectActivation == 1 {
                        dummy_reflect += item.reflect;
                    }
                    // debuff
                    if item.poisonActivation == 1 {
                        char_poison += item.poison;
                    }
                // ====== end ======
                }

                // ====== on hit to plus stacks ======
                if item.armorActivation == 2 {
                    dummy_on_hit_items.append((EFFECT_ARMOR, item.chance, item.armor));
                }
                if item.regenActivation == 2 {
                    dummy_on_hit_items.append((EFFECT_REGEN, item.chance, item.regen));
                }
                if item.reflectActivation == 2 {
                    dummy_on_hit_items.append((EFFECT_REFLECT, item.chance, item.reflect));
                }
                if item.poisonActivation == 2 {
                    dummy_on_hit_items.append((EFFECT_POISON, item.chance, item.poison));
                }
                // ====== end ======

                dummy_item_count -= 1;
            };
            let dummy_on_hit_items_span = dummy_on_hit_items.span();

            // sorting items based on cooldown in ascending order
            let mut i: usize = 0;
            let mut j: usize = 0;
            loop {
                if i >= items_length {
                    break;
                }
                loop {
                    if j >= (items_length - i - 1) {
                        break;
                    }

                    // fetch respective itemids
                    let items_at_j = items.get(j.into());
                    let items_at_j_belongs = item_belongs.get(j.into());
                    let items_at_j_plus_one = items.get((j + 1).into());
                    let items_at_j_plus_one_belongs = item_belongs.get((j + 1).into());

                    //fetch itemid data
                    let item_data_at_j = get!(world, items_at_j, Item);
                    let item_data_at_j_plus_one = get!(world, items_at_j_plus_one, Item);

                    if item_data_at_j.cooldown > item_data_at_j_plus_one.cooldown {
                        items.insert(j.into(), items_at_j_plus_one);
                        item_belongs.insert(j.into(), items_at_j_plus_one_belongs);
                        items.insert((j + 1).into(), items_at_j);
                        item_belongs.insert((j + 1).into(), items_at_j_belongs);
                    }

                    j += 1;
                };
                j = 0;
                i += 1;
            };

            // // record the battle log
            let mut battleLogCounter = get!(world, player, (BattleLogCounter));
            battleLogCounter.count += 1;
            let battleLogCounterCount = battleLogCounter.count;

            let mut battleLogsCount = 0;

            // battle logic
            let mut seconds = 0;
            let mut winner = '';

            loop {
                seconds += 1;
                if seconds >= 25_u8 {
                    if char_health <= dummy_health {
                        winner = 'dummy';
                    } else {
                        winner = 'player';
                    }
                    break;
                }

                let mut i: usize = 0;
                
                let mut rand = 0;
                let mut v = 0;
                loop {
                    if i == items_length {
                        break;
                    }

                    let curr_item_index = items.get(i.into());
                    let curr_item_belongs = item_belongs.get(i.into());

                    let curr_item_data = get!(world, curr_item_index, (Item));
                    let damage = curr_item_data.damage;
                    let cleansePoison = curr_item_data.cleansePoison;
                    let chance = curr_item_data.chance;
                    let cooldown = curr_item_data.cooldown;

                    // each second is treated as 1 unit of cooldown 
                    if seconds % cooldown == 0 {
                        v += seconds.into() + 17;
                        rand = random(seed2 + v, 100);
                        if rand < chance {
                            if curr_item_belongs == 'player' {
                                // ====== on cooldown to plus stacks, all use the same randomness ======
                                if curr_item_data.armorActivation == 3 {
                                    char_armor += curr_item_data.armor;
                                }
                                if curr_item_data.regenActivation == 3 {
                                    char_regen += curr_item_data.regen;
                                }
                                if curr_item_data.reflectActivation == 3 {
                                    char_reflect += curr_item_data.reflect;
                                }
                                if curr_item_data.poisonActivation == 3 {
                                    dummy_poison += curr_item_data.poison;
                                }
                                // ====== end ======

                                if damage > 0 {
                                    // ====== dummy get hit, to plus stacks ======
                                    let mut on_hit_items_len = dummy_on_hit_items_span.len();
                                    loop {
                                        if on_hit_items_len == 0 {
                                            break;
                                        }

                                        let (
                                            on_hit_item_type, on_hit_item_chance, on_hit_item_stack
                                        ) =
                                            *dummy_on_hit_items_span
                                            .at(on_hit_items_len - 1);

                                        if rand < on_hit_item_chance {
                                            if on_hit_item_type == EFFECT_ARMOR {
                                                dummy_armor += on_hit_item_stack;
                                            } else if on_hit_item_type == EFFECT_REGEN {
                                                dummy_regen += on_hit_item_stack;
                                            } else if on_hit_item_type == EFFECT_REFLECT {
                                                dummy_reflect += on_hit_item_stack;
                                            } else if on_hit_item_type == EFFECT_POISON {
                                                char_poison += on_hit_item_stack;
                                            }
                                        }

                                        on_hit_items_len -= 1;
                                    };
                                    // ====== end ======

                                    // ====== Armor: used to absorb damage ======
                                    let mut damageCaused = 0;
                                    if damage <= dummy_armor {
                                        dummy_armor -= damage;
                                    } else {
                                        damageCaused = damage - dummy_armor;
                                        dummy_armor = 0;
                                    }
                                    // ====== end ======

                                    battleLogsCount += 1;
                                    emit!(
                                        world,
                                        (BattleLogDetail {
                                            player,
                                            battleLogId: battleLogCounterCount,
                                            id: battleLogsCount,
                                            whoTriggered: curr_item_belongs,
                                            whichItem: curr_item_index,
                                            damageCaused: damageCaused,
                                            isDodged: false,
                                            cleansePoison: 0,
                                            buffType: EFFECT_ARMOR,
                                            regenHP: 0,
                                            player_armor_stacks: char_armor,
                                            player_regen_stacks: char_regen,
                                            player_reflect_stacks: char_reflect,
                                            player_poison_stacks: char_poison,
                                            dummy_armor_stacks: dummy_armor,
                                            dummy_regen_stacks: dummy_regen,
                                            dummy_reflect_stacks: dummy_reflect,
                                            dummy_poison_stacks: dummy_poison,
                                        })
                                    );

                                    if dummy_health <= damageCaused {
                                        winner = 'player';
                                        break;
                                    }
                                    dummy_health -= damageCaused;

                                    // ====== Reflect effect: Deals 1 damage per stack when hit with a Melee weapon (up to 100% of the damage). ======
                                    if curr_item_data.itemType == 1 && dummy_reflect > 0 {
                                        damageCaused = 0;
                                        let mut reflect_damage = dummy_reflect;
                                        if reflect_damage > damage {
                                            reflect_damage = damage;
                                        }

                                        // ====== Armor: used to absorb damage ======
                                        if reflect_damage <= char_armor {
                                            char_armor -= reflect_damage;
                                        } else {
                                            damageCaused = reflect_damage - char_armor;
                                            char_armor = 0;
                                        }
                                        // ====== end ======

                                        battleLogsCount += 1;
                                        emit!(
                                            world,
                                            (BattleLogDetail {
                                                player,
                                                battleLogId: battleLogCounterCount,
                                                id: battleLogsCount,
                                                whoTriggered: 'dummy',
                                                whichItem: 0,
                                                damageCaused: damageCaused,
                                                isDodged: false,
                                                cleansePoison: 0,
                                                buffType: EFFECT_REFLECT,
                                                regenHP: 0,
                                                player_armor_stacks: char_armor,
                                                player_regen_stacks: char_regen,
                                                player_reflect_stacks: char_reflect,
                                                player_poison_stacks: char_poison,
                                                dummy_armor_stacks: dummy_armor,
                                                dummy_regen_stacks: dummy_regen,
                                                dummy_reflect_stacks: dummy_reflect,
                                                dummy_poison_stacks: dummy_poison,
                                            })
                                        );

                                        if char_health <= damageCaused {
                                            winner = 'dummy';
                                            break;
                                        }
                                        char_health -= damageCaused;
                                    }
                                // ====== end ======
                                } else {
                                    if cleansePoison > 0 {
                                        if char_poison > cleansePoison {
                                            char_poison -= cleansePoison;
                                        } else {
                                            char_poison = 0;
                                        }
                                        battleLogsCount += 1;
                                        emit!(
                                            world,
                                            (BattleLogDetail {
                                                player,
                                                battleLogId: battleLogCounterCount,
                                                id: battleLogsCount,
                                                whoTriggered: curr_item_belongs,
                                                whichItem: curr_item_index,
                                                damageCaused: 0,
                                                cleansePoison: cleansePoison,
                                                isDodged: false,
                                                buffType: EFFECT_CLEANSE_POISON,
                                                regenHP: 0,
                                                player_armor_stacks: char_armor,
                                                player_regen_stacks: char_regen,
                                                player_reflect_stacks: char_reflect,
                                                player_poison_stacks: char_poison,
                                                dummy_armor_stacks: dummy_armor,
                                                dummy_regen_stacks: dummy_regen,
                                                dummy_reflect_stacks: dummy_reflect,
                                                dummy_poison_stacks: dummy_poison,
                                            })
                                        );
                                    }
                                }
                            } else {
                                // ====== on cooldown to plus stacks, all use the same randomness ======
                                if curr_item_data.armorActivation == 3 {
                                    dummy_armor += curr_item_data.armor;
                                }
                                if curr_item_data.regenActivation == 3 {
                                    dummy_regen += curr_item_data.regen;
                                }
                                if curr_item_data.reflectActivation == 3 {
                                    dummy_reflect += curr_item_data.reflect;
                                }
                                if curr_item_data.poisonActivation == 3 {
                                    char_poison += curr_item_data.poison;
                                }
                                // ====== end ======

                                if damage > 0 {
                                    // ====== dummy get hit, to plus stacks ======
                                    let mut on_hit_items_len = char_on_hit_items_span.len();
                                    loop {
                                        if on_hit_items_len == 0 {
                                            break;
                                        }

                                        let (
                                            on_hit_item_type, on_hit_item_chance, on_hit_item_stack
                                        ) =
                                            *char_on_hit_items_span
                                            .at(on_hit_items_len - 1);

                                        if rand < on_hit_item_chance {
                                            if on_hit_item_type == EFFECT_ARMOR {
                                                char_armor += on_hit_item_stack;
                                            } else if on_hit_item_type == EFFECT_REGEN {
                                                char_regen += on_hit_item_stack;
                                            } else if on_hit_item_type == EFFECT_REFLECT {
                                                char_reflect += on_hit_item_stack;
                                            } else if on_hit_item_type == EFFECT_POISON {
                                                dummy_poison += on_hit_item_stack;
                                            }
                                        }

                                        on_hit_items_len -= 1;
                                    };
                                    // ====== end ======

                                    // ====== Armor: used to absorb damage ======
                                    let mut damageCaused = 0;
                                    if damage <= char_armor {
                                        char_armor -= damage;
                                    } else {
                                        damageCaused = damage - char_armor;
                                        char_armor = 0;
                                    }
                                    // ====== end ======

                                    battleLogsCount += 1;
                                    emit!(
                                        world,
                                        (BattleLogDetail {
                                            player,
                                            battleLogId: battleLogCounterCount,
                                            id: battleLogsCount,
                                            whoTriggered: curr_item_belongs,
                                            whichItem: curr_item_index,
                                            damageCaused: damageCaused,
                                            isDodged: false,
                                            cleansePoison: 0,
                                            buffType: EFFECT_ARMOR,
                                            regenHP: 0,
                                            player_armor_stacks: char_armor,
                                            player_regen_stacks: char_regen,
                                            player_reflect_stacks: char_reflect,
                                            player_poison_stacks: char_poison,
                                            dummy_armor_stacks: dummy_armor,
                                            dummy_regen_stacks: dummy_regen,
                                            dummy_reflect_stacks: dummy_reflect,
                                            dummy_poison_stacks: dummy_poison,
                                        })
                                    );

                                    if char_health <= damageCaused {
                                        winner = 'dummy';
                                        break;
                                    }
                                    char_health -= damageCaused;

                                    // ====== Reflect effect: Deals 1 damage per stack when hit with a Melee weapon (up to 100% of the damage). ======
                                    if curr_item_data.itemType == 1 && char_reflect > 0 {
                                        damageCaused = 0;
                                        let mut reflect_damage = char_reflect;
                                        if reflect_damage > damage {
                                            reflect_damage = damage;
                                        }

                                        // ====== Armor: used to absorb damage ======
                                        if reflect_damage <= dummy_armor {
                                            dummy_armor -= reflect_damage;
                                        } else {
                                            damageCaused = reflect_damage - dummy_armor;
                                            dummy_armor = 0;
                                        }
                                        // ====== end ======

                                        battleLogsCount += 1;
                                        emit!(
                                            world,
                                            (BattleLogDetail {
                                                player,
                                                battleLogId: battleLogCounterCount,
                                                id: battleLogsCount,
                                                whoTriggered: 'player',
                                                whichItem: 0,
                                                damageCaused: damageCaused,
                                                isDodged: false,
                                                cleansePoison: 0,
                                                buffType: EFFECT_REFLECT,
                                                regenHP: 0,
                                                player_armor_stacks: char_armor,
                                                player_regen_stacks: char_regen,
                                                player_reflect_stacks: char_reflect,
                                                player_poison_stacks: char_poison,
                                                dummy_armor_stacks: dummy_armor,
                                                dummy_regen_stacks: dummy_regen,
                                                dummy_reflect_stacks: dummy_reflect,
                                                dummy_poison_stacks: dummy_poison,
                                            })
                                        );

                                        if dummy_health <= damageCaused {
                                            winner = 'player';
                                            break;
                                        }
                                        dummy_health -= damageCaused;
                                    }
                                // ====== end ======
                                } else {
                                    if cleansePoison > 0 {
                                        if dummy_poison > cleansePoison {
                                            dummy_poison -= cleansePoison;
                                        } else {
                                            dummy_poison = 0;
                                        }
                                        battleLogsCount += 1;
                                        emit!(
                                            world,
                                            (BattleLogDetail {
                                                player,
                                                battleLogId: battleLogCounterCount,
                                                id: battleLogsCount,
                                                whoTriggered: curr_item_belongs,
                                                whichItem: curr_item_index,
                                                damageCaused: 0,
                                                isDodged: false,
                                                cleansePoison: cleansePoison,
                                                buffType: EFFECT_CLEANSE_POISON,
                                                regenHP: 0,
                                                player_armor_stacks: char_armor,
                                                player_regen_stacks: char_regen,
                                                player_reflect_stacks: char_reflect,
                                                player_poison_stacks: char_poison,
                                                dummy_armor_stacks: dummy_armor,
                                                dummy_regen_stacks: dummy_regen,
                                                dummy_reflect_stacks: dummy_reflect,
                                                dummy_poison_stacks: dummy_poison,
                                            })
                                        );
                                    }
                                }
                            }
                        } else if rand >= chance && damage > 0 {
                            battleLogsCount += 1;
                            emit!(
                                world,
                                (BattleLogDetail {
                                    player,
                                    battleLogId: battleLogCounterCount,
                                    id: battleLogsCount,
                                    whoTriggered: curr_item_belongs,
                                    whichItem: curr_item_index,
                                    damageCaused: 0,
                                    isDodged: true,
                                    cleansePoison: 0,
                                    buffType: 0,
                                    regenHP: 0,
                                    player_armor_stacks: char_armor,
                                    player_regen_stacks: char_regen,
                                    player_reflect_stacks: char_reflect,
                                    player_poison_stacks: char_poison,
                                    dummy_armor_stacks: dummy_armor,
                                    dummy_regen_stacks: dummy_regen,
                                    dummy_reflect_stacks: dummy_reflect,
                                    dummy_poison_stacks: dummy_poison,
                                })
                            );
                        }
                    }

                    i += 1;
                };

                // ====== Poison effect: Deals 1 damage per stack every 2 seconds. ======
                // ====== Heal effect: Regenerate 1 health per stack every 2 seconds. ======
                if seconds % 2 == 0 {
                    if char_poison > 0 {
                        battleLogsCount += 1;
                        emit!(
                            world,
                            (BattleLogDetail {
                                player,
                                battleLogId: battleLogCounterCount,
                                id: battleLogsCount,
                                whoTriggered: 'dummy',
                                whichItem: 0,
                                damageCaused: char_poison,
                                isDodged: false,
                                cleansePoison: 0,
                                buffType: EFFECT_POISON,
                                regenHP: 0,
                                player_armor_stacks: char_armor,
                                player_regen_stacks: char_regen,
                                player_reflect_stacks: char_reflect,
                                player_poison_stacks: char_poison,
                                dummy_armor_stacks: dummy_armor,
                                dummy_regen_stacks: dummy_regen,
                                dummy_reflect_stacks: dummy_reflect,
                                dummy_poison_stacks: dummy_poison,
                            })
                        );

                        if char_health <= char_poison {
                            winner = 'dummy';
                            break;
                        }
                        char_health -= char_poison;
                    }
                    if dummy_poison > 0 {
                        battleLogsCount += 1;
                        emit!(
                            world,
                            (BattleLogDetail {
                                player,
                                battleLogId: battleLogCounterCount,
                                id: battleLogsCount,
                                whoTriggered: 'player',
                                whichItem: 0,
                                damageCaused: dummy_poison,
                                isDodged: false,
                                cleansePoison: 0,
                                buffType: EFFECT_POISON,
                                regenHP: 0,
                                player_armor_stacks: char_armor,
                                player_regen_stacks: char_regen,
                                player_reflect_stacks: char_reflect,
                                player_poison_stacks: char_poison,
                                dummy_armor_stacks: dummy_armor,
                                dummy_regen_stacks: dummy_regen,
                                dummy_reflect_stacks: dummy_reflect,
                                dummy_poison_stacks: dummy_poison,
                            })
                        );

                        if dummy_health <= dummy_poison {
                            winner = 'player';
                            break;
                        }
                        dummy_health -= dummy_poison;
                    }
                    if char_regen > 0 {
                        battleLogsCount += 1;
                        emit!(
                            world,
                            (BattleLogDetail {
                                player,
                                battleLogId: battleLogCounterCount,
                                id: battleLogsCount,
                                whoTriggered: 'player',
                                whichItem: 0,
                                damageCaused: 0,
                                isDodged: false,
                                cleansePoison: 0,
                                buffType: EFFECT_REGEN,
                                regenHP: char_regen,
                                player_armor_stacks: char_armor,
                                player_regen_stacks: char_regen,
                                player_reflect_stacks: char_reflect,
                                player_poison_stacks: char_poison,
                                dummy_armor_stacks: dummy_armor,
                                dummy_regen_stacks: dummy_regen,
                                dummy_reflect_stacks: dummy_reflect,
                                dummy_poison_stacks: dummy_poison,
                            })
                        );

                        char_health += char_regen;
                        if char_health > char_health_flag {
                            char_health = char_health_flag;
                        }
                    }
                    if dummy_regen > 0 {
                        battleLogsCount += 1;
                        emit!(
                            world,
                            (BattleLogDetail {
                                player,
                                battleLogId: battleLogCounterCount,
                                id: battleLogsCount,
                                whoTriggered: 'dummy',
                                whichItem: 0,
                                damageCaused: 0,
                                isDodged: false,
                                cleansePoison: 0,
                                buffType: EFFECT_REGEN,
                                regenHP: dummy_regen,
                                player_armor_stacks: char_armor,
                                player_regen_stacks: char_regen,
                                player_reflect_stacks: char_reflect,
                                player_poison_stacks: char_poison,
                                dummy_armor_stacks: dummy_armor,
                                dummy_regen_stacks: dummy_regen,
                                dummy_reflect_stacks: dummy_reflect,
                                dummy_poison_stacks: dummy_poison,
                            })
                        );

                        dummy_health += dummy_regen;
                        if dummy_health > dummy_health_flag {
                            dummy_health = dummy_health_flag;
                        }
                    }
                }
                // ====== end ======

                if winner != '' {
                    break;
                }
            };

            let battleLog = BattleLog {
                player: player,
                id: battleLogCounter.count,
                dummyCharLevel: char.wins,
                dummyCharId: random_index,
                winner: winner,
            };
            set!(world, (battleLogCounter, battleLog));

            if winner == 'player' {
                char.wins += 1;
                char.totalWins += 1;
                char.winStreak += 1;
                char.dummied = false;
                char.gold += 5;
                if char.wins < 5 {
                    char.health += 10;
                } else if char.wins == 5 {
                    char.health += 15;
                }
                char.rating += 25;
            } else {
                char.loss += 1;
                char.totalLoss += 1;
                char.winStreak = 0;
                char.gold += 5;

                if (char.rating < 10) {
                    char.rating = 0;
                } else {
                    char.rating -= 10;
                }
            }
            char.updatedAt = get_block_timestamp();
            set!(world, (char));
        }

        fn create_dummy(world: IWorldDispatcher) {
            let player = get_caller_address();

            let mut char = get!(world, player, (Character));

            assert(char.dummied == false, 'dummy already created');

            let mut dummyCharCounter = get!(world, char.wins, (DummyCharacterCounter));
            dummyCharCounter.count += 1;

            let dummyChar = DummyCharacter {
                level: char.wins,
                id: dummyCharCounter.count,
                name: char.name,
                health: char.health,
            };
            char.dummied = true;

            let inventoryItemCounter = get!(world, player, (CharacterItemsInventoryCounter));
            let mut count = inventoryItemCounter.count;

            loop {
                if count == 0 {
                    break;
                }

                let inventoryItem = get!(world, (player, count), (CharacterItemInventory));

                let mut dummyCharItemsCounter = get!(
                    world, (char.wins, dummyCharCounter.count), (DummyCharacterItemsCounter)
                );
                dummyCharItemsCounter.count += 1;

                let dummyCharItem = DummyCharacterItem {
                    level: char.wins,
                    dummyCharId: dummyCharCounter.count,
                    counterId: dummyCharItemsCounter.count,
                    itemId: inventoryItem.itemId,
                    position: inventoryItem.position,
                    rotation: inventoryItem.rotation,
                };

                set!(world, (dummyCharItemsCounter, dummyCharItem));

                count -= 1;
            };

            set!(world, (char, dummyCharCounter, dummyChar));
        }
    }
}