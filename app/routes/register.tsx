import {
  ActionFunction,
  Form,
  Link,
  MetaFunction,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { Container } from "~/components/Container";
import { Header } from "~/components/Header";
import {
  BiLogIn as LoginIcon,
  BiUserPlus as UserPlusIcon,
  BiSend as SendIcon,
} from "react-icons/bi";
import { supabase } from "~/utils/supabase.server";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return {
    title: "Buat Akun - Yuktaklim!",
    description: "Belajar sunnah online bersama asatidzah ahlussunnah",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConf = formData.get("password-conf");

  const errors: Record<string, boolean> = {};
  if (!name) errors.name = true;
  if (!email) errors.email = true;
  if (!password) errors.password = true;
  if (password !== passwordConf) errors.passwordConf = true;

  console.log(email, name, password);

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof email === "string");
  invariant(typeof password === "string");

  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(user, session, error);

  return redirect("/register");
};

function RegisterForm() {
  const errors = useActionData<Record<string, boolean>>();
  const transition = useTransition();
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
      <Form method="post" className="mt-6 mb-8 px-6">
        <div>
          <label>
            Nama
            <input
              type="text"
              name="name"
              className={`
                mt-1
                block
                w-full
                rounded-md
                ${errors?.name ? "border-red-300" : "border-gray-300"}
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              `}
              placeholder="Masukkan nama..."
            />
            {errors?.name ? (
              <span className="text-red-400 text-sm">Nama wajib diisi</span>
            ) : null}
          </label>
        </div>
        <div className="mt-3">
          <label>
            Email
            <input
              type="email"
              name="email"
              className={`
                mt-1
                block
                w-full
                rounded-md
                ${errors?.email ? "border-red-300" : "border-gray-300"}
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              `}
              placeholder="Masukkan email..."
            />
            {errors?.email ? (
              <span className="text-red-400 text-sm">Email wajib diisi</span>
            ) : null}
          </label>
        </div>
        <div className="mt-3">
          <label>
            Password
            <input
              type="password"
              name="password"
              className={`
                mt-1
                block
                w-full
                rounded-md
                ${errors?.password ? "border-red-300" : "border-gray-300"}
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              `}
              placeholder="Masukkan password..."
            />
            {errors?.password ? (
              <span className="text-red-400 text-sm">Password wajib diisi</span>
            ) : null}
          </label>
        </div>
        <div className="mt-3">
          <label>
            Password (ulangi)
            <input
              type="password"
              name="password-conf"
              className={`
                mt-1
                block
                w-full
                rounded-md
                ${errors?.passwordConf ? "border-red-300" : "border-gray-300"}
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              `}
              placeholder="Masukkan password..."
            />
            {errors?.passwordConf ? (
              <span className="text-red-400 text-sm">Password tidak sama</span>
            ) : null}
          </label>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <Link to="/login" className="text-orange-400 text-sm">
              Sudah punya akun?
            </Link>
          </div>
          <button
            type="submit"
            disabled={!!transition.submission}
            className={`${
              transition.submission ? "cursor-not-allowed" : ""
            } flex items-center gap-2 border border-red-500 bg-red-400 py-2 px-4 shadow-sm text-white rounded-md`}
          >
            {transition.submission ? "Mendaftarkan..." : "Daftar"}
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
