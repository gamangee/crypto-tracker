import React from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../../recoil/atoms';
import styled from 'styled-components';

export default function Mode() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <ModeSwitch>
      <ModeInput type='checkbox' id='checkbox' />
      <ModeLabel htmlFor='checkbox' onClick={toggleDarkAtom}>
        <BsMoonStars />
        <BsSun />
        <ModeBall />
      </ModeLabel>
    </ModeSwitch>
  );
}

const ModeSwitch = styled.div``;

const ModeInput = styled.input`
  opacity: 0;
  position: absolute;
`;

const ModeLabel = styled.label`
  background-color: #111;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 26px;
  width: 50px;
  transform: scale(1.5);
`;

const ModeBall = styled.div`
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 22px;
  width: 22px;
  transform: translateX(0px);
  transition: transform 0.2s linear;
`;
