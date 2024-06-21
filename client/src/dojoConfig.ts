import devManifest from "../../manifests/dev/manifest.json";
import slotManifest from "../../manifests/slot/manifest.json";
import {
    KATANA_ETH_CONTRACT_ADDRESS,
    createDojoConfig,
} from "@dojoengine/core";

const manifest =
    import.meta.env.VITE_PUBLIC_MANIFEST_PROFILE === "slot"
        ? slotManifest
        : devManifest;

export const dojoConfig = createDojoConfig({
    manifest,
    rpcUrl: import.meta.env.VITE_PUBLIC_NODE_URL,
    toriiUrl: import.meta.env.VITE_PUBLIC_TORII,
    masterAddress: import.meta.env.VITE_PUBLIC_MASTER_ADDRESS,
    masterPrivateKey: import.meta.env.VITE_PUBLIC_MASTER_PRIVATE_KEY,
    accountClassHash: import.meta.env.VITE_PUBLIC_ACCOUNT_CLASS_HASH,
    feeTokenAddress: KATANA_ETH_CONTRACT_ADDRESS,
});

