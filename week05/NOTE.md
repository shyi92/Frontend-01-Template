# 每周总结可以写在这里
1.把一个 URL 变成一个屏幕上显示的
浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务端请求页面；把请求回来的 HTML 代码经过解析，构建成 DOM 树；计算 DOM 树上的 CSS 属性；最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图；一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度；合成之后，再绘制到界面上。
2.HTTP Method（方法）
    GET
    POST
    HEAD
    PUT
    DELETE
    CONNECT
    OPTIONS
    TRACE
3.HTTP Status code（状态码）和 Status text（状态文本）
    1xx：临时回应，表示客户端请继续。
    2xx：请求成功。
        200：请求成功。
    3xx: 表示请求的目标有变化，希望客户端进一步处理。
        301&302：永久性与临时性跳转。
        304：跟客户端缓存没有更新。
    4xx：客户端请求错误。
        403：无权限
        404：表示请求的页面不存在。
        418：It’s a teapot. 这是一个彩蛋，来自 ietf 的一个愚人节玩笑。（超文本咖啡壶控制协议）
    5xx：服务端请求错误。
        500：服务端错误。
        503：服务端暂时性错误，可以一会再试
4. HTTP Request Header
Accept: 浏览器端接受的格式。
Accept-Encoding: 浏览器端接收的编码方式。
Accept-Language: 浏览器接受的语言，用于服务端判断多语言。
Cache-Control: 控制缓存的时效性。
Connection: 连接方式，如果是keep-alive，且服务端支持，则会复用连接。
Host： http访问使用的域名。
If-Modified-Since： 上次访问时的更改时间，如果服务端认为此时间后自己没有更新，则会给出304响应。
If-None-Match：次访问时使用的E-tag，通常是页面的信息摘要，这个比更改时间更准确一些。
User-Agent:客户端标识，因为一些历史原因，这是一笔糊涂账，多数浏览器的这个字段都十分复杂，区别十分微妙。 Cookie：客户端存储的cookie字符串。
5. http response header
Cache-Control:缓存控制，用于通知各级缓存保存的时间，例如max-age=0,表示不要缓存。
Connection: 连接类型，
keep-alive表示复用连接。
Content-Encoding: 内容编码方式，通常是gzip
Content-Length: 内容的长度，有利于浏览器判断内容是否已经结束。
Content-Type: 内容类型，所有请求网页的都是text/html Date:当前的服务器日期。
ETag:页面的信息摘要，用于判断是否需要重新到服务器端取回页面。
Expires：过期时间，用于判断下次请求是否需要到服务端取回页面。
Keep-Alive:保存连接不断时需要的一些信息，如timeout=5,max=100。
Last-Modified: 页面上次修改的时间。
Server: 服务器软件的类型。
Set-Cookie：设置cookie，可以存在多个。
NAME=VALUE Cookie的名和值
expires=DATE Cookie的有效期
Max-Age 失效前的秒数
path=PATH 服务器路径
domain=域名 服务器域名
Secure 只有https才能携带cookie
HttpOnly cookie只能通过HTTP协议传输，不能通过js访问，防止XSS攻击
SameSite - 预防CSRF攻击
Via: 服务端的请求链路，对一些调试场景至关重要的一个头。
6. HTTP body 格式
application/json
application/x-www-form-urlencoded
multipart/form-data
text/html