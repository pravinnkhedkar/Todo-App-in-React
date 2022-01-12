import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import List from '../List/List';

const TodoList = () => {

    console.log('TodoList Component =======>>');

    const [inputVal, setInputVal] = useState('');
    const [list, setList] = useState([]); // array of objects

    // componentDidMount
    useEffect(()=>{
        // To get the localStroage to get the todoList data
        let todoList = localStorage.getItem('todoList');
        if(todoList) {
            todoList = JSON.parse(todoList); // String --> object
            setList(todoList);
        } 
        console.log('componentDidMount called====>>');
    }, []);

    // componentDidUpdate
    useEffect(()=>{
        const todoList = JSON.stringify(list); // Object --> String
        localStorage.setItem('todoList',todoList);
        console.log('list is updated !!!! ');
    }, [list]);

    // componentDidUpdate
    useEffect(()=>{
        console.log('inputVal is updated !!!! ');
    }, [inputVal]);


    const inputChangeHandler = (event) => {
        const value = event.target.value;
        // Updating the state is async by nature.
        setInputVal(value);
        //console.log('on input change =======>>',inputVal);
    };

    const inputKeyUpHandler = (event) => {
        if(event.key === "Enter"){
            buttonClickHandler();
        }
    };

    const buttonClickHandler = () => {
        if(inputVal.trim()){
            const todoList = [...list];
            // Creating the array of object to make scalable solution and store all data
            todoList.push({
                itemName: inputVal,
                editItemName:inputVal,
                isDone: false,
                isEditing: false
            });
            setList(todoList);
            setInputVal('');
        } else {
            setInputVal('');
        }
    };

    const doneClickHandler = (itemIndex) => {
        const todoList = [...list];
        todoList[itemIndex].isDone = true;
        setList(todoList);
    };

    const deleteClickHandler = (itemIndex) => {
        const todoList = [...list];
        todoList.splice(itemIndex, 1);
        setList(todoList);
    };

    const swapListItem = (initIndex, finalIndex) => {
        const todoList = [...list];
        const tempItem = todoList[initIndex];
        todoList[initIndex] = todoList[finalIndex];
        todoList[finalIndex] = tempItem;
        setList(todoList);
    };

    const onEditHandler = (itemIndex) => {
        const todoList = [...list];
        todoList[itemIndex].isEditing = true;
        setList(todoList);
    };

    const onEditCancel = (itemIndex) => {
        const todoList = [...list];
        todoList[itemIndex].editItemName = todoList[itemIndex].itemName;
        todoList[itemIndex].isEditing = false;
        setList(todoList);
    };

    const onEditInputChange = (itemIndex, event) => {
        const inputValue = event.target.value;
        const todoList = [...list];
        todoList[itemIndex].editItemName = inputValue;
        setList(todoList);
    };

    const onEditSave = (itemIndex) => {
        const todoList = [...list];
        const editedValue = todoList[itemIndex].editItemName.trim();
        if(editedValue){
            todoList[itemIndex].itemName = editedValue;
            todoList[itemIndex].editItemName = editedValue
            todoList[itemIndex].isEditing = false;
            setList(todoList);
        }else {
            todoList[itemIndex].editItemName = todoList[itemIndex].itemName;
            todoList[itemIndex].isEditing = false;
            setList(todoList);
        }
    };

    return (
        <>
            <Input 
                value={inputVal}
                onChangeHandler={inputChangeHandler}
                onKeyUpHandler={inputKeyUpHandler}/>
            <Button 
                onClickHandler={buttonClickHandler}
                btnText="Add to the List"/>
            <List 
                value={list}
                onDoneClickHandler={doneClickHandler}
                onDeleteClickHandler={deleteClickHandler}
                swapListItemHandler={swapListItem}
                onEditClickHandler={onEditHandler}
                onEditCancelHandler={onEditCancel}
                onEditInputChangeHandler={onEditInputChange}
                onEditSaveHandler={onEditSave}/>
        </>
    );
};

export default TodoList;