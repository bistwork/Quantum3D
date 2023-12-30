'use client'

import { Inter } from "next/font/google";
import form from "./form.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return form();
}
