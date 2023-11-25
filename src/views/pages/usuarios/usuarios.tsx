import {
  Briefcase,
  Envelope,
  IdentificationCard,
  Password,
  Pencil,
  SquaresFour,
  Trash,
  UserRectangle,
  Users,
} from "@phosphor-icons/react";
import {
  Button,
  FloatButton,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sectorHook from "../../../api/hooks/sector";
import sessionHook from "../../../api/hooks/session";
import userHook from "../../../api/hooks/user";
import Sidebar from "../../assets/components/sideBar/sideBar";
import { Div } from "../../assets/elements/common";
import style from "./usuarios.module.scss";

interface IUser {
  _id: string | null;
  name: string;
  email: string;
  password: string;
  nivel: number;
  sector: any;
}

const IUserInitialize: IUser = {
  _id: null,
  name: "",
  email: "",
  password: "####",
  nivel: 1,
  sector: "",
};

function Usuarios() {
  const [session, setSession] = useState<IUser>(IUserInitialize);

  const [editEnable, setEditEnable] = useState<boolean>(false);
  const [formData, setFormData] = useState<IUser>(IUserInitialize);
  const [form] = Form.useForm();

  const [sectors, setSectors] = useState([]);
  const [tableData, setTableData] = useState<IUser[]>([]);

  // Modal
  const [modal, setModal] = useState("");

  const deleteHandle = () =>
    userHook
      .delete(modal)
      .then((data: any) => {
        message.success(data.message);
        updateTable();
        setModal("");
      })
      .catch((error: any) => {
        message.error(error.message);
        console.log(error);
      });

  const updateTable = () =>
    userHook
      .get(null)
      .then((_users: any) =>
        setTableData(
          _users.map((user: any) => {
            return {
              _id: user._id,
              name: user.name,
              email: user.email,
              nivel: user.nivel,
              sector: {
                _id: user.relatedSectors._id,
                name: user.relatedSectors.name,
              },
            };
          })
        )
      )
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    updateTable();

    sectorHook
      .get(null)
      .then((_sectors: any) => {
        setSectors(
          _sectors.map((sector: any) => {
            return { value: sector._id, label: sector.name };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    sessionHook()
      .then((data: any) => {
        data = {
          _id: data._id,
          name: data.name,
          email: data.email,
          password: "####",
          nivel: data.nivel,
          sector: data.relatedSectors._id,
        };

        setSession(data);
        setFormData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    form.setFieldsValue(formData);

    if (session.nivel !== 0) {
      setEditEnable(formData._id === session._id);
    } else {
      setEditEnable(true);
    }
  }, [form, formData, session._id, session.nivel]);

  const onSubmitHandler = () => {
    const _id = formData._id ?? null;
    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      nivel: formData.nivel,
      sector: formData.sector,
    };

    if (_id === null && user.password === "####")
      form.setFields([
        {
          name: "password",
          errors: ["Insira uma senha valida"],
        },
      ]);
    else {
      form.setFields([
        {
          name: "password",
          errors: [],
        },
      ]);

      userHook
        .set(_id, user)
        .then((data: any) => {
          message.success(data.message);
          formData._id = data._id;
          updateTable();
        })
        .catch((error) => {
          message.error(error.message);
          console.log(error);
        });
    }
  };

  const editRecord = (record: IUser) =>
    setFormData({ ...record, sector: record.sector._id });

  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "name",
      onFilter: (value: string | number | boolean, record: IUser) => {
        if (typeof value === "string") {
          return record.name.indexOf(value) === 0;
        }
        return false;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
    },
    {
      title: "Nivel",
      dataIndex: "nivel",
      filters: [
        {
          text: "Admin",
          value: 0,
        },
        {
          text: "Usuário",
          value: 1,
        },
      ],
      onFilter: (value: string | number | boolean, record: IUser) => {
        return record.nivel === value;
      },
      render: (_, record: IUser) => (
        <>{record.nivel === 0 ? "Admin" : "Usuario"}</>
      ),
    },
    {
      title: "Setor",
      dataIndex: "sector",
      render: (_, record: IUser) => <>{record.sector.name}</>,
    },
    {
      title: "Opções",
      render: (_, record: IUser) => (
        <div className={style.btn_table}>
          <Button
            className={style.Btn_table_add}
            type="primary"
            block
            onClick={(e) => {
              editRecord(record);
            }}
          >
            <Pencil className={style.IconTitle} size={24} weight="light" />
          </Button>

          {record._id === session._id ? (
            <></>
          ) : (
            <Button
              className={style.Btn_table_remove}
              onClick={() => setModal(record._id ?? "")}
              type="primary"
              block
            >
              <Trash className={style.IconTitle} size={24} weight="light" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Sidebar />
      <Modal
        title="Deletar"
        open={modal !== ""}
        onOk={deleteHandle}
        onCancel={() => setModal("")}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>Você deseja deletar esse usuário?</p>
      </Modal>
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
              <h1>Dashboard</h1>
              <Users className={style.IconPage} size={32} weight="light" />
              <h1>Usuários</h1>
            </div>
            <Div
              className={style.content}
              $primary
              $colorBG="#141415"
              $width="100%"
              $height="auto"
              $radius="12px"
              $border="1px solid rgba(var(--primary_color), .5)"
            >
              <div className={style.formUser}>
                <h1>Cadastro de Usuário</h1>
                <Form
                  name="basic"
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 0 }}
                  style={{
                    width: "100%",
                  }}
                  onFinish={onSubmitHandler}
                  autoComplete="off"
                  form={form}
                  className={style.Form}
                >
                  <div className={style.containerInpt}>
                    <Form.Item
                      label={
                        <IdentificationCard
                          size={24}
                          color="#f8f9fcc3"
                          weight="light"
                        />
                      }
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira o Nome!",
                        },
                      ]}
                      className={style.FormItem}
                    >
                      <Input
                        disabled={!editEnable}
                        className={style.Input}
                        value={formData.name}
                        onChange={(e: any) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nome"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <Envelope size={24} color="#f8f9fcc3" weight="light" />
                      }
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira o seu Email!",
                        },
                      ]}
                      className={style.FormItem}
                    >
                      <Input
                        className={style.Input}
                        disabled={!editEnable}
                        value={formData.email}
                        onChange={(e: any) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Email"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <Password size={24} color="#f8f9fcc3" weight="light" />
                      }
                      name="password"
                      className={style.FormItem}
                    >
                      <Input.Password
                        disabled={!editEnable}
                        className={style.Input}
                        value={formData.password}
                        onChange={(e: any) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Senha"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <UserRectangle
                          size={24}
                          color="#f8f9fcc3"
                          weight="light"
                        />
                      }
                      name="nivel"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira o Nivel do Usuário!",
                        },
                      ]}
                      className={style.FormItem}
                    >
                      <Select
                        className={style.Input}
                        placeholder="Nivel"
                        disabled={session.nivel !== 0}
                        onChange={(value: Number) =>
                          setFormData({
                            ...formData,
                            nivel: Number(value),
                          })
                        }
                        options={
                          session.nivel === 0
                            ? [
                                { value: 0, label: "Admin" },
                                { value: 1, label: "Usuário" },
                              ]
                            : [{ value: 1, label: "Usuário" }]
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <Briefcase size={24} color="#f8f9fcc3" weight="light" />
                      }
                      name="sector"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira o Setor do Usuário!",
                        },
                      ]}
                      className={style.FormItem}
                    >
                      <Select
                        className={style.Input}
                        placeholder="Setor"
                        disabled={session.nivel !== 0}
                        value={String(formData.sector)}
                        onChange={(value: string) =>
                          setFormData({
                            ...formData,
                            sector: value,
                          })
                        }
                        options={sectors}
                      />
                    </Form.Item>
                  </div>
                  <div className={style.btn_container}>
                    <Form.Item className={style.Btn_conten}>
                      <Button
                        className={style.Btn_form}
                        type="primary"
                        block
                        onClick={(e) => {
                          setFormData(IUserInitialize);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid rgba(var(--primary_color), 1)",
                          color: "rgba(var(--primary_color), 1)",
                        }}
                      >
                        {formData._id === "" ? (
                          <>Limpar Campos</>
                        ) : (
                          <>Criar novo Usuario</>
                        )}
                      </Button>
                    </Form.Item>

                    <Form.Item className={style.Btn_conten}>
                      <Button
                        className={style.Btn_form}
                        type="primary"
                        htmlType="submit"
                        block
                      >
                        {formData._id === "" ? (
                          <>Cadastrar Usuario</>
                        ) : formData._id === session._id ? (
                          <>Atualizar meu Usuario</>
                        ) : (
                          <>Atualizar Usuario</>
                        )}
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </Div>
            <Div
              className={style.content}
              $primary
              $colorBG="#141415"
              $width="100%"
              $height="auto"
              $radius="12px"
              $border="1px solid rgba(var(--primary_color), .5)"
              $padding="20px 20px"
            >
              <div className={style.table}>
                <Table
                  style={{ width: "100%" }}
                  columns={columns}
                  dataSource={tableData}
                />
              </div>
            </Div>
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
}

export default Usuarios;
