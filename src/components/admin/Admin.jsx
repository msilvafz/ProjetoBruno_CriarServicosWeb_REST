import React from "react";
import { Table, Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        const defaultAdmin = [
            { id: '1', nome: 'Administrador', Email: 'admin@gmail.com', Senha: 'admin', tipo: 'admin' }
        ];

        const savedAdmin = JSON.parse(localStorage.getItem('admin'));
        if (!savedAdmin || savedAdmin.length === 0) {
            localStorage.setItem('admin', JSON.stringify(defaultAdmin));
        }

        this.state = {
            admin: savedAdmin || defaultAdmin,
            editingId: null,
            editedAdmin: {
                nome: '',
                Email: '',
                Senha: '',
                tipo: ''
            },
            newAdmin: {
                nome: '',
                Email: '',
                Senha: '',
                tipo: ''
            },
            showAddForm: false
        };
    }

    saveAdminToLocalStorage = () => {
        localStorage.setItem('admin', JSON.stringify(this.state.admin));
    }

    handleEdit = (id) => {
        const admin = this.state.admin.find(admin => admin.id === id);
        this.setState({
            editingId: id,
            editedAdmin: { nome: admin.nome, Email: admin.Email, Senha: admin.Senha, tipo: admin.tipo }
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            editedAdmin: { ...this.state.editedAdmin, [name]: value }
        });
    };

    handleSave = () => {
        const { editingId, editedAdmin } = this.state;
        const updatedAdmin = this.state.admin.map(admin =>
            admin.id === editingId ? { ...admin, ...editedAdmin } : admin
        );
        this.setState({
            admin: updatedAdmin,
            editingId: null,
            editedAdmin: { nome: '', Email: '', Senha: '', tipo: '' }
        }, this.saveAdminToLocalStorage);
    };

    handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este Administrador?")) {
            const updatedAdmin = this.state.admin.filter(admin => admin.id !== id);
            this.setState({ admin: updatedAdmin }, this.saveAdminToLocalStorage);
        }
    };

    handleAddChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            newAdmin: { ...this.state.newAdmin, [name]: value }
        });
    };

    handleAdd = () => {
        const { nome, Email, Senha, tipo } = this.state.newAdmin;
        if (nome && Email && Senha && tipo) {
            const newId = (this.state.admin.length > 0 ? Math.max(...this.state.admin.map(admin => parseInt(admin.id))) + 1 : 1).toString();
            const newAdmin = { id: newId, nome, Email, Senha, tipo };
            this.setState(prevState => ({
                admin: [...prevState.admin, newAdmin],
                newAdmin: { nome: '', Email: '', Senha: '', tipo: '' },
                showAddForm: false
            }), this.saveAdminToLocalStorage);
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
                <h1>Administração:</h1>
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
                        {this.state.admin.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>
                                    {this.state.editingId === admin.id ? (
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={this.state.editedAdmin.nome}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        admin.nome
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === admin.id ? (
                                        <Form.Control
                                            type="email"  // Alterado para email
                                            name="Email"
                                            value={this.state.editedAdmin.Email}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        admin.Email
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === admin.id ? (
                                        <Form.Control
                                            type="password"  // Alterado para password
                                            name="Senha"
                                            value={this.state.editedAdmin.Senha}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        admin.Senha
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === admin.id ? (
                                        <Form.Control
                                            type="text"
                                            name="tipo"
                                            value={this.state.editedAdmin.tipo}
                                            onChange={this.handleChange}
                                        />
                                    ) : (
                                        admin.tipo
                                    )}
                                </td>
                                <td>
                                    {this.state.editingId === admin.id ? (
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
                                                onClick={() => this.handleEdit(admin.id)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => this.handleDelete(admin.id)}
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
                        <h3>Adicionar Novo Administrador</h3>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    value={this.state.newAdmin.nome}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="email"  // Alterado para email
                                    placeholder="Email"
                                    name="Email"
                                    value={this.state.newAdmin.Email}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="password"  // Alterado para password
                                    placeholder="Senha"
                                    name="Senha"
                                    value={this.state.newAdmin.Senha}
                                    onChange={this.handleAddChange}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Tipo"
                                    name="tipo"
                                    value={this.state.newAdmin.tipo}
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

export default Admin;
