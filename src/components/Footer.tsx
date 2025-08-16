// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} MediaBoss</span>
        <div className="flex gap-4 mt-3 md:mt-0">
          <Link href="/privacidade" className="text-gray-500 hover:text-primary text-sm">Política de Privacidade</Link>
          <Link href="/termos" className="text-gray-500 hover:text-primary text-sm">Termos de Serviço</Link>
          <Link href="/exclusao-dados" className="text-gray-500 hover:text-primary text-sm">Exclusão de Dados</Link>
        </div>
      </div>
    </footer>
  );
}
