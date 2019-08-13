import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import TodoListEntry from './TodoListEntry.js'

const TodoList = (props) => {
  return(
    <ScrollView>
      {
        props.todos.map((value, index) => {
          return (
            <TodoListEntry todo={value} key={index} handleDeleteClick={props.handleDeleteClick} getTodos={props.getTodos} /> 
          )
        })
      }
    </ScrollView>
  )
}

export default TodoList;