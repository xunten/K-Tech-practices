import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function DefaultLayout() {
  return (
    <>
    <Header />
    <main className='my-5'>
        <section className='container mx-auto'>
            <Outlet />
        </section>

    </main>

    </>
  )
}