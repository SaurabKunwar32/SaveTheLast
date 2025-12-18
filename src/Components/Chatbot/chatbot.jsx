import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageCircle, Minimize2, Maximize2, RefreshCw } from "lucide-react";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hello! I'm here to help you with any questions about animals and WildLife. How can I assist you today?",
            timestamp: new Date(),
            id: 1
        }
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [typingIndicator, setTypingIndicator] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);
    
    const messagesEndRef = useRef(null);
    const chatRef = useRef(null);
    const botButtonRef = useRef(null);
    const inputRef = useRef(null);
    const messageIdRef = useRef(2);

    useEffect(() => {
        if (!isMinimized) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isMinimized]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, isMinimized]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                chatRef.current &&
                !chatRef.current.contains(event.target) &&
                botButtonRef.current &&
                !botButtonRef.current.contains(event.target) &&
                window.innerWidth <= 768 // Only auto-close on mobile
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Update unread count when chat is closed and new bot messages arrive
    useEffect(() => {
        if (!isOpen || isMinimized) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage?.sender === 'bot' && lastMessage.id > 1) {
                setUnreadCount(prev => prev + 1);
            }
        }
    }, [messages, isOpen, isMinimized]);

    // Reset unread count when chat is opened
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setUnreadCount(0);
        }
    }, [isOpen, isMinimized]);

    const formatMessage = (text) => {
        if (text.includes("*")) {
            const lines = text.split("\n").filter(line => line.trim());
            const listItems = lines.filter(line => line.trim().startsWith("*"));
            const nonListContent = lines.filter(line => !line.trim().startsWith("*")).join(" ");
            
            return (
                <div className="space-y-2">
                    {nonListContent && <p>{nonListContent}</p>}
                    {listItems.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1">
                            {listItems.map((line, idx) => {
                                let cleanLine = line.replace(/\*\*/g, "").replace(/^\s*\*\s*/, "");
                                return <li key={idx}>{cleanLine}</li>;
                            })}
                        </ul>
                    )}
                </div>
            );
        }
        return <p>{text}</p>;
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { 
            sender: "user", 
            text: input.trim(), 
            timestamp: new Date(),
            id: messageIdRef.current++
        };
        
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        setTypingIndicator(true);
        setConnectionStatus('connecting');

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            const response = await fetch("http://10.5.13.132:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input.trim() }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            setConnectionStatus('connected');
            setRetryCount(0);

            // Simulate typing delay for better UX
            setTimeout(() => {
                const botMsg = { 
                    sender: "bot", 
                    text: data.reply || "I didn't receive a proper response. Could you please try rephrasing your question?", 
                    timestamp: new Date(),
                    id: messageIdRef.current++
                };
                setMessages(prev => [...prev, botMsg]);
                setTypingIndicator(false);
            }, 1000 + Math.random() * 1000); // 1-2 second delay

        } catch (error) {
            console.error('Chat error:', error);
            setConnectionStatus('error');
            setRetryCount(prev => prev + 1);
            
            let errorMessage = "I'm having trouble connecting right now. ";
            
            if (error.name === 'AbortError') {
                errorMessage += "The request timed out. Please try again.";
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage += "Please check your internet connection and try again.";
            } else {
                errorMessage += "Please try again in a moment.";
            }

            const errorMsg = { 
                sender: "bot", 
                text: errorMessage,
                timestamp: new Date(),
                id: messageIdRef.current++,
                isError: true
            };
            
            setMessages(prev => [...prev, errorMsg]);
            setTypingIndicator(false);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const retryLastMessage = () => {
        const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
        if (lastUserMessage) {
            setInput(lastUserMessage.text);
            setTimeout(() => sendMessage(), 100);
        }
    };

    const clearChat = () => {
        setMessages([{
            sender: "bot",
            text: "👋 Hello! I'm here to help you with any questions about animals and WildLife. How can I assist you today?",
            timestamp: new Date(),
            id: 1
        }]);
        messageIdRef.current = 2;
        setUnreadCount(0);
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsMinimized(false);
        }
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <div className="fixed bottom-6 right-6 z-50" ref={botButtonRef}>
                {/* Notification Badge */}
                {unreadCount > 0 && !isOpen && (
                    <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                        Chat with our AI assistant
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                </div>

                <button
                    onClick={toggleChat}
                    className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-105 ${
                        connectionStatus === 'error' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : connectionStatus === 'connecting'
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}
                >
                    {loading ? (
                        <RefreshCw size={24} className="animate-spin" />
                    ) : isOpen ? (
                        <X size={24} />
                    ) : (
                        <MessageCircle size={24} />
                    )}
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden transition-all duration-300 ${
                        isMinimized ? 'h-16' : 'h-[32rem]'
                    }`}
                    style={{ maxWidth: 'calc(100vw - 3rem)' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">AI Assistant</h3>
                                <p className="text-xs opacity-90">
                                    {connectionStatus === 'connected' && '🟢 Online'}
                                    {connectionStatus === 'connecting' && '🟡 Connecting...'}
                                    {connectionStatus === 'error' && '🔴 Connection issues'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={clearChat}
                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                                title="Clear chat"
                            >
                                <RefreshCw size={16} />
                            </button>
                            <button
                                onClick={toggleMinimize}
                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                                title={isMinimized ? "Maximize" : "Minimize"}
                            >
                                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                                title="Close chat"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${
                                                message.sender === "bot" ? "justify-start" : "justify-end"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                                    message.sender === "bot"
                                                        ? message.isError
                                                            ? "bg-red-100 text-red-800 border border-red-200"
                                                            : "bg-white border border-gray-200 shadow-sm"
                                                        : "bg-emerald-500 text-white"
                                                }`}
                                            >
                                                <div className="text-sm">
                                                    {message.sender === "bot" ? formatMessage(message.text) : message.text}
                                                </div>
                                                <div className={`text-xs mt-2 ${
                                                    message.sender === "bot" 
                                                        ? "text-gray-500" 
                                                        : "text-emerald-100"
                                                }`}>
                                                    {formatTime(message.timestamp)}
                                                </div>
                                                {message.isError && retryCount < 3 && (
                                                    <button
                                                        onClick={retryLastMessage}
                                                        className="text-xs text-red-600 hover:text-red-800 underline mt-2"
                                                    >
                                                        Retry message
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {typingIndicator && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white border-t border-gray-200">
                                <div className="flex items-end space-x-3">
                                    <div className="flex-1">
                                        <textarea
                                            ref={inputRef}
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder=" chat"
                                            className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors max-h-24"
                                            rows={1}
                                            disabled={loading}
                                        />
                                    </div>
                                    <button
                                        onClick={sendMessage}
                                        disabled={loading || !input.trim()}
                                        className={`p-3 rounded-xl transition-all duration-200 ${
                                            loading || !input.trim()
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md'
                                        }`}
                                        title="Send message"
                                    >
                                        {loading ? (
                                            <RefreshCw size={20} className="animate-spin" />
                                        ) : (
                                            <Send size={20} />
                                        )}
                                    </button>
                                </div>
                                
                                {/* Character count for long messages */}
                                {input.length > 200 && (
                                    <div className="text-xs text-gray-500 mt-2 text-right">
                                        {input.length}/500 characters
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden" onClick={() => setIsOpen(false)} />
            )}
        </>
    );
}