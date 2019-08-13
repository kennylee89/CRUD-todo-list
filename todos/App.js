import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import exampleData from './exampleData.js';
import TodoList from './TodoList.js';
const Realm = require('realm');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todos: exampleData
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.number = 0;
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    Realm.open({
      schema: [{name: 'Todo', properties: {id: 'int', text: 'string'}}],
      schemaVersion: 1,
      migration: (oldRealm, newRealm) => {
        const oldObjects = oldRealm.objects('Todo');
        const newObjects = newRealm.objects('Todo');
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].name = oldObjects[i].id + ' ' + oldObjects[i].text;
        }
      }
    }).then(realm => {
      // console.log(realm.path)
      let todos = Array.from(realm.objects('Todo'));
      const state = Object.assign({}, this.state)
      state.todos = todos
      this.setState(state);
    });
  }

  handleInputChange(inputText) {
    const state = Object.assign({}, this.state);
    state.text = inputText;
    this.setState(state)
  }

  handleButtonClick() {
    const state = Object.assign({}, this.state);
    Realm.open({
      schema: [{name: 'Todo', properties: {id: 'int', text: 'string'}}],
      schemaVersion: 1,
    }).then(realm => {
      realm.write(() => {
        console.log(state)
        realm.create('Todo', {id: ++this.number, text: state.text})
      });
      console.log('added todo');
    }).then(()=> {
      this.getTodos()
      this.setState({ text: '' })
      alert('Todo submitted!');
    });
  }

  handleDeleteClick() {
    alert('todo deleted!');
  }

  setModalVisible() {
    console.log(this.refs)
    const state = Object.assign({}, this.state);
    state.modalVisible = !state.modalVisible;
    this.setState(state)
  }

  handleUpdateClick(e) {
    console.log(e.nativeEvent)
    Realm.open({
      schema: [{name: 'Todo', properties: {id: 'int', text: 'string'}}],
      schemaVersion: 1,
    }).then(realm => {
      realm.write(() => {
        var realmDB = Array.from(realm.objects('Todo'));
        for (var i = 0; i < realmDB.length; i++) {
          console.log(realmDB[i].text)
        }
      });
      console.log('added todo');
    }).then(()=> {
      this.getTodos()
      this.setState({ text: '' })
      alert('Todo submitted!');
    });
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>To Do List</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.handleInputChange}
            value={this.state.text}
            placeholder="Add something here"
          />
        </View>
        <View style={styles.todolist}>
          <TodoList todos={this.state.todos} handleDeleteClick={this.handleDeleteClick} getTodos={this.getTodos} setModalVisible={this.setModalVisible}/>
        </View>
        <View style={styles.footer}>
          <Button 
            onPress={this.handleButtonClick}
            title="Submit Todo"
            color="blue"
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
} 
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighter,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
  button: {
    position: 'absolute',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  todolist: {
    maxHeight: 400
  },
  modalText: {
    marginTop: 30,
    marginBottom: 30,
  }
});

//  https://kennys-todos.us1a.cloud.realm.io
