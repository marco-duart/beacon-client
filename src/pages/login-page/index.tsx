import icon from '@/assets/icon.png';
import { LoginForm } from '@/features/auth/login-form';
import { Brand, Logo, Panel, Subtitle, Title, Wrapper } from './index.styles';

export function LoginPage() {
  return (
    <Wrapper>
      <Panel>
        <Brand>
          <Logo src={icon} alt="Beacon" />
          <Title>Beacon</Title>
          <Subtitle>Entre para acompanhar os erros dos seus sistemas</Subtitle>
        </Brand>
        <LoginForm />
      </Panel>
    </Wrapper>
  );
}
