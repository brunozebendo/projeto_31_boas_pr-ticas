 /**Esse é o código da seção e vai falar sobre padrões
  * e práticas - patterns e practices - como
  * Compound Components, Rendes Props e debouncing
  * aplicados a um projeto
  * Compound Component são componentes q dependem de outros
  * por exemplo o <select> que sempre tem o <option> dentrom=,
  * mas também é possível criá-los. No exemplo do curso será
  *criar um accordion q é aquele componte q se clica e abre
  com várias opções dentro, mas os outros elementos fecham
  então é preciso q um saiba do outro. Para isso foi criado
  um pasta e dentro um componente Accordion.jsx para estabelecer
  um padrão*/
 
  /**App.jsx*/

  import Accordion from "./components/Accordion/Accordion";
import SearchableList from "./components/SearchableList/SearchableList";
import Place from "./Place";
import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';

const PLACES = [
  {
    id: 'african-savanna',
    image: savannaImg,
    title: 'African Savanna',
    description: 'Experience the beauty of nature.',
  },
  {
    id: 'amazon-river',
    image: amazonImg,
    title: 'Amazon River',
    description: 'Get to know the largest river in the world.',
  },
  {
    id: 'caribbean-beach',
    image: caribbeanImg,
    title: 'Caribbean Beach',
    description: 'Enjoy the sun and the beach.',
  },
  {
    id: 'desert-dunes',
    image: desertImg,
    title: 'Desert Dunes',
    description: 'Discover the desert life.',
  },
  {
    id: 'forest-waterfall',
    image: forestImg,
    title: 'Forest Waterfall',
    description: 'Listen to the sound of the water.',
  },
];

function App() {
  return( <main>
    <section>
      <h2>Why work with us?</h2>
      <Accordion className="accordion">
        <Accordion.Item
        id="experience"
        className='accordion-time'>        
        <Accordion.Title className="accordion-item-title" >We got 20 years of experience</Accordion.Title>
        <Accordion.Content className="accordion-item-content"><article>
            <p>You can&apos;t go wrong with us.</p>
            <p>We are in the business of planning highly individualized
              vacation trips.
            </p>
          </article>
        </Accordion.Content>          
        </Accordion.Item>
        <Accordion.Item
        id="local-guides"
        className='accordion-time'>        
        <Accordion.Title className="accordion-item-title">We got 21 years of experience</Accordion.Title>
        <Accordion.Content className="accordion-item-content"><article>
            <p>You can&apos;t go wrong with us.</p>
            <p>2 We are in the business of planning highly individualized
              vacation trips.
            </p>
          </article>
        </Accordion.Content>   
        </Accordion.Item>
      </Accordion>
    </section>
    <section>
      <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
        {(item) => <Place item={item} /> }
      </SearchableList>
      <SearchableList items={['item1', 'item 2']} itemKeyFn={(item) => item}>
        {(item) => item}
      </SearchableList>
    </section>
  </main>);
}

export default App;

/**Accordion.jsx */
import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

//aqui foi utilizado o context para compartilhar a lógica entre vários componentes
const AccordionContext = createContext();

export function useAccordionContext() {
    const ctx = useContext(AccordionContext)
/**esse if é para caso se utilize esse hook em algum componente q não esteja
 * envolvido com o provider abaixo. */
    if (!ctx) {
        throw new Error('Accordion-related components must be wrapped by <Accordion>')
    }
    return ctx;
}

export default function Accordion({children, className}) {
/**aqui um controle de estado para abrir e fechar o accordion de acordo  */
const [openItemId, setOpenItemId] = useState()
/**aqui uma função para controlar se o accordion previamente aberto é o mesmo
 * e se for, ele vai ficar null o q irá fechá-lo, se não for igual, vai abrir
 * no return do AccordionItem.jsx é passado assim
 * <h3 onClick={() => toggleItem(id)}>{title}</h3>
 */
function toggleItem(id) {
    setOpenItemId(prevId => prevId === id ? null : id) 
}
//aqui o q deve ser passado como props no return, o openItemId é para controlar q
//só se abra um item por vez...não entendi muito bem como...
const contextValue = {openItemId,toggleItem}
 //aqui o q será retornado e compartilhado, deixando {children} para ficar bem genérico
return (
    <AccordionContext.Provider value={contextValue}>
    <ul className={className}>
        {children}
    </ul>
    </AccordionContext.Provider>);
}
/**algo comum de se fazer quando se está trabalhando com compound components
 * é garantir q o item q depende do outro só possa ser usado assim, por isso
 * foi importado o componente AccordionItem e guardado em uma variável q no App
 * foi assim passada: 
 * <Accordion.Item
 * e depois mais outros. Na aula 515 é explicado q caso se queira garantir q os componente
 * só sejam usados em conjunto, teria q se fazer tudo em um componente só.
 */
Accordion.Item = AccordionItem
Accordion.Title = AccordionTitle
Accordion.Content = AccordionContent

/**AccordionContent.jsx */

/**Esse componente deixou o código ainda mais genérico, então ele junta
 * partes q estavam em outros componentes para controlar o interior do accordion
 * q caso esteja aberto irá aplicar um CSS ou outro
 */
import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionContent({ className, children}) {
    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();

    const isOpen = openItemId === id;
    return (<div 
    className={isOpen ? `${className ?? ''} open` : `${className ?? ''} close`}>
        {children}
    </div>);
}

  /**também foi criado um arquivo accordionItem.jsx, ou seja, criado
   * um padrão para o item e outro padrão para cada item q fica dentro
   * desse outro e ambos são chamados dentro do App
   */
  import { createContext, useContext } from "react";

const AccordionItemContext = createContext();
/**Na aula 514 esse componente q vai envolver outros no APP, foi transformado
 * em um context provider para passar o id q os outros vão precisar
 * Assim, no componente AccordionTitle ficou assim
 *     const id = useAccordionItemContext();
 * Já no App o id só precisou ser passado para o Accordion.Item
*/
export function useAccordionItemContext() {
    const ctx = useContext(AccordionItemContext);
//esse aviso é para caso se o componente context fora de um AccordionItem
    if (!ctx) {
        throw new Error('AccordionItem-related components must be wrapped by <Accordion.item>.')
    }
    return ctx;
}

export default function AccordionItem({id,className, children}) {
//aqui traz os 3 itens trazidos do Accordion.jsx através do context
    //const {openItemId, toggleItem } = useAccordionContext();
//aqui é a verificação se o id trazido do Accordion.jsx (openItemId) é igual
//ao do item para fins de aplicação de CSS
    //const isOpen = openItemId === id
/**na aula 514 o código foi refatorado e esses itens comentados foram para o AccordioContent*/

return (
<AccordionItemContext.Provider value={id}>
    <li className={className}> {children} </li>
</AccordionItemContext.Provider>
    );
}

/**AccordionTitle.jsx */

import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitle({ className, children}) {
    const {toggleItem} = useAccordionContext();
    const id = useAccordionItemContext();
    return <h3 className={className} onClick={() => toggleItem(id)}>{children}</h3>;
}

/**SearchableList.jsx */

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
  