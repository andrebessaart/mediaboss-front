// components/PlanStatus.tsx
import DashboardCard from "./DashboardCard";
import Button from "./Button";
import Link from 'next/link';

export default function PlanStatus() {
  // Aqui você pode buscar os dados do usuário/logado e plano
  const plano = {
    nome: "Pro Vitalício",
    creditos: 88,
    creditosTotais: 100,
    renovacao: null, // Exemplo: null para vitalício
  };

  return (
    <DashboardCard title="Meu Plano">
      <div className="mb-2">
        <span className="font-semibold">{plano.nome}</span>
      </div>
      <div className="mb-2">
        <div className="text-sm mb-1">Créditos restantes</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
          <div
            className="bg-primary h-3 rounded-full"
            style={{ width: `${(plano.creditos / plano.creditosTotais) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-700">{plano.creditos} de {plano.creditosTotais} créditos</span>
      </div>
      {plano.renovacao && (
        <div className="text-xs text-gray-500">Renovação em {plano.renovacao}</div>
      )}
		  <Button
			href="/planos"
			variant="insta"
		   // className="inline-block mt-4 bg-secondary text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition"
		  >
			Ver planos
		  </Button>
    </DashboardCard>
  );
}
