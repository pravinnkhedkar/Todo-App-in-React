const Input = (props) => {
    console.log('Input Component =======>>');
    return (
    <input 
        type="text"
        value={props.value} 
        onChange={props.onChangeHandler}
        onKeyUp={props.onKeyUpHandler}/>
)};

export default Input;