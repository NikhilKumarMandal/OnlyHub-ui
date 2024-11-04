import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex, Alert } from 'antd';
import { LockFilled,UserOutlined,LockOutlined } from "@ant-design/icons"

import { useMutation, useQuery } from '@tanstack/react-query';
import { Credentials } from '../../type';
import { login, logout, self } from '../../http/api';
import { useAuthStore } from '../../store/store';


const loginUser = async (credentials: Credentials) => {
  // server call
  const { data } = await login(credentials)
  return data;
}

const getSelf = async () => {
  const { data } = await self();
  return data;
}

function LoginPage() {

  const { setUser, logout: logoutUserFromStore } = useAuthStore()

  

  const {refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false
  })

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutUserFromStore();
      return;
    }
  })

  const { mutate, isPending,isError,error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      // getSelf
      const selfDataPromise = await refetch();
      setUser(selfDataPromise.data)
    }

  })






  return (
    
      <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Space direction="vertical" align='center' size='large'>
        <Layout.Content style={{ display: 'flex',justifyContent: "center",alignItems: "center" }} >
        </Layout.Content>
        <Card
          style={{ width: 300 }}
          bordered={false}
          title={
          <Space style={{width:"100%",fontSize:16, justifyContent:"center"}}>
          <LockFilled />
          Sign in
          </Space>
        }
        >
        <Form initialValues={{ remember: true }} onFinish={(values) => {
        mutate({email: values.username,password: values.password})
          console.log(values);
        }}>
              
              {isError && <Alert style={{marginBottom: 24}} type='error' message={ error?.message } />}
            
              <Form.Item name="username" rules={[
              {
                required: true,
                message: "Please input your Username"
              },
              {
                type: "email",
                message: "Email is not Valid"
              }
            ]}>
              <Input prefix={<UserOutlined />} placeholder='username'/>
            </Form.Item>

              <Form.Item name="password" rules={[
              {
                required: true,
                message: "Please input your Username"
              },
              
            ]}>
              <Input.Password prefix={<LockOutlined />} placeholder='password' />
              </Form.Item>
              

            <Flex justify='space-between' >
            <Form.Item name="remember" valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href='#' id='forget-password'>Forget Password</a>
            </Flex>
            


            <Form.Item >
              <Button type='primary' htmlType='submit' style={{width: "100%"}} loading={isPending}>
                Log in
              </Button>
            </Form.Item>
            
        </Form>
        </Card>
        </Space>
        
      </Layout>
  )
}

export default LoginPage;