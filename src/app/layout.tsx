import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from '@/components/Layout'; // Importa o Layout simplificado

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// AQUI: Metadata otimizada para SEO
export const metadata: Metadata = {
  title: "MediaBoss | Automação com IA para Redes Sociais",
  description: "Crie, agende e publique conteúdo para suas redes sociais com o poder da inteligência artificial. O MediaBoss é a ferramenta definitiva para otimizar sua presença online e economizar tempo.",
  keywords: ["automação de redes sociais", "inteligência artificial", "marketing digital", "agendamento de posts", "criação de conteúdo", "gestão de mídias sociais", "MediaBoss"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
		  <Layout>
			{children}
		</Layout>
      </body>
    </html>
  );
}
