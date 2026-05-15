"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">{t("loginTitle")}</h2>
        <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">{t("loginBtn")}</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4 text-center">
          ¿No tienes cuenta? <Link href="/cc" className="text-blue-600">{t("createAccount")}</Link>
        </p>
      </form>
    </div>
  );
}
