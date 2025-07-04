import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/card/create-modal/create-modal';
import { useFoodDataDelete } from './hooks/useFoodDataDelete';
import { EditModal } from './components/card/create-modal/edit-modal';
import type { FoodData } from './interface/FoodData';

function App() {
  const { data } = useFoodData();
  const { mutate: deleteMutate } = useFoodDataDelete();

  const [isCreateModalOpen, setIsCreateModalOpen]= useState(false);
  const [isEditModalOpen, setIsEditModalOpen]= useState(false);
  const [editingFood, setEditingFood] = useState<FoodData | null>(null)

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(prev => !prev)
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      deleteMutate(id);
    }
  }

  const handleOpenEditModal = (food: FoodData) => {
    setEditingFood(food);
    setIsEditModalOpen(true);
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingFood(null);
  }

  return (
    <div className='container'>
      <h1>Cardápio</h1>
      <div className='card-grid'>
        {data?.filter(foodData => foodData.id !== undefined).map(foodData => // data? => ? significa que a data pode vir como undefined
          <Card 
            key={foodData.id}
            id={foodData.id!}
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
            onDelete={() => handleDelete(foodData.id!)}
            onEdit={() => handleOpenEditModal(foodData)}
          />
        )}
      </div>
        {isCreateModalOpen && <CreateModal closeModal={handleOpenCreateModal}/>}
        {isEditModalOpen && editingFood && <EditModal closeModal={handleCloseEditModal} 
          foodData={editingFood}/>}
        <button className="novo-button" onClick={handleOpenCreateModal}>Novo</button>
    </div>
  )
}

export default App
