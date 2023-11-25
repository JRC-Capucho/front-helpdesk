import { Password, UserCircle } from "@phosphor-icons/react";
import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginHook from "../../../api/hooks/login";
import { DivFlex } from "../../assets/elements/common";
import style from "./login.module.scss";

/**
 * @function Login
 * @description Page Login.tsx
 */

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface LoginFormData {
  email: string;
  pass: string;
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    pass: "",
  });

  function formSubmit(e: React.MouseEvent) {
    e.preventDefault();

    loginHook(formData.email, formData.pass)
      .then((res: any) => {
        message.success(res.message);
        navigate("/Home");
      })
      .catch((error) => {
        message.error(error[0]);
      });
  }
  return (
    <div className={style.Bg}>
      <div className={style.AppStyle}>
        <div className={style.Container}>
          <DivFlex $primary $colorBG="#141415" className={style.DivForm}>
            <h1 className={style.TitleForm}>Login</h1>
            <Form
              name="basic"
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 0 }}
              style={{
                maxWidth: 1200,
                width: "80%",
              }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <UserCircle size={24} color="#f8f9fc" weight="duotone" />
                }
                name="Email"
                rules={[
                  { required: true, message: "Por favor insira o seu email!" },
                ]}
                className={style.FormItem}
              >
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={style.Input}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                label={<Password size={24} color="#f8f9fc" weight="duotone" />}
                name="Senha"
                rules={[
                  { required: true, message: "Por favor insira a sua senha!" },
                ]}
                className={style.FormItem}
              >
                <Input.Password
                  value={formData.pass}
                  onChange={(e) =>
                    setFormData({ ...formData, pass: e.target.value })
                  }
                  className={style.Input}
                  placeholder="Senha"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox style={{ color: "#f8f9fc" }}>Lembre-me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={formSubmit}
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </DivFlex>
        </div>
      </div>
    </div>
  );
}

export default Login;
