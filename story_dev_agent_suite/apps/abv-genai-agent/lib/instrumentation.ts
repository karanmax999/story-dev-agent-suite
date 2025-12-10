import { NodeSDK } from "@opentelemetry/sdk-node";
import { ABVSpanProcessor } from "@abvdev/otel";

// Ensure we only initialize once
if (!(global as any).__abv_sdk_initialized) {
    const sdk = new NodeSDK({
        spanProcessors: [
            new ABVSpanProcessor({
                apiKey: process.env.ABV_API_KEY || "sk-abv-d9438421-2784-4364-9e07-3d5857a425ef",
                baseUrl: "https://app.abv.dev",
                exportMode: "immediate",
            })
        ],
    });

    try {
        sdk.start();
        console.log("ABV Instrumentation started");
        (global as any).__abv_sdk_initialized = true;
    } catch (e) {
        console.error("Failed to start ABV instrumentation:", e);
    }
}
