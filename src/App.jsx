import "./index.css";
import { useState } from "react";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutPput, setcsvOutPput] = useState("");
  const [error, setError] = useState("");

  const convertToCsv = () => {
    try {
      if (!jsonInput.trim()) {
        setError("Preencha o Campo Vazio");
        return;
      }

      const jsonData = JSON.parse(jsonInput);
      if (!Array.isArray(jsonData)) {
        setError("JSON precisa ser uma lista de objetos");
        return;
      }

      const headers = Object.keys(jsonData[0]);
      const csvRows = jsonData.map(row =>
        headers.map(field => `"${row[field] ?? ""}"`).join(",")
      );

      setcsvOutPput([headers.join(","), ...csvRows].join("\n"));
      setError("");
    } catch {
      setError("JSON Inválido");  
    }
  };

  const clearFields = () => {
    setJsonInput("");
    setcsvOutPput("");
    setError("");
  };

  return (
    <div className="container">
      <h1>Converter JSON para CSV</h1>

      <div className="main-functions">
        <textarea
          value={jsonInput}
          name="cx1"
          rows={10}
          placeholder="Digite seu JSON aqui"
          onChange={(e) => setJsonInput(e.target.value)}
        ></textarea>

        {error && <p className="error-message">{error}</p>}

        <button onClick={convertToCsv} className="btn1">
          Converter para CSV
        </button>

        <button onClick={clearFields} className="btn2">Limpar</button>

        <textarea
          value={csvOutPput}
          name="cx2"
          rows={10}
          placeholder="Resultado em CSV"
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default App;
