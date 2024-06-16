# StarkHack-shogun


## How to build

### Whole
dojoup -v "v0.7.0-alpha.5"

sozo clean or (rm -rf manifests)

sozo build

katana --disable-fee --allowed-origins "*" or( RUST_BACKTRACE=1 katana --disable-fee --allowed-origins "*")

Change world_address into Scarb.toml

sozo migrate apply

torii --world [deployed_world_address] --allowed-origins "*"

export RPC_URL=http://localhost:5050

./scripts/default_admin.sh dev
(chmod +x ./scripts/default_admin.sh )
(chmod +x ./scripts/add_item.sh )

./scripts/execute_actions.sh dev
(chmod +x ./scripts/execute_actions.sh )

npx @dojoengine/core ../manifests/dev/manifest.json src/dojo/generated/contractComponents.ts http://localhost:5050

### Client
pnpm i
pnpm dev
