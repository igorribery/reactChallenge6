/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.

Funcionalidades que esperamos que você desenvolva:

x - inserção de novos produtos no carrinho
x - remoção de produtos já inseridos
x - alteração de quantidade de cada item 
x - cálculo do preço total dos itens inseridos
x - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import './styles.scss';

import PageHeader from './layout/PageHeader'
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import { useEffect, useState } from 'react';
import { api } from './api';
import { cartType } from './types/cartType';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const App = () => {

    const [cart, setCart] = useState<cartType[]>([]);

     useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      const res = await api.get('/cart');
      setCart(res.data)
    }

    const dataCart = {
      name: 'ProductLive',
      category: 'produto',
      price: randomNumber(1, 1000),
      quantity: 1
    }

    const handleRemoveItem = async (id?: string) => {   
      await api.delete(`/cart/${id}`)
      fetchData();
    }

    const handleAddItem = async () => {
      await api.post('/cart', dataCart)
      fetchData();
    }

    const handleQuantity = async (item: cartType, action: string) => {

      let newQuantity = item.quantity;

      if(action === 'decrease') {
          if(newQuantity === 1) {
           return;
          }
          newQuantity -= 1;
      }
      if(action === 'increase') {
        newQuantity += 1;
      }
      
      const newData = {...item, quantity: newQuantity};
      delete newData._id;
    
      await api.put(`/cart/${item._id}`, newData);
      
      fetchData();
    }

    const getTotal = () => {
      let sum = 0;

      for(let i of cart) {
        sum += i.price * i.quantity;
      }
      return sum;
    };

    const totalCart = getTotal();

    


  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
            <button onClick={handleAddItem} style={{borderRadius: 10, border: 0, padding: '5px 10px', marginBottom: 10}}>Adicionar ao carrinho</button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <TableRow key={item._id} data={item} handleRemoveItem={handleRemoveItem} handleQuantity={handleQuantity} />
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                        O carrinho está vazio.
                    </td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </section>
          <aside>
            <Summary total={totalCart} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;