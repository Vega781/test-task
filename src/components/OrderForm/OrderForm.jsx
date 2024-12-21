import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCertificateById } from "../../api/certificates.js";
import { LoadComponent } from "../LoadComponent/LoadComponent.jsx";
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.ru';
import { isValidPhoneNumber } from "../../validators/validatePhoneNumber.js";
import { isValidEmail } from "../../validators/validateEmail.js";
import { postOrder } from "../../api/certificates.js";
import { API_KEY } from "../../api/url.js";

export const OrderForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const fetchCertificate = async () => {
            const cert = await getCertificateById(id);
            setCertificate(cert);
            setLoading(false);
        }
        fetchCertificate();
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setNameError('Поле обязательно');
        } else if (!phone) {
            setPhoneError('Поле обязательно');
        } else if (!isValidPhoneNumber(phone)) {
            setPhoneError('Некорректный номер');
        } else if (!email) {
            setEmailError('Поле обязательно');
        } else if (!isValidEmail(email)) {
            setEmailError('Некорректная почта');
        } else {
            const orderData = {
                ApiKey: API_KEY,
                MethodName: 'OSSale',
                Id: certificate.ID,
                TableName: certificate.TABLENAME,
                PrimaryKey: certificate.PRIMARYKEY,
                Price: certificate.PRICE,
                Summa: certificate.SUMMA,
                ClientName: name,
                Phone: phone.replace(/\D/g, ''),
                Email: email,
                PaymentTypeId: 2,
                UseDelivery: 0,
                IsGift: 0,
                MsgText: "Спасибо за покупку!",
                PName: name,
                PPhone: phone.replace(/\D/g, ''),
                Data: [],
                CertNumber: certificate.ID
            };
            postOrder(orderData).then(res => {
                navigate('/payment');
            }).catch(error => {
                throw new Error('Ошибка отправки заказа: ' + error.message);
            });
        }
    }


    return (
        loading ? (
            <LoadComponent type="box-rotate-z" bgColor="white" title="Загрузка..." />
        ) : (
            <>
                <h2 className="form__title">{certificate?.NAME}</h2>
                <div className="form__body">
                    <div className="form__box">
                        <label htmlFor="username" className="form__label">
                            ФИО *
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="form__input"
                            placeholder="Введите..."
                            value={name}
                            onChange={e => {
                                setName(e.target.value)
                                setNameError('')
                            }}
                        />
                        {nameError && <span className="form__error">{nameError}</span>}
                    </div>
                    <div className="form__box">
                        <label htmlFor="phone" className="form__label">
                            Телефон *
                        </label>
                        <Cleave
                            options={{
                                phone: true,
                                phoneRegionCode: 'RU',
                                delimiter: '-',
                                blocks: [2, 3, 3, 2, 2],
                                prefix: '+7',
                                noImmediatePrefix: true,
                                tailPrefix: false
                            }}
                            id="phone"
                            type="tel"
                            className="form__input"
                            placeholder="+7 (___) ___-__-__"
                            value={phone}
                            onChange={e => {
                                setPhone(e.target.value)
                                setPhoneError('')
                            }}
                        />
                        {phoneError && <span className="form__error">{phoneError}</span>}
                    </div>
                    <div className="form__box">
                        <label htmlFor="message" className="form__label">
                            Сообщение
                        </label>
                        <textarea
                            id="message"
                            type="text"
                            className="form__input"
                            placeholder="Введите..."
                            value={message}
                            onChange={e => {
                                setMessage(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form__box">
                        <label htmlFor="email" className="form__label">
                            Почта *
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form__input"
                            placeholder="Введите..."
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                setEmailError('')
                            }}
                        />
                        {emailError && <span className="form__error">{emailError}</span>}
                    </div>
                    <div className="form__buttons">
                        <Link to="/" className="form__button">
                            Назад
                        </Link>
                        <button onClick={handleSubmit} type="submit" className="form__button">
                            Оплатить
                        </button>
                    </div>
                </div>
                <span>Цена - {parseInt(certificate?.SUMMA)}</span>
            </>
        )
    )
}