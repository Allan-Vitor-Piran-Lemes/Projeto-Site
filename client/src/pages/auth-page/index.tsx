// client/src/pages/auth-page/index.tsx
/*import React, { useState, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputMask } from 'primereact/inputmask'; // Para CPF e Telefone
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useAuth } from '@/context/hooks/use-auth';
import AuthService from "@/services/auth-service";
import { IUserLogin, IUserRegister, IUserRegisterForm } from '@/commons/types';

// ESQUEMA DE VALIDAÇÃO YUP (Replicando a lógica do seu JS antigo)
const registerSchema = yup.object().shape({
    displayName: yup.string().required("Full Name is required."),
    // Validação de CPF (Formato: 999.999.999-99)
    cpf: yup.string().required("CPF is required.").min(14, "Invalid CPF format."), 
    // Validação de Telefone (Formato: (99) 99999-9999)
    telefone: yup.string().required("Phone is required.").min(15, "Invalid phone number (11 digits)."), 
    username: yup.string().email("Invalid email format.").required("Email is required."),
    // Validação de Senha (8 caracteres, maiúscula, minúscula, número - conforme seu JS antigo)
    password: yup.string().required("Password is required.").min(8, "Password must be at least 8 characters.").matches(/[A-Z]/, "Must contain an uppercase letter.").matches(/[a-z]/, "Must contain a lowercase letter.").matches(/[0-9]/, "Must contain a number."),
    // Validação de Confirmação de Senha
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match.').required('Confirm password is required.') 
});

const loginSchema = yup.object().shape({
    username: yup.string().email("Invalid email format.").required("Email is required."),
    password: yup.string().required("Password is required."),
});


export const AuthPage: React.FC = () => {
    // 1. Estado para controlar a animação (Sign In ou Sign Up)
    const [isSignIn, setIsSignIn] = useState(true);
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();
    const { handleLogin } = useAuth(); // Para gerenciar o estado global de login

    // 2. Formulário de REGISTRO
    const { control: controlRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister, isSubmitting: isSubmittingRegister }, reset: resetRegister } = useForm<IUserRegisterForm>({
        resolver: yupResolver(registerSchema),
        defaultValues: { displayName: '', cpf: '', telefone: '', username: '', password: '', confirmPassword: '' }
    });

    // 3. Formulário de LOGIN
    const { control: controlLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin }, reset: resetLogin } = useForm<IUserLogin>({
        resolver: yupResolver(loginSchema),
        defaultValues: { username: '', password: '' }
    });

    // Lógica de Submissão
    const handleRegisterSubmit = async (data: IUserRegisterForm) => {
        // Objeto com os dados que a API realmente espera (sem confirmPassword)
        const userData: IUserRegister = { displayName: data.displayName!, username: data.username!, password: data.password!, cpf: data.cpf!, telefone: data.telefone! };
        
        try {
            const response = await AuthService.signup(userData);
            if (response.success) {
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Registration successful! Please sign in.', life: 3000 });
                setIsSignIn(true); // Mudar para o painel de Login (Animação)
                resetRegister();
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: response.message || 'Registration failed.', life: 3000 });
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Server error during registration.', life: 3000 });
        }
    };

    const handleLoginSubmit = async (data: IUserLogin) => {
        try {
            const response = await AuthService.login(data);
            if (response.success && response.data) {
                // Sucesso: Salvar autenticação e redirecionar
                handleLogin(response.data); 
                navigate('/');
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: response.message || 'Invalid credentials.', life: 3000 });
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Server error during login.', life: 3000 });
        }
    };

    // Estilos para replicar o design (usando o CSS do seu projeto)
    const containerStyle = { backgroundColor: '#ecf0f1', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' };
    const contentStyle = { backgroundColor: '#fff', borderRadius: '15px', width: '960px', height: '600px', display: 'flex', position: 'relative', overflow: 'hidden' };
    
    // Classes de animação (Replicando a lógica do seu login.js: sign-in-js ou sign-up-js)
    // OBS: O CSS global (estilo_login.css) deve ser aplicado para que a animação funcione.
    const bodyClass = isSignIn ? "sign-in-js" : "sign-up-js";
    
    return (
        <div style={containerStyle} className={bodyClass}>
            <Toast ref={toast} />
            <div className="content" style={contentStyle}>
                
                {/* -------------------- PAINEL DE CADASTRO (SIGN UP) -------------------- }
                <div className="first-content" style={{width: '100%', height: '100%'}}>
                    { /*COLUNA DE TEXTO (Bem-Vindo/Entrar) }
                    <div className="first-column flex flex-column justify-content-center align-items-center" style={{ width: '40%', zIndex: 10, padding: '2rem' }}>
                        <h2 className="title title-primary">Welcome!</h2>
                        <p className="description description-primary text-center">If you already have an account,</p>
                        <p className="description description-primary text-center">Sign in to your account.</p>
                        <Button id="signin" label="Sign In" className="btn btn-primary" onClick={() => { setIsSignIn(true); resetLogin(); }} />
                    </div>
                    
                    {/* COLUNA DE FORMULÁRIO (Criar Conta) }
                    <div className="second-column flex flex-column justify-content-center align-items-center" style={{ width: '60%', padding: '2rem' }}>
                        <h2 className="title title-second">Create Account</h2>
                        
                        {/* Mídia Social }
                        <div className="social-media">
                            <ul className="list-social-media flex gap-2" style={{listStyleType: 'none'}}>
                                <a className="link-social-media" href="#"><li className="item-social-media pi pi-facebook"></li></a>
                                <a className="link-social-media" href="#"><li className="item-social-media pi pi-google"></li></a>
                                <a className="link-social-media" href="#"><li className="item-social-media pi pi-linkedin"></li></a>
                            </ul>
                        </div>
                        <p className="description description-second">Or use your email for registration</p>
                        
                        {/* FORMULÁRIO DE CADASTRO }
                        <form className="form" onSubmit={handleSubmitRegister(handleRegisterSubmit)}>
                            
                            {/* Nome Completo }
                            <label className="form-label">Full Name</label>
                            <Controller name="displayName" control={controlRegister} render={({ field }) => (
                                <>
                                    <InputText {...field} placeholder="Full Name" className={classNames({ 'p-invalid': errorsRegister.displayName })} />
                                    {errorsRegister.displayName && <span className="error">{errorsRegister.displayName.message}</span>}
                                </>
                            )} />

                            {/* CPF }
                            <label className="form-label">CPF</label>
                            <Controller name="cpf" control={controlRegister} render={({ field }) => (
                                <>
                                    <InputMask {...field} mask="999.999.999-99" placeholder="000.000.000-00" className={classNames({ 'p-invalid': errorsRegister.cpf })} />
                                    {errorsRegister.cpf && <span className="error">{errorsRegister.cpf.message}</span>}
                                </>
                            )} />

                            {/* Telefone }
                            <label className="form-label">Phone</label>
                            <Controller name="telefone" control={controlRegister} render={({ field }) => (
                                <>
                                    <InputMask {...field} mask="(99) 99999-9999" placeholder="(00) 00000-0000" className={classNames({ 'p-invalid': errorsRegister.telefone })} />
                                    {errorsRegister.telefone && <span className="error">{errorsRegister.telefone.message}</span>}
                                </>
                            )} />

                            {/* Email (Username) }
                            <label className="form-label">Email</label>
                            <Controller name="username" control={controlRegister} render={({ field }) => (
                                <>
                                    <InputText {...field} placeholder="Email" className={classNames({ 'p-invalid': errorsRegister.username })} />
                                    {errorsRegister.username && <span className="error">{errorsRegister.username.message}</span>}
                                </>
                            )} />

                            {/* Senha }
                            <label className="form-label">Password</label>
                            <Controller name="password" control={controlRegister} render={({ field }) => (
                                <>
                                    <Password {...field} feedback={false} placeholder="Password" className={classNames({ 'p-invalid': errorsRegister.password })} />
                                    {errorsRegister.password && <span className="error">{errorsRegister.password.message}</span>}
                                </>
                            )} />

                            {/* Confirmação de Senha (Sua validação customizada) }
                            <label className="form-label">Confirm Password</label>
                            <Controller name="confirmPassword" control={controlRegister} render={({ field }) => (
                                <>
                                    <Password {...field} feedback={false} placeholder="Confirm Password" className={classNames({ 'p-invalid': errorsRegister.confirmPassword })} />
                                    {errorsRegister.confirmPassword && <span className="error">{errorsRegister.confirmPassword.message}</span>}
                                </>
                            )} />

                            <Button type="submit" label="Sign Up" className="btn btn-second mt-3" loading={isSubmittingRegister} disabled={isSubmittingRegister} />
                        </form>
                    </div>
                </div>

                {/* -------------------- PAINEL DE LOGIN (SIGN IN) -------------------- }
                <div className="second-content" style={{width: '100%', height: '100%'}}>
                    {/* COLUNA DE TEXTO (Bem-Vindo/Cadastre-se) }
                    <div className="first-column flex flex-column justify-content-center align-items-center" style={{ width: '40%', zIndex: 10, padding: '2rem' }}>
                        <h2 className="title title-primary">Welcome Back!</h2>
                        <p className="description description-primary text-center">To keep connected with us,</p>
                        <p className="description description-primary text-center">Please register your account.</p>
                        <Button id="signup" label="Sign Up" className="btn btn-primary" onClick={() => { setIsSignIn(false); resetRegister(); }} />
                    </div>
                    
                    {/* COLUNA DE FORMULÁRIO (Entrar na Conta) }
                    <div className="second-column flex flex-column justify-content-center align-items-center" style={{ width: '60%', padding: '2rem' }}>
                        <h2 className="title title-second">Sign In to Account</h2>
                        
                        {/* Mídia Social }
                        <div className="social-media">
                            <ul className="list-social-media flex gap-2" style={{listStyleType: 'none'}}>
                                <a className="link-social-media" href="#"><li className="item-social-media pi pi-facebook"></li></a>
                                <a className="link-social-media" href="#"><li className="item-social-media pi pi-google"></li></a>
                                <a className="link-social-media" href="#"><li className="item-social-media pi pi-linkedin"></li></a>
                            </ul>
                        </div>
                        <p className="description description-second">Or use your email for login</p>
                        
                        {/* FORMULÁRIO DE LOGIN }
                        <form className="form" onSubmit={handleSubmitLogin(handleLoginSubmit)}>
                            
                            {/* Email }
                            <label className="form-label">Email</label>
                            <Controller name="username" control={controlLogin} render={({ field }) => (
                                <>
                                    <InputText {...field} placeholder="Email" className={classNames({ 'p-invalid': errorsLogin.username })} />
                                    {errorsLogin.username && <span className="error">{errorsLogin.username.message}</span>}
                                </>
                            )} />

                            {/* Senha }
                            <label className="form-label">Password</label>
                            <Controller name="password" control={controlLogin} render={({ field }) => (
                                <>
                                    <Password {...field} feedback={false} placeholder="Password" className={classNames({ 'p-invalid': errorsLogin.password })} />
                                    {errorsLogin.password && <span className="error">{errorsLogin.password.message}</span>}
                                </>
                            )} />
                            
                            <a href="#" className="password text-center">Forgot your password?</a>
                            <Button type="submit" label="Sign In" className="btn btn-second mt-3" loading={isSubmittingLogin} disabled={isSubmittingLogin} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

*/