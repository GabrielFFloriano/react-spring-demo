import { FaEdit, FaTrash } from 'react-icons/fa';
import './card.css'

interface CardProps {
    id: number,
    price: number,
    image: string,
    title: string,
    onEdit: (id: number) => void,
    onDelete: (id: number) => void
}

export function Card({ id, price, image, title, onEdit, onDelete } : CardProps){
    return(
        <div className="card">
            <img src={image} alt={title}/>
            <h2>{title}</h2>
            <p><b>Valor: </b>{price}</p>
            <div className='card-actions'>
                <button onClick={() => onEdit(id)} className="edit-button"><FaEdit />Editar</button>
                <button onClick={() => onDelete(id)} className="delete-button"><FaTrash />Excluir</button>
            </div>
        </div>
    );
}