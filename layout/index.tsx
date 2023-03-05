import Footer from "./footer/footer";
import Header from "./header/header";
import type { AppProps } from 'next/app'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
}
