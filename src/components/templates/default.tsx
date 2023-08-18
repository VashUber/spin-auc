import { ReactNode } from 'react';

interface DefaultTemplatePropsI {
  children: ReactNode;
}

export const DefaultTemplate = ({ children }: DefaultTemplatePropsI) => {
  return (
    <body
      className="mx-auto my-0 max-w-screen-2xl overflow-x-hidden px-4"
      id="body">
      {children}
    </body>
  );
};
