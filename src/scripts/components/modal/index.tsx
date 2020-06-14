/**
 * Generic Modal Component
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as ReactstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type TextOrComponentNode = string | React.ReactNode;
type OptionalListOfTextOrComponentNode = TextOrComponentNode | Array<TextOrComponentNode>;
type ButtonProps = {
  label?: string;
  color?: string;
  size?: string;
  onClick?: (ev: React.SyntheticEvent) => void;
  hide?: boolean;
} | null;

type Props = {
  className?: string;
  header?: OptionalListOfTextOrComponentNode;
  body?: OptionalListOfTextOrComponentNode;
  footer?: {
    okButton?: ButtonProps;
    cancelButton?: ButtonProps;
    swapButtons?: boolean | null;
  };
  onClosed?: () => void;
};

export const Component: React.FunctionComponent<Props> = function Modal({
  className,
  header,
  body,
  footer = { okButton: {}, cancelButton: {}, swapButtons: false },
  onClosed,
}) {
  const [showModal, setShowModal] = useState(true);

  const toggle = () => {
    return setShowModal(!showModal);
  };

  footer = Object.assign({
    okButton: Object.assign(
      {
        color: 'primary',
        label: 'Okay',
        hide: false,
        size: 'sm',
      },
      footer.okButton,
    ),
    cancelButton: Object.assign(
      {
        color: 'secondary',
        label: 'Cancel',
        hide: false,
        size: 'sm',
      },
      footer.cancelButton,
    ),
    swapButtons: !!footer.swapButtons,
  });

  const buttons = [
    footer.okButton?.hide ? null : (
      <Button
        key="ok"
        size={footer.okButton?.size}
        color={footer.okButton?.color}
        onClick={(ev) => {
          toggle();
          footer.okButton?.onClick?.(ev);
        }}
      >
        {footer.okButton?.label}
      </Button>
    ),
    footer.cancelButton?.hide ? null : (
      <Button
        key="cancel"
        size={footer.cancelButton?.size}
        color={footer.cancelButton?.color}
        onClick={(ev) => {
          toggle();
          footer.cancelButton?.onClick?.(ev);
        }}
      >
        {footer.cancelButton?.label}
      </Button>
    ),
  ];

  return (
    <div>
      <ReactstrapModal isOpen={showModal} toggle={toggle} className={className} onClosed={onClosed}>
        {header ? <ModalHeader toggle={toggle}>{header}</ModalHeader> : null}
        {body ? <ModalBody>{body}</ModalBody> : null}
        <ModalFooter>{footer.swapButtons ? [buttons[1], buttons[0]] : buttons}</ModalFooter>
      </ReactstrapModal>
    </div>
  );
};

const ButtonPropTypes = PropTypes.shape({
  label: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
});

Component.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.shape({
    okButton: ButtonPropTypes,
    cancelButton: ButtonPropTypes,
    swapButtons: PropTypes.bool,
  }),
  onClosed: PropTypes.func,
};
