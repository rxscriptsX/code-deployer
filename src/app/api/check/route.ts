import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, language } = await req.json();
  // Simular un pequeño delay (10 seg)
  await new Promise((r) => setTimeout(r, 10000));
  // Respuesta de ejemplo – integrar aquí IA real más adelante
  if (code.includes("error")) {
    return NextResponse.json({
      errors: [
        { line: 3, message: "Unexpected token" },
        { line: 7, message: "Missing semicolon" }
      ],
      recommendation: "Revisa la sintaxis en las líneas indicadas."
    });
  }
  return NextResponse.json({ errors: [], recommendation: "El código parece correcto." });
}
