import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse("Error: " + data.message);
      }
    } catch (err) {
      setResponse("요청 실패: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GPT API 테스트</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="질문을 입력하세요"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={sendPrompt} disabled={loading || !prompt.trim()}>
        {loading ? "전송 중..." : "전송"}
      </button>
      <div style={{ marginTop: 20 }}>
        <h3>응답:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
