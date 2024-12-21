import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Form } from './components/Form/Form.jsx';
import { ChoiceForm } from './components/ChoiceForm/ChoiceForm.jsx';
import { OrderForm } from './components/OrderForm/OrderForm.jsx';
import { Payment } from './components/Payment/Payment.jsx';
import './styles/index.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Form>
                <Routes>
                    <Route path="/" element={<ChoiceForm />} />
                    <Route path="/order/:id" element={<OrderForm />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </Form>
        </BrowserRouter>
    );
};

export default App;