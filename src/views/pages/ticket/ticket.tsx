import {
  Briefcase,
  Envelope,
  SquaresFour,
  Ticket,
} from "@phosphor-icons/react";
import { Button, FloatButton, Form, Select } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import Sidebar from "../../assets/components/sideBar/sideBar";
import { Div } from "../../assets/elements/common";
import style from "./ticket.module.scss";

const handleChange = (value: string) => {
  console.log(`${value}`);
};

function TicketPage() {
  const [value, setValue] = useState("");

  useEffect(() => {}, [value]);
  return (
    <div>
      <Sidebar />
      <div className={style.Container}>
        <div className={style.ContentContainer}>
          <div className={style.Main}>
            <div className={style.Title}>
              <Link to="/Home">
                <SquaresFour
                  className={style.IconTitle}
                  size={32}
                  weight="light"
                />
              </Link>
              <h1>Dashboard /</h1>
              <Ticket className={style.IconPage} size={32} weight="light" />
              <h1>Ticket</h1>
            </div>

            <Form
              name="basic"
              className={style.containerForm}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 0 }}
            >
              <Div
                className={style.content}
                $primary
                $colorBG="#141414"
                $width="50%"
                $height="auto"
                $radius="12px"
                $border="1px solid rgba(var(--primary_color), 1)"
              >
                <div className={style.form}>
                  <Form.Item
                    label={
                      <Briefcase size={24} color="#f8f9fcc3" weight="light" />
                    }
                    name="Setor"
                    rules={[
                      {
                        required: true,
                        message: "Por favor insira o Setor!",
                      },
                    ]}
                    className={style.FormItem}
                  >
                    <Select
                      className={style.Input}
                      placeholder="Setor"
                      onChange={handleChange}
                      options={[
                        { value: 0, label: "Admin" },
                        { value: 1, label: "Usuário" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Div>

              <Div
                className={style.content}
                $primary
                $colorBG="#141414"
                $width="100%"
                $height="370px"
                $radius="12px"
                $border="1px solid rgba(var(--primary_color), 1)"
                $padding="20px 20px"
              >
                <ReactQuill
                  theme="snow"
                  className={style.RichEditor}
                  value={value}
                  onChange={setValue}
                />
              </Div>
              <Form.Item className={style.Btn_container}>
                <Button
                  className={style.Btn_form}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Enviar Ticket <Envelope size={24} weight="light" />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
}

export default TicketPage;
