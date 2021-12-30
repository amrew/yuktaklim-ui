import { Form, Link } from "remix";
import { Container } from "~/components/Container";
import { Header } from "~/components/Header";
import {
  BiLogIn as LoginIcon,
  BiUserPlus as UserPlusIcon,
  BiSend as SendIcon,
} from "react-icons/bi";

function RegisterForm() {
  return (
    <div className="border border-gray-200 bg-white rounded-md shadow-sm overflow-hidden">
      <div className="p-6 bg-yellow-50 border-b border-b-yellow-300">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <UserPlusIcon size={24} />
          Buat Akun
        </h1>
        <p className="mt-2">
          Ikuti Kajian Online Bersama Asatidzah Ahlussunnah
        </p>
      </div>
      <Form className="mt-6 mb-8 px-6">
        <div>
          <label>Nama</label>
          <input
            type="text"
            className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            placeholder="Masukkan nama..."
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            placeholder="Masukkan email..."
          />
        </div>
        <div className="mt-3">
          <label>Password</label>
          <input
            type="password"
            className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            placeholder="Masukkan password..."
          />
        </div>
        <div className="mt-3">
          <label>Password (ulangi)</label>
          <input
            type="password"
            className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            placeholder="Masukkan password..."
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <Link to="/login" className="text-orange-400 text-sm">
              Sudah punya akun?
            </Link>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 border border-red-500 bg-red-400 py-2 px-4 shadow-sm text-white rounded-md"
          >
            Daftar
            <SendIcon />
          </button>
        </div>
      </Form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col h-full overflow-auto">
        <Container isMobile>
          <section className="py-4 px-2">
            <RegisterForm />
          </section>
        </Container>
      </main>
    </div>
  );
}
