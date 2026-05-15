"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CheckCodePage() {
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("html");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ errors: [{ line: 0, message: "Error de conexión" }] });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">{t("checkFile")}</h1>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("pasteCode")} className="w-full h-60 border p-4 rounded" />
      <div className="flex gap-4 mt-4 items-center">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-2 rounded">
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="lua">Lua</option>
          <option value="java">Java</option>
        </select>
        <button onClick={handleCheck} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50">
          {loading ? "Analizando..." : t("analyze")}
        </button>
      </div>
      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          {result.errors && result.errors.length > 0 ? (
            result.errors.map((e: any, i: number) => (
              <p key={i} className="text-red-600">{t("errorAt").replace("{line}", e.line).replace("{message}", e.message)}</p>
            ))
          ) : (
            <p className="text-green-600">{t("noErrors")}</p>
          )}
          {result.recommendation && (
            <p className="mt-2 text-gray-700">{t("recommendation").replace("{suggestion}", result.recommendation)}</p>
          )}
        </div>
      )}
    </div>
  );
}
