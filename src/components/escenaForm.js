import React, { useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

export default function EscenaForm({ visible, alCerrar, alAceptar, modo }) {
  const [form] = Form.useForm();
  const [imagen, setImagen] = useState(null);
  const { urlImageCl, uploadImageCl } = useCloudinaryUpload({ file: imagen });

  return (
    <Modal
      open={visible}
      title="Crear nueva Escena"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={() => {
        console.log("*************",urlImageCl)
        alCerrar();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log("**********************")
            console.log(values);
            values.imageContent = imagen;
            alAceptar(values);
            form.resetFields();
            //onCreate(values);
          })
          .catch((info) => {
            console.log("No puede Continuar:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="escenaForm"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="titulo"
          label="Titulo"
          rules={[
            {
              required: true,
              message: "Ingrese el titulo de la Escena",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="descripcion" label="Descripcion">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="imagen"
          label="Imagen 360°"
          rules={[
            {
              required: true,
              message: "Seleccione una imagen 360",
            },
          ]}
        >
          <Upload
            accept=".png, .jpg"
            maxCount={1}
            beforeUpload={async (file) => {
              if (modo) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  console.log(e.target.result);
                  setImagen(e.target.result);
                };
                reader.readAsDataURL(file);
              } else {
                //manejo de Cloudinary

                await uploadImageCl(file)
                console.log("VEAMOS EL ESTADO DE URL DE IMAGEN DESPUES DE ENVIO A CLOUDINARY: ", urlImageCl);
                // .then((res) => {
                //   console.log("DATA DE CLOUDINARY: ");
                //   console.log(res)
                //   console.log(urlImageCl);
                //   setImagen(urlImageCl);
                // });
              }

              // Prevent upload
              return false;
            }}
          >
            <Button type="primary">Click para subir Imagen</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
