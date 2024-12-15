import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Mitsuha Nikkei | Fusión Peruano Japonesa",
  description: "Experiencia gastronómica única de fusión peruano-japonesa en Lo Barnechea. Sushi, ceviches y más.",
  keywords: "sushi, nikkei, peruano japonés, Lo Barnechea, restaurant, Mitsuha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans bg-black antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}