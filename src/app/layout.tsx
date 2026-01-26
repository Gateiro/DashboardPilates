import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Pilates Dashboard",
  description: "Gestão inteligente para o seu estúdio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-800 bg-background`}
      >
        {/* Container Principal Flex */}
        <div className="flex min-h-screen">
          
          {/* Barra Lateral (Esquerda) */}
          <Sidebar />

          {/* Área de Conteúdo (Direita) */}
          <div className="flex-1 flex flex-col relative min-h-screen bg-background">
            <Header />
            
            {/* O main envolve o conteúdo da página */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}