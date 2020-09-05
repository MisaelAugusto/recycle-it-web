<h1 align="center">Recycle It</h1>

<h2>🛠️ Requisitos Funcionais</h2>
<table width="100%">
  <tr>
    <th>ID</th>
    <th>Descrição</th>
    <th>Prioridade</th>
    <th>Status</th>
  </tr>
  <tr align="center">
    <td>01</td>
    <td>O usuário deve poder se cadastrar no sistema</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>02</td>
    <td>O usuário deve poder editar o seu perfil</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>03</td>
    <td>O usuário deve poder pesquisar por pontos de coleta</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>04</td>
    <td>O usuário deve poder criar um agendamento de reciclagem</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>05</td>
    <td>O usuário deve poder favoritar o ponto de coleta</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>06</td>
    <td>O usuário deve poder entrar em contato com um ponto de coleta</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>07</td>
    <td>O ponto de coleta deve poder se cadastrar no sistema</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>08</td>
    <td>O ponto de coleta deve poder editar o seu perfil</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>09</td>
    <td>O ponto de coleta deve poder finalizar agendamentos de reciclagem</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>10</td>
    <td>O sistema deve poder filtrar os pontos de coleta</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>11</td>
    <td>O sistema deve poder listar os agendamentos de reciclagem</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>12</td>
    <td>O sistema deve poder contabilizar no pefil do usuário a quantidade reciclada</td>
    <td>Essencial</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>13</td>
    <td>O sistema deve poder depositar créditos no perfil do usuário após entrega</td>
    <td>Desejável</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>14</td>
    <td>O ponto de coleta deve poder avaliar o usuário</td>
    <td>Desejável</td>
    <td>0%</td>
  </tr>
  <tr align="center">
    <td>15</td>
    <td>O usuário deve poder avaliar o ponto de coleta</td>
    <td>Desejável</td>
    <td>0%</td>
  </tr>
</table>

<h2>💼️ Regras de Negócio</h2>
<table width="100%">
  <tr>
    <th>ID</th>
    <th>Descrição</th>
    <th>Requisito Funcional</th>
  </tr>
  <tr align="center">
    <td>01</td>
    <td>O usuário não deve poder se cadastrar com um email já existente</td>
    <td>01</td>
  </tr>
  <tr align="center">
    <td>02</td>
    <td>O sistema deve poder gerar um id único para identificação do usuário</td>
    <td>01</td>
  </tr>
  <tr align="center">
    <td>03</td>
    <td>O usuário deve poder escoher se deseja utilizar sua localização para filtrar a busca</td>
    <td>03</td>
  </tr>
  <tr align="center">
    <td>04</td>
    <td>O usuário não deve poder acumular mais do que 3 agendamentos de reciclagem</td>
    <td>04</td>
  </tr>
  <tr align="center">
    <td>05</td>
    <td>O agendamento de reciclagem deve ter validade de 24 horas</td>
    <td>04</td>
  </tr>
  <tr align="center">
    <td>06</td>
    <td>O ponto de coleta não deve poder se cadastrar com um nome já existente</td>
    <td>07</td>
  </tr>
  <tr align="center">
    <td>07</td>
    <td>O ponto de coleta não deve poder se cadastrar com um email já existente</td>
    <td>07</td>
  </tr>
</table>

<h2>📌️ Requisitos Não-Funcionais</h2>
<table width="100%">
  <tr>
    <th>ID</th>
    <th>Descrição</th>
  </tr>
  <tr align="center">
    <td>01</td>
    <td>Utilizar ReactJS para o frontend</td>
  </tr>
  <tr align="center">
    <td>02</td>
    <td>Utilizar Node.js para o backend</td>
  </tr>
  <tr align="center">
    <td>03</td>
    <td>Utilizar Knex + sqlite3 como banco de dados</td>
  </tr>
</table>