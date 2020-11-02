import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Input, Form, Button } from 'antd';
import * as action from '../../actions/index';
import { connect, useStore } from 'react-redux';
import { useRouter } from 'next/router';

interface Props {
  onAddStaff: (staff: Staff) => void;
}
const StaffAdd = ({onAddStaff} : Props) => {

  const router = useRouter();
  const [form] = Form.useForm();
  const store = useStore();
  const staffsStore  = store.getState().staffs;

  const onFinish = (value: any) => {
    if(staffsStore !== null)
    value.id = +staffsStore[staffsStore.length - 1].id + 1;
    onAddStaff(value);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Employee</title>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddStaff : (staff: Staff) => {
      dispatch(action.addStaff(staff));
    }
  }
}

export default connect(null, mapDispatchToProps)(StaffAdd);