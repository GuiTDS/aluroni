import { useEffect, useState } from 'react';
import Item from './Item';
import cardapio from './itens.json';
import styles from './Itens.module.scss';

interface Props {
    busca: string,
    filtro: number | null, 
    ordenador: string
}

const Itens = (props:Props) => {
    const [lista, setLista] = useState(cardapio);
    const { busca, filtro } = props;

    function testaBusca(title: string) {
        const regex = RegExp(busca, 'i');
        return regex.test(title);
    }

    function testaFiltro(id: number | null) {
        if(filtro !== null) return filtro === id; 
        return true;
    }

    useEffect(() => {
        const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id));
        setLista(novaLista);
    }, [busca, filtro]);

    return ( 
        <div className={styles.itens}>
            {lista.map(item => (
                <Item key={item.id} {...item}/>
            ))}
        </div>
     );
}
 
export default Itens;