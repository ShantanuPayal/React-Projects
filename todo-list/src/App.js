// App.js File 
import React, { Component } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup"; 
import "./App.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
class App extends Component { 
	constructor(props) { 
		super(props); 

		// Setting up state 
		this.state = { 
			userInput: "", 
			list: [], 
		}; 
	} 

	// Set a user input value 
	updateInput(value) { 
		this.setState({ 
			userInput: value, 
		}); 
	} 

	// Add item if user input in not empty 
	addItem() { 
		if (this.state.userInput !== "") { 
			const userInput = { 
				// Add a random id which is used to delete 
				id: Math.random(), 

				// Add a user value to list 
				value: this.state.userInput, 
			}; 

			// Update list 
			const list = [...this.state.list]; 
			list.push(userInput); 

			// reset state 
			this.setState({ 
				list, 
				userInput: "", 
			}); 
		} 
	} 

	// Function to delete item from list use id to delete 
  deleteItem(key) {
    const isConfirmed = window.confirm(
      "Clicking 'Mark as Done' will delete the task from the list. Are you sure?"
    );

    if (isConfirmed) {
      const list = [...this.state.list];
      const updateList = list.filter((item) => item.id !== key);
      this.setState({
        list: updateList,
      });
    }
  }

	editItem = (index) => { 
	const todos = [...this.state.list]; 
	const editedTodo = prompt('Edit the todo:'); 
	if (editedTodo !== null && editedTodo.trim() !== '') { 
		let updatedTodos = [...todos] 
		updatedTodos[index].value= editedTodo 
		this.setState({ 
		list: updatedTodos, 
	}); 
	} 
	} 

  render() {
    return (
      <Container>
        <Row className="row-header">
          TODO LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add item..."
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2 add-button"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item, index) => {
                return (
                  <div key={index}>
                    <ListGroup.Item
                      variant="dark"
                      action
                      className="list-group-item"
                    >
                      {item.value}
                      <span>
                        <Button
                          className="done-button"
                          variant="success"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                          Mark as Done
                        </Button>
                        <Button
                          className="edit-button"
                          variant="primary"
                          onClick={() => this.editItem(index)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

