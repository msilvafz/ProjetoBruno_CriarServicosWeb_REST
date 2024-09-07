import React from "react";
import {
  Form,
  Button,
  Toast,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import "../../assets/css/CadastroProfessor.css";

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      descricao: "",
      imagem: null,
      valor: "",
      documentos: [],
      dificuldade: "",
      showSuccess: false,
      progress: 0,
      showAddModuleModal: false,
      moduleName: "",
      modules: [],
      errors: {},
    };
  }

  handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "imagem") {
      this.setState({ imagem: files[0] });
    } else if (name === "documentos") {
      this.setState({ documentos: Array.from(files) });
    } else {
      this.setState({ [name]: value });
    }
  };

  validateForm = () => {
    const { nome, descricao, dificuldade } = this.state;
    const errors = {};

    if (!nome) errors.nome = "Nome do curso é obrigatório";
    if (!descricao) errors.descricao = "Descrição do curso é obrigatória";
    if (!dificuldade) errors.dificuldade = "Dificuldade do curso é obrigatória";

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateForm()) {
      this.setState(
        {
          nome: "",
          descricao: "",
          imagem: null,
          valor: "",
          documentos: [],
          dificuldade: "",
          showSuccess: true,
        },
        () => {
          this.startProgress();
        }
      );
    }
  };

  startProgress = () => {
    const interval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.progress >= 100) {
          clearInterval(interval);
          return { showSuccess: false, progress: 0 };
        }
        return { progress: prevState.progress + 1 };
      });
    }, 30);
  };

  handleAddModule = () => {
    this.setState((prevState) => ({
      modules: [...prevState.modules, prevState.moduleName],
      moduleName: "",
      showAddModuleModal: false,
    }));
  };

  handleViewDetails = (moduleName) => {
    alert(`Detalhes do módulo: ${moduleName}`);
  };

  render() {
    return (
      <Container>
        <Row className="mb-1">
          <Col md={12} className="text-end mb-3">
            <Button variant="success" onClick={this.handleSubmit}>
              Publicar
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Informações do Curso</Card.Title>
                <Form onSubmit={this.handleSubmit}>
                  <Container fluid className="mt-3">
                    <Card className="mb-3">
                      <Card.Body>
                        <Form.Group controlId="formNome">
                          <Form.Label>Nome do Curso</Form.Label>
                          <Form.Control
                            type="text"
                            name="nome"
                            value={this.state.nome}
                            onChange={this.handleChange}
                            required
                            isInvalid={!!this.state.errors.nome}
                          />
                          <Form.Control.Feedback type="invalid">
                            {this.state.errors.nome}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Container>
                  <Container fluid>
                    <Card className="mb-3">
                      <Card.Body>
                        <Form.Group controlId="formDescricao">
                          <Form.Label>Descrição do Curso</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.handleChange}
                            rows={10}
                            required
                            isInvalid={!!this.state.errors.descricao}
                          />
                          <Form.Control.Feedback type="invalid">
                            {this.state.errors.descricao}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Container>
                  <Container fluid>
                    <Card className="mb-3">
                      <Card.Body>
                        <Form.Group controlId="formDificuldade">
                          <Form.Label>Dificuldade do Curso</Form.Label>
                          <Form.Control
                            as="select"
                            name="dificuldade"
                            value={this.state.dificuldade}
                            onChange={this.handleChange}
                            required
                            isInvalid={!!this.state.errors.dificuldade}
                          >
                            <option value="">Selecione a dificuldade</option>
                            <option value="iniciante">Iniciante</option>
                            <option value="intermediario">Intermediário</option>
                            <option value="avancado">Avançado</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {this.state.errors.dificuldade}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Container>
                  <Container fluid>
                    <Card className="mb-3">
                      <Card.Body>
                        <Form.Group controlId="formImagem">
                          <Form.Label>Imagem de Capa</Form.Label>
                          <Form.Control
                            type="file"
                            name="imagem"
                            onChange={this.handleChange}
                            accept="image/*"
                            required
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Detalhes Adicionais</Card.Title>
                <Form>
                  <Container fluid>
                    <Card className="mb-3">
                      <Card.Body>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="secondary"
                            onClick={() =>
                              this.setState({ showAddModuleModal: true })
                            }
                            style={{ fontSize: "1rem" }}
                          >
                            Adicionar Módulo
                          </Button>
                        </div>

                        {this.state.modules.length > 0 && (
                          <div
                            className="mt-3"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            {this.state.modules.map((module, index) => (
                              <Card
                                key={index}
                                className="mb-2"
                                style={{ width: "100%" }}
                              >
                                <Card.Body
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Card.Text style={{ textAlign: "left" }}>
                                    {module}
                                  </Card.Text>
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      this.handleViewDetails(module)
                                    }
                                  >
                                    Detalhes
                                  </Button>
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Container>

                  <Container fluid>
                    <Card className="mb-3">
                      <Card.Body>
                        <Form.Group controlId="formValor">
                          <Form.Label>Valor do Curso</Form.Label>
                          <Form.Control
                            type="text"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Container>

                  <Container fluid>
                    <Card className="mb-3">
                      <Card.Body>
                        <Form.Group controlId="formDocumentos">
                          <Form.Label>Enviar Documentos</Form.Label>
                          <Form.Control
                            type="file"
                            name="documentos"
                            onChange={this.handleChange}
                            multiple
                            required
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal
          show={this.state.showAddModuleModal}
          onHide={() => this.setState({ showAddModuleModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Módulo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formModuleName">
                <Form.Label>Nome do Módulo</Form.Label>
                <Form.Control
                  type="text"
                  name="moduleName"
                  value={this.state.moduleName}
                  onChange={this.handleChange}
                  placeholder="Digite o nome do módulo"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showAddModuleModal: false })}
            >
              Fechar
            </Button>
            <Button variant="primary" onClick={this.handleAddModule}>
              Adicionar Módulo
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.showSuccess && (
          <Toast
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              width: "300px",
              zIndex: 1050,
            }}
            className="text-white bg-success"
            onClose={() => this.setState({ showSuccess: false })}
            show={this.state.showSuccess}
            delay={3000}
            autohide
          >
            <Toast.Body>
              Curso adicionado com sucesso!
              <div
                style={{
                  height: "5px",
                  backgroundColor: "green",
                  width: `${this.state.progress}%`,
                  transition: "width 0.03s",
                }}
              ></div>
            </Toast.Body>
          </Toast>
        )}
      </Container>
    );
  }
}

export default Cadastro;
