import { useState, useRef, useEffect, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { DEFAULT_PROMPTS } from '../data/jigishKnowledgeBase';
import { processQuestion, type SmartAnswer } from '../services/smartQueryEngine';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  topic?: string;
  text: string;
  bulletPoints?: string[];
  suggestedFollowUps?: string[];
}

export default function AskJigish() {
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      topic: 'Personal Portfolio Guide',
      text: "Hi! I'm Jigish's AI Guide. Ask me anything about Jigish's 8+ years of mobile engineering, Flutter & Android expertise, launched apps, or hiring availability!",
      bulletPoints: [
        'Specialized in Flutter, Android (Kotlin/Java) & WebGL',
        'Shipped 10+ production mobile & web applications',
        'Available for new roles, contracts, and technical projects'
      ],
      suggestedFollowUps: ['What is your core tech stack?', 'Tell me about your Flutter experience', 'Are you available for hire?']
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll ONLY the inner chatbox container (never touches window scroll)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isTyping]);

  const handleAsk = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isTyping) return;

    // Add User Message
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: trimmed
    };

    setChatHistory(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and smart character typing
    setTimeout(() => {
      const answer: SmartAnswer = processQuestion(trimmed);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        topic: answer.topic,
        text: answer.mainText,
        bulletPoints: answer.bulletPoints,
        suggestedFollowUps: answer.suggestedFollowUps
      };

      setChatHistory(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAsk(inputQuery);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('jigishdalal@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Get active follow-ups from the latest bot message
  const latestBotMsg = [...chatHistory].reverse().find(m => m.sender === 'bot');
  const activeFollowUps = latestBotMsg?.suggestedFollowUps || DEFAULT_PROMPTS.slice(0, 3).map(p => p.query);

  return (
    <section id="ask" className="section ask-section">
      <div className="ask-grid" aria-hidden="true" />
      <div className="container ask-layout">
        {/* Left Column: Heading & Key Metrics */}
        <motion.div
          className="ask-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <span className="ask-eyebrow">
            <Sparkles size={14} /> Personal portfolio guide
          </span>
          <h2 className="section-title">
            Meet the person<br />
            <em>behind the pixels.</em>
          </h2>
          <p className="section-subtitle">
            An interactive AI introduction to Jigish’s craft — ask anything about his experience, technical stack, or projects.
          </p>
          
          <div className="ask-proof">
            <span><b>8+</b> years building</span>
            <span><b>10+</b> apps launched</span>
            <span><b>100%</b> client-side AI</span>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
            <button
              onClick={copyEmail}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '9999px',
                background: 'rgba(30, 237, 171, 0.1)',
                border: '1px solid rgba(30, 237, 171, 0.3)',
                color: '#1eedab',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
              <span>{copiedEmail ? 'Email Copied!' : 'jigishdalal@gmail.com'}</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: AI Interactive Console */}
        <motion.div
          className="ask-stage"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="ask-console">
            {/* Console Header Bar */}
            <div className="ask-console-bar">
              <span>●</span>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={12} style={{ color: '#1eedab' }} />
                JIGISH AI <i>online</i>
              </p>
              <span>{chatHistory.length} messages</span>
            </div>

            {/* Conversation Log Container */}
            <div
              ref={chatContainerRef}
              style={{
                maxHeight: '360px',
                overflowY: 'auto',
                paddingRight: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '14px'
              }}
            >
              <AnimatePresence initial={false}>
                {chatHistory.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28 }}
                    className={`ask-message ${msg.sender === 'bot' ? 'ask-message-bot' : 'ask-message-user'}`}
                    style={{
                      width: '100%',
                      maxWidth: msg.sender === 'user' ? '80%' : '100%',
                      padding: '14px 16px',
                      borderRadius: '16px',
                      background: msg.sender === 'user' ? 'linear-gradient(135deg, #1eedab, #6340f7)' : 'rgba(255, 255, 255, 0.05)',
                      color: msg.sender === 'user' ? '#000000' : '#ffffff',
                      fontWeight: msg.sender === 'user' ? 600 : 400,
                      border: msg.sender === 'bot' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                    }}
                  >
                    {msg.sender === 'bot' && msg.topic && (
                      <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#1eedab', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {msg.topic}
                      </div>
                    )}
                    <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{msg.text}</div>
                    
                    {msg.bulletPoints && msg.bulletPoints.length > 0 && (
                      <ul style={{ margin: '10px 0 0', paddingLeft: '18px', fontSize: '13px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.85)' }}>
                        {msg.bulletPoints.map((pt, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}

                {/* AI Thinking Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="ask-message ask-message-bot"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#1eedab',
                      fontSize: '13px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <Sparkles size={14} className="animate-spin" />
                    <span>Jigish AI is processing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Prompt Chips */}
            <div className="ask-prompts" aria-label="Suggested questions">
              {DEFAULT_PROMPTS.slice(0, 4).map((prompt, index) => (
                <button
                  type="button"
                  key={prompt.label}
                  onClick={() => handleAsk(prompt.query)}
                  disabled={isTyping}
                >
                  <small>0{index + 1}</small>
                  {prompt.label}
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>

            {/* Dynamic Follow-up Pills */}
            {activeFollowUps.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '8px 0 12px' }}>
                {activeFollowUps.map(fQuery => (
                  <button
                    key={fQuery}
                    type="button"
                    onClick={() => handleAsk(fQuery)}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    💡 {fQuery}
                  </button>
                ))}
              </div>
            )}

            {/* User Query Form Input */}
            <form className="ask-form" onSubmit={onSubmit}>
              <input
                value={inputQuery}
                onChange={event => setInputQuery(event.target.value)}
                placeholder="Ask about Flutter, skills, projects, or availability..."
                aria-label="Ask about Jigish"
                disabled={isTyping}
              />
              <button type="submit" aria-label="Ask question" disabled={isTyping}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
