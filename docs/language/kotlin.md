# Kotlin

[Type-safe builders | Kotlin Documentation](https://kotlinlang.org/docs/type-safe-builders.html)

```kotlin
// 你写的 DSL 风格
return {
    Text {
        attr { text("Hello") }
    }
}

// 等价于（展开后）
return fun ViewContainer.() {
    this.Text {
        this.attr { this.text("Hello") }
    }
}
```

- 延迟执行：闭包不会立即执行，而是返回给框架，由框架决定何时调用
- 隐式 this：闭包内可直接调用 ViewContainer 的方法（attr、Text、View 等）
- 声明式 DSL：过嵌套闭包构建树形结构，类似 HTML/XML 但用 Kotlin 语法
- 响应式重建：当 observable 变量变化时，框架会重新调用此闭包重建 UI
- 类型安全：编译期检查，IDE 自动补全
- 嵌套作用域：每个 {} 内的 this 自动绑定到对应组件
