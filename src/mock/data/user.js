import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    sarea: Mock.Random.cname(),
    sip:Mock.Random.cname(),
    sassets: Mock.Random.cname(),
    tarea: Mock.Random.cname(),
    tip:Mock.Random.cname(),
    tassets:Mock.Random.cname(),
    service:Mock.Random.cname(),
    flag:true,
    flag1:false,
  }));
}

export { LoginUsers, Users };
