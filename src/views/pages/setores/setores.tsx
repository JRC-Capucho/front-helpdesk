import { Briefcase, Pencil, SquaresFour, Trash } from "@phosphor-icons/react";
import { Button, FloatButton, Form, Input, Modal, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sectorHook from "../../../api/hooks/sector";
import Sidebar from "../../assets/components/sideBar/sideBar";
import { Div } from "../../assets/elements/common";
import style from "./setores.module.scss";

interface ISector {
  _id: string | null;
  name: string;
}

const ISectorInitialize: ISector = {
  _id: null,
  name: "",
};

function Setores() {
  const [formData, setFormData] = useState<ISector>(ISectorInitialize);
  const [form] = Form.useForm();

  const [tableData, setTableData] = useState<ISector[]>([]);

  // Modal
  const [modal, setModal] = useState("");

  const editRecord = (record: ISector) => setFormData({ ...record });

  const deleteHandle = () =>
    sectorHook
      .delete(modal)
      .then((data: any) => {
        message.success(data.message);
        updateTable();
        setModal("");
      })
      .catch((error: any) => {
        message.error(error.response.data.message);
        console.log(error);
      });

  const updateTable = () =>
    sectorHook
      .get(null)
      .then((_sectors: any) =>
        setTableData(
          _sectors.map((sector: any) => {
            return {
              _id: sector._id,
              name: sector.name,
            };
          })
        )
      )
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    updateTable();
  }, []);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const onSubmitHandler = () => {
    const _id = formData._id ?? null;
    const sector = {
      name: formData.name,
    };

    sectorHook
      .set(_id, sector)
      .then((data: any) => {
        message.success(data.message);
        formData._id = data._id;
        updateTable();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const columns: ColumnsType<ISector> = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Opções",
      render: (_, record: ISector) => (
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

          <Button
            className={style.Btn_table_remove}
            onClick={() => setModal(record._id ?? "")}
            type="primary"
            block
          >
            <Trash className={style.IconTitle} size={24} weight="light" />
          </Button>
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
        <p>Você deseja deletar esse setor?</p>
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
              <h1>Dashboard /</h1>
              <Briefcase className={style.IconPage} size={32} weight="light" />
              <h1>Setores</h1>
            </div>
            <Div
              className={style.content}
              $primary
              $colorBG="#141415"
              $width="100%"
              $height="80px"
              $radius="12px"
              $border="1px solid rgba(var(--primary_color), 1)"
            >
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 0 }}
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "20px",
                }}
                initialValues={{ remember: true }}
                onFinish={onSubmitHandler}
                form={form}
                autoComplete="off"
              >
                <div className={style.containerInput}>
                  <Form.Item
                    label={
                      <Briefcase size={24} color="#f8f9fcc3" weight="light" />
                    }
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Por favor insira o nome do Setor!",
                      },
                    ]}
                    className={style.FormItem}
                  >
                    <Input
                      className={style.Input}
                      placeholder="Setor"
                      onChange={(e: any) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Form.Item>
                </div>
                <div className={style.btn_container}>
                  <Form.Item>
                    <Button
                      className={style.Btn_form}
                      type="primary"
                      block
                      onClick={(e) => {
                        setFormData(ISectorInitialize);
                      }}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(var(--primary_color), 1)",
                        color: "rgba(var(--primary_color), 1)",
                      }}
                    >
                      {formData._id === null ? (
                        <>Limpar Campos</>
                      ) : (
                        <>Adicionar novo Setor</>
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
                      {formData._id === null ? (
                        <>Adicionar Setor</>
                      ) : (
                        <>Atualizar Setor</>
                      )}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Div>
            <Div
              className={style.content}
              $primary
              $colorBG="#141415"
              $width="100%"
              $height="420px"
              $radius="12px"
              $border="1px solid rgba(var(--primary_color), 1)"
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

export default Setores;
