// const path = require('path')
// const fs = require('fs')
import * as path from 'path'
import * as fs from 'fs'
import { dir } from './dir'
// const dir = require('./dir')
import { file } from './file'
// const file = require('./file')

/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
const content = async (ctx: any, fullStaticPath: any) => {

  // 封装请求资源的完绝对径
  let reqPath = path.join(fullStaticPath, ctx.url)

  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync(reqPath)
  let content = ''

  if (!exist) {
    //如果请求路径不存在，返回404
    content = '404 Not Found! o(╯□╰)o！'
  } else {
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath)

    if (stat.isDirectory()) {
      //如果为目录，则渲读取目录内容
      content = dir(ctx.url, reqPath)

    } else {
      // 如果请求为文件，则读取文件内容
      content = await file(reqPath)
    }
  }

  return content
}

module.exports = content