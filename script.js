let c = (e) => document.querySelector(e);
let cs = (el) => document.querySelectorAll(el);
let modalQt = 1;


pizzaJson.map((item, index) => {
	let pizzaItem = c('.models .pizza-item').cloneNode(true); //clonagem do ambiente para receber as pizzas

	pizzaItem.setAttribute('data-key', index); //setando data-key baseado no index
	//Colagem de cada pizza - Descrição e foto:
	pizzaItem.querySelector('.pizza-item--img img').src = item.img;//Aqui manipulamos diretamente o atributo da tag IMG, por isso não usamos innerHTML;
	pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
	pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
	pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
	pizzaItem.querySelector('a').addEventListener('click', (e) => {
		e.preventDefault(); //Previnir atualização da página a cada clicada;

		//Preenchimento de modal usando o index(data-key) da pizza clicada:
		let key = e.target.closest('.pizza-item').getAttribute('data-key');
		modalQt = 1; //Abertura de modal sempre com quantidade 1;

		c('.pizzaBig img').src = pizzaJson[key].img;
		c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
		c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
		c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
		//tamanhos:
		c('.pizzaInfo--size.selected').classList.remove('selected');//Remover para padronizar abertura sempre na maior
		cs('.pizzaInfo--size').forEach((size, sizeIndex)=> {
			if ( sizeIndex === 2) { //Selecionando sempre a maior para selecionar, baseado no data-key da última
				size.classList.add('selected');
			}
			size.querySelector('span').innerHTML = pizzaJson[key].sizes[key];
		});

		c('.pizzaInfo--qt').innerHTML = modalQt;// Preenchimento do modalQt padronizado

		c('.pizzaWindowArea').style.opacity = 0; //Suavidade na abertura do modal
		c('.pizzaWindowArea').style.display = 'flex';
		setTimeout(()=> {
			c('.pizzaWindowArea').style.opacity = 1;
		}, 200)
	});

	c('.pizza-area').append(pizzaItem); //colagem da clonagem na área de destino

});

//Criação da função de fechamento
const closeModal = () => {
	c('.pizzaWindowArea').style.opacity = 0;
	setTimeout(()=>{
		c('.pizzaWindowArea').style.display = 'none';
	}, 500);
};

//aplicação em elementos da função de fechamento:
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) =>{
	item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', () => {
	if (modalQt > 1) {
		modalQt--;
	c('.pizzaInfo--qt').innerHTML = modalQt;
	}
})

c('.pizzaInfo--qtmais').addEventListener('click', () => {
	modalQt++;
	c('.pizzaInfo--qt').innerHTML = modalQt;

});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=> {
		size.addEventListener('click', (e)=>{
		c('.pizzaInfo--size.selected').classList.remove('selected');
		size.classList.add('selected');
	})
});



