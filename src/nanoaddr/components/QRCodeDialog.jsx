/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
`;

const Dialog = styled.div`
  padding: 48px;
  background: ${props => props.theme.colors.b0};
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
`;

type Props = {
  value: string;
  onClose: MouseEventHandler;
};

export default function QRCodeDialog(props: Props) {
  return (
    <Backdrop onClick={props.onClose}>
      <Dialog>
        <QRCode value={props.value} />
      </Dialog>
    </Backdrop>
  );
}
