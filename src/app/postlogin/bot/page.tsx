import dynamic from "next/dynamic";

// Dynamically import ChatBot with SSR disabled
const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });

export default function BotPage() {
  return (
    <div>
      <h1>Your Bot</h1>
      <ChatBot />
    </div>
  );
}
