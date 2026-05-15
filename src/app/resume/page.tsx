"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function ResumePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [deploys, setDeploys] = useState<any[]>([]);
  const [checks, setChecks] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const qDeploy = query(collection(db, "deploys"), where("userEmail", "==", user.email));
      const snapDeploy = await getDocs(qDeploy);
      setDeploys(snapDeploy.docs.map(doc => ({ ...doc.data(), docId: doc.id })));

      // Para checks, podríamos guardarlos en una colección similar; por ahora vacío
      const qCheck = query(collection(db, "checks"), where("userEmail", "==", user.email));
      const snapCheck = await getDocs(qCheck);
      setChecks(snapCheck.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
    };
    fetchData();
  }, [user]);

  if (!user) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">{t("dashboard")}</h1>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{t("yourDeploys")}</h2>
        <ul className="space-y-2">
          {deploys.map((d) => (
            <li key={d.docId} className="bg-white p-3 rounded shadow">
              <Link href={`/view/${d.id}`} className="text-blue-600 underline">{t("view")} ({d.id})</Link>
              <p>{t("details")}: {d.language} - {new Date(d.createdAt?.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("yourChecks")}</h2>
        <ul className="space-y-2">
          {checks.map((c) => (
            <li key={c.docId} className="bg-white p-3 rounded shadow">
              {/* Aquí los detalles */}
              <p>{c.language} - {c.code?.substring(0, 50)}...</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
