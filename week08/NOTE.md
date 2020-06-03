# 每周总结可以写在这里
1.盒
    排版和渲染的基本单位是盒，元素在排版时可能产生多个盒
    文字一行显示不下时会换行，排版中每一行是一个行盒，一个行盒中至少包含一个盒，同一个元素中多行文字就会产生多个盒
    元素中包含::before,::after,::firstletter 伪元素，每个伪元素可以产生一个盒，则当前元素可以产生多个盒
2.盒模型
    Box-sizing: content-box    width = contenWIdth
    Box-sizing: border-box     width = contentWidth + padding + border
3.正常流
    收集盒进入行->计算盒在行中的排布->计算行的排布
    inline-block 要配合 vertical-align 使用，通常把 vertical-align 设为 top 或 bottom
    如果一行的有子元素的高度大于 line-height，行高为最大元素的高度
4.BFC（块级格式上下文）
    什么情况会产生 BFC : 能容纳正常流的元素都会产生 BFC，除 overflow：visible 外
    Block-level boxes: 表示块级别的盒子,flex、table、grid、block
    Block containers: 表示正常流块级元素的容器, block、inline-block
    Block boxes：block-level + block-container
5.margin 折叠
    同一个 BFC 下 display:inline-block；的元素之间不会发生边距折叠
    同一个 BFC 下脱离文档流的元素相互间不会发生边距折叠
    不同 BFC 下的元素之间不会发生边距折叠