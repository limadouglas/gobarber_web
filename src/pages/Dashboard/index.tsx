import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendamento</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/21013545?s=460&u=ae012c690912598c03108dd1e7237ba18547f7bc&v=4"
                alt="Douglas Henrique"
              />
              <strong>Dougla Henrique</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/21013545?s=460&u=ae012c690912598c03108dd1e7237ba18547f7bc&v=4"
                  alt="Douglas Henrique"
                />
                <strong>Dougla Henrique</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/21013545?s=460&u=ae012c690912598c03108dd1e7237ba18547f7bc&v=4"
                  alt="Douglas Henrique"
                />
                <strong>Dougla Henrique</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/21013545?s=460&u=ae012c690912598c03108dd1e7237ba18547f7bc&v=4"
                  alt="Douglas Henrique"
                />
                <strong>Dougla Henrique</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/21013545?s=460&u=ae012c690912598c03108dd1e7237ba18547f7bc&v=4"
                  alt="Douglas Henrique"
                />
                <strong>Dougla Henrique</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
