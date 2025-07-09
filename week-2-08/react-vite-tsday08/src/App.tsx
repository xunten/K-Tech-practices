
import SignupPage from './afternoon/FormSiSu/SignupPage'
import LoginPage from './afternoon/FormSiSu/LoginPage'
import './App.css'
import FormRegister from './afternoon/FormRegister/FormRegister'
import FormLogin from './afternoon/FormLogin/FormLogin'
import RegistrationForm from './RegistrationForm'

function App() {

  return (
    <div className="flex flex-col snap-y  overflow-y-auto h-screen">
      {/* Section 1: Signup + Login Page */}
      <section className="flex items-center gap-4 justify-center bg-[#F8C0BD] min-h-screen">
        <SignupPage />
        <LoginPage />
      </section>

      {/* Section 2: FormRegister */}
      <section className="gap-4 bg-[#F0F0F0]">
        <FormRegister />
      </section>

      {/* Section 3: FormLogin */}
      <section className=" bg-[#E0F7FA] ">
        <FormLogin />
      </section>

      {/* Section 4: RegistrationForm */}
      <section className=" bg-[#FFF3E0]">
        <RegistrationForm />
      </section>
    </div>

  )
}

export default App
