# 每周总结可以写在这里
# 编程语言通识
 1.按语法分类 
 非形式语言： 中文，英文
 形式语言（乔姆斯基谱系）： 
    0型（无限制文法）
    1型（上下文相关文法）
    2型（上下文无关文法）
    3型（正则文法）
2.图灵完备性： 一切可计算的问题都能计算，这样的虚拟机或者编程语言就叫图灵完备的
    命名式 --- 图灵机
        goto
        if和while
    声明式 --- lambda
        递归
# javascript基础知识
1 构成：Atom
        Expression
        Statement
        Structure
        Program
Atom Identifier & Literal
    WhiteSpace
    LineTerminator
    Comment
    Token
        Identifier: 可以以_/$/字母开头
        Punctuator
        Template
        Literal
2 类型
    Number
        浮点数精度比较Number.EPSILON
        特例：Math.abs(1.1+2.2-3.3) > Number.EPSILON
    String
        推荐范围 U+0000 ~ U+FFFF （BMP）
        编程最好使用位于ASCII码范围内
    Boolean
    Null
    Undifined
    Symbol
    Object
