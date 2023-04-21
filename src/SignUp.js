/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import react, {useRef, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {BeatLoader} from 'react-spinners'
import axios from 'axios'
import style from './styles/modules/app.module.scss';
import Button from './components/Button';


const Home = () => {    
    const [load, setLoad] = useState(false)
    const [Prompt, setPrompt] = useState(false)
    const [Msg, setMsg] = useState('')

    const navigate = useNavigate()
    const ref = useRef()
    const Login = async () => {
        setLoad(true)
        console.log('dsaad')
        // try {
        //         const res = await axios.post('https://tasks-app-backend-5lk0.onrender.com//signup', {
        //             email:ref.current.value,
        //         });
        //         console.log(res)

        // }catch {
        //     (error) => {
        //         console.log(error)
        //     }
        //     console.log('sda')
        // }
        console.log(ref.current.value)
        
        await axios.post('https://tasks-app-backend-5lk0.onrender.com/signup', {
            email:ref.current.value,
           
         }).then((resp)=> {
            console.log(resp)
            if(resp.data.message === 'This user does not exist, would you like to create an account with this email?'){
                setMsg(resp.data.message)
                setPrompt(true)
            }
            setLoad(false)            
            localStorage.setItem('userId', resp.data.user.user_id)
            navigate('/todo-tracker')
         }).catch((err)=> {
            console.log(err)
         })

         
    }


    const signUp = async () => {
        setLoad(true)
        console.log('dsaad')
        // try {
        //         const res = await axios.post('https://tasks-app-backend-5lk0.onrender.com//signup', {
        //             email:ref.current.value,
        //         });
        //         console.log(res)

        // }catch {
        //     (error) => {
        //         console.log(error)
        //     }
        //     console.log('sda')
        // }
        console.log(ref.current.value)
        
        await axios.post('https://tasks-app-backend-5lk0.onrender.com/signup', {
            email:ref.current.value,
            confirm_signup:true
         }).then((resp)=> {
            setLoad(false)            
            localStorage.setItem('userId', resp.data.user.user_id)
            navigate('/todo-tracker')
         }).catch((err)=> {
            console.log(err)
         })

         
    }

   


return(

	<div className={style.wrapper}>
		<div className={style.sign__wrapper}>
			<h1
				style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '5rem' }}
			>
				Todo Tracker{' '}
			</h1>
			<label>
				<h3>Email</h3>
				<input
                    ref={ref}
					type='email'
					placeholder='Enter Your Email Address'
					style={{ borderRadius: '5px', padding: '1rem 2rem', marginBottom:'2rem', width:'100%' }}
				/>
			</label>

            {Prompt ? <div>{Msg}</div> : '' }

			{
                Prompt ? <Button variants='primary' type='submit' onClick={signUp}>
				{load ?<BeatLoader color="#fff" size={10} /> : ' Yes '}</Button>
                : <Button variants='primary' type='submit' onClick={Login}>
				{load ?<BeatLoader color="#fff" size={10} /> : ' Login'}</Button>


            }


              
		</div>
	</div>
)};

export default Home;
