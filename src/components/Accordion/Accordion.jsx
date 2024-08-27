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