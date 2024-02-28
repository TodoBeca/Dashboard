import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Registrarse</h3>
                <p>Ingrese los datos para registrarse</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
