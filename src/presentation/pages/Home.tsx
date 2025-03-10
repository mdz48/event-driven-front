import { OrderForm } from '../components/OrderForm';
import './Home.css';

export const Home = () => {

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1>Realiza tu Pedido</h1>
          <p>Completa el formulario para enviar tu orden a cocina</p>
        </div>
        <OrderForm />
      </div>
    </div>
  );
};

export default Home;