"use client";

import { useState, useEffect } from "react";
import {
  Webchat,
  WebchatProvider,
  getClient,
  Configuration,
} from "@botpress/webchat";

const clientId = "1d20a3a8-78d8-47bf-a7a1-6f34c9f91c90";

const configuration: Configuration = {
  color: "#d6ff42",
};

export default function App() {
  const [client, setClient] = useState<any>(null); // ← Use `any` or let TS infer

  useEffect(() => {
    const createdClient = getClient({ clientId });
    setClient(createdClient);
  }, []);

  if (!client) return null; // Or a loading state/spinner

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Webchat />
      </WebchatProvider>
    </div>
  );
}
