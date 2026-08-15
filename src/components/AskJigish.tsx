import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const QUESTIONS = ['What does Jigish specialise in?', 'Which industries has he worked in?', 'Flutter experience?', 'Is he available?'];
const ANSWERS = [
  { matches: ['specialise', 'specialize', 'skill', 'stack', 'technology', 'technologies', 'do'], answer: 'Jigish builds scalable mobile products and real-time workflows. His core strengths are Flutter, Android, architecture, performance, and polished product experiences.' },
  { matches: ['industry', 'industries', 'fintech', 'healthcare', 'enterprise', 'worked'], answer: 'His experience spans fintech, healthcare, enterprise platforms, point-of-sale systems, and family productivity products.' },
  { matches: ['flutter', 'ios', 'android', 'mobile', 'app'], answer: 'Jigish has shipped Flutter apps across iOS and Android, handling the path from API integration and QA through App Store and Play Store releases.' },
  { matches: ['experience', 'years', 'career', 'journey', 'background'], answer: 'He brings 8+ years of hands-on delivery experience, including banking systems, emergency response apps, AI-assisted POS workflows, and cross-platform mobile products.' },
  { matches: ['available', 'hire', 'contact', 'opportunity', 'freelance'], answer: 'Yes — Jigish is available for new opportunities. The fastest way to start a conversation is jigishdalal@gmail.com.' },
];

function findAnswer(question: string) {
  const match = ANSWERS.find(({ matches }) => matches.some(word => question.toLowerCase().includes(word)));
  return match?.answer ?? 'I can help with Jigish’s mobile experience, industries, Flutter work, or availability. For a specific opportunity, email jigishdalal@gmail.com.';
}

export default function AskJigish() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Choose a prompt or ask anything about Jigish.');
  const ask = (nextQuestion: string) => { const trimmed = nextQuestion.trim(); if (trimmed) { setQuestion(trimmed); setAnswer(findAnswer(trimmed)); } };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); ask(question); };

  return (
    <section id="ask" className="section ask-section">
      <div className="ask-grid" aria-hidden="true" />
      <div className="container ask-layout">
        <motion.div className="ask-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55 }}>
          <span className="ask-eyebrow"><Sparkles size={14} /> Personal portfolio guide</span>
          <h2 className="section-title">Meet the person<br /><em>behind the pixels.</em></h2>
          <p className="section-subtitle">A fast, visual introduction to Jigish’s work — from mobile product craft to the systems that make it scale.</p>
          <div className="ask-proof"><span><b>8+</b> years building</span><span><b>10+</b> apps launched</span></div>
        </motion.div>

        <motion.div className="ask-stage" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="ask-mascot" aria-hidden="true">
            <i className="mascot-halo" /><i className="mascot-spark mascot-spark-one" /><i className="mascot-spark mascot-spark-two" />
            <div className="mascot-head"><span className="mascot-eye" /><span className="mascot-eye" /><i className="mascot-smile" /></div>
            <div className="mascot-body"><i /><i /></div><div className="mascot-phone"><span /></div>
          </div>
          <div className="ask-console">
            <div className="ask-console-bar"><span>●</span><p>ASK JIGISH <i>online</i></p><span>01 / 04</span></div>
            <div className="ask-message ask-message-bot">What would you like to know?</div>
            {question && <div className="ask-message ask-message-user">{question}</div>}
            <AnimatePresence mode="wait"><motion.div key={answer} className="ask-message ask-message-bot ask-answer" initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.32 }}>{answer}</motion.div></AnimatePresence>
            <div className="ask-prompts" aria-label="Suggested questions">{QUESTIONS.map((prompt, index) => <button type="button" key={prompt} onClick={() => ask(prompt)}><small>0{index + 1}</small>{prompt}<ArrowUpRight size={14} /></button>)}</div>
            <form className="ask-form" onSubmit={onSubmit}><input value={question} onChange={event => setQuestion(event.target.value)} placeholder="Type your question…" aria-label="Ask about Jigish" /><button type="submit" aria-label="Ask question"><ArrowUpRight size={18} /></button></form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
