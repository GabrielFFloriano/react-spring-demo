import { useEffect, useState } from "react"
import { useFoodDataUpdate } from "../../../hooks/useFoodDataUpdate";
import type { FoodData } from "../../../interface/FoodData"
import "./modal.css";

interface InputProps {
    label: string,
    value: string | number
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void,
    foodData: FoodData
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)}></input>
        </>
    )
}

export function EditModal({ closeModal, foodData }: ModalProps){
    const [title, setTitle] = useState(foodData.title);
    const [price, setPrice] = useState(foodData.price);
    const [image, setImage] = useState(foodData.image);
    const { mutate, isSuccess, isPending }= useFoodDataUpdate();
    
    const submit = () => {
        const updatedFoodData: FoodData = {id: foodData.id,title,price,image}
        mutate(updatedFoodData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal()
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Editar item do cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    )
}