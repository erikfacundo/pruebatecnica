import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [buttons, setButtons] = useState([]);
  useEffect(() => {
    getButtons();
  }, []);

  const getButtons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/buttons');
      const buttons = response.data;
      setButtons(buttons);
      setCount(buttons.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateButton = async () => {
    try {
      const response = await axios.post('http://localhost:3000/buttons', { count: 0 });
      const newButton = response.data;
      setButtons(prevButtons => [...prevButtons, newButton]);
      setCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButton = async () => {
    try {
      await axios.delete(`http://localhost:3000/buttons/${buttons[buttons.length - 1].id}`);
      setButtons(prevButtons => prevButtons.slice(0, -1));
      setCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = async (id) => {
    try {
      await axios.put(`http://localhost:3000/buttons/${id}`);
      const updatedButtons = buttons.map(button => {
        if (button.id === id) {
          return {
            ...button,
            count: button.count + 1
          };
        }
        return button;
      });
      setButtons(updatedButtons);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card">
        <button>
          Cantidad de botones: {count}
        </button>
      </div>
      <div className="botonesui">
        <div className="agregar">
          <button onClick={handleCreateButton} color="green" className="si">
            Crear botón nuevo
          </button>
        </div>
      </div>
      <div>
        {buttons.map(button => (
          <div key={button.id} className="card">
            <button onClick={() => handleButtonClick(button.id)}>
              Lo apretaste: {button.count} 
            </button><br></br>
            <button onClick={handleDeleteButton} color="green" className="no">
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
