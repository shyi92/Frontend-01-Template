# 1 string 转 number
convertStrToNum: function(str, x){
    if (arguments.length < 2) {
        x = 1;
    }
    var charArr = str.split('');
    const isNegative = chars[0] === '-'
    var num = 0, 
        charLen = charArr.length;
    var i = isNegative? 1 : 0, 
        sign = isNegative? (-1) : 1;
    var fraction = 1, point = false;
    while(i < charLen){
        if (charArr[i ] == '.'){
            point = true;
        }
        num = num * x;
        let lowerChar = charArr[i].toLowerCase().codePointAt(0);
        let lowCode = 0;
        if (x > 10 && lowerChar > 'a'.codePointAt(0)){
            if((lowerChar - 'a'.codePointAt(0) + 10 > x)){
                return "NaN";
            }
            lowCode = lowerChar - 'a'.codePointAt(0) + 10;
        } else {
            if ( (lowerChar - '0'.codePointAt(0)) > x){
                return "NaN";
            }
            lowCode = lowerChar - '0'.codePointAt(0);
        }
        if (point) {
            fraction = fraction / x;
            lowCode = lowCode * fraction
        }
        num += num + lowCode;
        i++;
    }

    return num;
    

}
# 2 number 转 string
convertNumToStr: function(number, x){
    if(arguments.length < 2){
			x = 10;
	}
	var fraction = number - Math.floor(number);
	var integer = number - fraction;
	var string = "";
	while(integer > 0){
		string = (integer % x) + string;
		integer = Math.floor(integer / x);
	}
	string += ".";
	while(fraction > 0){
		console.log(string)
		string =  string + Math.floor(fraction*x);
		fraction = fraction*x - Math.floor(fraction*x);
	}
	return string;
}
# 3 特殊对象
1)Function Object
   [[call]] 表示可执行的对象
   [[prototype]] 指向原型
   length 形参个数
2)Array Object
   length 不可配置
3)String Object
   length 不可配置
4)arguments
   [[callee]] 视为函数参数对对象，伪数组 caller
5) Module Namespece
   [[Module]] 引入的模块
   [[Exports]] 导出的模块