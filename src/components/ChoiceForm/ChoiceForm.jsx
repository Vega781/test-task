import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCertificates } from "../../api/certificates.js";
import { LoadComponent } from "../LoadComponent/LoadComponent.jsx";

export const ChoiceForm = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchCertificates = async () => {
            const res = await getCertificates();
            const certificates = res.data || res;
            setCertificates(certificates);
            setLoading(false);
        }
        fetchCertificates();
    }, [])

    return (
        loading ? (
            <LoadComponent type="box-rotate-z" bgColor="white" title="Загрузка..." />
        ) : (
            <>
                <h1>Выберите сертификат</h1>
                <div className="certificates">
                    <ul className="certificates__list">
                        {certificates.map((certificate) => (
                            <Link to={`/order/${certificate.ID}`} key={certificate.ID}>
                                <li className="certificates__item">
                                    <span>{certificate.NAME}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </>
        )
    )
}