# StarkHack-shogun

## How to build

### Whole

dojoup -v "v0.7.0-alpha.5"

sozo clean or (rm -rf manifests)

sozo build

katana --disable-fee --allowed-origins "*"

Change world_address into Scarb.toml

sozo migrate apply

torii --world 0x5366256f83748b6fcc73f74f2ad4a6d6c12bdde1f3df1910289de1ff8eaabd3 --allowed-origins "\*"

export RPC_URL=http://localhost:5050

./scripts/default_admin.sh dev
(chmod +x ./scripts/default_admin.sh )
(chmod +x ./scripts/add_item.sh )

./scripts/execute_actions.sh dev
(chmod +x ./scripts/execute_actions.sh )

npx @dojoengine/core ../manifests/dev/manifest.json src/dojo/generated/contractComponents.ts http://localhost:5050

https://worlds.dev/torii?tab=entities&url=http%3A%2F%2Flocalhost%3A8080%2Fgraphql
http://0.0.0.0:8080/graphql

### Client

pnpm i
pnpm dev
