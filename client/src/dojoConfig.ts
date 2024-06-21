import devManifest from "../../manifests/dev/manifest.json";
import slotManifest from "../../manifests/slot/manifest.json";
import { createDojoConfig } from "@dojoengine/core";

const manifest =
    import.meta.env.VITE_PUBLIC_MANIFEST_PROFILE === "slot"
        ? slotManifest
        : devManifest;

export const dojoConfig = createDojoConfig({
    manifest,
});
