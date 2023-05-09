# CSS

```js
document.getElementsByClassName("s1")[0].classList.add("qb_doc_fullScreen");

document.getElementsByClassName("s1")[0].classList.remove("qb_doc_fullScreen");

document.body.style.fontSize = "200%";

function insertQBCSS() {
  let qbNormalStyle = document.createElement("style");
  qbNormalStyle.type = "text/css";
  qbNormalStyle.innerHTML = '
    .qb_doc_fullScreen{
        width:100% !important;
        padding-left:10 !important;
        padding-right:10 !important;
        padding-top:10 !important;
        padding-bottom:10 !important;
        box-sizing:border-box
    }
    .qb_doc_fontSize {
        font-size: 200% !important;
    }
    ';
  document.querySelector("head").appendChild(qbNormalStyle);
}
insertQBCSS();
```
