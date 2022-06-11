# javaEnumToJson

> **_优雅_** 的将 JavaEnum 转化为 JavaScript 可用的 JSON

```java
// template
public enum ColorsEnum {
    RED("RED", "红色"),
    BLUE("BLUE", "蓝色"),
    GREEN("GREEN", "绿色"),
    YELLOW("YELLOW", "黄色"),
    BLACK("BLACK", "黑色"),
    PINK("PINK","粉红色"),
    BROWN("BROWN","褐色"),
    CAMEL("CAMEL","驼色"),
    AMBER("AMBER","琥珀色"),
}

```

```js
const ColorsEnum = {
	RED: '红色',
	BLUE: '蓝色',
	GREEN: '绿色',
	YELLOW: '黄色',
	BLACK: '黑色',
	PINK: '粉红色',
	BROWN: '褐色',
	CAMEL: '驼色',
	AMBER: '琥珀色',
};
```


![使用指南](https://gitee.com/he__taotao/files/raw/master/javaenumtojson-user-guide.gif)
