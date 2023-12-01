const Input = props => {
    const { label, id, ...others} = props;

    return (
        <div>
            <label id={id}>{label}</label>
            <input {...others} id={id} placeholder={label}/>
        </div>
    );
}

export default Input;