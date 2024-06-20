export enum ItemType {
  Weapon = 1,
  Armor = 2,
  Consumable = 3,
  Backpack = 4,
  Artifact = 5
}
export interface ItemData {
  width: number;
  height: number;
  name: string;
  effect: string;
  itemType: ItemType;
  cost: number;
  rarity: string;
}

export const itemData: { [key: string]: { width: number, height: number, name: string, effect: string, itemType: number, cost: number, rarity: string } } = {
  1: { width: 1, height: 2, name: 'Ace of Spades', effect: 'On reveal: Your next hit is critical. If the number of cards before is odd, gain 2  and 2 .', itemType: 3, cost: 3, rarity: 'Rare' },
  2: { width: 2, height: 3, name: 'Axe', effect: 'On hit: Gain 1 damage.', itemType: 1, cost: 6, rarity: 'Rare' },
  3: { width: 2, height: 1, name: 'Bag of Stones', effect: 'Stones above you activate every 3s. Stones below you activate every 6s.', itemType: 1, cost: 3, rarity: 'Rare' },
  4: { width: 2, height: 2, name: 'Banana', effect: 'Start of battle: Gain 1 .', itemType: 3, cost: 3, rarity: 'Common' },
  5: { width: 1, height: 1, name: 'Blueberries', effect: 'Start of battle: Gain 1 .', itemType: 3, cost: 2, rarity: 'Rare' },
  6: { width: 1, height: 2, name: 'Book of Ice', effect: 'Every 8s: Inflict 1 .', itemType: 3, cost: 10, rarity: 'Rare' },
  7: { width: 2, height: 1, name: 'Box of Riches', effect: 'Shop entered: Gain 2 . Start of battle: Gain 2 .', itemType: 2, cost: 5, rarity: 'Rare' },
  8: { width: 1, height: 4, name: 'Broom', effect: 'Every 4s: Gain 1 . Cleanse 2 .', itemType: 1, cost: 4, rarity: 'Common' },
  9: { width: 1, height: 1, name: 'Bunch of Coins', effect: 'Shop entered: Gain 1 . Every 6s: Gain 1 .', itemType: 3, cost: 9, rarity: 'Rare' },
  10: { width: 1, height: 1, name: 'Burning Coal', effect: 'On hit: Inflict 2 .', itemType: 3, cost: 2, rarity: 'Rare' },
  11: { width: 2, height: 1, name: 'Carrot', effect: 'Start of battle: Gain 1 . Every 4s: Gain 1 .', itemType: 3, cost: 3, rarity: 'Rare' },
  12: { width: 1, height: 2, name: 'Chili Pepper', effect: 'Every 4s: Gain 1 .', itemType: 3, cost: 5, rarity: 'Rare' },
  13: { width: 1, height: 1, name: 'Customer Card', effect: 'Shop entered: Gain 1 .', itemType: 5, cost: 4, rarity: 'Rare' },
  14: { width: 1, height: 2, name: 'Dagger', effect: 'On hit: Gain 1 .', itemType: 1, cost: 4, rarity: 'Rare' },
  15: { width: 1, height: 2, name: 'Deck of Cards', effect: 'Start of battle: Gain 2 . On reveal: Gain 1 .', itemType: 3, cost: 3, rarity: 'Rare' },
  16: { width: 2, height: 1, name: 'Fanny Pack', effect: 'Shop entered: Gain 1 .', itemType: 3, cost: 3, rarity: 'Rare' },
  17: { width: 1, height: 1, name: 'Flame', effect: 'Every 5s: Inflict 1 .', itemType: 2, cost: 1, rarity: 'Common' },
  18: { width: 1, height: 2, name: 'Fly Agaric', effect: 'Every 5s: Inflict 1 .', itemType: 3, cost: 3, rarity: 'Rare' },
  19: { width: 1, height: 2, name: 'Garlic', effect: 'Every 4s: Gain 3 . 30% chance to remove 1  from your opponent.', itemType: 3, cost: 2, rarity: 'Common' },
  20: { width: 2, height: 1, name: 'Gloves of Haste', effect: 'Start of battle:  items trigger 20% faster.', itemType: 2, cost: 4, rarity: 'Rare' },
  21: { width: 2, height: 2, name: 'Goobert', effect: '5  item activations: Heal for 9.', itemType: 5, cost: 6, rarity: 'Rare' },
  22: { width: 3, height: 3, name: 'Hammer', effect: 'On hit: 50% chance to stun your opponent for 0.5s.', itemType: 1, cost: 8, rarity: 'Rare' },
  23: { width: 1, height: 1, name: 'Healing Herbs', effect: 'Start of battle: Gain 2 .', itemType: 3, cost: 4, rarity: 'Common' },
  24: { width: 1, height: 2, name: 'Health Potion', effect: 'Health drops below 50%: Consume this and heal for 12 and cleanse 4 .', itemType: 5, cost: 4, rarity: 'Rare' },
  25: { width: 2, height: 3, name: 'Leather Armor', effect: 'Start of battle: Gain 45 . Resist 3 debuffs.', itemType: 3, cost: 7, rarity: 'Rare' },
  26: { width: 2, height: 2, name: 'Leather Bag', effect: 'Add 4 backpack slots.', itemType: 4, cost: 4, rarity: 'Common' },
  27: { width: 1, height: 1, name: 'Lucky Clover', effect: 'Start of battle: Gain 1 .', itemType: 3, cost: 2, rarity: 'Rare' },
  28: { width: 1, height: 1, name: 'Lump of Coal', effect: 'Weapon sockets: On attack: 70% chance to deal +1 damage. Armor & other sockets: Start of battle: Gain 8 . Resist 1 debuff. Backpack: After 3s: Gain a random buff, inflict a random debuff.', itemType: 3, cost: 2, rarity: 'Common' },
  29: { width: 1, height: 1, name: 'Pan', effect: 'Deals +1 damage for each  Food.', itemType: 1, cost: 4, rarity: 'Common' },
  30: { width: 2, height: 1, name: 'Piggybank', effect: 'Shop entered: Gain 1 . Start of battle: Gain 2 maximum health for each  Start of battle item.', itemType: 3, cost: 3, rarity: 'Common' },
  31: { width: 1, height: 1, name: 'Pocket Sand', effect: 'Start of battle: Inflict 1 .', itemType: 2, cost: 2, rarity: 'Common' },
  32: { width: 2, height: 1, name: 'Rat', effect: 'Every 4s: Deal 5 damage. 70% to inflict 1 . 10% to inflict 1 . Triggers 15% faster for each  Pet or Food.', itemType: 3, cost: 4, rarity: 'Common' },
  33: { width: 1, height: 2, name: 'Reverse!', effect: 'On reveal: Reflect 3 debuffs. If there are no duplicate cards before, steal 3 buffs.', itemType: 3, cost: 3, rarity: 'Rare' },
  34: { width: 1, height: 2, name: 'Shield', effect: 'Start of battle: Gain 1 .', itemType: 1, cost: 4, rarity: 'Rare' },
  35: { width: 1, height: 4, name: 'Shovel', effect: 'On hit: 40% chance to inflict 1 . Shop entered: Dig up a random item.', itemType: 1, cost: 8, rarity: 'Rare' },
  36: { width: 1, height: 4, name: 'Spear', effect: 'On hit: Destroy 4  for each free  slot in front of it.', itemType: 1, cost: 6, rarity: 'Rare' },
  37: { width: 2, height: 1, name: 'Spell Scroll: Frostbolt', effect: 'Max uses: 3. Increased by each Ice item (except Spell Scroll).', itemType: 3, cost: 4, rarity: 'Rare' },
  38: { width: 2, height: 2, name: 'Spiked Shield', effect: 'On attacked (Melee): 30% chance to prevent 4 damage, remove 0.3 stamina from opponent, and gain 1  (up to 3).', itemType: 3, cost: 8, rarity: 'Rare' },
  39: { width: 2, height: 2, name: 'Squirrel', effect: 'Every 4s: Steal a random buff. Triggers 15% faster for each  Pet or Food.', itemType: 3, cost: 5, rarity: 'Rare' },
  40: { width: 1, height: 1, name: 'Stone', effect: 'Can only be thrown once per battle. On hit: Destroy 4 .', itemType: 1, cost: 1, rarity: 'Common' },
  41: { width: 1, height: 2, name: 'The Lovers', effect: 'On reveal: Steal 11 life. If the number of cards before is even, gain 2 .', itemType: 1, cost: 3, rarity: 'Common' },
  42: { width: 1, height: 2, name: 'Torch', effect: 'On hit: 25% chance to gain 1 damage.', itemType: 1, cost: 5, rarity: 'Rare' },
  43: { width: 1, height: 2, name: 'Tusk Poker', effect: 'On hit: 50% chance to gain 1 .', itemType: 1, cost: 8, rarity: 'Rare' },
  44: { width: 1, height: 2, name: 'Walrus Tusk', effect: 'Start of battle: Gain 1 .', itemType: 2, cost: 4, rarity: 'Common' },
  45: { width: 1, height: 1, name: 'Whetstone', effect: 'Start of battle:  Weapons gain 1 damage.', itemType: 1, cost: 4, rarity: 'Common' },
  46: { width: 2, height: 2, name: 'Wooden Buckler', effect: 'On attacked (Melee): 30% chance to prevent 4 damage and remove 0.3 stamina from opponent.', itemType: 3, cost: 4, rarity: 'Common' },
  47: { width: 1, height: 2, name: 'Last Item', effect: 'Special effect of the last item.', itemType: 1, cost: 5, rarity: 'Rare' }
};
