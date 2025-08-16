// app/termos/page.tsx

export default function Termos() {
  return (
    <main className="min-h-screen py-12 px-6 md:px-36 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-8">
        Termos de Serviço – MediaBoss
      </h1>

      <p className="mb-6 text-gray-700">
        Bem-vindo ao MediaBoss! Ao utilizar nossa plataforma, você concorda com os termos e condições abaixo.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        1. Aceitação dos Termos
      </h2>
      <p className="mb-6 text-gray-700">
        Ao acessar ou utilizar qualquer funcionalidade do MediaBoss, você declara estar de acordo com estes Termos de Serviço, bem como com nossa Política de Privacidade. Caso não concorde, por favor não utilize o serviço.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        2. Cadastro e Conta do Usuário
      </h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          Para utilizar o MediaBoss, é necessário criar uma conta, fornecendo informações verdadeiras e atualizadas.
        </li>
        <li>
          O usuário é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.
        </li>
        <li>
          O compartilhamento de contas não é permitido.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        3. Funcionamento do Serviço
      </h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          O MediaBoss oferece automação e agendamento de postagens para o Instagram, com uso de inteligência artificial para geração de imagens e legendas.
        </li>
        <li>
          A integração com o Instagram/Facebook é realizada de forma oficial, via API aprovada pela Meta.
        </li>
        <li>
          Os créditos adquiridos são vitalícios e não expiram, podendo ser utilizados conforme a necessidade do usuário.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        4. Responsabilidades do Usuário
      </h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          Utilizar o serviço em conformidade com as leis e regulamentos aplicáveis.
        </li>
        <li>
          Não utilizar a plataforma para fins ilícitos, spam, conteúdos proibidos ou que violem direitos de terceiros ou das plataformas integradas.
        </li>
        <li>
          Garantir que possui permissão adequada para usar imagens, textos e outros conteúdos publicados por meio do MediaBoss.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        5. Limitações de Uso e Modificações
      </h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          O MediaBoss reserva-se o direito de suspender ou encerrar contas que violem estes Termos.
        </li>
        <li>
          O serviço pode ser atualizado, modificado ou descontinuado a qualquer momento, sem aviso prévio.
        </li>
        <li>
          Em caso de suspensão ou encerramento, os dados do usuário podem ser removidos permanentemente, conforme política de exclusão de dados.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        6. Propriedade Intelectual
      </h2>
      <p className="mb-6 text-gray-700">
        Todo o conteúdo, marca, layout, código-fonte e funcionalidades do MediaBoss pertencem à plataforma, sendo proibida sua reprodução total ou parcial sem autorização.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        7. Limitação de Responsabilidade
      </h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          O MediaBoss não se responsabiliza por eventuais indisponibilidades do Instagram, Facebook ou serviços de terceiros integrados.
        </li>
        <li>
          O usuário é o único responsável pelo conteúdo publicado.
        </li>
        <li>
          O serviço é oferecido &quot;no estado em que se encontra&quot;, podendo apresentar falhas ou interrupções eventuais.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        8. Cancelamento e Exclusão de Conta
      </h2>
      <p className="mb-6 text-gray-700">
        O usuário pode solicitar a exclusão da conta a qualquer momento, conforme instruções disponíveis na página de <a href="/exclusao-dados" className="underline text-blue-600">exclusão de dados</a>. Após a exclusão, todas as informações pessoais e integrações serão removidas definitivamente em até 7 dias úteis.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        9. Alterações nos Termos
      </h2>
      <p className="mb-6 text-gray-700">
        Reservamo-nos o direito de modificar estes Termos de Serviço a qualquer momento. Recomendamos que consulte esta página periodicamente. Mudanças significativas serão comunicadas via e-mail ou na própria plataforma.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        10. Contato
      </h2>
      <p className="mb-6 text-gray-700">
        Para dúvidas, sugestões ou reclamações, entre em contato pelo e-mail <a href="mailto:contato@iabessa.com" className="underline text-blue-600">contato@iabessa.com</a>.
      </p>

      <p className="mt-8 text-gray-400 text-sm">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
	    {/* Rodapé */}
      <footer className="w-full bg-indigo-800 text-white py-8 flex flex-col items-center mt-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <a href="mailto:contato@iabessa.com" className="underline hover:text-indigo-200">contato@iabessa.com</a>
        </div>
        <div className="mt-4 text-sm">&copy; {new Date().getFullYear()} AI <a href="https://mediaboss.iabessa.com"> MediaBoss </a> | Andre Bessa - CNPJ 16.868.023/0001-52. Todos os direitos reservados.</div>
      </footer>
    </main>
  );
}
