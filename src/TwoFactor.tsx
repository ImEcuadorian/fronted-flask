import React, { useEffect, useState } from "react";
import { useNavigate }           from "react-router-dom";
import { register2FA, verify2FA, status2FA } from "./service/service.ts";

export const TwoFactor: React.FC = () => {
    const nav = useNavigate();
    const [qr,       setQr]       = useState<string>();
    const [code,     setCode]     = useState("");
    const [err,      setErr]      = useState("");
    const [isActive, setIsActive] = useState<boolean|null>(null);

    useEffect(() => {
        const init2FA = async () => {
            const uid = localStorage.getItem("id");

            let active = false;
            try {
                const res = await status2FA(uid ?? "");
                active = res.active;
            } catch (e) {
                console.warn("No pude consultar el estado 2FA, asumo inactivo", e);
            }
            setIsActive(active);

            if (!active) {
                try {
                    const { qr_code_base64 } = await register2FA(uid ?? "");
                    setQr(qr_code_base64);
                } catch (e) {
                    console.error("Falló register2FA", e);
                    setErr("No se pudo generar el QR");
                }
            }
        };

        init2FA();
    }, []);

    if (isActive === null) {
        return <p>Cargando estado de 2FA…</p>;
    }

    return (
        <div className="p-6">
            <h1 className="mb-4">Verificación 2FA</h1>

            {isActive
                ? <p className="mb-4">Ya tienes 2FA configurado. Ingresa tu código:</p>
                : qr
                    ? <img
                        src={`data:image/png;base64,${qr}`}
                        alt="QR para Google Authenticator"
                        className="mb-4"
                    />
                    : <p>Cargando QR…</p>
            }

            <input
                type="text"
                placeholder="Código de 6 dígitos"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="border p-2 my-4"
            />

            <button
                onClick={async () => {
                    const userId = localStorage.getItem("id");
                    const ok = await verify2FA(userId ?? "", code);
                    if (ok) nav("/products");
                    else   setErr("Código incorrecto");
                }}
                className="bg-blue-600 text-white px-4 py-2"
            >
                Verificar
            </button>

            {err && <p className="text-red-500 mt-2">{err}</p>}
        </div>
    );
};
