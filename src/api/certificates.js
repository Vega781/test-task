import { getApiUrl } from './url';

export const getCertificates = () => {
    return fetch(getApiUrl('OSGetGoodList'))
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            return Array.isArray(data) ? data : (data.data || []);
        })
        .catch(error => {
            throw new Error('Ошибка получения сертификатов: ' + error.message);
        });
};

export const getCertificateById = (id) => {
    return getCertificates()
        .then(certificates => {
            return certificates.find(cert => cert.ID === id) || null;
        })
        .catch(error => {
            throw new Error('Ошибка получения сертификата: ' + error.message);
        });
};

export const postOrder = (data) => {
    return fetch(getApiUrl('OSSale'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Ошибка сети');
        }
        return res.json();
    })
    .catch(error => {
        throw new Error('Ошибка отправки заказа: ' + error.message);
    });
};
