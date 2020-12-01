const TEST_API={
  sq:'http://jsonplaceholder.typicode.com/posts',
}

const API={
  sq:'https://baidu.com/api',
}

const config=process.env.NODE_ENV=='development'?TEST_API:API;
export default config;