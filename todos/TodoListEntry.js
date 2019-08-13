import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableHighlight,
  Button,
} from 'react-native';
const Realm = require('realm');

class TodoListEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      modalInput: ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleModalInputChange = this.handleModalInputChange.bind(this);
  }

  handleDelete() {
    this.props.handleDeleteClick();
    var text = this.props.todo;
    Realm.open({
      schema: [{name: 'Todo', properties: {id: 'int', text: 'string'}}],
      schemaVersion: 1,
    }).then(realm => {
      realm.write(() => {
        realm.delete(text)
      });
    })
    this.props.getTodos();
  }

  handleEditClick() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  handleUpdateClick() {
    var newText = this.props.todo.text
    console.log(this.props.todo.text)
    Realm.open({
      schema: [{name: 'Todo', properties: {id: 'int', text: 'string'}}],
      schemaVersion: 1,
    }).then(realm => {
      var realmDB = realm.objects('Todo');
      realm.write(() => {
        for (var i = 0; i < realmDB.length; i++) {
          console.log(realmDB[i].text)
          if (realmDB[i].text === newText) {
            console.log(realmDB[i], newText)
            realmDB[i].text = this.state.modalInput;
            break;
          }
        }
      });
      this.setState({modalVisible: false});
    })
  }

  handleModalInputChange(inputText) {
    const state = Object.assign({}, this.state);
    state.modalInput = inputText;
    this.setState(state)
  }

  render() {
    return (
      <View style={styles.entry}>
        <Text style={styles.text}>{this.props.todo.text}</Text>
        <TouchableOpacity style={styles.button}>
          <Text ref={this.props.todo.text} onPress={this.handleDelete}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text ref={this.props.todo.text} onPress={this.handleEditClick}>Edit</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={styles.modal}>
            <View>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.handleModalInputChange}
                value={this.state.text}
                placeholder="Update Todo"
              />
              <TouchableHighlight
                onPress={() => {
                  this.handleEditClick();
                }}>
                <Text style={styles.modalText}>Hide Modal</Text>
              </TouchableHighlight>
              <Button 
                onPress={this.handleUpdateClick}
                title="Update todo"
                color="blue"
                style={styles.button}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  entry: {
    height: 120,
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalText: {
    marginTop: 30,
    marginBottom: 30,
  }
});

export default TodoListEntry;