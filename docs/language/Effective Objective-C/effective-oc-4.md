# Protocols and Categories

## 23: Use Delegate and Data Source Protocols for Inter-object Communication

Define a protocol with potentially optional methods to define the interface that your delegate should support.

- Use the Delegate pattern to provide an interface to your objects that need to tell other objects about pertinent events.
- Use the Delegate pattern when an object needs to obtain data from another object. In this case, it is often referred to as a “data source.”

## 24: Use Categories to Break Class Implementations into Manageable Segments

Use categories to split a class implementation into more manageable fragments.

- EOCPerson+Friendship(.h/.m)
- EOCPerson+Work(.h/.m)
- EOCPerson+Play(.h/.m)

Create a category called Private to hide implementation detail of methods that should be considered as private.

## 25: Always Prefix Category Names on Third-Party Classes

- Always append your naming prefix to the names of categories you add to classes that are not your own.
- Always append your naming prefix to the method names within categories you add to classes that are not your own.

## 26: Avoid Properties in Categories

Although it is technically possible to declare a property in a category, you should avoid doing so if possible. Keep all property declarations for encapsulated data in the main interface definition.

## 27: Use the Class-Continuation Category to Hide Implementation Detail

After all, no method or instance variable is truly private in Objective-C, owing to the way the dynamic messaging system works. However, it is good practice to expose publicly only what needs to be exposed.

成员变量有访问修饰符，方法没有访问修饰符。

The class-continuation category, unlike normal categories, is the only category that is allowed to declare extra instance variables. Also, this category doesn’t have a specific implementation. Any method defined within it is expected to appear in the main implementation of the class. Unlike other categories, a class-continuation category has no name.

```objc
@interface EOCPerson ()
// Methods here
@end
```

Similarly, the instance variable could have been added to the implementation block, semantically equivalent to adding it to the class-continuation category and more a matter of preference. I prefer adding it to the category because it keeps all data definitions in the same place.

## 28: Use a Protocol to Provide Anonymous Objects

`@property (nonatomic, weak) id <EOCDelegate> delegate;`
