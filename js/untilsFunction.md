#### JS开发常用工具函数

1. camelize：横线转驼峰命名


```javascript
    function camelize( str ) {
        return str.replace(/-(w)/, function(_, c) {
            return c ? c.toUpperCase() : '';
        });
    }
```