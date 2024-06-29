import { ReactNode } from 'react';

export type Option = {
  value?: string;
  label: string;
};

export interface DropdownProps {
  isComponentVisible: boolean;
  className?: string;
  header: ReactNode;
  options?: Option[];
  OptionComponent?: React.FC<OptionProps>;
  withArrow?: boolean;
}

export interface OptionProps {
  option: Option;
  withArrow: boolean;
}
