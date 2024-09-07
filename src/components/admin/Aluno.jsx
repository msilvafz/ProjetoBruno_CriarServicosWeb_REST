import React from "react";
import { Table, Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Aluno extends React.Component {
    constructor(props) {
        super(props);

        const savedAlunos = JSON.parse(localStorage.getItem('alunos')) || [];
        this.state = {
            alunos: savedAlunos,
            editingId: null,
            editedAluno: {
                nome: '',
                email: '',
                senha: '',
                tipo: ''
            },
            newAluno: {
                nome: '',
                email: '',
                senha: '',
                tipo: ''
            },
            showAddForm: false
        };
    }

    saveAlunosToLocalStorage = () => {
        localStorage.setItem('alunos', JSON.stringify(this.state.alunos));
    }

    handleEdit = (id) => {
        const aluno = this.state.alunos.find(aluno => aluno.id === id);
        this.setState({
            editingId: id,
            editedAluno: { ...aluno }
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            editedAluno: { ...this.state.editedAluno, [name]: value }
        });
    };

    handleSave = () => {
        const { editingId, editedAluno } = this.state;
        const updatedAlunos = this.state.alunos.map(aluno =>
            aluno.id === editingId ? { ...aluno, ...editedAluno } : aluno
        );
        this.setState({
            alunos: updatedAlunos,
            editingId: null,
            editedAluno: { nome: '', email: '', senha: '', tipo: '' }
        }, this.saveAlunosToLocalStorage);
    };

    handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este Aluno?")) {
            const updatedAlunos = this.state.alunos.filter(aluno => aluno.id !== id);
            this.setState({ alunos: updatedAlunos }, this.saveAlunosToLocalStorage);
        }
    };

    handleAddChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            newAluno: { ...this.state.newAluno, [name]: value }
        });
    };

    handleAdd = () => {
        const { nome, email, senha, tipo } = this.state.newAluno;
        if (nome && email && senha && tipo) {
            const newId = (this.state.alunos.length > 0 ? Math.max(...this.state.alunos.map(aluno => parseInt(aluno.id))) + 1 : 1).toString();
            const newAluno = { id: newId, nome, email, senha, tipo };
            this.setState(prevState => ({
                alunos: [...prevState.alunos, newAluno],
                newAluno: { nome: '', email: '', senha: '', tipo: '' },
                showAddForm: false
            }), this.saveAlunosToLocalStorage);
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
                <br />
                <br />
                <h1>Alunos:</h1>
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
                        {this.state.alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>
                                    {this.state.editingId === aluno.id ? (
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={this.state.editedAluno.nome}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        aluno.nome
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === aluno.id ? (
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={this.state.editedAluno.email}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        aluno.email
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === aluno.id ? (
                                        <Form.Control
                                            type="text"
                                            name="senha"
                                            value={this.state.editedAluno.senha}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        aluno.senha
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === aluno.id ? (
                                        <Form.Control
                                            type="text"
                                            name="tipo"
                                            value={this.state.editedAluno.tipo}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        aluno.tipo
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === aluno.id ? (
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
                                                onClick={() => this.handleEdit(aluno.id)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => this.handleDelete(aluno.id)}
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
                        <h3>Adicionar Novo Aluno</h3>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    value={this.state.newAluno.nome}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.newAluno.email}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Senha"
                                    name="senha"
                                    value={this.state.newAluno.senha}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Tipo"
                                    name="tipo"
                                    value={this.state.newAluno.tipo}
                                    onChange={this.handleAddChange}
                                />
                            </InputGroup>
                            <Button
                                variant="primary"
                                onClick={this.handleAdd}
                            >
                                Adicionar
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={this.toggleAddForm}
                                style={{ marginLeft: '10px' }}
                            >
                                Cancelar
                            </Button>
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

export default Aluno;
