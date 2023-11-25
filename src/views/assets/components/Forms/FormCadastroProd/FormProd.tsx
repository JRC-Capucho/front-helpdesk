import { Form, Input, InputNumber } from 'antd';
import style from './FormProd.module.scss';
import TextArea from 'antd/es/input/TextArea';


function FormFunc() {
    return (
        <div className={style.Container}>
            <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 0 }}
                style={{
                    width: '100%',
                }}
                initialValues={{ remember: true }}
                autoComplete="off"
                className={style.Form}>
                <div className={style.InfoProd}>
                    <div className={style.IdProd}>
                        <Form.Item
                            label="Cod. Produto"
                            name="idProd"
                            rules={[{ required: true, message: 'Por favor, insira o Código do Produto' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Produto"
                            name="nomeProd"
                            rules={[{ required: true, message: 'Por favor, insira o nome do Produto' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Quantidade"
                            name="qtdProd"
                        >
                            <InputNumber className={style.Input} style={{ width: "100%" }} min={1} />
                        </Form.Item>
                    </div>
                    <div className={style.descProd}>
                        <Form.Item
                            label="Descrição"
                            name="descricao"
                        >
                            <TextArea rows={3} placeholder="" maxLength={100} />
                        </Form.Item>
                    </div>
                </div>
                <div className={style.UploadImg}>
                </div>
            </Form>
        </div>
    )
}

export default FormFunc;