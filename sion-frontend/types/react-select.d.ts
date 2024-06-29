/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-select/dist/declarations/src/Select';

declare module 'react-select/dist/declarations/src/Select' {
  interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
  > {
    error?: boolean;
  }
}
