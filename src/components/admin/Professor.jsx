import React from "react";
import { Table, Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Professor extends React.Component {

    constructor(props) {
        super(props);
        const savedProfessores = JSON.parse(localStorage.getItem('professores')) || [];
        this.state = {
            professores: savedProfessores,
            editingId: null,
            editedProfessor: {
                nome: '',
                email: '',
                senha: '',
                tipo: ''
            },
            newProfessor: {
                nome: '',
                email: '',
                senha: '',
                tipo: ''
            },
            showAddForm: false
        };
    }

    saveProfessoresToLocalStorage = () => {
        localStorage.setItem('professores', JSON.stringify(this.state.professores));
    }

    handleEdit = (id) => {
        const professor = this.state.professores.find(professor => professor.id === id);
        this.setState({
            editingId: id,
            editedProfessor: { nome: professor.nome, email: professor.email, senha: professor.senha, tipo: professor.tipo }
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            editedProfessor: { ...this.state.editedProfessor, [name]: value }
        });
    };

    handleSave = () => {
        const { editingId, editedProfessor } = this.state;
        const updatedProfessores = this.state.professores.map(professor =>
            professor.id === editingId ? { ...professor, ...editedProfessor } : professor
        );
        this.setState({
            professores: updatedProfessores,
            editingId: null,
            editedProfessor: { nome: '', email: '', senha: '', tipo: '' }
        }, this.saveProfessoresToLocalStorage);
    };

    handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este Professor?")) {
            const updatedProfessores = this.state.professores.filter(professor => professor.id !== id);
            this.setState({ professores: updatedProfessores }, this.saveProfessoresToLocalStorage);
        }
    };

    handleAddChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            newProfessor: { ...this.state.newProfessor, [name]: value }
        });
    };

    handleAdd = () => {
        const { nome, email, senha, tipo } = this.state.newProfessor;
        if (nome && email && senha && tipo) {
            const newId = (this.state.professores.length > 0 ? Math.max(...this.state.professores.map(professor => parseInt(professor.id))) + 1 : 1).toString();
            const newProfessor = { id: newId, nome, email, senha, tipo };
            this.setState(prevState => ({
                professores: [...prevState.professores, newProfessor],
                newProfessor: { nome: '', email: '', senha: '', tipo: '' },
                showAddForm: false
            }), this.saveProfessoresToLocalStorage);
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    toggleAddForm = () => {
        this.setState(prevState => ({
            showAddForm: !prevState.showAddForm
        }));
    };

    render() {
        return (
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <br></br>
                <br></br>
                <h1>Professores:</h1>
                <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Tipo</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.professores.map((professor) => (
                            <tr key={professor.id}>
                                <td>{professor.id}</td>
                                <td>
                                    {this.state.editingId === professor.id ? (
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={this.state.editedProfessor.nome}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        professor.nome
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === professor.id ? (
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={this.state.editedProfessor.email}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        professor.email
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === professor.id ? (
                                        <Form.Control
                                            type="password"
                                            name="senha"
                                            value={this.state.editedProfessor.senha}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        professor.senha
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === professor.id ? (
                                        <Form.Control
                                            type="text"
                                            name="tipo"
                                            value={this.state.editedProfessor.tipo}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        professor.tipo
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === professor.id ? (
                                        <>
                                            <Button
                                                variant="success"
                                                onClick={this.handleSave}
                                                style={{ marginRight: '5px' }}
                                            >
                                                Salvar
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => this.setState({ editingId: null })}
                                            >
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="warning"
                                                onClick={() => this.handleEdit(professor.id)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => this.handleDelete(professor.id)}
                                            >
                                                Excluir
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {this.state.showAddForm && (
                    <div style={{ margin: '20px 0' }}>
                        <h3>Adicionar Novo Professor</h3>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    value={this.state.newProfessor.nome}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.newProfessor.email}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Senha"
                                    name="senha"
                                    value={this.state.newProfessor.senha}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Tipo"
                                    name="tipo"
                                    value={this.state.newProfessor.tipo}
                                    onChange={this.handleAddChange}
                                />
                            </InputGroup>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button
                                    variant="primary"
                                    onClick={this.handleAdd}
                                    style={{ width: '100px', fontSize: '14px', padding: '5px' }}
                                >
                                    Adicionar
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={this.toggleAddForm}
                                    style={{ width: '100px', fontSize: '14px', padding: '5px' }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                <Button
                    variant="primary"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px'
                    }}
                    onClick={this.toggleAddForm}
                >
                    <span>+</span>
                </Button>
            </div>
        );
    }
}

export default Professor;
