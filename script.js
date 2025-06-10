
 //let carrinho = [];

 const carrinhoSalvo = localStorage.getItem('carrinho');
let carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

// 2. Função que atualiza o contador do carrinho no botão
function renderizarCarrinho() {
    salvarCarrinho();
  document.getElementById('cart-count').innerText =
    carrinho.reduce((total, item) => total + item.qtd, 0);
    
}
function removerItem(index) {
  if (index >= 0 && index < carrinho.length) {
    carrinho.splice(index, 1);
    salvarCarrinho(); // salva no localStorage
    renderizarCarrinho(); // atualiza contador
  }
}
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

 // Abre o modal ao clicar em qualquer botão com a classe .adicionar-categoria
  document.querySelectorAll('.adicionar-categoria').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = new bootstrap.Modal(document.getElementById('modalProdutos'));
      modal.show();
    });
  });
  
  function adicionarAcai() {
  const valor = parseFloat(document.getElementById('valorAcai').value);
  const qtd = parseInt(document.getElementById('qtdAcai').value);

  if (isNaN(valor) || valor <= 0) {
    mostrarMensagem("⚠️ Insira um valor válido para o Açaí.", false);
    return;
  }

  if (isNaN(qtd) || qtd <= 0) {
    mostrarMensagem("⚠️ Insira uma quantidade válida para o Açaí.", false);
    return;
  }

  carrinho.push({ nome: 'Açaí', valor: valor, qtd: qtd });
    salvarCarrinho();
renderizarCarrinho();
  mostrarMensagem(`✅ Açaí adicionado com sucesso: R$ ${valor.toFixed(2)} x ${qtd}`, true);


  // Exemplo: adicionar ao carrinho
  // carrinho.push({ nome: 'Açaí', valor: valor, qtd: qtd });
}
// Botão para abrir o carrinho
document.querySelector('.abrir-cart').addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('modalCarrinho'));
  preencherCarrinhoModal();
  modal.show();
});

// Preenche o modal do carrinho com os dados atuais
function preencherCarrinhoModal() {
  const lista = document.getElementById('lista-carrinho-modal');
  const totalSpan = document.getElementById('total-carrinho-modal');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, i) => {
    const subtotal = item.valor * item.qtd;
    total += subtotal;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${item.qtd}x ${item.nome} - R$ ${item.valor.toFixed(2)}
      <button class="btn btn-sm btn-danger" onclick="removerItem(${i}); preencherCarrinhoModal();">Remover</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.innerText = total.toFixed(2);
  

}
// Função para adicionar Açaí com valor fixo
function adicionarAcaiValorFixo() {
  const valor = 12.00; // valor fixo em reais
  const qtd = parseInt(document.getElementById('qtdAcai').value);

  if (qtd <= 0) {
    mostrarMensagem("⚠️ Insira uma quantidade válida para o Açaí.", false);
    return;
  }

  carrinho.push({ nome: "Açaí", valor, qtd });
  renderizarCarrinho();
  mostrarMensagem(`✅ Adicionado com sucesso`, true);
  document.getElementById('qtdAcai').value = '1';
}

// Função para exibir o popup
function mostrarMensagem(texto, sucesso = true) {
    const popup = document.getElementById('popupMensagem');
    popup.className = `fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-50 transition-opacity duration-300 ease-in-out
     
        ${sucesso ? 'bg-green-500' : 'bg-red-500'}`;
    popup.innerText = texto;
    popup.classList.remove('hidden');

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}


