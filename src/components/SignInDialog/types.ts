export interface Props {
  handleOpen: (value?: boolean) => void;
  isOpen: boolean;
}

export type StateDialog = 'signIn' | 'signUp';
