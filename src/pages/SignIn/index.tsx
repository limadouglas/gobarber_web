import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link, useHistory } from 'react-router-dom';
import getValidateErrors from '../../utils/getValidateErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é Obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        signIn({ email: data.email, password: data.password });
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errs = getValidateErrors(err);
          formRef.current?.setErrors(errs);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: 'Ocorreu um erro ao fazer login, tente novamente!',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
