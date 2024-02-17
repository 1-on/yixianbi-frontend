// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /user/get/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.ResultLoginUserVO>('/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(body: API.UserLoginDTO, options?: { [key: string]: any }) {
  return request<API.ResultLoginUserVO>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/ok */
export async function ok(options?: { [key: string]: any }) {
  return request<string>('/user/ok', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(body: API.UserRegisterDTO, options?: { [key: string]: any }) {
  return request<API.ResultLong>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
