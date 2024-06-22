#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

if [ $# -ge 1 ]; then
    export PROFILE=$1
else
    export PROFILE="dev"
fi

# # Set default RPC_URL if not set
# : "${RPC_URL:=http://localhost:5050}"
# : "${RPC_URL:=https://api.cartridge.gg/x/shogun-game/katana}"

export WORLD_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.world.address')

export ADMIN_ADDRESS=$(cat ./manifests/$PROFILE/manifest.json | jq -r '.contracts[] | select(.name == "shogun::systems::admin::admin" ).address')


echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo " "
echo admin : $ADMIN_ADDRESS
echo "---------------------------------------------------------------------------"



# id, name, itemType, shapeType, width, height, price, damage, consumeStamina, chance, coolTime, rarity, 
# armor, armorType, regen, regenType, reflect, reflectType, spike, spikeType,

sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 1,5180591834077951200474421290355,2,1,1,2,3,0,0,50,4,2,0,0,1,3,1,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 2,4290661,1,3,2,3,6,6,3,80,4,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 3,5259203444424212077206280496499,1,1,2,1,3,2,1,80,5,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 4,72986231139937,2,4,2,2,3,0,0,100,3,1,0,0,1,3,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 5,80301285249285158999778675,2,1,1,1,2,0,0,100,2,2,0,0,1,3,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 6,80315342082048483641615205,2,1,1,2,10,0,0,90,2,2,0,0,0,0,2,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 7,5263556786300644355717439448435,2,1,2,1,5,0,0,100,4,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 8,285387747181,1,1,1,4,4,3,2,70,4,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 9,1347942892381640102452472895336051,2,1,1,1,9,0,0,100,0,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 10,20567995355621704406569804140,2,1,1,1,2,0,0,90,2,2,0,0,0,0,1,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 11,74085810990964,2,1,2,1,3,0,0,100,3,2,0,0,1,3,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 12,20861721791574245281954293106,2,1,1,2,5,0,0,95,3,2,0,0,0,0,0,0,1,3 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 13,5344636210924047111429617185380,2,1,1,1,4,0,0,100,0,2,0,0,0,0,1,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 14,75185137345906,1,1,1,2,4,2,1,65,2,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 15,5418893226509609272860835210355,2,1,1,2,3,0,0,100,3,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 16,332362945406796296184683,2,1,2,1,3,0,0,100,0,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 17,302466035045,2,1,1,1,1,0,0,90,0,1,0,0,0,0,0,0,1,1 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 18,332566630208825912879459,2,1,1,2,3,0,0,85,5,2,0,0,1,3,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 19,78483857107299,2,1,1,2,2,0,0,80,4,1,0,0,0,0,1,3,1,3 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 20,370852408161082562541199331045897317,2,1,2,1,4,0,0,100,0,2,0,0,0,0,2,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 21,20107247529325172,2,1,2,2,6,0,0,70,0,2,0,0,20,4,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 22,79583284913522,1,2,3,3,8,9,4,100,6,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 23,5735803464783934418129584808563,2,1,2,1,4,0,0,100,0,1,0,0,1,1,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 24,5735803464986396325597128781678,2,1,1,2,4,0,0,100,0,2,20,3,2,1,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 25,6052716152600831465235768242034,2,1,2,3,7,0,0,100,0,2,45,1,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 26,92357119027722648090206567,2,1,2,2,4,0,0,100,0,1,5,4,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 27,23662774564128607029171742066,2,1,1,1,2,0,0,100,0,2,0,0,1,1,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 28,23662821873636304903706993004,2,1,1,1,2,0,0,100,4,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 29,5267822,1,5,1,1,4,4,2,95,4,1,0,0,1,2,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 30,1483334678964387016299,2,1,5,1,3,0,0,100,0,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 31,97240082215151378733559396,2,1,1,1,2,0,0,80,0,1,0,0,0,0,0,0,1,1 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 32,5398900,2,1,2,1,4,0,0,60,3,1,0,0,0,0,0,0,1,3 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 33,5937281861841806625,2,1,1,2,3,0,0,100,3,2,0,0,0,0,2,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 34,6010176240095489911,1,1,1,2,4,2,3,70,4,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 35,91708011734380,1,1,1,4,8,5,0,80,3,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 36,358367977842,1,1,1,4,6,5,0,90,5,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 37,1692344940007081970703365609319540,2,1,2,1,5,0,2,100,3,2,0,0,2,3,2,3,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 38,6610727254158539880832327576676,2,1,2,2,8,0,0,100,3,2,4,3,0,0,2,3,1,3 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 39,6012716073268438380,2,4,2,2,5,0,0,50,3,2,0,0,0,0,1,3,3,3 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 40,358435745381,1,1,1,1,1,1,1,40,4,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 41,398604532852954688221811,2,1,1,2,3,1,0,100,0,1,0,0,3,1,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 42,362647020392,1,1,1,2,5,2,4,80,3,2,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 43,398845370394340924024178,1,1,1,2,8,3,2,70,6,2,0,0,0,0,0,0,1,3 --wait --rpc-url $RPC_URL
sozo -P $PROFILE execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 44,105636616351295929708802923,2,1,1,2,4,0,0,100,0,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
# sozo execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 45,1612389281204546793061,2,1,1,1,2,0,0,100,4,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
# sozo execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 46,1773398435764441280289209920021874,2,1,2,2,4,0,0,100,3,1,4,3,0,0,0,0,0,0 --wait --rpc-url $RPC_URL
# sozo execute --world $WORLD_ADDRESS $ADMIN_ADDRESS add_item -c 47,27059912655097065507149279844,1,1,1,2,3,1,4,70,5,1,0,0,0,0,0,0,0,0 --wait --rpc-url $RPC_URL

echo "Admin Add items have been successfully set."
