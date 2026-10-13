/**
 * Server-side AI Chat Handler for Om's AI Assistant
 * - Keeps API keys securely on the server
 * - Enforces rate limiting & request size limits
 * - Connects to Google Gemini, Groq, or OpenAI
 * - Provides verified local knowledge fallback when API key is unconfigured
 */

import { VERIFIED_PORTFOLIO_KNOWLEDGE, AI_SYSTEM_PROMPT } from '../src/data/aiKnowledge.js';

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 25; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Intelligent local verified fallback if no live API key is set
 */
function generateVerifiedFallback(userMessage) {
  const msg = (userMessage || '').toLowerCase();

  if (msg.includes('spotonjalgaon') || (msg.includes('spot') && msg.includes('jalgaon')) || msg.includes('venue')) {
    return {
      text: "SpotOnJalgaon is Om's local venue discovery and booking platform built with HTML, CSS, JavaScript, PHP, and MySQL. It solves the challenge of finding sports turfs, study libraries, gaming zones, and celebration halls in Jalgaon through category filtering, venue profiles, and reservation workflows.",
      actions: [
        { label: "SpotOnJalgaon Details", type: "open_modal", target: "spot-on-jalgaon" },
        { label: "Explore Projects", type: "scroll", target: "projects" },
        { label: "View GitHub Repo", type: "external_link", target: "https://github.com/OmSultane/SpotOnJalgaon" }
      ]
    };
  }

  if (msg.includes('digital content') || msg.includes('organizer') || msg.includes('asset')) {
    return {
      text: "The Digital Content Organizer is a centralized platform for organizing, categorizing, and searching digital media (documents, images, videos, and notes) using PHP, MySQL, and modern frontend styling. It includes hierarchical tagging, favorites, and search retrieval.",
      actions: [
        { label: "Project Details", type: "open_modal", target: "digital-content-organizer" },
        { label: "Explore Projects", type: "scroll", target: "projects" },
        { label: "View GitHub Repo", type: "external_link", target: "https://github.com/OmSultane/Digital-Content-Organizer" }
      ]
    };
  }

  if (msg.includes('dsa') || msg.includes('java practice') || msg.includes('algorithm') || msg.includes('leetcode')) {
    return {
      text: "Om actively practices Java Data Structures & Algorithms. His 'Java DSA Practice' repository documents problem-solving implementations covering arrays, two-pointer techniques, recursion, binary search, and tree traversals with an emphasis on OOP and computational efficiency.",
      actions: [
        { label: "Java DSA Details", type: "open_modal", target: "java-dsa-practice" },
        { label: "View Learning Roadmap", type: "scroll", target: "learning" },
        { label: "GitHub Code", type: "external_link", target: "https://github.com/OmSultane/Java-DSA-Practice" }
      ]
    };
  }

  if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
    return {
      text: "Om has built 3 key featured projects:\n\n1. **SpotOnJalgaon**: Local venue discovery & booking web app (PHP, MySQL, JS).\n2. **Digital Content Organizer**: Centralized asset management and tagging hub (PHP, MySQL).\n3. **Java DSA Practice**: Algorithmic problem-solving and computer science fundamentals in Java.",
      actions: [
        { label: "Explore Projects", type: "scroll", target: "projects" },
        { label: "SpotOnJalgaon Details", type: "open_modal", target: "spot-on-jalgaon" },
        { label: "Digital Content Organizer Details", type: "open_modal", target: "digital-content-organizer" }
      ]
    };
  }

  if (msg.includes('skill') || msg.includes('technology') || msg.includes('stack') || msg.includes('know')) {
    return {
      text: "Om's core technical stack includes:\n• **Languages**: Java (core OOP), JavaScript (ES6+), PHP\n• **Frontend**: HTML5, CSS3, JavaScript\n• **Backend & DB**: PHP, MySQL (relational schemas, queries, normalization)\n• **Tools**: Git, GitHub, VS Code, MySQL Workbench\n• **Currently Learning**: Spring Boot, advanced DSA, and Java backend architectures.",
      actions: [
        { label: "View Technical Skills", type: "scroll", target: "skills" },
        { label: "View Learning Roadmap", type: "scroll", target: "learning" }
      ]
    };
  }

  if (msg.includes('intern') || msg.includes('softanic') || msg.includes('experience')) {
    return {
      text: "Om completed an approximate 3-month offline web development internship at Softanic Solutions. He gained hands-on experience developing responsive web interfaces with HTML, CSS, JavaScript, and integrating server-side logic and relational databases with PHP and MySQL.",
      actions: [
        { label: "View Experience", type: "scroll", target: "experience" },
        { label: "View Technical Skills", type: "scroll", target: "skills" }
      ]
    };
  }

  if (msg.includes('learn') || msg.includes('spring') || msg.includes('future') || msg.includes('roadmap') || msg.includes('interest')) {
    return {
      text: "Om is actively deepening his competencies in:\n1. **Java Backend Engineering**: Modular OOP architectures, multithreading, and design patterns.\n2. **Spring Boot**: REST APIs, Spring Data JPA, and microservices fundamentals.\n3. **Data Structures & Algorithms**: Daily problem solving on LeetCode & CodeChef.\n4. **Database Optimization**: Complex SQL queries and indexing in MySQL.",
      actions: [
        { label: "View Learning Roadmap", type: "scroll", target: "learning" },
        { label: "View Experience", type: "scroll", target: "experience" }
      ]
    };
  }

  if (msg.includes('contact') || msg.includes('hire') || msg.includes('email') || msg.includes('reach') || msg.includes('touch')) {
    return {
      text: "You can reach Om directly:\n• **Email**: omsultane@gmail.com\n• **Location**: Shirpur, Maharashtra, India\n• **GitHub**: github.com/OmSultane\n• **LinkedIn**: linkedin.com/in/om-sultane\n\nHe is currently open to internships and software engineering collaborations!",
      actions: [
        { label: "Contact Om", type: "scroll", target: "contact" },
        { label: "Visit GitHub Profile", type: "external_link", target: "https://github.com/OmSultane" }
      ]
    };
  }

  if (msg.includes('who') || msg.includes('about') || msg.includes('om') || msg.includes('college') || msg.includes('education') || msg.includes('rcpit')) {
    return {
      text: "Om Sultane is a Computer Engineering undergraduate at R.C. Patel Institute of Technology (RCPIT), Shirpur, Maharashtra. He is an aspiring Software Engineer focused on Java backend development, clean architecture, and building practical web applications.",
      actions: [
        { label: "View About Section", type: "scroll", target: "about" },
        { label: "Explore Projects", type: "scroll", target: "projects" },
        { label: "View Experience", type: "scroll", target: "experience" }
      ]
    };
  }

  if (msg.includes('github') || msg.includes('repo')) {
    return {
      text: "Om regularly maintains his code and learning journey on GitHub at github.com/OmSultane, including SpotOnJalgaon, Digital Content Organizer, and Java DSA Practice.",
      actions: [
        { label: "View GitHub Repositories", type: "scroll", target: "github" },
        { label: "Visit GitHub Profile", type: "external_link", target: "https://github.com/OmSultane" }
      ]
    };
  }

  // Default fallback answer
  return {
    text: "I am Om's AI Assistant! I can help you explore Om Sultane's background, education at RCPIT Shirpur, his 3-month Softanic Solutions internship, projects (SpotOnJalgaon, Digital Content Organizer, Java DSA), skills (Java, PHP, MySQL, JS), and how to contact him.",
    actions: [
      { label: "Explore Projects", type: "scroll", target: "projects" },
      { label: "View Technical Skills", type: "scroll", target: "skills" },
      { label: "Contact Om", type: "scroll", target: "contact" }
    ]
  };
}

