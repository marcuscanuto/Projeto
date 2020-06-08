
function Ufpopulate(){
    const Ufselect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(resp => resp.json()).then(states =>{

            for(let state of states){
                    Ufselect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
            }
    
        
    })
    // fetch() return uma Promise
}

Ufpopulate()

function getCity(event){ 
        // event palavra reservada pra quando acontecer um evento e aí ele pega esse evento
        const citys = document.querySelector("select[name=city]")
        const stateInput = document.querySelector('input[name=state]')
        const indexofSelectState = event.target.selectedIndex
        const ufValue = event.target.value /*target onde esse evento foi executado*/
        stateInput.value = event.target.options[indexofSelectState].text
        
        

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citys.innerHTML ="<option value>Selecione a cidade</option>" /*limpando o campo*/
    citys.disabled = true

    fetch(url).then(resp => resp.json()).then(cities => {

        for( let cit of cities){
                citys.innerHTML += `<option value="${cit.nome}">${cit.nome}</option> `
        }

        citys.disabled = false
    })


}

// usar ibge servições api pra popular o campo de estados e cidades vai lá em localidades
document.querySelector('select[name=uf]').addEventListener("change",getCity) 
// assim quando mudar que ela vai ser executada
// getCity() se deixar com os parênteses quer dizer que é para executar imediatamente
// addEventListener() significa que essa propriedade sempre vai ficar ouvindo um evento. change é o evento de mudança do campo.


//ítens de coleta

const itensTocollect = document.querySelectorAll('.itens-grid li')

for(let item of itensTocollect){
        item.addEventListener("click",handleSelectedItem) 
        // item.addEventListener("click") escutando o evento click
}






const collectedItems = document.querySelector('input[name=items]')
let SelectedItems = []


function handleSelectedItem(event){
        const itemLi = event.target
        itemLi.classList.toggle("selected")
        const itemId = itemLi.dataset.id

        // console.log('ITEM ID: ',itemId)
        
        // verificar se existe item selecionados
        // se tiver quais e pegar eles
        const alreadySelected = SelectedItems.findIndex(item => item == itemId)
        // findIndex() recebe uma callback procura o index e armazena na variável.

        // se já estiver selecionado tirar da seleção
        if(alreadySelected >=0){
                const filteredItems = SelectedItems.filter(item =>{
                        const itemIsdifferent = item !=itemId
                        return itemIsdifferent
                })
                SelectedItems = filteredItems
        }else{
                SelectedItems.push(itemId)
        }


        // console.log('selected items: ',SelectedItems)
        // console.log(SelectedItems)                
        collectedItems.value = SelectedItems
} 


