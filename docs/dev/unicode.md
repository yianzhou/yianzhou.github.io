# Unicode

[The Absolute Minimum Every Software Developer Must Know About Unicode in 2023 (Still No Excuses!) @tonsky.me](https://tonsky.me/blog/unicode/)

Unicode is a standard that aims to unify all human languages and make them work with computers. In practice, Unicode is a table that assigns unique numbers to different characters.

For example:

- The Latin letter A is assigned the number 65.
- The Arabic Letter Seen س is 1587.
- The Katakana Letter Tu ツ is 12484
- The Musical Symbol G Clef 𝄞 is 119070.
- 💩 is 128169.

Unicode refers to these numbers as **code points**.

**UTF-8** is an **encoding**. Encoding is how we store code points in memory.

UTF-8 is a variable-length encoding. A code point might be encoded as a sequence of **one to four bytes**.

UTF-8 is space-efficient for basic Latin. It might not be fair for texts all over the world like Chinese or Japanese, but for technical strings like HTML tags or JSON keys, it makes sense.

![img](/img/1E4935F4-4BB3-4FE0-AC71-11F4A9665916.png)

UTF-8 has error detection and recovery built-in. **The first byte’s prefix always looks different from bytes 2-4.** This way you can always tell if you are looking at a complete and valid sequence of UTF-8 bytes or if something is missing (for example, you jumped it the middle of the sequence). Then you can correct that by moving forward or backward until you find the beginning of the correct sequence.