/**
 * Parses raw AI response text to extract <ACTIONS> blocks
 */
function extractActions(rawText) {
  let cleanedText = rawText;
  let actions = [];

  const actionsRegex = /<ACTIONS>([\s\S]*?)<\/ACTIONS>/i;
  const match = rawText.match(actionsRegex);

  if (match) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (Array.isArray(parsed)) {
        actions = parsed;
      }
    } catch {
      // Ignore JSON parse errors in malformed model outputs
    }
    cleanedText = rawText.replace(actionsRegex, '').trim();
  }

  return { text: cleanedText, actions };
}

/**
 * Handle POST /api/chat
 */
export async function handleAIChatRequest(reqBody, clientIp = '127.0.0.1') {
  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      status: 429,
      data: {
        error: "Rate limit exceeded. Please wait a moment before sending another message.",
        code: "RATE_LIMIT_EXCEEDED"
      }
    };
  }

  // 2. Validate input
  const { messages } = reqBody || {};
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return {
      status: 400,
      data: { error: "Invalid request: 'messages' array is required." }
    };
  }

  // Limit conversation history to last 10 messages and max message length 1000 chars
  const recentMessages = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 1000).trim()
  })).filter(m => m.content.length > 0);

  if (recentMessages.length === 0) {
    return {
      status: 400,
      data: { error: "Message content cannot be empty." }
    };
  }

  const lastUserMessage = [...recentMessages].reverse().find(m => m.role === 'user')?.content || '';

  // 3. Inspect AI Provider and Keys
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const hasApiKey = (provider === 'gemini' && geminiKey) ||
                    (provider === 'groq' && groqKey) ||
                    (provider === 'openai' && openaiKey);

  // If no API key configured, use transparent fallback mode
  if (!hasApiKey) {
    const fallback = generateVerifiedFallback(lastUserMessage);
    return {
      status: 200,
      data: {
        text: fallback.text,
        actions: fallback.actions,
        isLiveAI: false,
        providerNote: "Notice: AI API key is not configured in .env. Showing verified information directly from Om's portfolio knowledge base."
      }
    };
  }

  // 4. Connect to configured AI Provider
  try {
    let rawReply = '';

    if (provider === 'gemini') {
      const model = process.env.AI_MODEL || 'gemini-1.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

      // Build Gemini contents payload
      const contents = recentMessages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const payload = {
        systemInstruction: {
          parts: [{ text: `${AI_SYSTEM_PROMPT}\n\nPORTFOLIO KNOWLEDGE BASE:\n${VERIFIED_PORTFOLIO_KNOWLEDGE}` }]
        },
        contents,
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 800
        }
      };

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('Gemini API Error:', resp.status, errorText);
        throw new Error(`Gemini API returned status ${resp.status}`);
      }

      const json = await resp.json();
      rawReply = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (provider === 'groq') {
      const model = process.env.AI_MODEL || 'llama-3.3-70b-versatile';
      const endpoint = 'https://api.groq.com/openai/v1/chat/completions';

      const openAiMessages = [
        { role: 'system', content: `${AI_SYSTEM_PROMPT}\n\nPORTFOLIO KNOWLEDGE BASE:\n${VERIFIED_PORTFOLIO_KNOWLEDGE}` },
        ...recentMessages
      ];

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model,
          messages: openAiMessages,
          temperature: 0.5,
          max_tokens: 800
        })
      });

      if (!resp.ok) {
        throw new Error(`Groq API returned status ${resp.status}`);
      }
      const json = await resp.json();
      rawReply = json.choices?.[0]?.message?.content || '';
    } else if (provider === 'openai') {
      const model = process.env.AI_MODEL || 'gpt-4o-mini';
      const endpoint = 'https://api.openai.com/v1/chat/completions';

      const openAiMessages = [
        { role: 'system', content: `${AI_SYSTEM_PROMPT}\n\nPORTFOLIO KNOWLEDGE BASE:\n${VERIFIED_PORTFOLIO_KNOWLEDGE}` },
        ...recentMessages
      ];

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model,
          messages: openAiMessages,
          temperature: 0.5,
          max_tokens: 800
        })
      });

      if (!resp.ok) {
        throw new Error(`OpenAI API returned status ${resp.status}`);
      }
      const json = await resp.json();
      rawReply = json.choices?.[0]?.message?.content || '';
    }

    if (!rawReply) {
      throw new Error('Received empty response from AI provider.');
    }

    const { text, actions } = extractActions(rawReply);

    return {
      status: 200,
      data: {
        text,
        actions,
        isLiveAI: true,
        provider
      }
    };
  } catch (err) {
    console.error('AI Service Error:', err);
    // Graceful degradation with verified fallback
    const fallback = generateVerifiedFallback(lastUserMessage);
    return {
      status: 200,
      data: {
        text: fallback.text,
        actions: fallback.actions,
        isLiveAI: false,
        providerNote: "Notice: Live AI provider temporarily encountered an error. Showing verified portfolio answer directly."
      }
    };
  }
}
