import React, { useRef } from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../../recoil/atoms';
import styled from 'styled-components';

interface ModeBallProps {
  isDark: boolean;
}

export default function Mode() {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  };

  return (
    <ModeSwitch>
      <ModeInput type='checkbox' id='checkbox' ref={checkboxRef} />
      <ModeLabel htmlFor='checkbox' onClick={toggleDarkAtom}>
        <BsMoonStars style={{ color: '#ffffff' }} />
        <BsSun style={{ color: '#ffffff' }} />
        <ModeBall isDark={isDark} />
      </ModeLabel>
    </ModeSwitch>
  );
}

const ModeSwitch = styled.div``;

const ModeBall = styled.div<ModeBallProps>`
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 2px;
  height: 20px;
  width: 20px;
  transform: translateX(${({ isDark }) => (isDark ? '24px' : '0px')});
  transition: transform 0.2s linear;
`;

const ModeInput = styled.input`
  opacity: 0;
  position: absolute;
`;

const ModeLabel = styled.label`
  background: ${(props) => props.theme.gradientColor};
  background: ${(props) => props.theme.linearColor};
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 26px;
  width: 50px;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px inset;
`;
