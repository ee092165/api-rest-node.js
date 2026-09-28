import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

// Create
app.post('/', async (req, res) => {
    try
    {
        const { nome, email } = req.body;
        const [result] = await pool.query(
            "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
            [nome, email]
        );

        res.status(201).json({ id: result.insertId, nome, email });
    }
    catch (e)
    {
        res.status(500).json({ erro: "Falha ao criar usuário"});
    }
});

// Read
app.get('/', async (req, res) => {
    try
    {
        res.json(await pool.query("SELECT * FROM usuarios"));
    }
    catch (e)
    {
        res.status(500).json({ erro: "Falha ao listar usuários"});
    }
});

// Update
app.put('/:id', async (req, res) => {
    try
    {
        const { id } = req.params;
        const { nome, email } = req.body;

        const [result] = await pool.query(
            "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
            (nome || null, email || null, id)
        );

        if (!result.affectedRows)
            return res.status(404).json({ error: "Usuário não encontrado"});

        res.json({ mensagem: "Atualizado com sucesso"});
    }
    catch (e)
    {
        res.status(500).json({ erro: "Falha ao atualizar usuário"});
    }
});

// Delete
// TBA