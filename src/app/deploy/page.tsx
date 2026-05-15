"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DeployPage() {
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("html");
  const [deployUrl, setDeployUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setDeployUrl(data.url);
    } catch (err) {
      alert("Error al desplegar");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">{t("playground")}</h1>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("pasteCode")} className="w-full h-60 border p-4 rounded" />
      <div className="flex gap-4 mt-4 items-center">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-2 rounded">
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
        </select>
        <button onClick={handleDeploy} disabled={loading} className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50">
          {loading ? "Desplegando..." : t("deploy")}
        </button>
      </div>
      {deployUrl && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <p>¡Web desplegada! <a href={deployUrl} target="_blank" className="text-blue-600 underline">{deployUrl}</a></p>
        </div>
      )}
    </div>
  );
}
