import React, { useCallback, useRef } from 'react';
import { FiLock, FiMail, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AvatarInput } from './styles';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import getValidateErrors from '../../utils/getValidateErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileRequestProps {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail é Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });
        await schema.validate(data, { abortEarly: false });
        await api.post('users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errs = getValidateErrors(err);
          formRef.current?.setErrors(errs);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" type="text" icon={FiUser} placeholder="Nome" />

          <Input name="email" type="text" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder="Senha atual"
          />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
