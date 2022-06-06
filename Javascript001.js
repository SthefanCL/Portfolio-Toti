//menu responsivo//

const menu = document.getElementById('check')
const opcion = document.querySelectorAll('#menu-bar a')  

menu.addEventListener('change', () => {
   if(menu.checked){
        opcion.forEach((opcion) => {
            opcion.addEventListener('click', () => {
                menu.checked = false
            })
        })
    }else{
        console.log('Verificação de evento, não está detetando')
    }
})

// formulario //
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const campos = {
    nome: false,
	email: false,
	assunto: false,
	mensagem: false
}
const formato = { // condições de formato //
    nome: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras e espaços
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,//Letras/numero/ traço/underline
	assunto: /^[a-zA-ZÀ-ÿ\s\W]{5,20}$/, // < 20 carateres
	mensagem: /^[a-zA-ZÀ-ÿ\s\W]{5,150}$/ // < 150 careteres
}

const validarFormulario = (e) => {
	switch (e.target.name){
		case "nome": 
			validarCampo(formato.nome, e.target, 'nome');
		break;
		case "email": 
			validarCampo(formato.email, e.target, 'email');
		break;
		case "assunto": 
			validarCampo(formato.assunto, e.target, 'assunto');
		break;
		case "mensagem": 
            // validarTextmensagem();
			validarCampo(formato.mensagem, e.target, 'mensagem');
		break;
	}
}

const validarCampo = (expressao, input, campo) => {
	if(expressao.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorreto')
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-erro`).classList.remove('formulario__input-erro-ativo')
		campos[campo] = true
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorreto')
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-erro`).classList.add('formulario__input-erro-ativo')
		campos[campo] = false
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', (e) => {
	e.preventDefault()

	const terminos = document.getElementById('terminos')
	if(campos.nome && campos.email && campos.assunto && campos.mensagem){
		formulario.reset();

		document.getElementById('formulario__mensagem-exito').classList.add('formulario__mensagem-exito-ativo')
		document.getElementById('formulario__completo').classList.remove	('formulario__completo-ativo')
		setTimeout(() => {
			document.getElementById('formulario__mensagem-exito').classList.remove('formulario__mensagem-exito-ativo')
		}, 5000)

		document.querySelectorAll('.formulario__grupo-correto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correto')
		})
	}else {
		document.getElementById('formulario__completo').classList.add('formulario__completo-ativo')
	}
})

// API GitHub
let div_orden = document.querySelector("div #projetos")

function aleatorio() {
    let inferior = 1
    let superior = 3
    let numPosibilidades = superior - inferior;
    let aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return ale = inferior + aleatorio;
}

function creatCardRepos (titulo, descricao, url_repos, url_demo) {
    // Article//
    let card_repos = document.createElement("article")
    card_repos.classList.add("carta", "grande")

    // Imagem//
    let div_img = document.createElement("div")
    div_img.classList.add("img_card")

    function createImage() {
        let al = aleatorio()
        elem = document.createElement("img")
        elem.src = "img/" + al + ".jpg"
        elem.alt = al

        return elem
    }   

    div_img.appendChild(createImage())


   // Corpo do título//
   let body_title = document.createElement('div')
   body_title.classList.add("intern")

   let titulo_repos = document.createElement('h3')
   titulo_repos.textContent = titulo
   let descricao_repos = document.createElement('p')
   descricao_repos.textContent = descricao

   body_title.appendChild(titulo_repos)
   body_title.appendChild(descricao_repos)

   //botões//
   let body_btn = document.createElement('div')
   body_btn.classList.add("btn-block")

   let btn_repos = document.createElement('a')
   btn_repos.href = url_repos
   btn_repos.target = "_blank"
   btn_repos.textContent = "Repositorio"
   btn_repos.classList.add("btn")

   let btn_demo = document.createElement('a')
   btn_demo.href = url_demo
   btn_demo.target = "_blank"
   btn_demo.textContent = " Ver"
   btn_demo.classList.add("btn")

   body_btn.appendChild(btn_repos)
   body_btn.appendChild(btn_demo)

   card_repos.appendChild(div_img)
   card_repos.appendChild(body_title)
   card_repos.appendChild(body_btn)


   return card_repos

}

//API // - só agradecer o efra

function getApiGitHub () {
    const resp = "https://api.github.com/users/SthefanCL/repos?per_page=3" 
    fetch(resp)
    .then(async res =>  {
        if (!res.ok) {
            throw new erro(res.status)
        }

        var data = await res.json()
        div_orden.innerHTML = ""
        data.map(item => {
            div_orden.appendChild(creatCardRepos (item.name, item.description, item.html_url, item.homepage))

        })

    })
    .catch(e => console.log(e))
}

getApiGitHub()


/*Só preciso agradecer muito meus colegas pela ajuda em construir esse repositorio, sem eles não poderia ter conseguido!!!*/