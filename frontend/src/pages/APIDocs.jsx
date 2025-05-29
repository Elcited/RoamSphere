import FooterPageTemplate from "../ui/FooterPageTemplate";

export default function APIDocs() {
  return (
    <FooterPageTemplate title="API 文档">
      RoamSphere 提供丰富的 RESTful API 与即将上线的 GraphQL
      支持，开发者可轻松获取路线规划、地点搜索、用户收藏等核心能力。 🔧
      核心接口： - `GET /api/places/search` 地点搜索 - `GET /api/routes/suggest`
      路线推荐 - `POST /api/user/favorites` 添加收藏 - `GET /api/cities/trend`
      城市热度排行 📦 接口特性： - 高并发，延迟控制在 200ms 内 - 提供 JSON
      Schema 校验 - 支持 JWT 鉴权与请求速率限制 - 开发者 Dashboard
      可查看调用日志与配额 📄 完整文档地址：https://docs.roamsphere.com
      如需测试权限或获取密钥，请前往“开发者中心”注册账号。
    </FooterPageTemplate>
  );
}
