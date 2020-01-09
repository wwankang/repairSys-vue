
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    permissions: ["/loginLog/delLoginLog", "/cms/articleEdit", "/mgr/freeze", "/log/detail", "/loginLog/list", "/fileMgr", "/banner", "/history", "/channel", "/mgr", "/dict", "/swagger", "/mgr/reset", "/log", "/menu/add", "/menu/edit", "/dict/delete", "/dict/add", "/role/setAuthority", "/cms", "/role/add", "/mgr/edit", "/dept", "/task/update", "/dept/delete", "/message", "/log/delLog", "/role/remove", "/contacts", "/cfg", "/cfg/update", "/taskLog", "/menu", "/cfg/delete", "/task/add", "/mgr/delete", "/article", "/cfg/add", "/dept/detail", "/mgr/setRole", "/druid", "/dept/list", "/dict/list", "/sender", "/template", "/mgr/unfreeze", "/role/edit", "/dict/update", "/mgr/add", "/loginLog", "/dept/update", "/optionMgr", "/role", "/dept/add", "/task", "/dict/detail", "/menu/remove", "/system", "/task/delete"],
    profile: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  /*code: 20000
data: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1N��pbiJ9.L3niE5mTcMit3VX8pPoCj_nxmfsvNyHwCKXHtT8Si7I"}
msg: "�ɹ�"
success: true*/
  {
    url: '/login',
    type: 'post',
    response: config => {

      const { code, password } = config.body

      console.log("username:"+code+",password:"+password)
      const token = tokens[code]

      return {
        status: 'success',
        data: token
      }
    }
  },
  {
    url: '/account/registry',
    type: 'post',
    response: config => {
      // const { username } = config.query
      // const token = tokens[username]


      return {
        code: 20000,
        data: ""
      }
    }
  },

  // get user info
/*  code: 20000
data:
  permissions: (59) ["/loginLog/delLoginLog", "/cms/articleEdit", "/mgr/freeze", "/log/detail", "/loginLog/list", "/fileMgr", "/banner", "/history", "/channel", "/mgr", "/dict", "/swagger", "/mgr/reset", "/log", "/menu/add", "/menu/edit", "/dict/delete", "/dict/add", "/role/setAuthority", "/cms", "/role/add", "/mgr/edit", "/dept", "/task/update", "/dept/delete", "/message", "/log/delLog", "/role/remove", "/contacts", "/cfg", "/cfg/update", "/taskLog", "/menu", "/cfg/delete", "/task/add", "/mgr/delete", "/article", "/cfg/add", "/dept/detail", "/mgr/setRole", "/druid", "/dept/list", "/dict/list", "/sender", "/template", "/mgr/unfreeze", "/role/edit", "/dict/update", "/mgr/add", "/loginLog", "/dept/update", "/optionMgr", "/role", "/dept/add", "/task", "/dict/detail", "/menu/remove", "/system", "/task/delete"]
profile: {avatar: "", account: "admin", password: "b5a51391f271f062867e5984e2fcffee", salt: "8pgby", name: "����Ա", ��}
name: "����Ա"
role: "admin"
roles: ["administrator"]
__proto__: Object
msg: "�ɹ�"
success: true*/
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users['admin-token']

      return {
        status: 'success',
        data: info
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
