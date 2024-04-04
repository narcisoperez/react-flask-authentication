import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';

// project imports
import TotalPositivos from './TotalPositivos';
import TotalNegativos from './TotalNegativos';
import { gridSpacing } from './../../../store/constant';
import { saveImageAsFile } from './utils'; // Importa la función saveImageAsFile desde un archivo de utilidades
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import PopularCard from './PopularCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import origImg from '../../../assets/images/IO1.jpg'; // Asegúrate de que la ruta sea correcta
// import inferImg from '../../../assets/images/IO1_IA.png'; // Asegúrate de que la ruta sea correcta

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [origImg, setOrigImg] = useState(null);
    const [inferImg, setInferImg] = useState(null);
    const [cantidadObjetosN, setCantidadObjetosN] = useState(0);
    const [cantidadObjetosP, setCantidadObjetosP] = useState(0);
    const [imagenBase64, setImagenBase64] = useState('');
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        
        {/*}
        // Reemplaza 'http://localhost:5000/api/value' con la URL de tu API
        fetch('http://localhost:5000/api/value')
        .then(response => response.json())
        .then(data => {
        // Asume que 'data' es un objeto que contiene el valor en una propiedad, ajusta según tu API
            setTypographyValue(data.value);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }) */}
        }, []);

    
    const handleOrigImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            //let img = e.target.files[0];
            // setSelectedImage(URL.createObjectURL(img));
            //setOrigImg(URL.createObjectURL(img));
            setImagenBase64(null);
            // Mostrar la ruta y el nombre del archivo
            //console.log('Ruta del archivo:', URL.createObjectURL(img));
            //console.log('Nombre del archivo:', img.name);
            const img = e.target.files[0];
            // Crear un objeto Blob a partir del archivo seleccionado
            const blob = new Blob([img], { type: img.type });
            // Crear una URL de objeto a partir del objeto Blob
            const imageUrl = URL.createObjectURL(blob);
            
            // Establecer la URL de la imagen en el estado
            setOrigImg(imageUrl);
            // Mostrar la ruta y el nombre del archivo
            console.log('Ruta del archivo:', URL.createObjectURL(blob));
            console.log('Nombre del archivo:', img.name);
            
            if (img) { // Verifica si hay una imagen cargada en handleOrigImageChange
                // Datos de autenticación
                console.log("Evento handleInferImageChange disparado");
                // Datos de autenticación
                const authData = {
                    email: 'narcisoperez@gmail.com', // Reemplaza 'tu_usuario' con tu nombre de usuario real
                    password: 'abc123' // Reemplaza 'tu_contraseña' con tu contraseña real
                };
    
                try {
                    // Autenticación
                    const authResponse = await fetch('http://127.0.0.1:4430/jwt/auth/signin', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(authData),
                    });
    
                    if (!authResponse.ok) {
                        throw new Error('Falló la autenticación');
                    }
    
                    const authDataResponse = await authResponse.json();
                    const accessToken = authDataResponse.access_token;
    
                    // Aquí puedes proceder con la carga de la imagen usando el token de autenticación
                    // Por ejemplo, agregando el token al encabezado de una solicitud para cargar la imagen
                    
                    // Convertir el archivo de imagen en una cadena base64
                    const reader = new FileReader();
                    reader.readAsDataURL(img);
                    reader.onload = () => {
                        const imagenBase64 = reader.result.split(',')[1]; // Eliminar el encabezado de la cadena base64 (data:image/png;base64,)
                        //imagenBase64 = imagenBase64.slice(1, -1);
                        const imgData = {
                            id: '1',
                            nombre: e.target.files[0].name,
                            imagen: imagenBase64 // Pasar la cadena base64 como la imagen
                        };
   
                        // Enviar la imagen al servidor a través de una solicitud POST
                        fetch('http://127.0.0.1:4430/jwt/imagen/1', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                            body: JSON.stringify(imgData),
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Respuesta del servidor:', data);
                            // Procesar los datos recibidos
                            const cantidadObjetosN = data.cantidad_objetos_n;
                            setCantidadObjetosN(cantidadObjetosN);
                            const cantidadObjetosP = data.cantidad_objetos_p;
                            setCantidadObjetosP(cantidadObjetosP);
                            const imagenBase64 = data.imagen_base64;
                            setImagenBase64(imagenBase64);

                            // Realizar acciones con los datos recibidos
                            console.log('Cantidad de objetos N:', cantidadObjetosN);
                            console.log('Cantidad de objetos P:', cantidadObjetosP);
                            console.log('Imagen en base64 II:', imagenBase64);
                        })
                        .catch(error => {
                            console.error('Error al enviar la imagen:', error);
                        });
        
                    console.log('Imagen enviada con éxito');
                    };

                } catch (error) {
                    console.error('Error al enviar la imagen:', error);
                }
            } else {
                console.error('No hay una imagen cargada para enviar');
            }

        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalPositivos cantidadObjetosP={ cantidadObjetosP } />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalNegativos cantidadObjetosN={ cantidadObjetosN } />
                    </Grid>
                    
                    <Grid item lg={4} md={12} sm={12} xs={12} style={{ border: '2px solid #ccc', padding: '5px', borderRadius: '5px', marginTop: '25px', width: 'fit-content' }}>
                    
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                                {/* Existing Grid items */}
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                        onChange={handleOrigImageChange}
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button 
                                            variant="contained" 
                                            component="span"
                                            style={{ height: '56px', marginBottom: '15px', marginLeft: '20px' }}> 
                                            Cargar Imagen Original
                                        </Button>
                                    </label>
                                    {/*{origImg} {/*&& <img src={origImg} alt="Original" style={{ width: '100%', height: 'auto' }} />}*/}
                                    <Grid item xs={12}>
                                        {/* Botón para cargar imagen inferida */}
                                        <label htmlFor="raised-button-file-infer">
                                            <Button 
                                                variant="contained" 
                                                component="span"
                                                //onClick={handleInferImageChange} // Llamar a handleInferImageChange directamente al hacer clic en el botón
                                                style={{ height: '56px', marginBottom: '15px', marginLeft: '20px' }}> 
                                                Cargar Imagen Inferida
                                            </Button>
                                        </label>
                                        {/* {inferImg} {/* && <img src={inferImg} alt="Inferida" style={{ width: '100%', height: 'auto' }} />} */}
                                        {/* <EarningCard isLoading={isLoading} value={typographyValue} /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <input type="checkbox" id="checkbox1" name="checkbox1" checked={checked} style={{ marginBottom: '5px' }} />
                                  <label htmlFor="checkbox1" style={{ marginLeft: '5px' }}>1 campo </label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="checkbox2" name="checkbox2" style={{ marginBottom: '5px' }} />
                                    <label htmlFor="checkbox2" style={{ marginLeft: '5px' }}>3 campos</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="checkbox3" name="checkbox3" style={{ marginBottom: '5px' }} />
                                    <label htmlFor="checkbox3" style={{ marginLeft: '5px' }}>10 campos</label>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                     <Grid item xs={6} md={6} lg={6}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} />  */}
                        <img src={origImg} style={{ width: '100%', height: '100%' }} />
                     </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        { /*<PopularCard isLoading={isLoading} /> */}
                        <img src={`data:image/png;base64, ${imagenBase64}`} style={{ width: '100%', height: '100%' }} alt="Imagen en base64" />
                        {/*<img src={imagenBase64} style={{ width: '100%', height: '100%' }} />*/}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
