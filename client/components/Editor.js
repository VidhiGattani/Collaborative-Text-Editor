"use client"

import React, { useRef, useEffect } from "react";

const Editor = ({ docId }) => {
  const editorRef = useRef(null);

  // ================= LOAD FROM DB =================
  useEffect(() => {
    if (!docId) return;

    fetch(`/api/document?id=${docId}`)
      .then(res => res.json())
      .then(data => {
        if (data.content && editorRef.current) {
          editorRef.current.innerHTML = data.content;
        }
      });
  }, [docId]);

  // ================= AUTO SAVE =================
  useEffect(() => {
    if (!docId) return;

    const interval = setInterval(() => {
      if (!editorRef.current) return;

      const content = editorRef.current.innerHTML;

      fetch("/api/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: docId,
          content,
        }),
      });
    }, 2000); // saves every 2 sec

    return () => clearInterval(interval);
  }, [docId]);

  // ================= BASIC FORMATTING =================
  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  // ================= HIGHLIGHT =================
  const highlightText = () => {
    document.execCommand("backColor", false, "#fff59d");
  };

  // ================= HEADING =================
  const applyHeading = (level) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();

    const heading = document.createElement(`h${level}`);
    heading.appendChild(selectedText);

    range.insertNode(heading);

    range.setStartAfter(heading);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  // ================= TOOLBAR =================
  const ToolbarButton = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-200 shadow-sm"
    >
      {label}
    </button>
  );

  const Divider = () => (
    <div className="w-full h-px bg-gray-300 my-2" />
  );

  return (
    <div className="h-screen bg-gray-100 text-black flex flex-col">
      
      {/* HEADER */}
      <div className="p-4 border-b border-gray-300 text-center text-lg font-semibold bg-white shadow-sm">
        Document Editor
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* EDITOR */}
        <div className="flex-1 p-6 flex justify-center">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="w-full max-w-4xl h-full bg-white border border-gray-300 rounded-xl p-6 outline-none shadow-md overflow-auto text-gray-900"
          ></div>
        </div>

        {/* TOOLBAR */}
        <div className="w-20 border-l border-gray-300 p-3 flex flex-col items-center gap-3 bg-white">
          
          {/* TEXT STYLE */}
          <ToolbarButton label="B" onClick={() => format("bold")} />
          <ToolbarButton label="I" onClick={() => format("italic")} />
          <ToolbarButton label="U" onClick={() => format("underline")} />
          <ToolbarButton label="🖍️" onClick={highlightText} />

          <Divider />

          {/* HEADINGS */}
          <ToolbarButton label="H1" onClick={() => applyHeading(1)} />
          <ToolbarButton label="H2" onClick={() => applyHeading(2)} />

          <Divider />

          {/* LISTS */}
          <ToolbarButton label="•" onClick={() => format("insertUnorderedList")} />
          <ToolbarButton label="1." onClick={() => format("insertOrderedList")} />

          <Divider />

          {/* EXTRA */}
          <ToolbarButton label="❝" onClick={() => format("formatBlock", "blockquote")} />
          <ToolbarButton label="</>" onClick={() => format("formatBlock", "pre")} />

          <Divider />

          {/* UNDO / REDO */}
          <ToolbarButton label="↺" onClick={() => format("undo")} />
          <ToolbarButton label="↻" onClick={() => format("redo")} />
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 12px 0;
        }
        h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 10px 0;
        }
        blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 12px;
          color: #555;
          margin: 10px 0;
          font-style: italic;
        }
        pre {
          background: #f4f4f4;
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default Editor;