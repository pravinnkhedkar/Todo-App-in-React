const Button = (props) => {
    console.log('Button Component =======>>');
    return (
    <button 
        onClick={props.onClickHandler}>
        {props.btnText}
    </button>
)};

export default Button;