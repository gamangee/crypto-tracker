import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Error() {
  return (
    <Errors>
      <Link to='/crypto-tracker'>
        <Nav>처음으로 돌아가기 ↩</Nav>
      </Link>
      <Message>😥Sorry, we can't find APIs.</Message>
    </Errors>
  );
}

const Errors = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Nav = styled.div`
  margin-bottom: 20px;
  color: #95a5a6;
`;

const Message = styled.h1`
  font-size: 30px;
`;
