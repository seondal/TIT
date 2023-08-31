"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [idList, setIdList] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIdList((prev) => [input, ...prev]);
    setInput("");
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Github Profile Table MD Generator</h1>
      <form onSubmit={onSubmit}>
        <input
          id="id"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <ul>
        {idList.map((id, idx) => (
          <li key={idx}>{id}</li>
        ))}
      </ul>
    </main>
  );
}
