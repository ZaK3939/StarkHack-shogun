// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setup } from "./dojo/setup.ts";
import { DojoProvider } from "./dojo/DojoContext.tsx";
import { dojoConfig } from "./dojoConfig.ts";

async function init() {
    const rootElement = document.getElementById("root");
    if (!rootElement) throw new Error("React root not found");
    const root = ReactDOM.createRoot(rootElement as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

    // try {
    //     const setupResult = await setup(dojoConfig);

    //     if (!setupResult) {
    //         root.render(<div>Loading...</div>);
    //         return;
    //     }

    //     root.render(
    //         <React.StrictMode>
    //             <DojoProvider value={setupResult}>
    //                 <App />
    //             </DojoProvider>
    //         </React.StrictMode>
    //     );
    // } catch (error) {
    //     console.error("Error during setup:", error);
    //     root.render(<div>Error</div>);
    // }
}

init();

