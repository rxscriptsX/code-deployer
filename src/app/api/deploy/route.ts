import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // instalar: npm i uuid @types/uuid

export async function POST(request: NextRequest) {
  const { code, language, userEmail } = await request.json();
  if (!userEmail) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const id = uuidv4().slice(0, 8);
  await addDoc(collection(db, "deploys"), {
    id,
    code,
    language,
    userEmail,
    createdAt: new Date(),
  });

  const url = `${request.nextUrl.origin}/view/${id}`;
  return NextResponse.json({ url });
}
