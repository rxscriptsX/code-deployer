import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";

export default async function ViewPage({ params }: { params: { id: string } }) {
  const q = query(collection(db, "deploys"), where("id", "==", params.id));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return notFound();

  const deployData = snapshot.docs[0].data();
  const code = deployData.code;

  return (
    <div dangerouslySetInnerHTML={{ __html: code }} />
  );
}
