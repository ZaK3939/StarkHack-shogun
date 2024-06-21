# StarkHack-shogun

## How to build

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

export RPC_URL=http://localhost:5050

## terminal3

./scripts/default_admin.sh dev or slot
(chmod +x ./scripts/default_admin.sh )
(chmod +x ./scripts/add_item.sh )

./scripts/execute_actions.sh dev or slot
(chmod +x ./scripts/execute_actions.sh )

npx @dojoengine/core ../manifests/dev/manifest.json src/dojo/generated/contractComponents.ts http://localhost:5050

https://worlds.dev/torii?tab=entities&url=http%3A%2F%2Flocalhost%3A8080%2Fgraphql
http://0.0.0.0:8080/graphql

### Client

## terminal4

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
