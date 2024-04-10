import React from 'react';

import * as S from './Toast.styled';
import { ToastType } from './ToastType';

export interface ToastProps {
  type: ToastType;
  title: string;
  message: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ type, title, message }) => (
  <S.Toast $type={type} role="alert">
    <div>
      <S.Title role="heading">{title}</S.Title>
      <S.Message role="contentinfo">{message}</S.Message>
    </div>
  </S.Toast>
);

export default Toast;
