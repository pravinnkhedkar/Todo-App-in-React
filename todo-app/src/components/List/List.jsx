import styles from './List.module.css';

const List = (props) => {
    console.log('List Component =======>>');
    /*
    ['a','b','c'] ==> [<li>a</li>, <li>b</li>, <li>c</li>];
    1. Below function is used to convert array of string to array of jsx to show all 
    unorder list items.
    2. Need to pass unique key props in array of jsx 
    */
    const list = props.value.map((itemObj, index)=>{
        return (
            <li key={index} className={itemObj.isDone ? `${styles.list} ${styles.doneItem}` : styles.list}>
            
                {!itemObj.isEditing && (
                    <>
                        <div className={styles.itemList}>
                            <b>{itemObj.itemName}</b>
                        </div>

                        <button onClick={()=>{props.onEditClickHandler(index)}}> Edit </button>
                        
                        {/* Conditional rendering logic */}
                        {itemObj.isDone && (
                            <button onClick={ ()=>{props.onDeleteClickHandler(index)} }>
                                Delete
                            </button>
                        )}

                        {!itemObj.isDone && (
                            <button onClick={ ()=>{props.onDoneClickHandler(index)} }>
                                Done
                            </button>
                        )}

                        {index !== 0 && (
                            <button onClick={ ()=>{props.swapListItemHandler(index, index-1)}}>
                            UP
                            </button>
                        )}
                        
                        {index !== (props.value.length-1) && (
                            <button onClick={ ()=>{props.swapListItemHandler(index, index+1)}}>
                                DOWN
                            </button>
                        )}
                    </>
                )}

                {itemObj.isEditing && (
                    <>
                        <input 
                            type="text" 
                            value={itemObj.editItemName} 
                            onChange={(event)=>{
                                props.onEditInputChangeHandler(index, event);
                            }}/>
                        <button 
                            onClick={()=>{props.onEditSaveHandler(index)}}>
                            Save
                        </button>
                        <button 
                            onClick={()=>{props.onEditCancelHandler(index)}}>
                            Cancel
                        </button>
                    </>
                )}
            </li>
        );
    });


    return(
        <ul>{list}</ul>
    );
};

export default List;