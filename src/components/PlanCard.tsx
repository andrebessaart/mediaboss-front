// components/PlanCard.tsx
import Button from "./Button";
import Link from 'next/link';

type Plan = {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
};

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={`border-2 rounded-2xl p-6 ${plan.highlight ? "border-primary" : "border-gray-200"} shadow-sm bg-white`}>
      <h3 className="text-xl font-bold mb-2 text-primary">{plan.title}</h3>
      <div className="text-3xl font-extrabold text-text mb-2">{plan.price}</div>
      <ul className="mb-4 space-y-2">
        {plan.features.map(f => (
          <li key={f} className="text-sm text-gray-600 flex items-center">
            <span className="mr-2">✔️</span>{f}
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={plan.highlight ? "default" : "secondary"}>
        Escolher plano
      </Button>
    </div>
  );
}
