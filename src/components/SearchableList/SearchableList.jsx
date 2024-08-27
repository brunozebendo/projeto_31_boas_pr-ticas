/**Aula 516 fala sobre Render Props
 * The term “render prop” refers to a technique for sharing code between React
 * components using a prop whose value is a function. Essentially, a component
 * with a render prop takes a function that returns a React element and calls
 * it instead of implementing its own render logic. 
 * Assim, esse componente vai ser um mecanismo de busca dentro do input, ou seja,
 * é uma função q vai ser passada como props
 */

import { useRef, useState } from "react"

export default function SearchableList({items, itemKeyFn, children}){
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('')
/**o código abaixo é para buscar se o texto digitado está no array. Mais abaixo
 * ele é passado no map do return
 */
    const searchResults = items.filter(
        (item) => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))


/**Debouncing é uma técnica utilizada em programação para melhorar a performance de
 *  aplicações, especialmente ao lidar com eventos que ocorrem em rápida sucessão,
 *  como digitação, rolagem de página ou redimensionamento de janela.

Como Funciona?
Quando um evento é acionado repetidamente, o debounce garante que a função associada
 a esse evento só seja executada após um determinado período de inatividade.
  Isso evita que a função seja chamada várias vezes em um curto espaço de tempo,
   o que pode sobrecarregar a aplicação.

Exemplo Prático
Imagine que você tem um campo de busca que sugere resultados enquanto o usuário digita. Sem debounce, cada tecla pressionada enviaria uma requisição ao servidor, o que pode ser ineficiente. Com debounce, a requisição só é enviada após o usuário parar de digitar por um certo tempo1.

Benefícios
Melhora a performance: Reduz o número de chamadas de função desnecessárias.
Economiza recursos: Menos requisições ao servidor, menos processamento.
Melhora a experiência do usuário: Respostas mais rápidas e eficientes

Assim, o código abaixo, aula 520, visa evitar que seja feita uma busca a cada palavra
digitada, mas q seja esperado 500 milisegundos, para isso, foi preciso criar
um useRef mais acima chamado lastchance, que vai guardar o valor corrente
do timer, assim, o if antes do setTimeout garante q o tempo seja zerado
se não passar os 500 milisegundos, é uma forma de garantir q busca seja
feita apenas se o usuário parar de digitar. */

    function handleChange(event) {
        if (lastChange.current) {
            clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
            lastChange.current = null
            setSearchTerm(event.target.value);
        }, 500);
    }
    /**Aqui para passar efetivamente o componente com função é preciso 
     * passar children() e dentro do parenteses o prop q será chamado
     * Já o itemKeyFn também foi passado como props e passado como uma function
     * também no app q automaticamente atribui o id do objeto como uma key
     * 
     * No App fica assim 
     *  <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
        {(item) => <Place item={item} /> }
      </SearchableList>
     */
    return <div className="searchable-list">
        <input type="search" placeholder="Search" onChange={handleChange}/>
        <ul>
            {searchResults.map((item) => (
            <li key={itemKeyFn(item)}>
                    {children(item)}
            </li>))}
        </ul>
    </div>
}