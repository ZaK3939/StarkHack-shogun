#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

if [ $# -ge 1 ]; then
    export PROFILE=$1
else
    export PROFILE="dev"
fi

export WORLD_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.world.address')

export ACTIONS_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::actions::actions" ).address')
export BATTLE_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::battle::battle" ).address')
export ADMIN_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::admin::admin" ).address')

echo "---------------------------------------------------------------------------"
echo profile : $PROFILE
echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo " "
echo actions : $ACTIONS_ADDRESS
echo battle : $BATTLE_ADDRESS
echo admin : $ADMIN_ADDRESS
echo "---------------------------------------------------------------------------"

# enable actions system -> component authorizations
ACTIONS_COMPONENTS=("BackpackGrids" "Character" "CharacterItemStorage" "CharacterItemsStorageCounter" "CharacterItemInventory" "CharacterItemsInventoryCounter" "Item" "ItemsCounter" "Shop" "NameRecord")

for component in ${ACTIONS_COMPONENTS[@]}; do
    sozo -P $PROFILE auth grant writer $component,$ACTIONS_ADDRESS --world $WORLD_ADDRESS --wait
    sleep 0.1
done

echo "Actions authorizations have been successfully set."

# enable battle system -> component authorizations
BATTLE_COMPONENTS=("Character" "BattleLog" "BattleLogCounter" "BattleLogDetail" "CharacterItemStorage" "CharacterItemsStorageCounter" "CharacterItemInventory" "CharacterItemsInventoryCounter" "Item" "DummyCharacter" "DummyCharacterCounter" "DummyCharacterItem" "DummyCharacterItemsCounter")

for component in ${BATTLE_COMPONENTS[@]}; do
    sozo -P $PROFILE auth grant writer $component,$BATTLE_ADDRESS --world $WORLD_ADDRESS --wait
    sleep 0.1
done

echo "Battle authorizations have been successfully set."

# enable admin system -> component authorizations
ADMIN_COMPONENTS=("Item" "ItemsCounter")

for component in ${ADMIN_COMPONENTS[@]}; do
    sozo -P $PROFILE auth grant writer $component,$ADMIN_ADDRESS --world $WORLD_ADDRESS --wait
    sleep 0.1
done

echo "Admin authorizations have been successfully set."

# add items
echo "Adding items..."
./scripts/add_item.sh
echo "Items added successfully."