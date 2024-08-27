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
//aqui traz os 3 itens trazido do Accordion.jsx através do context
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