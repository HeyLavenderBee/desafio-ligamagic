## Portal Administrativo de Gestão de Cartas

Esta é uma aplicação de um desafio para a vaga do LigaMagic.  
A aplicação consiste de uma tela de login, que apenas usuários cadastrados e permitidos podem ter acesso à próxima página: o Dashboard.

O dashboard é um painel de administração e gestão de cartas de três diferentes card games: Magic: The gathering, Pokémon e Yu-Gi-Oh!.  

### Como utilizar a aplicação (sem Docker)
1. Garanta que você tenha o PHP ou o XAMPP instalado na sua máquina, mas de preferência o PHP, e que tenha ele adicionado como no `Path` das Variáveis de Ambiente.
2. Também garanta que o diretório em que o PHP está instalado possua um arquivo `php.ini`. e ele possua as linhas `extension=mysqli` e `extension_dir="ext"` descomentadas.
    - Caso você não tenha esse arquivo, apenas duplique o arquivo `php.ini-development`, nomeando ele como só `php.ini`. Depois, com o comando `Ctrl+F`, procure primeiro `extension=mysql`, e você verá que tem uma linha do mesmo jeito só que comentada dessa forma: `;extension=mysqli`, então você descomenta tirando o primeiro caractere. E faça o mesmo com `extension_dir="ext"`.
3. Ative um servidor MySQL, de preferência no XAMPP, e na porta 3306.
4. Com o repositório aberto na sua máquina, entre na pasta `/backend` e no terminal digite `php -S localhost:9990`. Isso iniciará um servidor PHP que poderá ser utilizado pelo frontend para a aplicação funcionar.
