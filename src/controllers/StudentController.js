const Student = require('../models/Student');

const StudentController = {
    getAll: async (req, res) => {
        try {
            const students = await Student.getAll();
            res.json(students);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    getById: async (req, res) => {
        try {
            const student = await Student.getById(req.params.id);
            if (!student) return res.status(404).json({ msg: "Student not found" });
            res.json(student);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    create: async (req, res) => {
        try {
            const { nome, cpf } = req.body;
            if (!nome || !cpf) return res.status(400).json({ msg: "Nome and CPF are required" });

            const result = await Student.create(req.body);
            const newStudent = await Student.getById(result.insertId);

            res.status(201).json(newStudent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    update: async (req, res) => {
        try {
            const { nome, cpf } = req.body;
            if (!nome || !cpf) return res.status(400).json({ msg: "Nome and CPF are required" });

            const result = await Student.update(req.params.id, req.body);
            if (result.affectedRows === 0) return res.status(404).json({ msg: "Student not found" });

            const updatedStudent = await Student.getById(req.params.id);
            res.json(updatedStudent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await Student.delete(req.params.id);
            if (result.affectedRows === 0) return res.status(404).json({ msg: "Student not found" });
            res.json({ msg: "Student deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server Error" });
        }
    }
};

module.exports = StudentController;
