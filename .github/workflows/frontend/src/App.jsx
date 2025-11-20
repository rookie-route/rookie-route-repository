import { useState } from "react";

function App() {
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);

    const analyzeCode = async () => {
        const res = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code })
        });

        const data = await res.json();
        setResult(data.analysis);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Rookie Route – Code Analyzer</h1>

            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here…"
                style={{ width: "100%", height: "200px", marginBottom: "20px" }}
            />

            <button onClick={analyzeCode}>
                Analyze My Code
            </button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h2>Analysis Result</h2>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
