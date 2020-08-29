class Meta {
  // base class
  double price;
  String name;
  Meta(this.name, this.price);
}

abstract class PrintHelper {
  void printInfo() => print(this);
}

class Item extends Meta {
  Item(name, price) : super(name, price);

  Item operator +(Item item) => Item(name + item.name, price + item.price);
}

// 价格
class ShoppingCart extends Meta with PrintHelper {
  DateTime date;
  String code;
  List<Item> bookings;

  double get price =>
      bookings.reduce((value, element) => value + element).price;

  ShoppingCart({name}) : this.withCode(name: name, code: null);

  ShoppingCart.withCode({name, this.code})
      : date = DateTime.now(),
        super(name, 0);

  String toString() => '''
    购物⻋信息:
    -----------------------------
    用户名: $name
    优惠码: ${code ?? "无"}
    总价: $price
    日期: $date
    -----------------------------
  ''';
}

void main() {
  ShoppingCart.withCode(name: '张三', code: '123456')
    ..bookings = [Item('苹果', 10.0), Item('梨', 20.0)]
    ..printInfo();

  ShoppingCart(name: '李四')
    ..bookings = [Item('香蕉', 15.0), Item('⻄瓜', 40.0)]
    ..printInfo();
}
