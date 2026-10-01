## Portal Administrativo de Gestão de Cartas

Esta é uma aplicação de um desafio para a vaga do LigaMagic.  
A aplicação consiste de uma tela de login, que apenas usuários cadastrados e permitidos podem ter acesso à próxima página: o Dashboard.

O dashboard é um painel de administração e gestão de cartas de três diferentes card games: Magic: The gathering, Pokémon e Yu-Gi-Oh!.  
<br>

### Como utilizar a aplicação (sem Docker)
1. Garanta que você tenha o PHP e o XAMPP instalado na sua máquina. Em relação ao PHP, adicione no `Path` das Variáveis de Ambiente.
2. Também garanta que o diretório em que o PHP está instalado possua um arquivo `php.ini`. E que ele possua as linhas `extension=mysqli` e `extension_dir="ext"` descomentadas.
    - Importante: Caso você não tenha esse arquivo, apenas duplique o arquivo `php.ini-development`, nomeando ele como só `php.ini`. Depois, com o comando `Ctrl+F`, procure primeiro `extension=mysql`, e você verá que tem uma linha do mesmo jeito só que comentada dessa forma: `;extension=mysqli`, então você descomenta tirando o primeiro caractere (`;`). E faça o mesmo com `extension_dir="ext"`.
3. Ative um servidor MySQL, de preferência no XAMPP, e na porta 3306 para ser possível o serviço reconhecer o banco de dados.
4. Abra o PhpMyAdmin pelo XAMPP, ou pelo MySQL Workbench, e adicione um banco de dados com o nome `ligamagic_desafio` e que possua as queries que estão no arquivo `backend/database.sql` já acionadas.
5. Com o repositório aberto na sua máquina, entre na pasta `/backend` e no terminal digite `php -S localhost:8080`. Isso iniciará um servidor PHP que poderá ser utilizado pelo frontend para a aplicação funcionar.
6. Com tudo isso feito, agora tudo estará funcionando! Para finalmente utilizar a aplicação, abra o arquivo `frontend/index.html` em um navegador, e você pode começar testando o login de administrador de e-mail `adm01@email.com` e senha `123456`.

### Como utilizar a aplicação (com Docker)
1. Abra a raiz do repositório no terminal WSL e digite `docker compose up -d`, para construir a aplicação com Docker.
2. Após esperar, abra o arquivo `frontend/index.html` em um navegador. Essa é a tela de login.