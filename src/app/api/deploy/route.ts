import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // en servidor no, usaremos session... mejor pasar el uid desde cliente o usar token. Simplificaremos guardando con email desde cliente.
// Para evitar complejidad, el cliente envía el email (ya autenticado) y lo usamos.
