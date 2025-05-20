import { useState } from 'react'
import styles from './Cadastro.module.css';
import axios from "../../components/axios/axiosLaravelConfig"
import { MdOutlineEmail, MdPersonOutline, MdLockOutline, MdRemoveRedEye } from 'react-icons/md'
import { AiFillCloseCircle } from "react-icons/ai";
import { useLocation, useNavigate } from 'react-router-dom';


function CadastroPrestadora(){

  const [message, setMessage] = useState()
  const [name, setName] = useState('');
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('password');
  const [authError, setAuthError] = useState();
  const navigate = useNavigate()  



  function cadastrarUsuario(e) {
    console.log('Usuário cadastrado com sucesso!');
    console.log(`Usuario: ${name} cadastrado com a senha ${password}`);

    e.preventDefault();

    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/register/user/prestadora', {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }).then(
            function (response) {
                navigate('/confirm',{state:email})
                console.log(response)
               // setMessage(response.data['message'].toLowerCase())
            }
        ).catch(
          function (error) {
            console.error(error)
            console.log("entrei aqui")
            //console.log(error.response.data.message);
  
            if (error.response.data.message.includes("The email has already been taken.")) {
              console.log("Email já registrado");
              setAuthError('Email já cadastrado')
            }
            else if(error.response.data.message.includes( "The password confirmation does not match.")){
              
               setAuthError('Senhas diferentes')
             }else if(error.response.data.message.includes("The password must be at least 8 characters.")){
              
               setAuthError('A senha deve conter 8 ou mais caracteres.')
             }
            /*
            if (String(response.status === 200)) {
              console.log(response.data.message)
              console.log("Email já registrado.")
              setAuthError('Email já cadastrado')
            }*/
            
          }
        )
    }).catch(
        function (error) {
            console.log(error)
           
        }
    )
}

    function handleToconfirmClick(){
          navigate('/confirm',{state:'fala state'})
    }



  function showHide(id) {
    const passwordInput = document.getElementById(id);

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setTimeout(function () {
        passwordInput.type = 'password';
      }, 1000);

    }

  }


    return(
        
        <div className={styles.container}>

        <div className={styles.logoGrad}>
            <div className={styles.CadastroIlustration}></div>
        </div>

        <div className={styles.formContainer}>

            <div className={styles.damaLogo}>

            </div>


            <form className={styles.formControl} onSubmit={cadastrarUsuario}>
                <div className={styles.textContainer}>
                    <h1>Cadastrar-se</h1>
                </div>
                <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Nome*'
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.iconStart}><MdPersonOutline /></div>
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Endereço de email*'
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.iconStart}><MdOutlineEmail /></div>
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha*"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.iconEnd}><MdRemoveRedEye onClick={() => showHide('password')} /></div>
            <div className={styles.iconStart}><MdLockOutline /></div>
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="current-password"
              placeholder="Confirmar senha*"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className={styles.iconEnd}><MdRemoveRedEye onClick={() => showHide('confirmPassword')} /></div>
            <div className={styles.iconStart}><MdLockOutline /></div>
          </div>


          {authError && (
            <div className={styles.error}>
              <div className={styles.errorIcon}>
                <AiFillCloseCircle />
              </div>
              <p>{authError}</p>
            </div>
          )}


                <div className={styles.btnGroup}>
                    <input type="submit" value="Cadastrar" className={styles.btnEnter} />

                </div>


            </form>

            <div className={styles.noFind}>

                <div className={styles.cadastroUser}>
                    <p>Já tem uma conta?</p>
                    <a href='./Login'>Entrar</a>
                </div>

                <div className={styles.enterHref}></div>

                <div className={styles.noPass}>
                    <p>Está contratando um serviço?</p>
                    <a href='/cadastro-contratante' >Cadastre-se</a>
                </div>



            </div>

        </div>
    </div>



    );
}

export default CadastroPrestadora;