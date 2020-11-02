import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Input, Form, Button } from 'antd';
import * as action from '../../actions/index';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

interface Props {
  staff: Staff;
  onEditStaffs: (staff: Staff) => void;
}
const StaffDetail = ({staff, onEditStaffs} : Props) => {

  const router = useRouter();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      email: staff.email,
      name: staff.name,
      salary: staff.salary,
    })
  });

  const onFinish = (value: Staff) => {
    value.id = staff.id;
    onEditStaffs(value);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit Employee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{width: '90%', height: '70%', display: 'flex', textAlign: 'center'}}>
      <Form
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="email"
          rules={[
            {
              type: 'email',
              message: 'You must enter Email',
            },
            {
              required: true,
              message: 'Please input your Email',
            },
          ]}
        >
          <Input placeholder="Please input Email"/>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input className="width" placeholder="Please input your name" />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary"
          rules={[
            {
              required: true,
              message: 'Please input your salary',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!isNaN(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('You must enter number');
              },
            }),
          ]}
        >
          <Input className="width" placeholder="Please input your salary" />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
       </Form>
      </main>
    </div>
  )
  
}

StaffDetail.getInitialProps = async ({query}) => {
  const { id } = query
  const res = await fetch(`https://5f9a49dc9d94640016f70880.mockapi.io/Staff/${id}`);
  const json = await res.json()
  return { staff: json }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onEditStaffs : (staff: Staff) => {
        dispatch(action.editStaff(staff));
    }
  }
}

export default connect(null, mapDispatchToProps)(StaffDetail);