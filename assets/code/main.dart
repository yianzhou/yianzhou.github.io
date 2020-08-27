// 商品
class Item {
  double price;
  String name;
  Item(this.price, this.name); // 构造函数语法糖
}

// 价格
class ShoppingCart {
  String name;
  DateTime date;
  String code;
  List<Item> bookings;

  double price() {
    double sum = 0.0;
    for (var i in bookings) {
      sum += i.price;
    }
    return sum;
  }

  ShoppingCart(this.name, this.code) : date = DateTime.now(); // 构造函数语法糖

  String getInfo() {
    return '购物⻋信息:' +
        '\n-----------------------------' +
        '\n用户名: ' +
        name +
        '\n优惠码: ' +
        code +
        '\n总价: ' +
        price().toString() +
        '\n日期: ' +
        date.toString() +
        '\n-----------------------------';
  }
}

void main() {
  ShoppingCart sc = ShoppingCart('张三', '123456');
  sc.bookings = [Item('苹果', 10.0), Item('梨', 20.0)];
  print(sc.getInfo());
}
