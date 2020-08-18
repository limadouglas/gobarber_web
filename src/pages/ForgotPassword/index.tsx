import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link } from 'react-router-dom';
import getValidateErrors from '../../utils/getValidateErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é Obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, { abortEarly: false });
        // recuperação de senha
        // history.push('/dashboard);
        await api.post('/passwords/forgot', { email: data.email });
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entreda.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errs = getValidateErrors(err);
          formRef.current?.setErrors(errs);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao recuperar',
          description: 'Ocorreu um erro ao recuperar a senha, tente novamente!',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Button type="submit" loading={loading}>
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
