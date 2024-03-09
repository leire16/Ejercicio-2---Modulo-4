import React, { useState } from 'react';
import './Login.css';

const LoginComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');

        try {
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                // La API de Reqres.in tiene ciertos usuarios predefinidos para la autenticación.
                //Usuario predefinido:eve.holt@reqres.in
                //contraseña predefinida:cityslicka
            });

            if (response.ok) {
                onLogin();
            } else {
                if (!username && !password) {
                    setError('Por favor, ingresa un nombre de usuario y una contraseña');
                } else if (!username) {
                    setError('Por favor, ingresa un nombre de usuario');
                } else if (!password) {
                    setError('Por favor, ingresa una contraseña');
                } else{
                    setError("Usuario no predefinido para la API de Reqres.in");
                }
            }
        } catch (error) {
            setError('Error de red');
        }
    };

    return (
        <div>
            <h2 className="login-header">Inicio de Sesión</h2>
            <div className={`input-container ${!username && error ? 'error' : ''}`}>
                <label className="input-label">Usuario:</label>
                <input
                    type="text"
                    className={`input-field ${!username && error ? 'error' : ''}`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={`input-container ${!password && error ? 'error' : ''}`}>
                <label className="input-label">Contraseña:</label>
                <input
                    type="password"
                    className={`password-field ${!password && error ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="login-button" onClick={handleLogin}>
                Iniciar Sesión
            </button>
        </div>
    );
};

export default LoginComponent;