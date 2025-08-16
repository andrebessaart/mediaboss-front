// app/privacidade.tsx
export default function Privacidade() {
  return (
    <main className="min-h-screen py-12 px-6 md:px-36 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-8">Política de Privacidade</h1>

      <p className="mb-6 text-gray-700">
        Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações dos usuários da nossa plataforma de automação e agendamento de postagens no Instagram utilizando inteligência artificial (“IA”).
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">1. Informações coletadas</h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          <b>Dados de cadastro:</b> Nome, e-mail e senha para criação de conta e autenticação.
        </li>
        <li>
          <b>Dados de integração Instagram/Facebook:</b> Para utilizar nossos serviços, solicitamos autorização para acessar sua conta profissional do Instagram via API oficial da Meta. Os dados coletados incluem identificador da conta, permissões de publicação e, quando necessário, informações básicas da página associada.
        </li>
        <li>
          <b>Dados de uso:</b> Informações sobre o uso do sistema, como quantidade de postagens, créditos adquiridos e agendamentos realizados, para garantir a funcionalidade e melhoria contínua do serviço.
        </li>
        <li>
          <b>Conteúdo gerado por IA:</b> As imagens e legendas criadas pela inteligência artificial podem ser analisadas para aprimoramento dos algoritmos, de forma totalmente anonimizada.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">2. Uso das informações</h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>Fornecer o serviço de automação e agendamento de postagens no Instagram.</li>
        <li>Permitir que o usuário utilize a IA para criação de conteúdo.</li>
        <li>Processar e gerenciar créditos vitalícios adquiridos pelo usuário.</li>
        <li>Melhorar e personalizar a experiência de uso.</li>
        <li>Enviar comunicações importantes relacionadas à conta, atualizações ou suporte.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">3. Compartilhamento de informações</h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          Não vendemos, alugamos ou compartilhamos dados pessoais dos usuários com terceiros, exceto quando necessário para o funcionamento do serviço (ex: integração oficial com Meta/Facebook para publicação de conteúdo).
        </li>
        <li>
          As informações só são compartilhadas mediante autorização explícita do usuário e em conformidade com a legislação aplicável.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">4. Segurança das informações</h2>
      <p className="mb-6 text-gray-700">
        Utilizamos medidas de segurança técnicas e administrativas apropriadas para proteger os dados dos usuários contra acesso não autorizado, alteração, divulgação ou destruição. Todos os acessos à API do Instagram/Facebook são realizados via conexão segura (HTTPS) e os tokens de autenticação são armazenados de forma protegida.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">5. Direitos dos usuários</h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          O usuário pode, a qualquer momento, acessar, corrigir ou excluir seus dados pessoais, bem como desconectar a integração com o Instagram/Facebook, diretamente no painel do sistema.
        </li>
        <li>
          Para solicitar a exclusão permanente da conta e de todos os dados, basta enviar um e-mail para <b>contato@iabessa.com</b>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">6. Política de uso da IA</h2>
      <ul className="mb-6 list-disc pl-6 text-gray-700">
        <li>
          As sugestões de imagens e legendas geradas pela IA são baseadas nas informações fornecidas pelo próprio usuário e em padrões públicos, não havendo coleta ou uso de dados sensíveis.
        </li>
        <li>
          O usuário tem total controle sobre o conteúdo gerado antes da publicação.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">7. Alterações nesta política</h2>
      <p className="mb-6 text-gray-700">
        Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que revise esta página regularmente. Avisaremos em caso de alterações significativas.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">8. Contato</h2>
      <p className="mb-6 text-gray-700">
        Em caso de dúvidas, solicitações ou para exercer seus direitos, entre em contato pelo e-mail <b>contato@iabessa.com</b>.
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
