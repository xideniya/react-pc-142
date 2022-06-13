import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
// 富文本编辑器
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useEffect, useRef } from 'react'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  const navigate = useNavigate()
  // 获取路由参数
  const [params] = useSearchParams()
  const id = params.get('id')
  // 数据回填
  const form = useRef()
  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${id}`)
      // 表单数据回填
      const obj = {
        channel_id: res.data.channel_id,
        content: res.data.content,
        title: res.data.title,
        type: res.data.cover.type
      }
      form.current.setFieldsValue(obj)
      const newarr = res.data.cover.images.map((item) => {
        return { url: item }
      })
      setFileList(newarr)
      // 存储到ref仓库
      casheimgList.current = res.data.cover.images.map((item) => {
        return { url: item }
      })
    }
    if (id) {
      getArticle()
      console.log()
    }
  }, [id])
  // mobx仓库
  const { channelStore } = useStore()
  useEffect(() => {
    channelStore.loadChannelList()
  }, [channelStore])
  const [fileList, setFileList] = useState([])
  // 使用useref声明一个暂存仓库
  const casheimgList = useRef([])
  // 上传成功回调
  const onUploadChange = (info) => {
    const fileList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    // 同时把图片列表存入仓库一份
    casheimgList.current = fileList
  }

  // 切换图片数量
  const [imgcount, setimgcount] = useState(1)
  const radioGroupHandler = (e) => {
    setimgcount(e.target.value)
    // 从仓库里取对应的图片数量,此时还没有更新imgcount的值,useState异步更新，使用e.target.value判断
    if (e.target.value === 1) {
      const img = casheimgList.current ? casheimgList.current[0] : ''
      setFileList([img])
    } else if (e.target.value === 3) {
      setFileList(casheimgList.current)
    }
  }
  //提交
  const finish = async (value) => {
    const { channel_id, content, title, type } = value
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map((item) => {
          return item.url
        })
      }
    }
    if (id) {
      // 修改文章接口
      await http.put(`/mp/articles/${id}?draft=false`, params)
      message.success('修改文章成功')
      navigate('/layout/artical')
    } else {
      // 新增文章接口
      await http.post('/mp/articles?draft=false', params)
      message.success('添加文章成功')
      navigate('/layout/artical')
    }
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/layout/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 通过 Form 组件的 `initialValues` 为富文本编辑器设置初始值，否则会报错 */}
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 1, content: '啦啦啦' }} ref={form} onFinish={finish}>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioGroupHandler}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 按需显示 */}
            {imgcount > 0 && (
              <Upload name="image" multiple={imgcount > 1 ? true : false} maxCount={imgcount} listType="picture-card" className="avatar-uploader" showUploadList action="http://geek.itheima.net/v1_0/upload" fileList={fileList} onChange={onUploadChange}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
            {/* 富文本编辑器 */}
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '保存修改' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)
