import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Table, Button } from 'antd';
import * as action from '../actions/index';
import { connect, useStore  } from 'react-redux';
import { useRouter } from 'next/router';
import { UserAddOutlined } from '@ant-design/icons';

interface Props {
  staffs: Array<Staff>;
  onAddStaffs:  (staffs: Array<Staff>) => void;
  onDeleteStaff: (id: number) => void;
}

const copyStaffs = ( staffStore: Array<Staff> ) => {
  let results: any = [];
  staffStore.forEach((staff: any, index: number) => {
    staff.key = index;
    results.push(staff);
  });
  return results;
}

const Home = ({ staffs, onAddStaffs, onDeleteStaff} : Props) => {
  const router = useRouter();
  const store = useStore();
  const staffsStore  = store.getState().staffs;
  const [staffStore, setStaffStore] = useState(staffsStore  === null ? staffs : staffsStore === [] ? [] : staffsStore);
  onAddStaffs(staffStore);
  

  const button = {
    background: '#D4EDDA',
    padding: '5px',
    borderRadius: '10px',
    border: '2px solid #ccc',
    cursor: 'pointer'
  };

  const columns: Array<Object> = [
    { 
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    { 
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: Staff, b: Staff) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
    },
    { 
      title: 'Name',
      dataIndex: 'name',
      key: 'name', 
      sorter: (a: Staff, b: Staff) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    { 
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary', 
      sorter: (a: Staff, b: Staff) => a.salary - b.salary,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Delete Staff', dataIndex: '', key: 'x',
      render: (text: string, record: Staff) => (
        <Button
            style={button}
            onClick={(e) => { onDelete(record.id, e); }}
        >
        Delete
        </Button>
      ),
    },
    {
      title: 'Edit Staff', dataIndex: '', key: 'x',
      render: (text: string, record: Staff) => (
        <Button
            style={button}
            onClick={(e) => { onEdit(record, e); }}
        >
            Edit
        </Button>
      ),
    },
  ];

  const onEdit = (key: Staff, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    router.push(`/editStaff/${key.id}`);
    e.preventDefault();
  }

  const onDelete = (key: number, e:  React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (window.confirm('Are you sure you wish to delete this item?'))
    onDeleteStaff(key);
    setStaffStore(store.getState().staffs);
    e.preventDefault();
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Employee Management App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{width: '90%'}}>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />} 
          size='large' 
          onClick={() => router.push('/addStaff')}
        >
          Add Staff
        </Button>
        <Table
          dataSource={copyStaffs(staffStore)}
          columns={columns}
        />
      </main>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('https://5f9a49dc9d94640016f70880.mockapi.io/Staff')
  const json = await res.json();
  return { 
    staffs: json,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddStaffs : (staffs: Array<Staff>) => {
      dispatch(action.addStaffs(staffs));
    },
    onDeleteStaff: (id: number) => {
      dispatch(action.deleteStaff(id));
    },
  }
}

export default connect(null,mapDispatchToProps)(Home);

