# Rocketseat-Bootcamp-Modulo3
Desenvolvimento de um marketplace usando nodejs e mongoDb

Nesse terceiro desafio você irá melhorar a aplicação desenvolvida durante o terceiro módulo
com as seguintes funcionalidades:
<ul>
<li>Armazene as intenções de compra (Purchase) no MongoDB criando um Model e salvando
  os dados da purchase no método store do PurchaseController;</li>
<li>Crie uma nova rota para o vendedor aceitar uma intenção de compra declarando o item
como vendido e a partir desse momento o anúncio não deve ser mais exibido nas
listagens e não deve ser mais possível realizar uma intenção de compra para esse anúncio;</li>
<li>O Ad deve possui um campo adicional chamado purchasedBy que armazena o ID da
Purchase que o vendedor aceitou, caso esse campo esteja presente, quer dizer que o
anúncio foi vendido;</li>
</ul>
