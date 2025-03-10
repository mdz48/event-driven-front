import './Kitchen.css';
import {OrdersContainer} from "../components/OrdersContainer.tsx";

export const Kitchen = () => {
  return (
    <div className="kitchen-container">
      <div className="kitchen-header">
        <h1>Panel de Cocina</h1>
        <p>Administra y actualiza el estado de los pedidos</p>
      </div>
      <OrdersContainer />
    </div>
  );
};

export default Kitchen;