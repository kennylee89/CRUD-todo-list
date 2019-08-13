import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const Realm = require('realm');

class TodoListEntry extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.handleDeleteClick();
    var text = this.props.todo;
    console.log(text)

    Realm.open({
      schema: [{name: 'Todo', properties: {id: 'int', text: 'string'}}],
      schemaVersion: 1,
    }).then(realm => {
      realm.write(() => {
        realm.delete(text)
      });
      console.log(text + ' deleted');
    })
    this.props.getTodos();
  }

  render() {
    return (
      <View style={styles.entry}>
        <Text style={styles.text}>{this.props.todo.text}</Text>
        <TouchableOpacity style={styles.button}>
          <Text ref={this.props.todo.text} onPress={this.handleDelete}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text onPress={this.props.setModalVisible}>Edit</Text>
        </TouchableOpacity>
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
  }
});

export default TodoListEntry;