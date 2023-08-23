import btnstyles from './button.module.css';


const Button = (props) => {

    return (
        <button className={btnstyles.button}
            type={props.type || 'button'}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;