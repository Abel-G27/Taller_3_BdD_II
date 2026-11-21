const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proveedores_db'
});

conexion.connect((error) => {
    if (error) {
        console.log('Error de conexión');
        return;
    }

    console.log('Conectado a MySQL');
});

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.get('/proveedores', (req, res) => {

    const sql = "SELECT * FROM proveedores";

    conexion.query(sql, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });
});

app.post('/proveedores', (req, res) => {

    const { nombre, telefono, correo } = req.body;

    const sql = `
        INSERT INTO proveedores (nombre, telefono, correo)
        VALUES (?, ?, ?)
    `;

    conexion.query(sql, [nombre, telefono, correo], (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: 'Proveedor agregado correctamente'
        });

    });

});

app.put('/proveedores/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, telefono, correo } = req.body;

    const sql = `
        UPDATE proveedores
        SET nombre = ?, telefono = ?, correo = ?
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [nombre, telefono, correo, id],
        (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: 'Proveedor actualizado correctamente'
            });

        }
    );

});

app.delete('/proveedores/:id', (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM proveedores WHERE id = ?";

    conexion.query(sql, [id], (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: 'Proveedor eliminado correctamente'
        });

    });

});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});