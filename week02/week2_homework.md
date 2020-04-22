1.常用语言类型
JS:  基本满足二型，少部分（get：变量名/返回某值）为1型
C++: 非形式语言
PHP: 二型语言

2.JS的NUMBER 类型的正则表达式
    1).十进制整数
        /^-?\d+$/g
    2).二进制数
        /^-?0(b|B)[0|1]+$/g
    3).八进制数
        /^-?0(o|O)?[0|7]+$/g
    4).十六进制数
        /^-?0(x|X)(\d|[a-f]|[A-F])+$/g
    5).科学计数法表示浮点数
        /^-?((0 | ([1-9]\d+))((?<=\.)\d+))(((?<=[E|e])-) | [E|e]+)\d+$/g
NUMBER 的正则为
/^-? (\d+) | (0(b|B)[0|1]+) | (0(o|O)?[0|7]+) | (0(x|X)(\d|[a-f]|[A-F])+) | (((0|([1-9]\d+))((?<=\.)\d+))(((?<=[E|e])-)|[E|e]+)\d+)$/g

3.实现UTF-8编码
UTF-8 编码规则
    /* 1) 单字节的符号，字节的第一位设为0，后面7位为这个符号的unicode码。因此对于英语字母，UTF-8编码和ASCII码是相同的
    2) n字节的符号（n>1），第一个字节的前n位都设为1，第n+1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的unicode码。
    单个unicode字符编码之后的最大长度为6个字节
    1个字节：Unicode码为0 - 127
    2个字节：Unicode码为128 - 2047
    3个字节：Unicode码为2048 - 0xFFFF
    4个字节：Unicode码为65536 - 0x1FFFFF
    5个字节：Unicode码为0x200000 - 0x3FFFFFF
    6个字节：Unicode码为0x4000000 - 0x7FFFFFFF */
    getUTFChar: function(char){
        const charBinary = char.codePointAt().toString(2);
        const returnArr = [];
        let binLen = charBinary.length;
        const prefixArr = ['0', '110', '1110', '11110', '111110', '1111110'];
        for(let i= binLen; i > 0; i-=6){
            const sub = charBinary.slice(Math.max(i - 6, 0), i);
            if(i-6 > 0){
                returnArr.unshift('10'+sub);
            } else {
                let indexP = prefixArr.length;
                returnArr.unshift(prefixArr[indexP]+sub);
            }
        }
        return returnArr.join(',');
    }

    getUTFStr: function(str){
        return str.split("").map((s) => getUTFChar(s));
    }

4.string类型的正则表达式
/^(?:['"\\bfnrtv\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fa-F]{4})*$/