import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

import { useAuth } from '@/context/hooks/use-auth';
import AuthService from "@/services/auth-service";
import { IUserLogin, IUserRegister, AuthenticationResponse } from '@/commons/types';

import './styles.css';

const registerSchema = yup.object({
    displayName: yup.string().required("O campo nome é de preenchimento obrigatório."),
    cpf: yup.string().required("CPF é obrigatório."),
    telefone: yup.string().required("Telefone é obrigatório."),
    username: yup.string().required("O e-mail é de preenchimento obrigatório.").email("E-mail inválido"),
    password: yup.string()
        .required("Senha obrigatória.")
        .min(8, "Mínimo 8 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, "Deve ter maiúscula, minúscula e número."),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'As senhas não conferem.')
        .required('Confirme sua senha.')
});

const loginSchema = yup.object({
    username: yup.string().required("E-mail é obrigatório."),
    password: yup.string().required("Senha é obrigatória."),
});

// Interface correta
interface IRegisterFormData extends IUserRegister {
    confirmPassword: string;
}

export const AuthPage: React.FC = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogin } = useAuth();

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsRightPanelActive(true);
        } else {
            setIsRightPanelActive(false);
        }
    }, [location.pathname]);

    // REGISTRO
    const { 
        control: regControl, 
        handleSubmit: handleReg, 
        formState: { errors: regErrors, isSubmitting: isRegSub }, 
        reset: resetReg 
    } = useForm<IRegisterFormData>({ 
        resolver: yupResolver(registerSchema),
        defaultValues: { displayName: '', username: '', cpf: '', telefone: '', password: '', confirmPassword: '' }
    });
    
    const onRegister = async (data: IRegisterFormData) => {
        try {
            const response = await AuthService.signup({
                displayName: data.displayName, username: data.username, password: data.password,
                cpf: data.cpf, telefone: data.telefone
            });
            if (response.success) {
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada! Faça login.', life: 3000 });
                resetReg();
                setIsRightPanelActive(false);
                navigate('/login');
            } else {
                const msg = response.message || 'Falha ao criar conta.';
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 });
            }
        } catch { toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro no servidor.', life: 3000 }); }
    };

    // LOGIN
    const { control: logControl, handleSubmit: handleLog, formState: { errors: logErrors, isSubmitting: isLogSub } } = useForm<IUserLogin>({ resolver: yupResolver(loginSchema) });

    const onLogin = async (data: IUserLogin) => {
        try {
            const response = await AuthService.login(data);
            if (response.success && response.data) {
                handleLogin(response.data as AuthenticationResponse);
                toast.current?.show({ severity: 'success', summary: 'Bem-vindo', detail: 'Login realizado!', life: 3000 });
                setTimeout(() => navigate('/'), 500);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Credenciais inválidas.', life: 3000 });
            }
        } catch { toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro no servidor.', life: 3000 }); }
    };

    return (
        <div className={`auth-page-container ${isRightPanelActive ? "right-panel-active" : ""}`}>
            <Toast ref={toast} />
            
            <div className="auth-card">
                
                {/* --- CADASTRO (Com redes sociais e botão) --- */}
                <div className="form-wrapper sign-up-wrapper">
                    <form className="auth-form-content" onSubmit={handleReg(onRegister)}>
                        <h2 className="auth-title-second">Criar uma Conta</h2>
                        
                        <div className="social-container">
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-facebook-f"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-google"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-linkedin-in"></i></div></a>
                        </div>
                        <p className="description-second">Ou utilize seu email para o cadastro</p>

                        <label className="form-label">Nome Completo</label>
                        <Controller name="displayName" control={regControl} render={({ field }) => (
                            <InputText {...field} placeholder="Nome Completo" className={classNames("input-field", { 'p-invalid': regErrors.displayName })} />
                        )} />
                        {regErrors.displayName && <span className="error-msg">{regErrors.displayName.message}</span>}

                        <label className="form-label">CPF</label>
                        <Controller name="cpf" control={regControl} render={({ field }) => (
                            <InputMask {...field} mask="999.999.999-99" placeholder="CPF" className={classNames("input-field", { 'p-invalid': regErrors.cpf })} />
                        )} />
                        {regErrors.cpf && <span className="error-msg">{regErrors.cpf.message}</span>}

                        <label className="form-label">Telefone</label>
                        <Controller name="telefone" control={regControl} render={({ field }) => (
                            <InputMask {...field} mask="(99) 99999-9999" placeholder="Telefone" className={classNames("input-field", { 'p-invalid': regErrors.telefone })} />
                        )} />
                        {regErrors.telefone && <span className="error-msg">{regErrors.telefone.message}</span>}

                        <label className="form-label">Email</label>
                        <Controller name="username" control={regControl} render={({ field }) => (
                            <InputText {...field} placeholder="Email" className={classNames("input-field", { 'p-invalid': regErrors.username })} />
                        )} />
                        {regErrors.username && <span className="error-msg">{regErrors.username.message}</span>}

                        <label className="form-label">Senha</label>
                        <Controller name="password" control={regControl} render={({ field }) => (
                            <Password {...field} feedback={false} placeholder="Senha" toggleMask className={classNames({ 'p-invalid': regErrors.password })} />
                        )} />
                        {regErrors.password && <span className="error-msg">{regErrors.password.message}</span>}

                        <label className="form-label">Confirmar Senha</label>
                        <Controller name="confirmPassword" control={regControl} render={({ field }) => (
                            <Password {...field} feedback={false} placeholder="Repita sua senha" toggleMask className={classNames({ 'p-invalid': regErrors.confirmPassword })} />
                        )} />
                        {regErrors.confirmPassword && <span className="error-msg">{regErrors.confirmPassword.message}</span>}

                        <button className="btn-second" disabled={isRegSub}>SALVAR</button>
                    </form>
                </div>

                {/* --- LOGIN --- */}
                <div className="form-wrapper sign-in-wrapper">
                    <form className="auth-form-content" onSubmit={handleLog(onLogin)}>
                        <h2 className="auth-title-second">Entre na sua conta</h2>
                        <div className="social-container">
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-facebook-f"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-google"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-linkedin-in"></i></div></a>
                        </div>
                        <p className="description-second">Ou utilize seu email para o seu login</p>

                        <label className="form-label">Email</label>
                        <Controller name="username" control={logControl} render={({ field }) => (
                            <InputText {...field} placeholder="Email" className={classNames("input-field", { 'p-invalid': logErrors.username })} />
                        )} />
                        {logErrors.username && <span className="error-msg">{logErrors.username.message}</span>}

                        <label className="form-label">Senha</label>
                        <Controller name="password" control={logControl} render={({ field }) => (
                            <Password {...field} feedback={false} placeholder="Senha" toggleMask className={classNames({ 'p-invalid': logErrors.password })} />
                        )} />
                        {logErrors.password && <span className="error-msg">{logErrors.password.message}</span>}

                        <a href="#" style={{fontSize: '14px', color: '#333', marginTop: '15px', textDecoration: 'none'}}>Esqueceu sua senha?</a>
                        <button className="btn-second" disabled={isLogSub}>ENTRAR</button>
                    </form>
                </div>

                {/* --- OVERLAY --- */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2 className="auth-title-primary">Bem Vindo!</h2>
                            <p className="description-primary">Se você possui conta</p>
                            <p className="description-primary">Entre na sua conta</p>
                            <button className="btn-primary" onClick={() => { setIsRightPanelActive(false); navigate('/login'); }}>ENTRAR</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h2 className="auth-title-primary">Bem Vindo!</h2>
                            <p className="description-primary">Para continuar no nosso site</p>
                            <p className="description-primary">Faça o seu cadastro e se divirta</p>
                            <button className="btn-primary" onClick={() => { setIsRightPanelActive(true); navigate('/register'); }}>CADASTRE-SE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};