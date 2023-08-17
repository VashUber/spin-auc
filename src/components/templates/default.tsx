import { ReactNode } from 'react';

interface DefaultTemplatePropsI {
  children: ReactNode;
}

export const DefaultTemplate = ({ children }: DefaultTemplatePropsI) => {
  return (
    <body
      className="max-w-screen-2xl my-0 mx-auto overflow-x-hidden px-4"
      id="body">
      {children}
    </body>
  );
};
