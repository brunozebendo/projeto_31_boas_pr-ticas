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