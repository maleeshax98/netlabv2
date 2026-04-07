import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = React.useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Automatic scroll-to-bottom logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-600" />
          AI Engineering Assistant
        </h2>
      </div>

      {/* Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
              <Bot className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Describe your system requirements to generate a BOM and
              architecture.
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

/* Sub-component: MessageBubble */
const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
          isUser
            ? "bg-indigo-50 border-indigo-100 text-indigo-600"
            : "bg-white border-gray-200 text-gray-600"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-indigo-600 text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
};
