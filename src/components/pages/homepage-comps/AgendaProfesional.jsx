import React, { useState, useEffect } from 'react';
import { useAuth } from "../../../Autentication/AutProvider";
import { API_URL } from "../../../Autentication/constanst";

const AgendaProfesional = () => {
    const auth = useAuth();
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        consultarCitas();
        // Agregar el controlador de eventos al montar el componente
        window.addEventListener('wheel', handleScroll);
        // Remover el controlador de eventos al desmontar el componente
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);
    const formatHora = (hora) => {
        const [hours, minutes] = hora.split(':');
        const numHours = parseInt(hours, 10);
        const period = numHours >= 12 ? 'PM' : 'AM';
        const formattedHours = numHours % 12 || 12;
        return `${formattedHours}:${minutes} ${period}`;
    };

    const formatFecha = (fecha) => {
        const dateObj = new Date(fecha);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        return `${day}-${month}-${year}`;
    };

    const consultarCitas = async () => {
        // Tu lógica para obtener los datos de la agenda
        try {
            const response = await fetch(`${API_URL}/agenda-profesional/${auth.getUser()?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('No se pudieron cargar las citas');
            }
            const data = await response.json();
            console.log('Datos obtenidos AGENDAPROFESIONAL:', data);
            // Aquí asumiendo que data es un array de objetos con el formato correcto de CitaData
            setDatos(data);
        } catch (error) {
            console.error("Error al cargar las citas:", error);
        }
    };

    const handleScroll = (event) => {
        const delta = Math.sign(event.deltaY);
        const scrollableElement = document.getElementById('agenda-profesional-scroll');

        if (delta === 1) {
            scrollableElement.scrollBy({ top: 100, behavior: 'smooth' });
        } else if (delta === -1) {
            scrollableElement.scrollBy({ top: -100, behavior: 'smooth' });
        }
    };

    return (
        <div id="agenda-profesional-scroll" className="agenda-profesional-scroll">
            <div className="relative container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
                <h1 className="text-center font-bold text-3xl text-white">Cronograma de Trabajo</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    {datos.map((cita, index) => (
                        <div key={index} className="shadow-md rounded-lg relative bg-opacity-80" style={{ border: '3px solid black' }}>
                            <div className="p-4 rounded-t-lg backdrop-filter backdrop-blur-lg">
                                <h2 className="text-white bg-black text-lg font-bold px-4 py-2 rounded-t-lg">Cita Programada</h2>
                                <div className="mt-4">
                                    <h1 className="font-semibold text-white">Fecha: {formatFecha(cita.date)}</h1>
                                    <h1 className="font-semibold text-white">Hora: {formatHora(cita.hora)}</h1>
                                    <h1 className="font-semibold text-white">Nombre del Cliente: {cita.userName}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AgendaProfesional;
