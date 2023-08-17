import { DefaultTemplate } from '~templates';
import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DefaultTemplate>{children}</DefaultTemplate>
    </html>
  );
}
