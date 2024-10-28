"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { loginHook } from "@/hooks/login.hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const login = await loginHook({ email, password });
    if (login && typeof login !== "boolean") {
      const token = login.access_token;
      localStorage.setItem("token", token);
      toast.success("Login realizado com sucesso");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">
        Login
      </h1>
      <p className="text-gray-600 text-center mb-6 font-bold">
        Bem-vindo de volta!
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        <div className="mb-5">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            key="email"
          />
        </div>

        <div className="mb-5">
          <div className="relative flex flex-row align-middle items-center justify-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              key="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              onClick={togglePassword}
              buttonStyle="text-gray-600 p-1 m-0 ml-1 w-fit bg-gray-200 rounded-md"
              placeholder={showPassword ? "Esconder" : "Mostrar"}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !email || !password}
          buttonStyle="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          placeholder="Entrar"
        >
          {loading ? <span>Carregando...</span> : "Entrar"}
        </Button>

        <div className="mt-4 text-center">
          Não tem uma conta?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline cursor-pointer font-bold"
          >
            Registre-se aqui
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
