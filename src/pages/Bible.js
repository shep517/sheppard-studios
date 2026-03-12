import React, { useState, useEffect, useCallback, useRef } from 'react';
import Anthropic from '@anthropic-ai/sdk';

const OT_BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra',
  'Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon',
  'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'
];

const NT_BOOKS = [
  'Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians',
  'Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter',
  '1 John','2 John','3 John','Jude','Revelation'
];

function BiblePage() {
  const [books, setBooks] = useState([]);
  const [bibleData, setBibleData] = useState(null);
  const [bibleLoading, setBibleLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [otOpen, setOtOpen] = useState(true);
  const [ntOpen, setNtOpen] = useState(true);

  // AI chat state
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [highlightedVerses, setHighlightedVerses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bible_highlights') || '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    // Books index is static — hardcoded to avoid fetching 4.5MB just for the sidebar
    setBooks([
      {name:'Genesis',chapters:50},{name:'Exodus',chapters:40},{name:'Leviticus',chapters:27},
      {name:'Numbers',chapters:36},{name:'Deuteronomy',chapters:34},{name:'Joshua',chapters:24},
      {name:'Judges',chapters:21},{name:'Ruth',chapters:4},{name:'1 Samuel',chapters:31},
      {name:'2 Samuel',chapters:24},{name:'1 Kings',chapters:22},{name:'2 Kings',chapters:25},
      {name:'1 Chronicles',chapters:29},{name:'2 Chronicles',chapters:36},{name:'Ezra',chapters:10},
      {name:'Nehemiah',chapters:13},{name:'Esther',chapters:10},{name:'Job',chapters:42},
      {name:'Psalms',chapters:150},{name:'Proverbs',chapters:31},{name:'Ecclesiastes',chapters:12},
      {name:'Song of Solomon',chapters:8},{name:'Isaiah',chapters:66},{name:'Jeremiah',chapters:52},
      {name:'Lamentations',chapters:5},{name:'Ezekiel',chapters:48},{name:'Daniel',chapters:12},
      {name:'Hosea',chapters:14},{name:'Joel',chapters:3},{name:'Amos',chapters:9},
      {name:'Obadiah',chapters:1},{name:'Jonah',chapters:4},{name:'Micah',chapters:7},
      {name:'Nahum',chapters:3},{name:'Habakkuk',chapters:3},{name:'Zephaniah',chapters:3},
      {name:'Haggai',chapters:2},{name:'Zechariah',chapters:14},{name:'Malachi',chapters:4},
      {name:'Matthew',chapters:28},{name:'Mark',chapters:16},{name:'Luke',chapters:24},
      {name:'John',chapters:21},{name:'Acts',chapters:28},{name:'Romans',chapters:16},
      {name:'1 Corinthians',chapters:16},{name:'2 Corinthians',chapters:13},{name:'Galatians',chapters:6},
      {name:'Ephesians',chapters:6},{name:'Philippians',chapters:4},{name:'Colossians',chapters:4},
      {name:'1 Thessalonians',chapters:5},{name:'2 Thessalonians',chapters:3},{name:'1 Timothy',chapters:6},
      {name:'2 Timothy',chapters:4},{name:'Titus',chapters:3},{name:'Philemon',chapters:1},
      {name:'Hebrews',chapters:13},{name:'James',chapters:5},{name:'1 Peter',chapters:5},
      {name:'2 Peter',chapters:3},{name:'1 John',chapters:5},{name:'2 John',chapters:1},
      {name:'3 John',chapters:1},{name:'Jude',chapters:1},{name:'Revelation',chapters:22},
    ]);
  }, []);

  const loadBibleData = useCallback(async () => {
    if (bibleData || bibleLoading) return;
    setBibleLoading(true);
    try {
      // Fetch KJV from GitHub (public domain, CORS-enabled)
      const res = await fetch('https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json');
      const raw = await res.json();
      // Convert array format [{name, abbrev, chapters: [[verse, ...], ...]}]
      // to nested object { BookName: { "1": { "1": verseText } } }
      const data = {};
      for (const book of raw) {
        data[book.name] = {};
        book.chapters.forEach((chapter, chIdx) => {
          data[book.name][String(chIdx + 1)] = {};
          chapter.forEach((verse, vIdx) => {
            data[book.name][String(chIdx + 1)][String(vIdx + 1)] = verse;
          });
        });
      }
      setBibleData(data);
    } finally {
      setBibleLoading(false);
    }
  }, [bibleData, bibleLoading]);

  const handleBookSelect = useCallback((bookName) => {
    setSelectedBook(bookName);
    setSelectedChapter(1);
    setSearchResults(null);
    setSearchQuery('');
    loadBibleData();
  }, [loadBibleData]);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    await loadBibleData();
    if (!bibleData) return;
    const results = [];
    for (const [book, chapters] of Object.entries(bibleData)) {
      for (const [ch, verses] of Object.entries(chapters)) {
        for (const [v, text] of Object.entries(verses)) {
          if (text.toLowerCase().includes(q)) {
            results.push({ book, chapter: ch, verse: v, text });
            if (results.length >= 200) break;
          }
        }
        if (results.length >= 200) break;
      }
      if (results.length >= 200) break;
    }
    setSearchResults(results);
    setSelectedBook(null);
  }, [searchQuery, bibleData, loadBibleData]);

  const currentChapterData = selectedBook && bibleData && bibleData[selectedBook]
    ? bibleData[selectedBook][String(selectedChapter)] || {}
    : null;

  const totalChapters = selectedBook
    ? (books.find(b => b.name === selectedBook)?.chapters || 1)
    : 1;

  const toggleHighlight = useCallback((ref) => {
    setHighlightedVerses(prev => {
      const next = { ...prev, [ref]: !prev[ref] };
      if (!next[ref]) delete next[ref];
      localStorage.setItem('bible_highlights', JSON.stringify(next));
      return next;
    });
  }, []);

  const saveApiKey = useCallback((key) => {
    setApiKey(key);
    localStorage.setItem('anthropic_api_key', key);
    setShowApiKeyInput(false);
  }, []);

  const sendChat = useCallback(async () => {
    if (!chatInput.trim() || chatLoading) return;
    if (!apiKey) { setShowApiKeyInput(true); return; }

    const userMsg = chatInput.trim();
    setChatInput('');
    const newMessages = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(newMessages);
    setChatLoading(true);

    // Build context from current passage if viewing one
    let systemPrompt = `You are a helpful Bible study assistant with deep knowledge of scripture, theology, and biblical history. Answer questions about the Bible clearly and concisely. You have access to the KJV (King James Version).`;
    if (selectedBook && currentChapterData) {
      const verseText = Object.entries(currentChapterData)
        .map(([v, t]) => `${v}. ${t}`)
        .join(' ');
      systemPrompt += `\n\nThe user is currently reading ${selectedBook} chapter ${selectedChapter} (KJV):\n${verseText.slice(0, 3000)}`;
    }

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: newMessages,
      });
      const assistantMsg = response.content[0].text;
      setChatMessages(prev => [...prev, { role: 'assistant', content: assistantMsg }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatLoading, apiKey, chatMessages, selectedBook, selectedChapter, currentChapterData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const bookList = (bookNames) => bookNames.filter(b => books.find(bk => bk.name === b));

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden" style={{ marginTop: '-2rem', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <div className={`flex-shrink-0 bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-y-auto ${sidebarOpen ? 'w-56' : 'w-10'}`}>
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="w-full flex items-center justify-center py-3 text-gray-400 hover:text-white hover:bg-gray-700 border-b border-gray-700"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
        {sidebarOpen && (
          <div className="p-2">
            {/* OT */}
            <button
              onClick={() => setOtOpen(o => !o)}
              className="w-full text-left px-2 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 flex justify-between items-center"
            >
              Old Testament <span>{otOpen ? '▾' : '▸'}</span>
            </button>
            {otOpen && bookList(OT_BOOKS).map(name => (
              <button
                key={name}
                onClick={() => handleBookSelect(name)}
                className={`w-full text-left px-3 py-1 text-sm rounded transition-colors ${
                  selectedBook === name ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}

            {/* NT */}
            <button
              onClick={() => setNtOpen(o => !o)}
              className="w-full text-left px-2 py-1.5 mt-2 text-xs font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300 flex justify-between items-center"
            >
              New Testament <span>{ntOpen ? '▾' : '▸'}</span>
            </button>
            {ntOpen && bookList(NT_BOOKS).map(name => (
              <button
                key={name}
                onClick={() => handleBookSelect(name)}
                className={`w-full text-left px-3 py-1 text-sm rounded transition-colors ${
                  selectedBook === name ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search all 31,100 verses..."
              className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
            >
              Search
            </button>
            {searchResults && (
              <button
                type="button"
                onClick={() => { setSearchResults(null); setSearchQuery(''); }}
                className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
              >
                Clear
              </button>
            )}
          </form>
          <span className="text-xs text-gray-500">KJV</span>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* No selection state */}
          {!selectedBook && !searchResults && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">✝</div>
              <h2 className="text-2xl font-bold text-gray-300 mb-2">KJV Bible Reference</h2>
              <p className="text-gray-500 text-sm max-w-md">
                Select a book from the sidebar to begin reading, or search for a word or phrase across all 31,100 verses.
              </p>
              <p className="text-gray-600 text-xs mt-4">
                Click the AI button (bottom right) to ask questions about what you're reading.
              </p>
            </div>
          )}

          {/* Loading state */}
          {bibleLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-3">⟳</div>
                <p className="text-gray-400">Loading Bible data...</p>
              </div>
            </div>
          )}

          {/* Search results */}
          {searchResults && !bibleLoading && (
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-4">
                {searchResults.length >= 200 ? '200+ results' : `${searchResults.length} results`} for "{searchQuery}"
              </h2>
              {searchResults.length === 0 && (
                <p className="text-gray-500">No verses found.</p>
              )}
              <div className="space-y-3">
                {searchResults.map(({ book, chapter, verse, text }, i) => {
                  const ref = `${book} ${chapter}:${verse}`;
                  const highlighted = highlightedVerses[ref];
                  const q = searchQuery.toLowerCase();
                  const idx = text.toLowerCase().indexOf(q);
                  const before = text.slice(0, idx);
                  const match = text.slice(idx, idx + q.length);
                  const after = text.slice(idx + q.length);
                  return (
                    <div
                      key={i}
                      className={`rounded-lg p-4 border transition-colors cursor-pointer ${
                        highlighted ? 'bg-yellow-900/30 border-yellow-600/50' : 'bg-gray-800 border-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => toggleHighlight(ref)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          className="text-xs font-bold text-blue-400 hover:text-blue-300 shrink-0"
                          onClick={e => { e.stopPropagation(); handleBookSelect(book); setSelectedChapter(parseInt(chapter)); setSearchResults(null); setSearchQuery(''); }}
                        >
                          {ref}
                        </button>
                        {highlighted && <span className="text-yellow-500 text-xs">★</span>}
                      </div>
                      <p className="text-gray-200 text-sm mt-1 leading-relaxed">
                        {before}<mark className="bg-yellow-500/40 text-yellow-200 rounded px-0.5">{match}</mark>{after}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chapter view */}
          {selectedBook && currentChapterData && !bibleLoading && !searchResults && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-1">{selectedBook}</h2>
              <p className="text-sm text-gray-500 mb-6">Chapter {selectedChapter} · King James Version</p>
              <div className="space-y-2">
                {Object.entries(currentChapterData).map(([verseNum, text]) => {
                  const ref = `${selectedBook} ${selectedChapter}:${verseNum}`;
                  const highlighted = highlightedVerses[ref];
                  return (
                    <div
                      key={verseNum}
                      onClick={() => toggleHighlight(ref)}
                      className={`group flex gap-3 rounded px-3 py-2 cursor-pointer transition-colors ${
                        highlighted ? 'bg-yellow-900/30' : 'hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-600 group-hover:text-blue-400 w-6 text-right shrink-0 pt-0.5 transition-colors">
                        {verseNum}
                      </span>
                      <p className={`text-base leading-relaxed ${highlighted ? 'text-yellow-200' : 'text-gray-200'}`}>
                        {text}
                        {highlighted && <span className="ml-2 text-yellow-500 text-xs">★</span>}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Chapter navigation */}
        {selectedBook && !searchResults && (
          <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => setSelectedChapter(c => Math.max(1, c - 1))}
              disabled={selectedChapter <= 1}
              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded text-sm transition-colors"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Chapter</span>
              <select
                value={selectedChapter}
                onChange={e => setSelectedChapter(parseInt(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm border border-gray-600"
              >
                {Array.from({ length: totalChapters }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="text-gray-500 text-sm">/ {totalChapters}</span>
            </div>

            <button
              onClick={() => setSelectedChapter(c => Math.min(totalChapters, c + 1))}
              disabled={selectedChapter >= totalChapters}
              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded text-sm transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="flex-shrink-0 w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div>
              <h3 className="font-semibold text-sm">Bible AI Assistant</h3>
              {selectedBook && (
                <p className="text-xs text-gray-500">{selectedBook} {selectedChapter} in context</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowApiKeyInput(o => !o)}
                title="Set API Key"
                className="text-gray-400 hover:text-gray-200 text-xs"
              >
                🔑
              </button>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-200">✕</button>
            </div>
          </div>

          {showApiKeyInput && (
            <div className="p-3 bg-gray-700 border-b border-gray-600">
              <p className="text-xs text-gray-400 mb-2">Enter your Anthropic API key (stored locally):</p>
              <input
                type="password"
                defaultValue={apiKey}
                onKeyDown={e => e.key === 'Enter' && saveApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-600 focus:outline-none focus:border-blue-500"
                id="apiKeyInput"
              />
              <button
                onClick={() => saveApiKey(document.getElementById('apiKeyInput').value)}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 rounded transition-colors"
              >
                Save Key
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 text-xs mt-8">
                <p className="text-2xl mb-2">✝</p>
                <p>Ask anything about the Bible.</p>
                {selectedBook && <p className="mt-1 text-gray-600">Currently reading: {selectedBook} {selectedChapter}</p>}
                <div className="mt-4 space-y-2 text-left">
                  {[
                    'What is the main theme of this chapter?',
                    'Who are the key figures mentioned?',
                    'What does this passage mean for today?',
                  ].map(s => (
                    <button
                      key={s}
                      onClick={() => { setChatInput(s); }}
                      className="w-full text-left text-xs text-blue-400 hover:text-blue-300 bg-gray-700 hover:bg-gray-600 rounded px-2 py-1.5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400">Thinking...</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendChat()}
                placeholder="Ask about scripture..."
                className="flex-1 bg-gray-700 text-white px-2 py-1.5 rounded text-xs border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={sendChat}
                disabled={chatLoading || !chatInput.trim()}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded text-xs transition-colors"
              >
                →
              </button>
            </div>
            {!apiKey && (
              <p className="text-xs text-yellow-600 mt-1">
                <button onClick={() => setShowApiKeyInput(true)} className="underline hover:text-yellow-500">Add API key</button> to enable AI
              </p>
            )}
          </div>
        </div>
      )}

      {/* AI toggle button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center text-xl transition-all hover:scale-110"
          title="Open Bible AI Assistant"
        >
          ✝
        </button>
      )}
    </div>
  );
}

export default BiblePage;
