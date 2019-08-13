import React, { Component } from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import TodoListEntry from './TodoListEntry.js'

const TodoList = (props) => {
  // console.log(props.todos)
  return(
    <ScrollView>
      {
        props.todos.map((value, index) => {
          return (
            <TodoListEntry todo={value} key={index} handleDeleteClick={props.handleDeleteClick} getTodos={props.getTodos} setModalVisible={props.setModalVisible}/> 
          )
        })
      }
    </ScrollView>
  )
}

export default TodoList;