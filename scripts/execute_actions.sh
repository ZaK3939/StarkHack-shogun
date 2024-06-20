#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

if [ $# -ge 1 ]; then
    export PROFILE=$1
else
    export PROFILE="dev"
fi
# Set default RPC_URL if not set
: "${RPC_URL:=http://localhost:5050}"
export WORLD_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.world.address')
export ACTIONS_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::actions::actions" ).address')
export BATTLE_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::battle::battle" ).address')
export ADMIN_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::admin::admin" ).address')

ACCOUNT_ADDRESS='0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca'
PRIVATE_KEY='0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a'

echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo " "
echo actions : $ACTIONS_ADDRESS
echo " "
echo battle : $BATTLE_ADDRESS
echo " "
echo admin : $ADMIN_ADDRESS
echo " "
echo account : $ACCOUNT_ADDRESS
echo "---------------------------------------------------------------------------"

# spawn
echo "Spawning...Alice with 0x616c696365..."
sozo execute --world $WORLD_ADDRESS $ACTIONS_ADDRESS spawn -c 0x616c696365 --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY


# reroll_shop
echo "Rerolling shop..."
sozo execute --world $WORLD_ADDRESS $ACTIONS_ADDRESS reroll_shop --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY

echo "Getting shop data..."
sozo model get Shop ${ACCOUNT_ADDRESS}
SHOP_DATA=$(sozo model get Shop ${ACCOUNT_ADDRESS})

# buy_item
echo "Buying item..."
sozo execute --world $WORLD_ADDRESS $ACTIONS_ADDRESS buy_item -c 40 --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY

# place_item
echo "Placing item..."
sozo execute --world $WORLD_ADDRESS $ACTIONS_ADDRESS place_item -c 2,4,2,0 --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY

# undo_place_item
echo "Undoing place item..."
sozo execute --world $WORLD_ADDRESS $ACTIONS_ADDRESS undo_place_item -c 1 --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY

# place_item
echo "Placing item..."
sozo execute --world $WORLD_ADDRESS $ACTIONS_ADDRESS place_item -c 2,4,2,0 --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY
	
# create_dummy
echo "Creating dummy..."
sozo execute --world $WORLD_ADDRESS $BATTLE_ADDRESS create_dummy --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY

# fight
echo "Fighting..."
sozo execute --world $WORLD_ADDRESS $BATTLE_ADDRESS fight --wait --rpc-url $RPC_URL \
	--account-address $ACCOUNT_ADDRESS \
	--private-key $PRIVATE_KEY
