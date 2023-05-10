import xjRequest from "../../service"; //引入封装后的请求库


export async function getNavgation() {
  return xjRequest
    .get({
      url: "?IDIP=181",
    })
}
