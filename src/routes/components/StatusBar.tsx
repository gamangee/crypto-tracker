import React from 'react';
import styled from 'styled-components';
import { FcCandleSticks } from 'react-icons/fc';
import Mode from './Mode';

export default function StatusBar() {
  return (
    <StatusArea>
      <Logo>
        <FcCandleSticks style={{ fontSize: '25px' }} />
        <LogoText>CRYPTO</LogoText>
      </Logo>
      <Mode />
    </StatusArea>
  );
}
const StatusArea = styled.div`
  padding-top: 30px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  font-family: 'Orbitron', sans-serif;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

const LogoText = styled.div`
  margin-left: 6px;
  font-size: 25px;
`;
