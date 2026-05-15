"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function HomePage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bienvenido, {user.email}</h1>
        <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded">Cerrar sesión</button>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
        <Link href="/checkcode" className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
          <h2 className="text-xl font-semibold">{t("checkFile")}</h2>
        </Link>
        <Link href="/deploy" className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
          <h2 className="text-xl font-semibold">{t("playground")}</h2>
        </Link>
        <Link href="/resume" className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
          <h2 className="text-xl font-semibold">{t("dashboard")}</h2>
        </Link>
      </div>
    </div>
  );
}
