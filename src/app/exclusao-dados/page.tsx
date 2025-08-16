// app/exclusao-dados/page.tsx

export default function ExclusaoDados() {
  return (
    <main className="min-h-screen py-12 px-6 md:px-36 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-8">
        Instruções para exclusão de dados – MediaBoss
      </h1>

      <p className="mb-6 text-gray-700">
        Valorizamos sua privacidade e garantimos o direito de exclusão dos seus dados da nossa plataforma.
        Siga as orientações abaixo para solicitar a remoção completa das suas informações do MediaBoss:
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        1. Solicitação de exclusão automática
      </h2>
      <p className="mb-6 text-gray-700">
        Caso você tenha uma conta ativa, basta acessar seu perfil dentro do MediaBoss e clicar na opção <b>&quot;Excluir minha conta&quot;</b>. Todo o seu cadastro, integrações e dados associados serão permanentemente removidos em até 7 dias úteis, sem possibilidade de recuperação.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        2. Solicitação manual por e-mail
      </h2>
      <p className="mb-6 text-gray-700">
        Se preferir, envie um e-mail para <a href="mailto:contato@iabessa.com" className="underline text-blue-600">contato@iabessa.com</a> com o assunto <b>EXCLUSÃO DE DADOS</b> e o endereço de e-mail usado no cadastro.  
        Nosso time realizará a remoção de todos os seus dados em até 7 dias úteis e você receberá uma confirmação por e-mail.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        3. Exclusão de dados integrados (Instagram/Facebook)
      </h2>
      <p className="mb-6 text-gray-700">
        Para remover as permissões de integração com Instagram/Facebook, basta desconectar sua conta na área de perfil do MediaBoss ou acessar as configurações de aplicativos conectados no próprio Facebook/Instagram.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 mt-8">
        4. Dúvidas ou problemas?
      </h2>
      <p className="mb-6 text-gray-700">
        Em caso de dúvidas, envie um e-mail para <a href="mailto:contato@iabessa.com" className="underline text-blue-600">contato@iabessa.com</a> e nossa equipe irá ajudar você no processo.
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
