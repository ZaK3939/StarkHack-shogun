# ShogunGame in StarkHack
Fully onchain autonomous auto battle game on Dojo inspired by BackPack Battles.

![タイトル画面](https://github.com/ZaK3939/StarkHack-shogun/assets/8872443/2f704d5c-538d-4a1c-a86b-c21292949d41)


Shogun Battle is a super casual game that is very compatible with very on-chain games and AutonomousWorld, where you can enjoy full on-chain auto-battles.

The theme of the game was developed on the theme that the items (characters) you set up can continue to battle permanently.

### User Flow
1. Click start game (your burnable wallet created automatically)
2. Choose Item
3. Click Batttle Start!
4. If you win, you can go next stage!!!!


## Tech Stack
- [Dojo v0.7.0-alpha.5 ](https://www.dojoengine.org/)

We adopted Dojo to make game development on Starknet more stable and to speed up implementation. In relation to Dojo we use the following (Katana, Sozo, Torii, Slot)

- [Phaser v3.8](https://phaser.io/)

In order to make it easy for users to participate with browser games, Phaser3 was adopted, which works well with browser games.


## Future Work
- Automatic matching system with enemies
- Development of an AI-based MPC
- Leaderboards
- Number of items and character selection
- Improved battle scene selection


## How to build in your local

### Whole

dojoup -v "v0.7.0-alpha.5"

sozo clean or (rm -rf manifests)

sozo build

### terminal1

katana --disable-fee --allowed-origins "\*"

(Change world_address into Scarb.toml)

### terminal2

sozo clean && sozo build &&sozo migrate apply && torii --world 0x07ff6cbf3cc1f1be3bbc314e625b0f8dd554d6bc718017853dadfd7b9c772afc --allowed-origins "\*"

world address is correct for ur env?
(torii --world [world address] --allowed-origins "\*")

## terminal3

export RPC_URL=http://localhost:5050
./scripts/default_admin.sh dev or slot
(chmod +x ./scripts/default_admin.sh )
(chmod +x ./scripts/add_item.sh )

./scripts/execute_actions.sh dev or slot
(chmod +x ./scripts/execute_actions.sh )

npx @dojoengine/core ../manifests/dev/manifest.json src/dojo/generated/contractComponents.ts http://localhost:5050

https://worlds.dev/torii?tab=entities&url=http%3A%2F%2Flocalhost%3A8080%2Fgraphql
http://0.0.0.0:8080/graphql

## terminal4 (Client)

cd client && pnpm i && pnpm dev

### Slot

<!-- https://github.com/z-korp/zconqueror-contracts/blob/main/Scarb.toml -->

slot deployments logs shogun-game katana -f
sozo --profile slot build && sozo --profile slot migrate plan --name v0 && sozo --profile slot migrate apply --name v0 && ./scripts/default_admin.sh slot

(create)
slot d create shogun-game katana -a 3
slot d accounts shogun-game katana
slot d create shogun-game torii --world 0x26663f285f4571e8b1f980cb6537f1a6eeb63291e2aed8216bf4ea5678ffc8a --rpc https://api.cartridge.gg/x/shogun-game/katana --start-block 1

(torii)
Endpoints:
GRAPHQL: https://api.cartridge.gg/x/shogun-game/torii/graphql
GRPC: https://api.cartridge.gg/x/shogun-game/torii


## Great reference
Creating onchain games and developing them on Starknet is not easy. Thanks to the excellent references available.

### Game idea

https://store.steampowered.com/app/2427700/Backpack_Battles/

### dojo rererence

https://github.com/ponderingdemocritus/boot-camp

https://github.com/cartridge-gg/dopewars

https://github.com/0xAsten/Warpack-Masters

https://github.com/z-korp/zkastle　
