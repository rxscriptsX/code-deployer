"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CreateAccountPage() {
  const { t, lang, setLang } = useLanguage();
  const [username, setUsername] = useState("");
  const [customId, setCustomId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validar customId (6 caracteres)
    if (customId.length !== 6) {
      setError("El ID personalizado debe tener exactamente 6 caracteres.");
      return;
    }
    // Verificar unicidad del customId
    const q = query(collection(db, "users"), where("customId", "==", customId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      setError("Ese ID personalizado ya está en uso.");
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Guardar datos en Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        username,
        customId,
        email,
        language: lang,
        createdAt: new Date(),
      });
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleCreate} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">{t("createAccount")}</h2>
        <input placeholder={t("username")} value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full mb-2" required />
        <input placeholder={t("customId")} value={customId} onChange={(e) => setCustomId(e.target.value)} maxLength={6} className="border p-2 w-full mb-2" required />
        <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" required />
        <div className="mb-2">
          <label className="block mb-1">{t("language")}:</label>
          <select value={lang} onChange={(e) => setLang(e.target.value as "es"|"en")} className="border p-2 w-full">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 w-full rounded">{t("createBtn")}</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
