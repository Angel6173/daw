const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/lab03', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/lab03/');
});

app.post('/guardar', (req, res) => {
    const { fecha, hora, descripcion, oldFecha, oldHora } = req.body;

    if (!fecha || !hora || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (oldFecha && oldHora) {
        const oldFolderName = oldFecha.replace(/-/g, '.');
        const oldFileName = `${oldHora.replace(':', '.')}.md`;
        const oldPath = path.join(__dirname, 'agenda', oldFolderName, oldFileName);

        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
            const oldDir = path.dirname(oldPath);
            if (fs.readdirSync(oldDir).length === 0) {
                fs.rmdirSync(oldDir);
            }
        }
    }

    const folderName = fecha.replace(/-/g, '.');
    const folderPath = path.join(__dirname, 'agenda', folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `${hora.replace(':', '.')}.md`;
    const filePath = path.join(folderPath, fileName);

    const contenidoMarkdown = `# Evento - ${hora}\n\n**Descripción:**\n${descripcion}`;
    fs.writeFileSync(filePath, contenidoMarkdown, 'utf8');

    res.status(200).json({ success: true });
});

app.get('/listar-eventos', (req, res) => {
    const agendaPath = path.join(__dirname, 'agenda');
    if (!fs.existsSync(agendaPath)) return res.json([]);

    let eventos = [];
    const carpetasFechas = fs.readdirSync(agendaPath);

    carpetasFechas.forEach(folder => {
        const fullPath = path.join(agendaPath, folder);
        if (fs.lstatSync(fullPath).isDirectory()) {
            const archivos = fs.readdirSync(fullPath);
            archivos.forEach(file => {
                const contenidoCompleto = fs.readFileSync(path.join(fullPath, file), 'utf8');
                const descripcion = contenidoCompleto ? (contenidoCompleto.split('\n\n**Descripción:**\n')[1] || contenidoCompleto) : '';

                eventos.push({
                    fecha: folder.replace(/\./g, '-'),
                    hora: file.replace('.md', '').replace('.', ':'),
                    descripcion: descripcion.trim()
                });
            });
        }
    });

    res.json(eventos);
});

app.post('/eliminar', (req, res) => {
    const { fecha, hora } = req.body;
    const folderName = fecha.replace(/-/g, '.');
    const fileName = `${hora.replace(':', '.')}.md`;
    const filePath = path.join(__dirname, 'agenda', folderName, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        const folderPath = path.dirname(filePath);
        if (fs.readdirSync(folderPath).length === 0) {
            fs.rmdirSync(folderPath);
        }
    }
    res.json({ success: true });
});

app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto ${8080}`);
});